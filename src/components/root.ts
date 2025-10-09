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
} from '../systems/types';
import { World, type ToastMessage } from '../systems/world';
import type { CombatEncounter, WorldState } from '../systems/types';
import { CombatSession, type CombatSnapshot, type CombatAction } from '../systems/combat';
import { AudioManager } from '../systems/audio';

import './story-panel';
import './dialogue-list';
import './character-sheet';
import './quest-tracker';
import './combat-hud';
import './toast-stack';
import './journal-log';

const HERO_RACES = listHeroRaces();
const HERO_CLASSES = listHeroClasses();
const HERO_BACKGROUNDS = listHeroBackgrounds();

type RenderChoice = StoryChoice & { disabled?: boolean };

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
    const formData = new FormData(form);
    const name = String(formData.get('name') || 'Lone Adventurer');
    const portrait = String(
      formData.get('portrait') || 'https://avatars.dicebear.com/api/adventurer/chronicles.svg',
    );
    const raceId = String(formData.get('race') || HERO_RACES[0].id);
    const classId = String(formData.get('class') || HERO_CLASSES[0].id);
    const backgroundId = String(formData.get('background') || HERO_BACKGROUNDS[0].id);

    const hero = createHero({
      name,
      portrait,
      raceId,
      classId,
      backgroundId,
    });

    this.world.setHero(hero, 'prologue-awakening');
    form.reset();
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
    } = this.state;
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
                  <form @submit=${(event: Event) => this.handleHeroCreationSubmit(event)}>
                    <div class="grid two">
                      <label>
                        Hero Name
                        <input name="name" placeholder="Aria Stormborn" required minlength="2" />
                      </label>
                      <label>
                        Portrait URL
                        <input
                          name="portrait"
                          placeholder="https://avatars.dicebear.com/api/adventurer/aria.svg"
                        />
                      </label>
                    </div>
                    <div class="grid two">
                      <label>
                        Race
                        <select name="race">
                          ${HERO_RACES.map(
                            (race) => html`<option value=${race.id}>${race.name}</option>`,
                          )}
                        </select>
                      </label>
                      <label>
                        Class
                        <select name="class">
                          ${HERO_CLASSES.map(
                            (heroClass) => html`<option value=${heroClass.id}>${heroClass.name}</option>`,
                          )}
                        </select>
                      </label>
                    </div>
                    <label>
                      Background
                      <select name="background">
                        ${HERO_BACKGROUNDS.map(
                          (background) => html`
                            <option value=${background.id}>${background.name}</option>
                          `,
                        )}
                      </select>
                    </label>
                    <button class="primary" type="submit">Begin the Chronicle</button>
                  </form>
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
