import { html, render } from 'lit-html';
import { createHero, listHeroBackgrounds, listHeroClasses, listHeroRaces } from '../systems/hero';
import type {
  StoryChoice,
  StoryNode,
  Hero,
  Quest,
  FactionStanding,
  Achievement,
  JournalEntry,
  DiscoveredNode,
} from '../systems/types';
import { World, type ToastMessage } from '../systems/world';
import { SKILLS, type CombatEncounter, type WorldState } from '../systems/types';
import { CombatSession, type CombatSnapshot, type CombatAction } from '../systems/combat';
import { AudioManager } from '../systems/audio';

import './story-panel';
import './dialogue-list';
import './character-sheet';
import './quest-tracker';
import './combat-hud';
import './toast-stack';
import './journal-log';
import './node-map';

const HERO_RACES = listHeroRaces();
const HERO_CLASSES = listHeroClasses();
const HERO_BACKGROUNDS = listHeroBackgrounds();

type RenderChoice = StoryChoice & { disabled?: boolean };

type MapNode = DiscoveredNode & { isCurrent: boolean };

interface HeroCreationDraft {
  name: string;
  portrait: string;
  raceId: string;
  classId: string;
  backgroundId: string;
}

interface NormalizedHeroCreation extends HeroCreationDraft {}

interface HeroCreationState extends HeroCreationDraft {
  preview: Hero | null;
}

const DEFAULT_HERO_NAME = 'Lone Adventurer';
const DEFAULT_HERO_PORTRAIT = 'https://avatars.dicebear.com/api/adventurer/chronicles.svg';
const ATTRIBUTE_ORDER: Array<keyof Hero['attributes']> = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

function normalizeHeroCreation(draft: HeroCreationDraft): NormalizedHeroCreation {
  const trimmedName = draft.name.trim();
  const trimmedPortrait = draft.portrait.trim();
  const fallbackRace = HERO_RACES[0]?.id ?? '';
  const fallbackClass = HERO_CLASSES[0]?.id ?? '';
  const fallbackBackground = HERO_BACKGROUNDS[0]?.id ?? '';

  return {
    name: trimmedName.length > 0 ? trimmedName : DEFAULT_HERO_NAME,
    portrait: trimmedPortrait.length > 0 ? trimmedPortrait : DEFAULT_HERO_PORTRAIT,
    raceId: draft.raceId || fallbackRace,
    classId: draft.classId || fallbackClass,
    backgroundId: draft.backgroundId || fallbackBackground,
  };
}

function buildHeroPreview(normalized: NormalizedHeroCreation): Hero | null {
  try {
    return createHero(normalized);
  } catch (error) {
    return null;
  }
}

function createInitialHeroCreationState(): HeroCreationState {
  const base: HeroCreationDraft = {
    name: DEFAULT_HERO_NAME,
    portrait: '',
    raceId: HERO_RACES[0]?.id ?? '',
    classId: HERO_CLASSES[0]?.id ?? '',
    backgroundId: HERO_BACKGROUNDS[0]?.id ?? '',
  };
  const normalized = normalizeHeroCreation(base);
  return {
    ...base,
    preview: buildHeroPreview(normalized),
  };
}

interface RootState {
  hero: Hero | null;
  node: StoryNode | null;
  choices: RenderChoice[];
  quests: Quest[];
  factions: FactionStanding[];
  achievements: Achievement[];
  toasts: ToastMessage[];
  mode: 'creation' | 'story' | 'combat';
  combat: {
    encounter: CombatEncounter | null;
    snapshot: CombatSnapshot | null;
  };
  journal: JournalEntry[];
  mapNodes: MapNode[];
  heroCreation: HeroCreationState;
}

export class DDRoot extends HTMLElement {
  private world = new World();
  private audio = new AudioManager();

  private state: RootState = {
    hero: null,
    node: null,
    choices: [],
    quests: [],
    factions: [],
    achievements: [],
    toasts: [],
    mode: 'creation',
    combat: {
      encounter: null,
      snapshot: null,
    },
    journal: [],
    mapNodes: [],
    heroCreation: createInitialHeroCreationState(),
  };

  private combatSession: CombatSession | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleChoiceSelected = this.handleChoiceSelected.bind(this);
    this.handleCombatAction = this.handleCombatAction.bind(this);
  }

  connectedCallback(): void {
    this.addEventListener('choice-selected', this.handleChoiceSelected as EventListener);
    this.addEventListener('combat-action', this.handleCombatAction as EventListener);
    this.world.addEventListener('state-change', (event) => {
      const detail = (event as CustomEvent<WorldState>).detail;
      const node = this.world.currentNode;
      const choices = this.computeChoices(node);
      const quests = Object.values(detail.quests).sort((a, b) => a.title.localeCompare(b.title));
      const factions = Object.values(detail.factions).sort((a, b) => a.name.localeCompare(b.name));
      const achievements = Object.values(detail.achievements).sort(
        (a, b) => b.unlockedAt - a.unlockedAt,
      );
      this.audio.setAmbient(detail.ambientTrack);
      const mapNodes = Object.values(detail.discoveredNodes ?? {})
        .sort((a, b) => a.firstVisitedAt - b.firstVisitedAt)
        .map((entry) => ({
          ...entry,
          isCurrent: entry.id === detail.currentNodeId,
        }));
      this.state = {
        ...this.state,
        hero: detail.hero,
        node,
        choices,
        quests,
        factions,
        achievements,
        journal: [...detail.journal].sort((a, b) => a.timestamp - b.timestamp),
        mode: detail.hero ? (this.state.mode === 'combat' ? 'combat' : 'story') : 'creation',
        mapNodes,
      };
      this.requestRender();
    });

    this.world.addEventListener('toast', (event) => {
      const toast = (event as CustomEvent<ToastMessage>).detail;
      this.audio.playToastTone(toast.tone);
      this.pushToast(toast);
    });

    this.world.addEventListener('combat-start', (event) => {
      const encounter = (event as CustomEvent<CombatEncounter>).detail;
      this.audio.playCue('combat-start');
      const hero = this.state.hero;
      if (!hero) return;
      this.combatSession = new CombatSession(hero, encounter);
      this.combatSession.addEventListener('update', (updateEvent) => {
        const snapshot = (updateEvent as CustomEvent<CombatSnapshot>).detail;
        this.state = {
          ...this.state,
          mode: 'combat',
          combat: {
            encounter,
            snapshot,
          },
        };
        this.requestRender();
      });
      const initialSnapshot = this.combatSession.snapshot;
      this.state = {
        ...this.state,
        mode: 'combat',
        combat: {
          encounter,
          snapshot: initialSnapshot,
        },
      };
      this.requestRender();
    });

    this.world.addEventListener('combat-end', (event) => {
      const detail = (
        event as CustomEvent<{ victory: boolean; result: 'victory' | 'defeat' | 'flee' }>
      ).detail;
      if (detail.result === 'victory') {
        this.audio.playCue('victory');
      } else if (detail.result === 'defeat') {
        this.audio.playCue('defeat');
      } else {
        this.audio.playCue('flee');
      }
      this.combatSession = null;
      this.state = {
        ...this.state,
        mode: 'story',
        combat: {
          encounter: null,
          snapshot: null,
        },
      };
      this.requestRender();
    });

    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        this.world.restore();
        if (this.world.snapshot.hero) {
          const node = this.world.currentNode;
          const snapshot = this.world.snapshot;
          const mapNodes = Object.values(snapshot.discoveredNodes ?? {})
            .sort((a, b) => a.firstVisitedAt - b.firstVisitedAt)
            .map((entry) => ({
              ...entry,
              isCurrent: entry.id === snapshot.currentNodeId,
            }));
          this.state = {
            ...this.state,
            mode: 'story',
            hero: snapshot.hero,
            node,
            choices: this.computeChoices(node),
            quests: Object.values(snapshot.quests).sort((a, b) => a.title.localeCompare(b.title)),
            factions: Object.values(snapshot.factions).sort((a, b) => a.name.localeCompare(b.name)),
            achievements: Object.values(snapshot.achievements).sort(
              (a, b) => b.unlockedAt - a.unlockedAt,
            ),
            journal: [...snapshot.journal].sort((a, b) => a.timestamp - b.timestamp),
            mapNodes,
          };
          this.requestRender();
        } else {
          this.requestRender();
        }
      });
    } else {
      this.requestRender();
    }
  }

  disconnectedCallback(): void {
    this.removeEventListener('choice-selected', this.handleChoiceSelected as EventListener);
    this.removeEventListener('combat-action', this.handleCombatAction as EventListener);
    this.audio.dispose();
  }

  private handleChoiceSelected(event: CustomEvent<{ choice: StoryChoice }>): void {
    event.stopPropagation();
    const { choice } = event.detail;
    if ((choice as RenderChoice).disabled) return;
    this.world.applyChoice(choice);
  }

  private handleCombatAction(event: CustomEvent<{ action: CombatAction }>): void {
    event.stopPropagation();
    if (!this.combatSession || !this.state.combat.encounter) return;
    const snapshot = this.combatSession.perform(event.detail.action);
    this.state = {
      ...this.state,
      combat: {
        encounter: this.state.combat.encounter,
        snapshot,
      },
    };
    if (snapshot.status === 'victory') {
      this.world.concludeCombat('victory', this.state.combat.encounter);
    } else if (snapshot.status === 'defeat') {
      this.world.concludeCombat('defeat', this.state.combat.encounter);
    } else if (snapshot.status === 'fled') {
      this.world.concludeCombat('flee', this.state.combat.encounter);
    }
    this.requestRender();
  }

  private pushToast(toast: ToastMessage): void {
    this.state = {
      ...this.state,
      toasts: [...this.state.toasts, toast].slice(-4),
    };
    this.requestRender();
    setTimeout(() => {
      this.state = {
        ...this.state,
        toasts: this.state.toasts.filter((entry) => entry.id !== toast.id),
      };
      this.requestRender();
    }, 4000);
  }

  private handleHeroCreationSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const normalized = this.getNormalizedHeroCreation();
    const hero = createHero(normalized);
    this.world.setHero(hero, 'prologue-awakening');
    form.reset();
    this.state = {
      ...this.state,
      heroCreation: createInitialHeroCreationState(),
    };
    this.requestRender();
  }

  private computeChoices(node: StoryNode | null): RenderChoice[] {
    if (!node) return [];
    return node.choices
      .filter((choice) => !choice.hidden)
      .map((choice) => ({
        ...choice,
        disabled: choice.requirements ? !this.world.checkConditions(choice.requirements) : false,
      }));
  }

  private handleHeroCreationInput(event: Event): void {
    const form = event.currentTarget as HTMLFormElement | null;
    if (!form) return;
    this.updateHeroCreationDraft(form);
  }

  private updateHeroCreationDraft(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const draft: HeroCreationDraft = {
      name: String(formData.get('name') ?? ''),
      portrait: String(formData.get('portrait') ?? ''),
      raceId: String(formData.get('race') ?? ''),
      classId: String(formData.get('class') ?? ''),
      backgroundId: String(formData.get('background') ?? ''),
    };
    const normalized = normalizeHeroCreation(draft);
    const preview = buildHeroPreview(normalized);
    this.state = {
      ...this.state,
      heroCreation: {
        ...draft,
        preview,
      },
    };
    this.requestRender();
  }

  private getNormalizedHeroCreation(): NormalizedHeroCreation {
    const { name, portrait, raceId, classId, backgroundId } = this.state.heroCreation;
    return normalizeHeroCreation({ name, portrait, raceId, classId, backgroundId });
  }

  private previewTopSkills(hero: Hero): { label: string; value: number }[] {
    return [...SKILLS]
      .map((skill) => ({ label: skill.label, value: hero.skills[skill.id] ?? 0 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
  }

  private formatAbilityLabel(ability: keyof Hero['attributes']): string {
    return ability.charAt(0).toUpperCase() + ability.slice(1);
  }

  private requestRender(): void {
    if (!this.shadowRoot) return;
    const {
      hero,
      node,
      choices,
      quests,
      factions,
      achievements,
      toasts,
      mode,
      combat,
      journal,
      mapNodes,
      heroCreation,
    } = this.state;
    const normalizedCreation = this.getNormalizedHeroCreation();
    const selectedRace =
      HERO_RACES.find((race) => race.id === normalizedCreation.raceId) ?? HERO_RACES[0];
    const selectedClass =
      HERO_CLASSES.find((entry) => entry.id === normalizedCreation.classId) ?? HERO_CLASSES[0];
    const selectedBackground =
      HERO_BACKGROUNDS.find((entry) => entry.id === normalizedCreation.backgroundId) ??
      HERO_BACKGROUNDS[0];
    const previewSkills = heroCreation.preview ? this.previewTopSkills(heroCreation.preview) : [];
    const abilityHighlights = ATTRIBUTE_ORDER.map((ability) => {
      const raceBonus = selectedRace?.bonuses?.[ability] ?? 0;
      const classBonus = selectedClass?.bonuses?.[ability] ?? 0;
      const total = raceBonus + classBonus;
      return { ability, raceBonus, classBonus, total };
    }).filter((entry) => entry.total !== 0);
    const startingItems = selectedClass?.startingItems ?? [];
    render(
      html`
        <style>
          :host {
            display: block;
            min-height: 100vh;
            padding: 2rem 3rem;
            color: var(--dd-text);
            position: relative;
          }

          .layout {
            display: grid;
            grid-template-columns: minmax(0, 3fr) minmax(280px, 1fr);
            gap: 1.75rem;
          }

          main {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          aside {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .creation-overlay {
            position: fixed;
            inset: 0;
            background: rgba(8, 6, 12, 0.92);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
            padding: 2rem;
          }

          .creation-panel {
            max-width: 760px;
            width: 100%;
            background: rgba(24, 18, 36, 0.95);
            border: 1px solid rgba(255, 210, 164, 0.25);
            border-radius: 24px;
            padding: 2.5rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
          }

          .creation-panel h1 {
            margin-top: 0;
            font-family: 'Cinzel', serif;
            font-size: 2rem;
            letter-spacing: 0.08em;
            margin-bottom: 1rem;
            text-align: center;
          }

          .creation-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 2rem;
            align-items: flex-start;
          }

          form {
            display: grid;
            gap: 1.5rem;
          }

          .grid {
            display: grid;
            gap: 1rem;
          }

          .grid.two {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          label {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            font-size: 0.95rem;
            letter-spacing: 0.02em;
          }

          input,
          select {
            padding: 0.75rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(18, 14, 28, 0.9);
            color: inherit;
          }

          .field-hint {
            display: block;
            margin-top: -0.15rem;
            font-size: 0.75rem;
            color: var(--dd-muted);
          }

          button.primary {
            padding: 0.95rem 1.25rem;
            border-radius: 12px;
            border: 1px solid rgba(240, 179, 90, 0.65);
            background: linear-gradient(90deg, #f0b35a, #f27d72);
            color: #1b0f22;
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: transform 150ms ease;
          }

          button.primary:hover {
            transform: translateY(-2px);
          }

          .mode-badge {
            font-size: 0.85rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--dd-muted);
          }

          .preview-panel {
            background: rgba(18, 14, 28, 0.85);
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 20px;
            padding: 1.5rem;
            display: grid;
            gap: 1rem;
          }

          .preview-panel h2 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.35rem;
            letter-spacing: 0.06em;
          }

          .preview-panel .section-title {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            letter-spacing: 0.05em;
          }

          .preview-identity {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .preview-portrait {
            width: 72px;
            height: 72px;
            border-radius: 18px;
            border: 2px solid rgba(240, 179, 90, 0.65);
            background-size: cover;
            background-position: center;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
          }

          .preview-identity h3 {
            margin: 0;
            font-size: 1.2rem;
            letter-spacing: 0.04em;
          }

          .preview-summary {
            font-size: 0.9rem;
            color: var(--dd-muted);
            margin: 0.25rem 0 0;
          }

          .preview-attributes {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.65rem;
          }

          .preview-attributes li {
            list-style: none;
            background: rgba(32, 24, 44, 0.9);
            border: 1px solid rgba(255, 210, 164, 0.14);
            border-radius: 12px;
            padding: 0.5rem 0.65rem;
            text-align: center;
          }

          .preview-attributes .label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--dd-muted);
          }

          .preview-attributes .value {
            font-size: 1.15rem;
            font-weight: 700;
          }

          .preview-skills {
            display: grid;
            gap: 0.5rem;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .preview-skills li {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.35rem;
          }

          .preview-info {
            display: grid;
            gap: 0.75rem;
          }

          .preview-info section {
            background: rgba(255, 255, 255, 0.04);
            border-radius: 12px;
            padding: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
          }

          .preview-info h4 {
            margin: 0 0 0.35rem;
            font-size: 0.85rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: rgba(240, 179, 90, 0.85);
          }

          .preview-info p {
            margin: 0;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.8);
          }

          .origin-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.5rem;
          }

          .origin-list li {
            display: grid;
            gap: 0.2rem;
          }

          .origin-list .label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.55);
          }

          .bonus-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
          }

          .bonus {
            display: inline-flex;
            flex-direction: column;
            gap: 0.2rem;
            padding: 0.35rem 0.6rem;
            border-radius: 10px;
            background: rgba(137, 227, 185, 0.16);
            color: rgba(137, 227, 185, 0.95);
            border: 1px solid rgba(137, 227, 185, 0.3);
            font-size: 0.85rem;
          }

          .bonus small {
            font-size: 0.6rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.65);
          }

          .starting-kit {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.65rem;
          }

          .starting-kit li {
            display: grid;
            gap: 0.25rem;
          }

          .starting-kit strong {
            font-size: 0.95rem;
          }

          .starting-kit .item-header {
            display: flex;
            align-items: baseline;
            gap: 0.4rem;
            flex-wrap: wrap;
          }

          .starting-kit .item-type {
            font-size: 0.7rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
            background: rgba(106, 192, 255, 0.16);
            padding: 0.15rem 0.45rem;
            border-radius: 999px;
          }

          .starting-kit .item-bonus {
            font-size: 0.7rem;
            letter-spacing: 0.06em;
            color: rgba(240, 179, 90, 0.85);
          }

          .preview-empty {
            margin: 0;
            font-size: 0.9rem;
            color: var(--dd-muted);
            text-align: center;
          }
        </style>
        <div class="layout">
          <main>
            <div class="mode-badge">${mode === 'combat' ? 'Combat Turn' : 'Story Phase'}</div>
            <dd-story-panel .data=${node}></dd-story-panel>
            ${mode === 'combat' && combat.encounter && combat.snapshot
              ? html`<dd-combat-hud
                  .data=${{ snapshot: combat.snapshot, enemyName: combat.encounter.enemy.name }}
                ></dd-combat-hud>`
              : html`<dd-dialogue-list .data=${choices}></dd-dialogue-list>`}
          </main>
          <aside>
            <dd-character-sheet
              .data=${{
                hero,
                factions,
                achievements,
              }}
            ></dd-character-sheet>
            <dd-node-map .data=${mapNodes}></dd-node-map>
            <dd-quest-tracker .data=${quests}></dd-quest-tracker>
            <dd-journal-log .data=${journal}></dd-journal-log>
          </aside>
        </div>
        <dd-toast-stack .data=${toasts}></dd-toast-stack>
        ${mode === 'creation'
          ? html`
              <div class="creation-overlay">
                <div class="creation-panel">
                  <h1>Dungeons & Dragons: Chronicles of the Lone Adventurer</h1>
                  <p>Create your lone hero to begin the saga.</p>
                  <div class="creation-content">
                    <form
                      @submit=${(event: Event) => this.handleHeroCreationSubmit(event)}
                      @input=${(event: Event) => this.handleHeroCreationInput(event)}
                      @change=${(event: Event) => this.handleHeroCreationInput(event)}
                    >
                      <div class="grid two">
                        <label>
                          Hero Name
                          <input
                            name="name"
                            placeholder="Aria Stormborn"
                            minlength="2"
                            .value=${heroCreation.name}
                          />
                          <span class="field-hint">Leave blank to begin as the Lone Adventurer.</span>
                        </label>
                        <label>
                          Portrait URL
                          <input
                            name="portrait"
                            placeholder="https://avatars.dicebear.com/api/adventurer/aria.svg"
                            .value=${heroCreation.portrait}
                          />
                          <span class="field-hint">Leave blank to use the illustrated default portrait.</span>
                        </label>
                      </div>
                      <div class="grid two">
                        <label>
                          Race
                          <select name="race" .value=${heroCreation.raceId}>
                            ${HERO_RACES.map(
                              (race) => html`<option value=${race.id}>${race.name}</option>`,
                            )}
                          </select>
                        </label>
                        <label>
                          Class
                          <select name="class" .value=${heroCreation.classId}>
                            ${HERO_CLASSES.map(
                              (heroClass) => html`<option value=${heroClass.id}>${heroClass.name}</option>`,
                            )}
                          </select>
                        </label>
                      </div>
                      <label>
                        Background
                        <select name="background" .value=${heroCreation.backgroundId}>
                          ${HERO_BACKGROUNDS.map(
                            (background) => html`
                              <option value=${background.id}>${background.name}</option>
                            `,
                          )}
                        </select>
                      </label>
                      <button class="primary" type="submit">Begin the Chronicle</button>
                    </form>
                    <section class="preview-panel">
                      <h2>Hero Preview</h2>
                      ${heroCreation.preview
                        ? html`
                            <div class="preview-identity">
                              <div
                                class="preview-portrait"
                                style="background-image: url('${normalizedCreation.portrait}')"
                              ></div>
                              <div>
                                <h3>${normalizedCreation.name}</h3>
                                <p class="preview-summary">
                                  ${heroCreation.preview.race} · ${heroCreation.preview.heroClass.name}
                                </p>
                              </div>
                            </div>
                            <ul class="preview-attributes">
                              ${ATTRIBUTE_ORDER.map((ability) => {
                                const value = heroCreation.preview?.attributes[ability] ?? 0;
                                return html`
                                  <li>
                                    <div class="label">${this.formatAbilityLabel(ability)}</div>
                                    <div class="value">${value}</div>
                                  </li>
                                `;
                              })}
                            </ul>
                            <div>
                              <h3 class="section-title">Signature Skills</h3>
                              <ul class="preview-skills">
                                ${previewSkills.map(
                                  (skill) => html`
                                    <li>
                                      <span>${skill.label}</span>
                                      <strong>${skill.value >= 0 ? '+' : ''}${skill.value}</strong>
                                    </li>
                                  `,
                                )}
                              </ul>
                            </div>
                            <div class="preview-info">
                              <section>
                                <h4>Origin Lore</h4>
                                <ul class="origin-list">
                                  <li>
                                    <span class="label">Race</span>
                                    <p>${selectedRace?.description ?? 'A mysterious lineage.'}</p>
                                  </li>
                                  <li>
                                    <span class="label">Class</span>
                                    <p>${selectedClass?.description ?? 'A path yet undefined.'}</p>
                                  </li>
                                  <li>
                                    <span class="label">Background</span>
                                    <p>${selectedBackground?.description ?? 'History yet to be written.'}</p>
                                  </li>
                                </ul>
                              </section>
                              <section>
                                <h4>Background Feature</h4>
                                <p>${selectedBackground?.feature ?? 'Hidden potential awaits.'}</p>
                              </section>
                              <section>
                                <h4>Aptitude Highlights</h4>
                                ${abilityHighlights.length > 0
                                  ? html`<div class="bonus-badges">
                                      ${abilityHighlights.map((entry) => html`
                                        <span class="bonus">
                                          ${this.formatAbilityLabel(entry.ability)} +${entry.total}
                                          ${entry.raceBonus && entry.classBonus
                                            ? html`<small>Race +${entry.raceBonus}, Class +${entry.classBonus}</small>`
                                            : entry.raceBonus
                                              ? html`<small>Race +${entry.raceBonus}</small>`
                                              : entry.classBonus
                                                ? html`<small>Class +${entry.classBonus}</small>`
                                                : null}
                                        </span>
                                      `)}
                                    </div>`
                                  : html`<p>No innate bonuses—rely on raw talent.</p>`}
                              </section>
                              <section>
                                <h4>Starting Kit</h4>
                                ${startingItems.length > 0
                                  ? html`<ul class="starting-kit">
                                      ${startingItems.map((item) => html`
                                        <li>
                                          <div class="item-header">
                                            <strong>${item.name}</strong>
                                            <span class="item-type">
                                              ${(item.type.charAt(0).toUpperCase() + item.type.slice(1)).replace(/-/g, ' ')}
                                            </span>
                                          </div>
                                          <p>${item.description}</p>
                                          ${item.bonus
                                            ? html`<span class="item-bonus">
                                                Bonus:
                                                ${item.bonus.ability
                                                  ? html`${this.formatAbilityLabel(item.bonus.ability)} +${item.bonus.value}`
                                                  : html`+${item.bonus.value}`}
                                              </span>`
                                            : null}
                                        </li>
                                      `)}
                                    </ul>`
                                  : html`<p>Begin empty-handed—improvise as you go.</p>`}
                              </section>
                            </div>
                          `
                        : html`<p class="preview-empty">Adjust your selections to preview your hero.</p>`}
                    </section>
                  </div>
                </div>
              </div>
            `
          : null}
      `,
      this.shadowRoot,
    );
  }
}

customElements.define('dd-root', DDRoot);
