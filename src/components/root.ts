import { html, render } from 'lit-html';
import {
  createHero,
  listHeroBackgrounds,
  listHeroClasses,
  listHeroRaces,
  loadSrdHeroOptions,
  subscribeHeroOptions,
  type HeroOptionSnapshot,
} from '../systems/hero';
import {
  fetchSrdCompendiumIndex,
  type SrdCompendiumCategory,
  type SrdCompendiumEntrySummary,
} from '../systems/dnd5e';
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
import './dnd-compendium';
import './combat-planner';
import './dice-workbench';
import './downtime-planner';
import { loadConfiguredModules } from '../systems/modules';

const INITIAL_HERO_OPTIONS: HeroOptionSnapshot = {
  races: listHeroRaces(),
  classes: listHeroClasses(),
  backgrounds: listHeroBackgrounds(),
};

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
const HERO_NAME_MAX_LENGTH = 40;
const ATTRIBUTE_ORDER: Array<keyof Hero['attributes']> = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

const COMPENDIUM_CATEGORY_ORDER: Array<{ id: SrdCompendiumCategory; label: string }> = [
  { id: 'rules', label: 'Core Rules' },
  { id: 'rule-sections', label: 'Rule Sections' },
  { id: 'feats', label: 'Feats' },
  { id: 'equipment', label: 'Weapons & Equipment' },
  { id: 'magic-items', label: 'Magic Items' },
  { id: 'spells', label: 'Spells' },
];

function createEmptyCompendiumIndex(): Record<SrdCompendiumCategory, SrdCompendiumEntrySummary[]> {
  return COMPENDIUM_CATEGORY_ORDER.reduce(
    (acc, entry) => {
      acc[entry.id] = [];
      return acc;
    },
    {} as Record<SrdCompendiumCategory, SrdCompendiumEntrySummary[]>,
  );
}

function normalizeHeroCreation(
  draft: HeroCreationDraft,
  options: HeroOptionSnapshot,
): NormalizedHeroCreation {
  const trimmedName = draft.name.trim();
  const trimmedPortrait = draft.portrait.trim();
  const fallbackRace = options.races[0]?.id ?? '';
  const fallbackClass = options.classes[0]?.id ?? '';
  const fallbackBackground = options.backgrounds[0]?.id ?? '';

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

function createInitialHeroCreationState(options: HeroOptionSnapshot): HeroCreationState {
  const base: HeroCreationDraft = {
    name: DEFAULT_HERO_NAME,
    portrait: '',
    raceId: options.races[0]?.id ?? '',
    classId: options.classes[0]?.id ?? '',
    backgroundId: options.backgrounds[0]?.id ?? '',
  };
  const normalized = normalizeHeroCreation(base, options);
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
  heroOptions: HeroOptionSnapshot;
  heroOptionsLoading: boolean;
  heroOptionsError: string | null;
  compendium: Record<SrdCompendiumCategory, SrdCompendiumEntrySummary[]>;
  compendiumLoading: boolean;
  compendiumError: string | null;
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
    heroCreation: createInitialHeroCreationState(INITIAL_HERO_OPTIONS),
    heroOptions: {
      races: [...INITIAL_HERO_OPTIONS.races],
      classes: [...INITIAL_HERO_OPTIONS.classes],
      backgrounds: [...INITIAL_HERO_OPTIONS.backgrounds],
    },
    heroOptionsLoading: false,
    heroOptionsError: null,
    compendium: createEmptyCompendiumIndex(),
    compendiumLoading: false,
    compendiumError: null,
  };

  private combatSession: CombatSession | null = null;
  private heroOptionsUnsubscribe: (() => void) | null = null;
  private srdAbortController: AbortController | null = null;
  private moduleAbortController: AbortController | null = null;
  private compendiumAbortController: AbortController | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleChoiceSelected = this.handleChoiceSelected.bind(this);
    this.handleCombatAction = this.handleCombatAction.bind(this);
  }

  connectedCallback(): void {
    this.addEventListener('choice-selected', this.handleChoiceSelected as EventListener);
    this.addEventListener('combat-action', this.handleCombatAction as EventListener);
    this.heroOptionsUnsubscribe = subscribeHeroOptions((options) => {
      const reconciled = this.reconcileHeroCreation(this.state.heroCreation, options);
      this.state = {
        ...this.state,
        heroOptions: {
          races: [...options.races],
          classes: [...options.classes],
          backgrounds: [...options.backgrounds],
        },
        heroCreation: reconciled,
      };
      this.requestRender();
    });
    this.loadSrdContent();
    void this.loadCompendiumIndex();
    void this.loadContentModules();
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
    if (this.heroOptionsUnsubscribe) {
      this.heroOptionsUnsubscribe();
      this.heroOptionsUnsubscribe = null;
    }
    if (this.srdAbortController) {
      this.srdAbortController.abort();
      this.srdAbortController = null;
    }
    if (this.moduleAbortController) {
      this.moduleAbortController.abort();
      this.moduleAbortController = null;
    }
    if (this.compendiumAbortController) {
      this.compendiumAbortController.abort();
      this.compendiumAbortController = null;
    }
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
      heroCreation: createInitialHeroCreationState(this.state.heroOptions),
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
    const normalized = normalizeHeroCreation(draft, this.state.heroOptions);
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
    return normalizeHeroCreation(
      { name, portrait, raceId, classId, backgroundId },
      this.state.heroOptions,
    );
  }

  private reconcileHeroCreation(
    current: HeroCreationState,
    options: HeroOptionSnapshot,
  ): HeroCreationState {
    const normalized = normalizeHeroCreation(
      {
        name: current.name,
        portrait: current.portrait,
        raceId: current.raceId,
        classId: current.classId,
        backgroundId: current.backgroundId,
      },
      options,
    );
    return {
      ...current,
      name: normalized.name,
      portrait: normalized.portrait,
      raceId: normalized.raceId,
      classId: normalized.classId,
      backgroundId: normalized.backgroundId,
      preview: buildHeroPreview(normalized),
    };
  }

  private async loadSrdContent(): Promise<void> {
    if (typeof fetch !== 'function') {
      return;
    }

    if (this.srdAbortController) {
      this.srdAbortController.abort();
    }

    const controller = new AbortController();
    this.srdAbortController = controller;

    this.state = {
      ...this.state,
      heroOptionsLoading: true,
      heroOptionsError: null,
    };
    this.requestRender();

    try {
      await loadSrdHeroOptions(controller.signal);
      if (controller.signal.aborted) {
        return;
      }
      this.state = {
        ...this.state,
        heroOptionsLoading: false,
      };
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Failed to load D&D 5e SRD content.';
      this.state = {
        ...this.state,
        heroOptionsLoading: false,
        heroOptionsError: message,
      };
    }

    this.requestRender();
  }

  private async loadCompendiumIndex(): Promise<void> {
    if (typeof fetch !== 'function') {
      return;
    }

    if (this.compendiumAbortController) {
      this.compendiumAbortController.abort();
    }

    const controller = new AbortController();
    this.compendiumAbortController = controller;

    this.state = {
      ...this.state,
      compendiumLoading: true,
      compendiumError: null,
    };
    this.requestRender();

    try {
      const results = await Promise.all(
        COMPENDIUM_CATEGORY_ORDER.map((entry) => fetchSrdCompendiumIndex(entry.id, controller.signal)),
      );
      if (controller.signal.aborted) {
        return;
      }
      const compendium = createEmptyCompendiumIndex();
      results.forEach((list, index) => {
        const category = COMPENDIUM_CATEGORY_ORDER[index]?.id;
        if (category) {
          compendium[category] = list;
        }
      });
      this.state = {
        ...this.state,
        compendium,
        compendiumLoading: false,
      };
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Failed to load D&D 5e reference content.';
      this.state = {
        ...this.state,
        compendiumLoading: false,
        compendiumError: message,
      };
    } finally {
      if (this.compendiumAbortController === controller) {
        this.compendiumAbortController = null;
      }
    }

    this.requestRender();
  }

  private async loadContentModules(): Promise<void> {
    if (typeof fetch !== 'function') {
      return;
    }

    if (this.moduleAbortController) {
      this.moduleAbortController.abort();
    }

    const controller = new AbortController();
    this.moduleAbortController = controller;

    try {
      await loadConfiguredModules(controller.signal);
    } catch (error) {
      if (!controller.signal.aborted) {
        console.warn('Content module load failed', error);
      }
    }
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
      heroOptions,
      heroOptionsLoading,
      heroOptionsError,
      compendium,
      compendiumLoading,
      compendiumError,
    } = this.state;
    const normalizedCreation = this.getNormalizedHeroCreation();
    const heroRaces = heroOptions.races;
    const heroClasses = heroOptions.classes;
    const heroBackgrounds = heroOptions.backgrounds;
    const selectedRace =
      heroRaces.find((race) => race.id === normalizedCreation.raceId) ?? heroRaces[0] ?? null;
    const selectedClass =
      heroClasses.find((entry) => entry.id === normalizedCreation.classId) ?? heroClasses[0] ?? null;
    const selectedBackground =
      heroBackgrounds.find((entry) => entry.id === normalizedCreation.backgroundId) ??
      heroBackgrounds[0] ?? null;
    const previewSkills = heroCreation.preview ? this.previewTopSkills(heroCreation.preview) : [];
    const abilityHighlights = ATTRIBUTE_ORDER.map((ability) => {
      const raceBonus = selectedRace?.bonuses?.[ability] ?? 0;
      const classBonus = selectedClass?.bonuses?.[ability] ?? 0;
      const total = raceBonus + classBonus;
      return { ability, raceBonus, classBonus, total };
    }).filter((entry) => entry.total !== 0);
    const startingItems = selectedClass?.startingItems ?? [];
    const compendiumData = {
      loading: compendiumLoading,
      error: compendiumError,
      categories: COMPENDIUM_CATEGORY_ORDER.map((entry) => ({
        id: entry.id,
        label: entry.label,
        entries: compendium[entry.id] ?? [],
      })),
    };
    const heroNameTrimmed = heroCreation.name.trim();
    const heroNameIsDefault = heroNameTrimmed.length === 0 || heroCreation.name === DEFAULT_HERO_NAME;
    const heroNameCharacterCount = Math.min(heroNameTrimmed.length, HERO_NAME_MAX_LENGTH);
    const portraitTrimmed = heroCreation.portrait.trim();
    const portraitProvided = portraitTrimmed.length > 0;
    const integrationState = heroOptionsLoading ? 'loading' : heroOptionsError ? 'error' : 'ready';
    const integrationLabel =
      integrationState === 'loading'
        ? 'Synchronizing SRD Data'
        : integrationState === 'error'
          ? 'Attention Required'
          : 'Ready for Adventure';
    const integrationNote =
      integrationState === 'loading'
        ? 'Loading D&D 5e SRD content…'
        : integrationState === 'error'
          ? `SRD sync failed: ${heroOptionsError ?? 'Unknown error.'}`
          : 'SRD content synchronized.';
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

          .integration-status {
            position: relative;
            background: linear-gradient(135deg, rgba(32, 24, 44, 0.88), rgba(16, 12, 28, 0.88));
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 18px;
            padding: 1.25rem 1.35rem;
            margin-bottom: 1.5rem;
            overflow: hidden;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          }

          .integration-status::before {
            content: '';
            position: absolute;
            inset: -40% -10% auto -10%;
            height: 160%;
            background: radial-gradient(circle at top, rgba(240, 179, 90, 0.3), transparent 55%);
            opacity: 0.65;
            pointer-events: none;
          }

          .integration-status > * {
            position: relative;
            z-index: 1;
          }

          .status-header {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
          }

          .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.35rem 0.8rem;
            border-radius: 999px;
            font-size: 0.72rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            font-weight: 600;
            background: rgba(240, 179, 90, 0.16);
            color: rgba(240, 179, 90, 0.95);
          }

          .status-badge.ready {
            background: rgba(123, 231, 165, 0.18);
            color: rgba(123, 231, 165, 0.95);
          }

          .status-badge.error {
            background: rgba(242, 125, 114, 0.18);
            color: rgba(255, 184, 176, 0.95);
          }

          .status-icon {
            width: 0.85rem;
            height: 0.85rem;
            border-radius: 50%;
            background: rgba(240, 179, 90, 0.95);
            box-shadow: 0 0 0 4px rgba(240, 179, 90, 0.15);
          }

          .status-badge.ready .status-icon {
            background: rgba(123, 231, 165, 1);
            box-shadow: 0 0 0 4px rgba(123, 231, 165, 0.2);
          }

          .status-badge.error .status-icon {
            background: rgba(242, 125, 114, 1);
            box-shadow: 0 0 0 4px rgba(242, 125, 114, 0.2);
          }

          .status-badge.loading .status-icon {
            position: relative;
            background: transparent;
            border: 2px solid rgba(240, 179, 90, 0.4);
            border-top-color: rgba(240, 179, 90, 0.95);
            box-shadow: none;
            animation: spin 1s linear infinite;
          }

          .status-note {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.78);
          }

          .status-metric {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin: 0.85rem 0 0.65rem;
          }

          .metric {
            display: grid;
            gap: 0.15rem;
            padding: 0.45rem 0.75rem;
            border-radius: 12px;
            background: rgba(10, 6, 18, 0.45);
            border: 1px solid rgba(255, 255, 255, 0.08);
            min-width: 88px;
          }

          .metric strong {
            font-family: 'Cinzel', serif;
            font-size: 1.05rem;
            letter-spacing: 0.04em;
          }

          .metric small {
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.65rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .integration-status code {
            background: rgba(8, 6, 12, 0.6);
            border-radius: 6px;
            padding: 0.1rem 0.4rem;
            font-size: 0.85rem;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .integration-hint {
            font-size: 0.82rem;
            color: rgba(255, 255, 255, 0.72);
          }

          .grid {
            display: grid;
            gap: 1rem;
          }

          .grid.two {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .field {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
          }

          .field-label {
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
            font-size: 0.95rem;
            letter-spacing: 0.02em;
            font-weight: 600;
          }

          .field-meta {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            padding: 0.1rem 0.45rem;
            border-radius: 999px;
            background: rgba(240, 179, 90, 0.18);
            color: rgba(240, 179, 90, 0.9);
          }

          .field-meta.muted {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.65);
          }

          .field-meta.accent {
            background: rgba(123, 231, 165, 0.2);
            color: rgba(123, 231, 165, 0.88);
          }

          .input-wrapper {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.75rem 0.9rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.18);
            background: rgba(18, 14, 28, 0.9);
            transition: border 150ms ease, box-shadow 200ms ease;
          }

          .input-wrapper:focus-within {
            border-color: rgba(240, 179, 90, 0.85);
            box-shadow: 0 0 0 3px rgba(240, 179, 90, 0.18);
          }

          .field-icon {
            font-size: 1rem;
            color: rgba(240, 179, 90, 0.8);
          }

          .input-wrapper input,
          .input-wrapper select {
            flex: 1;
            min-width: 0;
            background: transparent;
            border: none;
            outline: none;
            color: inherit;
            font: inherit;
            padding: 0;
          }

          .input-wrapper select {
            appearance: none;
            padding-right: 1.5rem;
          }

          .input-wrapper.select {
            position: relative;
          }

          .input-wrapper.select::after {
            content: '▾';
            position: absolute;
            right: 1rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.6);
            pointer-events: none;
          }

          .field-hint {
            font-size: 0.75rem;
            color: var(--dd-muted);
            margin-top: -0.1rem;
          }

          button.primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.65rem;
            padding: 1rem 1.5rem;
            border-radius: 14px;
            border: 1px solid rgba(240, 179, 90, 0.4);
            background: linear-gradient(120deg, #f8c06c, #f27d72, #b16dea);
            background-size: 200% 200%;
            color: #120a18;
            font-family: 'Cinzel', serif;
            font-size: 1.05rem;
            letter-spacing: 0.08em;
            cursor: pointer;
            transition: transform 150ms ease, background-position 250ms ease, box-shadow 200ms ease;
          }

          button.primary:hover {
            transform: translateY(-2px);
            background-position: 100% 50%;
            box-shadow: 0 12px 30px rgba(178, 112, 234, 0.35);
          }

          button.primary:focus-visible {
            outline: none;
            box-shadow: 0 0 0 3px rgba(240, 179, 90, 0.3);
          }

          .primary .cta-icon {
            font-size: 1rem;
            transition: transform 150ms ease;
          }

          button.primary:hover .cta-icon {
            transform: translateX(4px);
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
            <dd-combat-planner .data=${{ hero }}></dd-combat-planner>
            <dd-dice-workbench></dd-dice-workbench>
            <dd-downtime-planner .data=${{ hero }}></dd-downtime-planner>
            <dd-node-map .data=${mapNodes}></dd-node-map>
            <dd-quest-tracker .data=${quests}></dd-quest-tracker>
            <dd-journal-log .data=${journal}></dd-journal-log>
            <dd-dnd-compendium .data=${compendiumData}></dd-dnd-compendium>
          </aside>
        </div>
        <dd-toast-stack .data=${toasts}></dd-toast-stack>
        ${mode === 'creation'
          ? html`
              <div class="creation-overlay">
                <div class="creation-panel">
                  <h1>Dungeons & Dragons: Chronicles of the Lone Adventurer</h1>
                  <p>Create your lone hero to begin the saga.</p>
                  <div class="integration-status">
                    <div class="status-header">
                      <span class="status-badge ${integrationState}">
                        <span class="status-icon" aria-hidden="true"></span>
                        ${integrationLabel}
                      </span>
                      <span class="status-note" aria-live="polite">${integrationNote}</span>
                    </div>
                    <div class="status-metric">
                      <span class="metric">
                        <strong>${heroOptions.races.length}</strong>
                        <small>Races</small>
                      </span>
                      <span class="metric">
                        <strong>${heroOptions.classes.length}</strong>
                        <small>Classes</small>
                      </span>
                      <span class="metric">
                        <strong>${heroOptions.backgrounds.length}</strong>
                        <small>Backgrounds</small>
                      </span>
                    </div>
                    <p class="integration-hint">
                      To integrate additional material you have permission to use, drop JSON modules into
                      <code>public/modules</code> and they will load automatically on startup.
                    </p>
                  </div>
                  <div class="creation-content">
                    <form
                      @submit=${(event: Event) => this.handleHeroCreationSubmit(event)}
                      @input=${(event: Event) => this.handleHeroCreationInput(event)}
                      @change=${(event: Event) => this.handleHeroCreationInput(event)}
                    >
                      <div class="grid two">
                        <label class="field">
                          <span class="field-label">
                            Hero Name
                            <span class="field-meta ${heroNameIsDefault ? 'muted' : ''}">
                              ${heroNameIsDefault
                                ? 'Default title'
                                : `${heroNameCharacterCount}/${HERO_NAME_MAX_LENGTH}`}
                            </span>
                          </span>
                          <div class="input-wrapper">
                            <span class="field-icon" aria-hidden="true">✧</span>
                            <input
                              name="name"
                              placeholder="Aria Stormborn"
                              minlength="2"
                              maxlength=${HERO_NAME_MAX_LENGTH}
                              .value=${heroCreation.name}
                            />
                          </div>
                          <span class="field-hint">
                            ${heroNameIsDefault
                              ? 'Leave blank to begin as the Lone Adventurer.'
                              : 'Your chosen title will echo through tavern tales.'}
                          </span>
                        </label>
                        <label class="field">
                          <span class="field-label">
                            Portrait URL
                            <span class="field-meta ${portraitProvided ? 'accent' : 'muted'}">
                              ${portraitProvided ? 'Custom art' : 'Default art'}
                            </span>
                          </span>
                          <div class="input-wrapper">
                            <span class="field-icon" aria-hidden="true">🖼️</span>
                            <input
                              name="portrait"
                              placeholder="https://avatars.dicebear.com/api/adventurer/aria.svg"
                              inputmode="url"
                              .value=${heroCreation.portrait}
                            />
                          </div>
                          <span class="field-hint">
                            ${portraitProvided
                              ? 'Custom portrait ready—ensure the URL remains accessible.'
                              : 'Leave blank to conjure the illustrated default portrait.'}
                          </span>
                        </label>
                      </div>
                      <div class="grid two">
                        <label class="field">
                          <span class="field-label">
                            Race
                            <span class="field-meta ${selectedRace ? 'accent' : 'muted'}">
                              ${selectedRace?.name ?? 'Awaiting selection'}
                            </span>
                          </span>
                          <div class="input-wrapper select">
                            <span class="field-icon" aria-hidden="true">🧬</span>
                            <select name="race" .value=${heroCreation.raceId}>
                              ${heroOptions.races.length > 0
                                ? heroOptions.races.map(
                                    (race) => html`<option value=${race.id}>${race.name}</option>`,
                                  )
                                : html`<option value="" disabled>No races available</option>`}
                            </select>
                          </div>
                          <span class="field-hint">Choose your lineage to unlock innate bonuses.</span>
                        </label>
                        <label class="field">
                          <span class="field-label">
                            Class
                            <span class="field-meta ${selectedClass ? 'accent' : 'muted'}">
                              ${selectedClass?.name ?? 'Awaiting selection'}
                            </span>
                          </span>
                          <div class="input-wrapper select">
                            <span class="field-icon" aria-hidden="true">⚔️</span>
                            <select name="class" .value=${heroCreation.classId}>
                              ${heroOptions.classes.length > 0
                                ? heroOptions.classes.map(
                                    (heroClass) => html`<option value=${heroClass.id}>${heroClass.name}</option>`,
                                  )
                                : html`<option value="" disabled>No classes available</option>`}
                            </select>
                          </div>
                          <span class="field-hint">Select a calling to define combat style and proficiencies.</span>
                        </label>
                      </div>
                      <label class="field">
                        <span class="field-label">
                          Background
                          <span class="field-meta ${selectedBackground ? 'accent' : 'muted'}">
                            ${selectedBackground?.name ?? 'Awaiting selection'}
                          </span>
                        </span>
                        <div class="input-wrapper select">
                          <span class="field-icon" aria-hidden="true">📜</span>
                          <select name="background" .value=${heroCreation.backgroundId}>
                            ${heroOptions.backgrounds.length > 0
                              ? heroOptions.backgrounds.map(
                                  (background) => html`
                                    <option value=${background.id}>${background.name}</option>
                                  `,
                                )
                              : html`<option value="" disabled>No backgrounds available</option>`}
                          </select>
                        </div>
                        <span class="field-hint">Shape the history that informs your first steps.</span>
                      </label>
                      <button class="primary" type="submit">
                        <span>Begin the Chronicle</span>
                        <span class="cta-icon" aria-hidden="true">➜</span>
                      </button>
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
