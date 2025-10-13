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
  StartingLoadoutOption,
} from '../systems/types';
import { World, type ToastMessage } from '../systems/world';
import { SKILLS, type Ability, type CombatEncounter, type WorldState } from '../systems/types';
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
import { loadConfiguredModules } from '../systems/modules';

const INITIAL_HERO_OPTIONS: HeroOptionSnapshot = {
  races: listHeroRaces(),
  classes: listHeroClasses(),
  backgrounds: listHeroBackgrounds(),
};

type RenderChoice = StoryChoice & { disabled?: boolean };

type MapNode = DiscoveredNode & { isCurrent: boolean };

type AbilityGenerationMethod = 'standard-array' | 'rolled' | 'point-buy';

interface HeroCreationDraft {
  name: string;
  portrait: string;
  raceId: string;
  classId: string;
  backgroundId: string;
  abilityMethod: AbilityGenerationMethod;
  baseAbilities: Record<Ability, number>;
  rolledSet: number[];
  loadoutId: string | null;
  includeBackgroundKit: boolean;
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

const STANDARD_ARRAY_VALUES = [15, 14, 13, 12, 10, 8];
const POINT_BUY_BUDGET = 27;
const POINT_BUY_COST_BY_SCORE: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

const COMPENDIUM_CATEGORY_ORDER: Array<{ id: SrdCompendiumCategory; label: string }> = [
  { id: 'rules', label: 'Core Rules' },
  { id: 'rule-sections', label: 'Rule Sections' },
  { id: 'feats', label: 'Feats' },
  { id: 'equipment', label: 'Weapons & Equipment' },
  { id: 'magic-items', label: 'Magic Items' },
  { id: 'spells', label: 'Spells' },
];

function createDefaultAbilityMap(): Record<Ability, number> {
  return ATTRIBUTE_ORDER.reduce((acc, ability, index) => {
    acc[ability] = STANDARD_ARRAY_VALUES[index] ?? 10;
    return acc;
  }, {} as Record<Ability, number>);
}

function roll4d6DropLowest(): number {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => b - a);
  return rolls[0] + rolls[1] + rolls[2];
}

function generateRolledSet(): number[] {
  return Array.from({ length: ATTRIBUTE_ORDER.length }, () => roll4d6DropLowest()).sort((a, b) => b - a);
}

function normalizeAbilityMapByPool(
  requested: Record<Ability, number>,
  pool: number[],
): Record<Ability, number> {
  const available = [...pool].sort((a, b) => b - a);
  const normalized = {} as Record<Ability, number>;
  ATTRIBUTE_ORDER.forEach((ability) => {
    const desired = Math.round(requested[ability] ?? available[0] ?? 10);
    const index = available.indexOf(desired);
    if (index >= 0) {
      normalized[ability] = available.splice(index, 1)[0];
    } else {
      normalized[ability] = available.shift() ?? pool[pool.length - 1] ?? 10;
    }
  });
  return normalized;
}

function calculatePointBuyCost(map: Record<Ability, number>): number {
  return ATTRIBUTE_ORDER.reduce((total, ability) => {
    const score = Math.min(15, Math.max(8, Math.round(map[ability] ?? 8)));
    return total + (POINT_BUY_COST_BY_SCORE[score] ?? 0);
  }, 0);
}

function normalizePointBuyAbilities(requested: Record<Ability, number>): Record<Ability, number> {
  const normalized = {} as Record<Ability, number>;
  ATTRIBUTE_ORDER.forEach((ability) => {
    const value = Math.round(requested[ability] ?? 8);
    normalized[ability] = Math.min(15, Math.max(8, value));
  });

  let cost = calculatePointBuyCost(normalized);
  if (cost <= POINT_BUY_BUDGET) {
    return normalized;
  }

  while (cost > POINT_BUY_BUDGET) {
    const reducible = [...ATTRIBUTE_ORDER]
      .sort((a, b) => normalized[b] - normalized[a] || ATTRIBUTE_ORDER.indexOf(a) - ATTRIBUTE_ORDER.indexOf(b))
      .find((ability) => normalized[ability] > 8);
    if (!reducible) {
      break;
    }
    normalized[reducible] -= 1;
    cost = calculatePointBuyCost(normalized);
  }

  return normalized;
}

function calculatePointBuyRemaining(map: Record<Ability, number>): number {
  return POINT_BUY_BUDGET - calculatePointBuyCost(map);
}

function listClassLoadouts(heroClass?: HeroOptionSnapshot['classes'][number] | null): StartingLoadoutOption[] {
  if (!heroClass) {
    return [];
  }
  if (heroClass.loadouts && heroClass.loadouts.length > 0) {
    return heroClass.loadouts;
  }
  if (heroClass.startingItems && heroClass.startingItems.length > 0) {
    return [
      {
        id: `${heroClass.id}-default-loadout`,
        name: `${heroClass.name} Standard`,
        items: heroClass.startingItems,
      },
    ];
  }
  return [];
}

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

  const normalizedRaceId = draft.raceId || fallbackRace;
  const normalizedClassId = draft.classId || fallbackClass;
  const normalizedBackgroundId = draft.backgroundId || fallbackBackground;

  const abilityMethod: AbilityGenerationMethod = draft.abilityMethod ?? 'standard-array';
  const defaultAbilities = createDefaultAbilityMap();
  const requestedAbilities = ATTRIBUTE_ORDER.reduce((acc, ability) => {
    const value = draft.baseAbilities?.[ability];
    acc[ability] = typeof value === 'number' ? value : defaultAbilities[ability];
    return acc;
  }, {} as Record<Ability, number>);

  const existingRolls =
    draft.rolledSet && draft.rolledSet.length === ATTRIBUTE_ORDER.length
      ? [...draft.rolledSet]
      : generateRolledSet();

  let baseAbilities: Record<Ability, number>;
  let rolledSet = existingRolls;

  switch (abilityMethod) {
    case 'standard-array':
      baseAbilities = normalizeAbilityMapByPool(requestedAbilities, STANDARD_ARRAY_VALUES);
      break;
    case 'rolled':
      rolledSet = existingRolls.length === ATTRIBUTE_ORDER.length ? existingRolls : generateRolledSet();
      baseAbilities = normalizeAbilityMapByPool(requestedAbilities, rolledSet);
      break;
    case 'point-buy':
    default:
      baseAbilities = normalizePointBuyAbilities(requestedAbilities);
      break;
  }

  const heroClass = options.classes.find((entry) => entry.id === normalizedClassId);
  const classLoadouts = listClassLoadouts(heroClass);
  let loadoutId = draft.loadoutId ?? null;
  if (classLoadouts.length === 0) {
    loadoutId = null;
  } else if (!classLoadouts.some((entry) => entry.id === loadoutId)) {
    loadoutId = classLoadouts[0].id;
  }

  const background = options.backgrounds.find((entry) => entry.id === normalizedBackgroundId);
  const hasBackgroundKit = Boolean(background?.startingItems && background.startingItems.length > 0);
  const includeBackgroundKit = hasBackgroundKit ? draft.includeBackgroundKit !== false : false;

  return {
    name: trimmedName.length > 0 ? trimmedName : DEFAULT_HERO_NAME,
    portrait: trimmedPortrait.length > 0 ? trimmedPortrait : DEFAULT_HERO_PORTRAIT,
    raceId: normalizedRaceId,
    classId: normalizedClassId,
    backgroundId: normalizedBackgroundId,
    abilityMethod,
    baseAbilities,
    rolledSet,
    loadoutId,
    includeBackgroundKit,
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
  const initialClass = options.classes[0];
  const loadouts = listClassLoadouts(initialClass);
  const base: HeroCreationDraft = {
    name: DEFAULT_HERO_NAME,
    portrait: '',
    raceId: options.races[0]?.id ?? '',
    classId: initialClass?.id ?? '',
    backgroundId: options.backgrounds[0]?.id ?? '',
    abilityMethod: 'standard-array',
    baseAbilities: createDefaultAbilityMap(),
    rolledSet: generateRolledSet(),
    loadoutId: loadouts[0]?.id ?? null,
    includeBackgroundKit: Boolean(options.backgrounds[0]?.startingItems?.length),
  };
  const normalized = normalizeHeroCreation(base, options);
  return {
    ...normalized,
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

  private handleAbilityReroll(): void {
    const current = this.getHeroCreationDraft();
    this.commitHeroCreationDraft({
      ...current,
      abilityMethod: 'rolled',
      rolledSet: generateRolledSet(),
    });
  }

  private updateHeroCreationDraft(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const current = this.state.heroCreation;
    const baseAbilities = { ...current.baseAbilities };
    ATTRIBUTE_ORDER.forEach((ability) => {
      const value = formData.get(`ability-${ability}`);
      if (typeof value === 'string' && value.length > 0) {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) {
          baseAbilities[ability] = parsed;
        }
      }
    });

    const methodValue = formData.get('ability-method');
    const abilityMethod: AbilityGenerationMethod =
      methodValue === 'rolled' || methodValue === 'point-buy' || methodValue === 'standard-array'
        ? (methodValue as AbilityGenerationMethod)
        : current.abilityMethod;

    const includeBackgroundKit = formData.get('background-kit') === 'on';
    const loadoutEntry = formData.get('class-loadout');
    const loadoutId =
      typeof loadoutEntry === 'string' && loadoutEntry.length > 0
        ? loadoutEntry
        : current.loadoutId;

    const draft: HeroCreationDraft = {
      name: String(formData.get('name') ?? ''),
      portrait: String(formData.get('portrait') ?? ''),
      raceId: String(formData.get('race') ?? ''),
      classId: String(formData.get('class') ?? ''),
      backgroundId: String(formData.get('background') ?? ''),
      abilityMethod,
      baseAbilities,
      rolledSet: current.rolledSet,
      loadoutId,
      includeBackgroundKit,
    };
    this.commitHeroCreationDraft(draft);
  }

  private getNormalizedHeroCreation(): NormalizedHeroCreation {
    return normalizeHeroCreation(this.getHeroCreationDraft(), this.state.heroOptions);
  }

  private reconcileHeroCreation(
    current: HeroCreationState,
    options: HeroOptionSnapshot,
  ): HeroCreationState {
    const normalized = normalizeHeroCreation(this.stripHeroCreationPreview(current), options);
    return {
      ...normalized,
      preview: buildHeroPreview(normalized),
    };
  }

  private getHeroCreationDraft(): HeroCreationDraft {
    return this.stripHeroCreationPreview(this.state.heroCreation);
  }

  private stripHeroCreationPreview(state: HeroCreationState): HeroCreationDraft {
    const { preview, ...draft } = state;
    return draft;
  }

  private commitHeroCreationDraft(draft: HeroCreationDraft): void {
    const normalized = normalizeHeroCreation(draft, this.state.heroOptions);
    const preview = buildHeroPreview(normalized);
    this.state = {
      ...this.state,
      heroCreation: {
        ...normalized,
        preview,
      },
    };
    this.requestRender();
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
    const classLoadouts = listClassLoadouts(selectedClass);
    const selectedLoadout =
      classLoadouts.find((entry) => entry.id === normalizedCreation.loadoutId) ??
      classLoadouts[0] ??
      null;
    const backgroundLoadoutItems = normalizedCreation.includeBackgroundKit
      ? selectedBackground?.startingItems ?? []
      : [];
    const startingItemEntries = [
      ...(selectedLoadout?.items.map((item) => ({ item, source: 'class' as const })) ?? []),
      ...(backgroundLoadoutItems.map((item) => ({ item, source: 'background' as const })) ?? []),
    ];
    const pointBuyRemaining =
      normalizedCreation.abilityMethod === 'point-buy'
        ? calculatePointBuyRemaining(normalizedCreation.baseAbilities)
        : null;
    const compendiumData = {
      loading: compendiumLoading,
      error: compendiumError,
      categories: COMPENDIUM_CATEGORY_ORDER.map((entry) => ({
        id: entry.id,
        label: entry.label,
        entries: compendium[entry.id] ?? [],
      })),
    };
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
            background: rgba(32, 24, 44, 0.6);
            border: 1px solid rgba(255, 210, 164, 0.2);
            border-radius: 16px;
            padding: 1rem 1.25rem;
            margin-bottom: 1.5rem;
          }

          .integration-status p {
            margin: 0.25rem 0;
          }

          .integration-status code {
            background: rgba(8, 6, 12, 0.6);
            border-radius: 6px;
            padding: 0.1rem 0.4rem;
            font-size: 0.85rem;
          }

          .status {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 600;
          }

          .status::before {
            content: '';
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            display: inline-block;
          }

          .status.loading::before {
            background: #f0b35a;
            animation: pulse 1.6s ease-in-out infinite;
          }

          .status.ready::before {
            background: #7be7a5;
          }

          .status.error::before {
            background: #f27d72;
          }

          @keyframes pulse {
            0% {
              opacity: 0.4;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0.4;
            }
          }

          .integration-hint {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
          }

          .grid {
            display: grid;
            gap: 1rem;
          }

          .grid.two {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .field-group {
            display: grid;
            gap: 0.75rem;
          }

          .ability-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.75rem;
          }

          .ability-control {
            padding: 0.9rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(24, 18, 36, 0.75);
            display: grid;
            gap: 0.45rem;
          }

          .ability-control label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
          }

          .ability-control input,
          .ability-control select {
            width: 100%;
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

          button.secondary {
            padding: 0.65rem 1rem;
            border-radius: 10px;
            border: 1px solid rgba(126, 196, 255, 0.45);
            background: rgba(50, 90, 140, 0.35);
            color: rgba(198, 223, 255, 0.95);
            letter-spacing: 0.04em;
            cursor: pointer;
          }

          button.secondary:hover {
            background: rgba(50, 90, 140, 0.5);
          }

          .roll-controls {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            color: var(--dd-muted);
          }

          .roll-values {
            font-family: 'IBM Plex Mono', monospace;
            letter-spacing: 0.08em;
          }

          .loadout-items {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.5rem;
          }

          .loadout-items li {
            background: rgba(18, 14, 28, 0.7);
            border: 1px solid rgba(255, 210, 164, 0.15);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            display: grid;
            gap: 0.25rem;
          }

          .loadout-items strong {
            font-size: 0.9rem;
          }

          .loadout-items span {
            font-size: 0.8rem;
            color: var(--dd-muted);
          }

          .background-kit {
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 16px;
            padding: 1rem 1.25rem;
            display: grid;
            gap: 0.75rem;
            background: rgba(24, 18, 36, 0.6);
          }

          .background-kit legend {
            font-family: 'Cinzel', serif;
            font-size: 0.9rem;
            letter-spacing: 0.08em;
            padding: 0 0.25rem;
          }

          .toggle {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
          }

          .toggle input {
            accent-color: #f0b35a;
          }

          .field-hint strong {
            color: #f0b35a;
            font-weight: 600;
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

          .starting-kit .item-source {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(126, 196, 255, 0.8);
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
                    <p>
                      Available SRD options:
                      <strong>${heroOptions.races.length}</strong> races ·
                      <strong>${heroOptions.classes.length}</strong> classes ·
                      <strong>${heroOptions.backgrounds.length}</strong> backgrounds
                    </p>
                    ${heroOptionsLoading
                      ? html`<span class="status loading">Loading D&D 5e SRD content…</span>`
                      : heroOptionsError
                          ? html`<span class="status error">SRD sync failed: ${heroOptionsError}</span>`
                          : html`<span class="status ready">SRD content synchronized.</span>`}
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
                            ${heroOptions.races.length > 0
                              ? heroOptions.races.map(
                                  (race) => html`<option value=${race.id}>${race.name}</option>`,
                                )
                              : html`<option value="" disabled>No races available</option>`}
                          </select>
                        </label>
                        <label>
                          Class
                          <select name="class" .value=${heroCreation.classId}>
                            ${heroOptions.classes.length > 0
                              ? heroOptions.classes.map(
                                  (heroClass) => html`<option value=${heroClass.id}>${heroClass.name}</option>`,
                                )
                              : html`<option value="" disabled>No classes available</option>`}
                          </select>
                        </label>
                      </div>
                      <label>
                        Background
                        <select name="background" .value=${heroCreation.backgroundId}>
                          ${heroOptions.backgrounds.length > 0
                            ? heroOptions.backgrounds.map(
                                (background) => html`
                                  <option value=${background.id}>${background.name}</option>
                                `,
                              )
                            : html`<option value="" disabled>No backgrounds available</option>`}
                        </select>
                      </label>
                      <div class="field-group">
                        <label>
                          Ability Generation
                          <select name="ability-method" .value=${normalizedCreation.abilityMethod}>
                            <option value="standard-array">Standard Array (15, 14, 13, 12, 10, 8)</option>
                            <option value="rolled">4d6 Drop Lowest</option>
                            <option value="point-buy">Point Buy (27 points)</option>
                          </select>
                        </label>
                        ${normalizedCreation.abilityMethod === 'rolled'
                          ? html`<div class="roll-controls">
                              <button
                                type="button"
                                class="secondary"
                                @click=${() => this.handleAbilityReroll()}
                              >
                                Roll Ability Scores
                              </button>
                              <span class="roll-values">Current roll: ${normalizedCreation.rolledSet.join(', ')}</span>
                            </div>`
                          : normalizedCreation.abilityMethod === 'standard-array'
                              ? html`<span class="field-hint">
                                  Assign each value from the array once across your abilities.
                                </span>`
                              : html`<span class="field-hint">
                                  Allocate your scores between 8 and 15. Points remaining:
                                  <strong>${pointBuyRemaining ?? 0}</strong>.
                                </span>`}
                      </div>
                      <div class="ability-grid">
                        ${ATTRIBUTE_ORDER.map((ability) => {
                          const abilityValue = normalizedCreation.baseAbilities[ability];
                          const controlId = `ability-${ability}`;
                          return html`
                            <div class="ability-control">
                              <label for=${controlId}>${this.formatAbilityLabel(ability)}</label>
                              ${normalizedCreation.abilityMethod === 'point-buy'
                                ? html`<input
                                    id=${controlId}
                                    type="number"
                                    min="8"
                                    max="15"
                                    step="1"
                                    name=${`ability-${ability}`}
                                    .value=${String(abilityValue)}
                                  />`
                                : html`<select
                                    id=${controlId}
                                    name=${`ability-${ability}`}
                                    .value=${String(abilityValue)}
                                  >
                                    ${(
                                      normalizedCreation.abilityMethod === 'standard-array'
                                        ? STANDARD_ARRAY_VALUES
                                        : normalizedCreation.rolledSet
                                    ).map(
                                      (value) => html`<option value=${value}>${value}</option>`,
                                    )}
                                  </select>`}
                            </div>
                          `;
                        })}
                      </div>
                      <div class="field-group">
                        <label>
                          Class Loadout
                          <select
                            name="class-loadout"
                            .value=${selectedLoadout?.id ?? ''}
                            ?disabled=${classLoadouts.length === 0}
                          >
                            ${classLoadouts.length > 0
                              ? classLoadouts.map(
                                  (loadout) => html`<option value=${loadout.id}>${loadout.name}</option>`,
                                )
                              : html`<option value="" disabled>No loadouts available</option>`}
                          </select>
                        </label>
                        ${selectedLoadout?.description
                          ? html`<span class="field-hint">${selectedLoadout.description}</span>`
                          : null}
                        ${selectedLoadout && selectedLoadout.items.length > 0
                          ? html`<ul class="loadout-items">
                              ${selectedLoadout.items.map(
                                (item) => html`<li>
                                  <strong>${item.name}</strong>
                                  <span>${item.description}</span>
                                </li>`,
                              )}
                            </ul>`
                          : classLoadouts.length === 0
                              ? html`<span class="field-hint">
                                  Choose a different class to access alternate starting kits.
                                </span>`
                              : html`<span class="field-hint">This loadout begins without gear.</span>`}
                      </div>
                      ${selectedBackground?.startingItems && selectedBackground.startingItems.length > 0
                        ? html`<fieldset class="background-kit">
                            <legend>Background Equipment</legend>
                            <label class="toggle">
                              <input
                                type="checkbox"
                                name="background-kit"
                                ?checked=${normalizedCreation.includeBackgroundKit}
                              />
                              <span>Include ${selectedBackground.name} kit</span>
                            </label>
                            <ul class="loadout-items">
                              ${selectedBackground.startingItems.map(
                                (item) => html`<li>
                                  <strong>${item.name}</strong>
                                  <span>${item.description}</span>
                                </li>`,
                              )}
                            </ul>
                          </fieldset>`
                        : null}
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
                                ${startingItemEntries.length > 0
                                  ? html`<ul class="starting-kit">
                                      ${startingItemEntries.map(({ item, source }) => {
                                        const sourceLabel =
                                          source === 'class'
                                            ? selectedClass?.name ?? 'Class'
                                            : selectedBackground?.name ?? 'Background';
                                        return html`
                                          <li>
                                            <div class="item-header">
                                              <strong>${item.name}</strong>
                                              <span class="item-type">
                                                ${(item.type.charAt(0).toUpperCase() + item.type.slice(1)).replace(
                                                  /-/g,
                                                  ' ',
                                                )}
                                              </span>
                                              <span class="item-source">${sourceLabel}</span>
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
                                        `;
                                      })}
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
