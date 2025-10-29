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
  DowntimeTask,
  DowntimeTaskEventDetail,
  DowntimeTaskEventType,
  DowntimeUpdate,
  DowntimeFocus,
  DowntimeRisk,
  DowntimeBuff,
} from '../systems/types';
import { World, type ToastMessage } from '../systems/world';
import {
  SKILLS,
  type CombatEncounter,
  type WorldState,
  type Ability,
  type HeroBackgroundOption,
  type HeroClassOption,
  type AbilityGenerationMethod,
} from '../systems/types';
import { CombatSession, type CombatSnapshot, type CombatAction } from '../systems/combat';
import { AudioManager } from '../systems/audio';
import {
  ABILITY_ORDER,
  createAbilityAssignments,
  assignAbilityFromPool,
  adjustPointBuy,
  calculatePointBuyRemaining,
  clampAssignmentsToPool,
} from '../systems/abilities';

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
import './arcane-storyteller';
import { loadConfiguredModules } from '../systems/modules';
import { createAbortController, getAbortSignal } from '../systems/abort-controller';
import type { ArcaneStorytellerPanelState } from './arcane-storyteller';

const INITIAL_HERO_OPTIONS: HeroOptionSnapshot = {
  races: listHeroRaces(),
  classes: listHeroClasses(),
  backgrounds: listHeroBackgrounds(),
};

type SkillCheckMeta = {
  modifier: number;
  successChance: number;
  successPercent: number;
  accessibilityLabel: string;
};

type RenderChoice = StoryChoice & { disabled?: boolean; skillCheckMeta?: SkillCheckMeta };

type MapNode = DiscoveredNode & { isCurrent: boolean };

type DowntimeFactionAdjustment = NonNullable<DowntimeUpdate['factionAdjustments']>[number];

interface HeroCreationAbilities {
  method: AbilityGenerationMethod;
  assignments: Record<Ability, number>;
  pool: number[];
  remainingPoints: number;
  rerollsRemaining: number;
}

interface HeroCreationDraft {
  name: string;
  portrait: string;
  raceId: string;
  classId: string;
  backgroundId: string;
  abilities: HeroCreationAbilities;
  classLoadoutId: string | null;
  backgroundEquipmentIds: string[];
}

interface NormalizedHeroCreation {
  name: string;
  portrait: string;
  raceId: string;
  classId: string;
  backgroundId: string;
  baseAttributes: Record<Ability, number>;
  classLoadoutId: string | null;
  backgroundEquipmentIds: string[];
}

interface HeroCreationState extends HeroCreationDraft {
  preview: Hero | null;
}

interface ArcaneImproviseEventDetail {
  prompt: string;
  requestId: string;
}

interface ArcaneCancelEventDetail {
  requestId: string;
}

const DEFAULT_HERO_NAME = 'Lone Adventurer';
const DEFAULT_HERO_PORTRAIT =
  'https://api.dicebear.com/7.x/adventurer/svg?seed=chronicles';
const HERO_NAME_MAX_LENGTH = 40;
const ATTRIBUTE_ORDER: Array<keyof Hero['attributes']> = [...ABILITY_ORDER];
const MAX_ABILITY_REROLLS = 2;
const DEFAULT_BASE_ABILITY_SCORE = 10;
const ABILITY_METHOD_OPTIONS: Array<{
  id: AbilityGenerationMethod;
  label: string;
  description: string;
}> = [
  {
    id: 'standard-array',
    label: 'Standard Array',
    description: 'Balanced heroic scores (15, 14, 13, 12, 10, 8).',
  },
  {
    id: 'rolled',
    label: '4d6 Drop Lowest',
    description: 'Roll six ability scores and drop the lowest die (reroll up to two times).',
  },
  {
    id: 'point-buy',
    label: 'Point Buy',
    description: 'Spend 27 points to customize each score between 8 and 15.',
  },
];

const COMPENDIUM_CATEGORY_ORDER: Array<{ id: SrdCompendiumCategory; label: string }> = [
  { id: 'rules', label: 'Core Rules' },
  { id: 'rule-sections', label: 'Rule Sections' },
  { id: 'feats', label: 'Feats' },
  { id: 'equipment', label: 'Weapons & Equipment' },
  { id: 'magic-items', label: 'Magic Items' },
  { id: 'spells', label: 'Spells' },
];

const DEFAULT_STORYTELLER_STATE: ArcaneStorytellerPanelState = {
  busy: false,
  status: 'Summon the oracle to weave fresh scenes.',
  error: null,
  origin: null,
  requestId: null,
};

function createEmptyCompendiumIndex(): Record<SrdCompendiumCategory, SrdCompendiumEntrySummary[]> {
  return COMPENDIUM_CATEGORY_ORDER.reduce(
    (acc, entry) => {
      acc[entry.id] = [];
      return acc;
    },
    {} as Record<SrdCompendiumCategory, SrdCompendiumEntrySummary[]>,
  );
}

function calculateSkillCheckSuccessChance(difficultyClass: number, modifier: number): number {
  const requiredRoll = difficultyClass - modifier;
  if (requiredRoll <= 1) {
    return 1;
  }
  const minimumRoll = Math.ceil(requiredRoll);
  if (minimumRoll > 20) {
    return 1 / 20;
  }
  const successfulOutcomes = 21 - minimumRoll;
  return Math.max(0, Math.min(1, successfulOutcomes / 20));
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

  const raceId = options.races.some((entry) => entry.id === draft.raceId) ? draft.raceId : fallbackRace;
  const classId = options.classes.some((entry) => entry.id === draft.classId) ? draft.classId : fallbackClass;
  const backgroundId = options.backgrounds.some((entry) => entry.id === draft.backgroundId)
    ? draft.backgroundId
    : fallbackBackground;

  const selectedClass = options.classes.find((entry) => entry.id === classId);
  const classLoadouts = selectedClass?.loadouts ?? [];
  const normalizedLoadoutId = classLoadouts.length
    ? (classLoadouts.find((entry) => entry.id === draft.classLoadoutId)?.id ??
        classLoadouts.find((entry) => entry.defaultSelected)?.id ??
        classLoadouts[0]?.id ??
        null)
    : null;

  const selectedBackground = options.backgrounds.find((entry) => entry.id === backgroundId);
  const backgroundEquipment = selectedBackground?.equipment ?? [];
  let backgroundEquipmentIds = (draft.backgroundEquipmentIds ?? []).filter((id) =>
    backgroundEquipment.some((entry) => entry.id === id),
  );
  if (backgroundEquipmentIds.length === 0) {
    backgroundEquipmentIds = backgroundEquipment.filter((entry) => entry.defaultSelected).map((entry) => entry.id);
  }

  const baseAttributes: Record<Ability, number> = { ...draft.abilities.assignments };
  ATTRIBUTE_ORDER.forEach((ability) => {
    const score = baseAttributes[ability] ?? DEFAULT_BASE_ABILITY_SCORE;
    baseAttributes[ability] = Number.isFinite(score) ? score : DEFAULT_BASE_ABILITY_SCORE;
  });

  return {
    name: trimmedName.length > 0 ? trimmedName : DEFAULT_HERO_NAME,
    portrait: trimmedPortrait.length > 0 ? trimmedPortrait : DEFAULT_HERO_PORTRAIT,
    raceId,
    classId,
    backgroundId,
    baseAttributes,
    classLoadoutId: normalizedLoadoutId,
    backgroundEquipmentIds,
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
  const defaultClass = options.classes[0];
  const defaultBackground = options.backgrounds[0];
  const abilityState = createAbilityAssignments('standard-array', ABILITY_ORDER);
  const base: HeroCreationDraft = {
    name: DEFAULT_HERO_NAME,
    portrait: '',
    raceId: options.races[0]?.id ?? '',
    classId: options.classes[0]?.id ?? '',
    backgroundId: options.backgrounds[0]?.id ?? '',
    abilities: {
      method: 'standard-array',
      assignments: { ...abilityState.assignments },
      pool: [...abilityState.pool],
      remainingPoints: abilityState.remainingPoints,
      rerollsRemaining: MAX_ABILITY_REROLLS,
    },
    classLoadoutId:
      defaultClass?.loadouts?.find((entry) => entry.defaultSelected)?.id ??
      defaultClass?.loadouts?.[0]?.id ??
      null,
    backgroundEquipmentIds:
      defaultBackground?.equipment
        ?.filter((entry) => entry.defaultSelected)
        .map((entry) => entry.id) ?? [],
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
  storyteller: ArcaneStorytellerPanelState;
  activePanel: 'story' | 'hero' | 'tools' | 'lore';
  quickActionsLocked: boolean;
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
    storyteller: { ...DEFAULT_STORYTELLER_STATE },
    activePanel: 'story',
    quickActionsLocked: false,
  };

  private combatSession: CombatSession | null = null;
  private heroOptionsUnsubscribe: (() => void) | null = null;
  private srdAbortController: AbortController | null = null;
  private moduleAbortController: AbortController | null = null;
  private compendiumAbortController: AbortController | null = null;
  private storytellerAbortController: AbortController | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleChoiceSelected = this.handleChoiceSelected.bind(this);
    this.handleCombatAction = this.handleCombatAction.bind(this);
    this.handleArcaneImprovise = this.handleArcaneImprovise.bind(this);
    this.handleArcaneCancel = this.handleArcaneCancel.bind(this);
    this.handleDowntimeTaskCreated = this.handleDowntimeTaskCreated.bind(this);
    this.handleDowntimeTaskProgressed = this.handleDowntimeTaskProgressed.bind(this);
    this.handleDowntimeTaskCompleted = this.handleDowntimeTaskCompleted.bind(this);
    this.handleInventoryUse = this.handleInventoryUse.bind(this);
    this.handleStoryTypingStart = this.handleStoryTypingStart.bind(this);
    this.handleStoryTypingComplete = this.handleStoryTypingComplete.bind(this);
    this.handleTabActivate = this.handleTabActivate.bind(this);

    // Render immediately so the shell is visible before async data loads.
    this.requestRender();
  }

  connectedCallback(): void {
    this.addEventListener('choice-selected', this.handleChoiceSelected as EventListener);
    this.addEventListener('combat-action', this.handleCombatAction as EventListener);
    this.addEventListener('arcane-improvise', this.handleArcaneImprovise as EventListener);
    this.addEventListener('arcane-cancel', this.handleArcaneCancel as EventListener);
    this.addEventListener('downtime-task-created', this.handleDowntimeTaskCreated as EventListener);
    this.addEventListener(
      'downtime-task-progressed',
      this.handleDowntimeTaskProgressed as EventListener,
    );
    this.addEventListener('downtime-task-completed', this.handleDowntimeTaskCompleted as EventListener);
    this.addEventListener('inventory-use', this.handleInventoryUse as EventListener);
    this.addEventListener('story-typing-start', this.handleStoryTypingStart as EventListener);
    this.addEventListener('story-typing-complete', this.handleStoryTypingComplete as EventListener);
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
      const previousNode = this.state.node;
      const nodeIdChanged = (node?.id ?? null) !== (previousNode?.id ?? null);
      const narrativeChanged =
        nodeIdChanged ||
        (node && previousNode ? node.body.join('\u0000') !== previousNode.body.join('\u0000') : false);
      const quickActionsLocked = node
        ? narrativeChanged
          ? this.shouldLockForNode(node)
          : this.state.quickActionsLocked
        : false;
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
        storyteller: detail.hero ? this.state.storyteller : { ...DEFAULT_STORYTELLER_STATE },
        quickActionsLocked,
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
    this.removeEventListener('arcane-improvise', this.handleArcaneImprovise as EventListener);
    this.removeEventListener('arcane-cancel', this.handleArcaneCancel as EventListener);
    this.removeEventListener('downtime-task-created', this.handleDowntimeTaskCreated as EventListener);
    this.removeEventListener(
      'downtime-task-progressed',
      this.handleDowntimeTaskProgressed as EventListener,
    );
    this.removeEventListener('downtime-task-completed', this.handleDowntimeTaskCompleted as EventListener);
    this.removeEventListener('inventory-use', this.handleInventoryUse as EventListener);
    this.removeEventListener('story-typing-start', this.handleStoryTypingStart as EventListener);
    this.removeEventListener('story-typing-complete', this.handleStoryTypingComplete as EventListener);
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
    if (this.storytellerAbortController) {
      this.storytellerAbortController.abort();
      this.storytellerAbortController = null;
    }
    this.audio.dispose();
  }

  private handleChoiceSelected(event: CustomEvent<{ choice: StoryChoice }>): void {
    event.stopPropagation();
    const { choice } = event.detail;
    if (this.state.quickActionsLocked) return;
    if ((choice as RenderChoice).disabled) return;
    this.world.applyChoice(choice);
    this.deferPanelScroll('story');
  }

  private handleTabActivate(event: Event, panel: RootState['activePanel']): void {
    event.preventDefault();
    this.setActivePanel(panel);
    this.deferPanelScroll(panel);
  }

  private handleStoryTypingStart(event: CustomEvent<{ locked?: boolean }>): void {
    event.stopPropagation();
    const shouldLock = event.detail?.locked ?? true;
    if (this.state.quickActionsLocked === shouldLock) {
      return;
    }
    this.state = { ...this.state, quickActionsLocked: shouldLock };
    this.requestRender();
  }

  private handleStoryTypingComplete(event: Event): void {
    event.stopPropagation();
    if (!this.state.quickActionsLocked) {
      return;
    }
    this.state = { ...this.state, quickActionsLocked: false };
    this.requestRender();
  }

  private deferPanelScroll(panelId?: RootState['activePanel']): void {
    const targetPanel = panelId ?? this.state.activePanel;
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this.scrollPanelToTop(targetPanel));
    } else {
      this.scrollPanelToTop(targetPanel);
    }
  }

  private scrollPanelToTop(panelId?: RootState['activePanel']): void {
    if (!this.shadowRoot) return;
    const scrollContainer = this.shadowRoot.querySelector('.panel-scroll');
    if (!(scrollContainer instanceof HTMLElement)) return;
    if (panelId) {
      const panel = scrollContainer.querySelector(`#panel-${panelId}`);
      if (panel instanceof HTMLElement) {
        scrollContainer.scrollTo({ top: panel.offsetTop, behavior: 'smooth' });
        return;
      }
    }
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private handleCombatAction(event: CustomEvent<{ action: CombatAction; itemId?: string }>): void {
    event.stopPropagation();
    if (!this.combatSession || !this.state.combat.encounter) return;
    const snapshot = this.combatSession.perform(event.detail.action, event.detail.itemId);
    this.state = {
      ...this.state,
      combat: {
        encounter: this.state.combat.encounter,
        snapshot,
      },
    };
    if (snapshot.status !== 'ongoing') {
      const heroOutcome = this.combatSession.getHeroOutcome();
      if (snapshot.status === 'victory') {
        this.world.concludeCombat('victory', this.state.combat.encounter, heroOutcome);
      } else if (snapshot.status === 'defeat') {
        this.world.concludeCombat('defeat', this.state.combat.encounter, heroOutcome);
      } else if (snapshot.status === 'fled') {
        this.world.concludeCombat('flee', this.state.combat.encounter, heroOutcome);
      }
    }
    this.requestRender();
  }

  private handleInventoryUse(event: CustomEvent<{ itemId: string }>): void {
    event.stopPropagation();
    const { itemId } = event.detail ?? {};
    if (!itemId) return;
    this.world.consumeItem(itemId);
  }

  private async handleArcaneImprovise(event: CustomEvent<ArcaneImproviseEventDetail>): Promise<void> {
    event.stopPropagation();
    const { prompt, requestId } = event.detail;
    if (!prompt) return;
    const abortController = createAbortController();
    const signal = getAbortSignal(abortController);
    if (this.storytellerAbortController) {
      this.storytellerAbortController.abort();
    }
    this.storytellerAbortController = abortController;
    this.state = {
      ...this.state,
      storyteller: {
        busy: true,
        status: 'Conjuring an unpredictable narrative thread…',
        error: null,
        origin: null,
        requestId,
      },
    };
    this.requestRender();

    try {
      const updateStatus = (status: string) => {
        if (signal?.aborted) return;
        this.state = {
          ...this.state,
          storyteller: {
            ...this.state.storyteller,
            busy: true,
            status,
            error: null,
            origin: null,
            requestId,
          },
        };
        this.requestRender();
      };
      const result = await this.world.improviseNarrative(prompt, {
        signal,
        onStatus: updateStatus,
      });
      const originLabel = result.origin === 'oracle-llm'
        ? 'A remote oracle inscribed this scene.'
        : 'The offline oracle spun this tale.';
      this.state = {
        ...this.state,
        storyteller: {
          busy: false,
          status: originLabel,
          error: null,
          origin: result.origin,
          requestId: null,
        },
      };
      this.pushToast({
        id: `oracle-${Date.now()}`,
        title: 'Arcane Storyteller',
        body: originLabel,
        tone: 'info',
      });
    } catch (error) {
      const aborted = signal?.aborted ?? false;
      this.state = {
        ...this.state,
        storyteller: {
          busy: false,
          status: aborted ? 'Summoning cancelled.' : 'Summoning failed.',
          error: aborted
            ? null
            : error instanceof Error
              ? error.message
              : 'An unknown disturbance silenced the oracle.',
          origin: null,
          requestId: null,
        },
      };
    } finally {
      if (this.storytellerAbortController === abortController) {
        this.storytellerAbortController = null;
      }
      this.requestRender();
    }
  }

  private handleArcaneCancel(event: CustomEvent<ArcaneCancelEventDetail>): void {
    event.stopPropagation();
    if (this.storytellerAbortController) {
      this.storytellerAbortController.abort();
    }
  }

  private handleDowntimeTaskCreated(event: CustomEvent<DowntimeTaskEventDetail>): void {
    event.stopPropagation();
    const update = this.buildDowntimeUpdate('created', event.detail);
    this.world.applyDowntimeUpdate(update);
  }

  private handleDowntimeTaskProgressed(event: CustomEvent<DowntimeTaskEventDetail>): void {
    event.stopPropagation();
    const update = this.buildDowntimeUpdate('progressed', event.detail);
    this.world.applyDowntimeUpdate(update);
  }

  private handleDowntimeTaskCompleted(event: CustomEvent<DowntimeTaskEventDetail>): void {
    event.stopPropagation();
    const update = this.buildDowntimeUpdate('completed', event.detail);
    this.world.applyDowntimeUpdate(update);
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

  private buildDowntimeUpdate(
    eventType: DowntimeTaskEventType,
    detail: DowntimeTaskEventDetail,
  ): DowntimeUpdate {
    const heroName = this.state.hero?.name ?? 'The lone adventurer';
    const previousProgress =
      typeof detail.previousProgress === 'number' && Number.isFinite(detail.previousProgress)
        ? detail.previousProgress
        : 0;
    const progressDelta = detail.task.progress - previousProgress;
    const update: DowntimeUpdate = {
      eventType,
      task: detail.task,
    };

    switch (eventType) {
      case 'created':
        update.journalEntry = `${heroName} charts downtime: ${detail.task.title} (${detail.task.focus}).`;
        break;
      case 'progressed': {
        update.journalEntry =
          progressDelta > 0
            ? `${heroName} advances ${detail.task.title} to ${detail.task.progress}% completion.`
            : `${heroName} revisits ${detail.task.title}.`;
        const adjustment = this.deriveFactionAdjustment(detail.task, eventType, previousProgress);
        if (adjustment) {
          update.factionAdjustments = [adjustment];
        }
        if (detail.previouslyCompleted && !detail.task.completed) {
          update.buff = null;
        }
        break;
      }
      case 'completed': {
        update.journalEntry = `${heroName} completes ${detail.task.title}, ready to leverage the results.`;
        const adjustment = this.deriveFactionAdjustment(detail.task, eventType, previousProgress);
        if (adjustment) {
          update.factionAdjustments = [adjustment];
        }
        update.buff = this.createDowntimeBuff(detail.task);
        break;
      }
      default:
        break;
    }

    return update;
  }

  private deriveFactionAdjustment(
    task: DowntimeTask,
    eventType: DowntimeTaskEventType,
    previousProgress?: number,
  ): DowntimeFactionAdjustment | null {
    const factionId = this.getDowntimeFaction(task);
    if (!factionId) return null;
    const intensity = this.getRiskIntensity(task.risk);
    const prior = Math.max(0, previousProgress ?? 0);
    const progressDelta = task.progress - prior;
    let delta = 0;

    if (eventType === 'progressed') {
      const milestoneReached = prior < 50 && task.progress >= 50;
      if (milestoneReached) {
        delta = Math.max(1, intensity - 1);
      } else if (progressDelta >= 15) {
        delta = 1;
      }
    } else if (eventType === 'completed') {
      delta = Math.max(1, intensity);
      if (task.risk === 'high') {
        delta += 1;
      }
    }

    if (delta <= 0) return null;

    const factionName = this.getFactionName(factionId);
    const reason =
      eventType === 'completed'
        ? `${task.title} completed, impressing the ${factionName}.`
        : `${task.title} progress earned favor with the ${factionName}.`;

    return { factionId, delta, reason };
  }

  private getDowntimeFaction(task: DowntimeTask): string | null {
    const mapping: Record<DowntimeFocus, string | null> = {
      Training: 'town-guard',
      Crafting: 'black-guild',
      Research: 'circle',
      Social: 'town-guard',
      Exploration: 'circle',
    };
    return mapping[task.focus] ?? null;
  }

  private getRiskIntensity(risk: DowntimeRisk): number {
    switch (risk) {
      case 'high':
        return 3;
      case 'moderate':
        return 2;
      default:
        return 1;
    }
  }

  private getFactionName(factionId: string): string {
    const faction = this.state.factions.find((entry) => entry.id === factionId);
    if (faction) {
      return faction.name;
    }
    const snapshot = this.world.snapshot.factions[factionId];
    return snapshot?.name ?? factionId;
  }

  private createDowntimeBuff(task: DowntimeTask): DowntimeBuff {
    const now = Date.now();
    const durationMs = Math.max(1, Math.round(task.days)) * 24 * 60 * 60 * 1000;
    const { label, description } = this.describeDowntimeBuff(task);
    return {
      id: `downtime-buff-${task.id}`,
      sourceTaskId: task.id,
      focus: task.focus,
      label,
      description,
      magnitude: this.getRiskIntensity(task.risk),
      createdAt: now,
      expiresAt: now + durationMs,
    };
  }

  private describeDowntimeBuff(task: DowntimeTask): { label: string; description: string } {
    switch (task.focus) {
      case 'Training':
        return {
          label: 'Sharpened Instincts',
          description: `Drills from “${task.title}” keep reactions honed for the next encounter.`,
        };
      case 'Crafting':
        return {
          label: 'Masterwork Momentum',
          description: `Fresh creations from “${task.title}” inspire inventive battlefield solutions.`,
        };
      case 'Research':
        return {
          label: 'Arcane Insight',
          description: `Revelations from “${task.title}” illuminate esoteric threats ahead.`,
        };
      case 'Social':
        return {
          label: 'Trusted Contacts',
          description: `Allies rallied during “${task.title}” are ready to lend timely aid.`,
        };
      case 'Exploration':
        return {
          label: 'Trailblazer’s Edge',
          description: `Field notes from “${task.title}” sharpen awareness on the road.`,
        };
      default:
        return {
          label: 'Steady Resolve',
          description: `Time invested in “${task.title}” leaves the adventurer calm and prepared.`,
        };
    }
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
      .map((choice) => {
        const disabled = choice.requirements ? !this.world.checkConditions(choice.requirements) : false;
        let skillCheckMeta: SkillCheckMeta | undefined;
        if (choice.skillCheck) {
          const modifier = this.world.getModifier(
            choice.skillCheck.ability,
            choice.skillCheck.skill,
          );
          const successChance = calculateSkillCheckSuccessChance(
            choice.skillCheck.difficultyClass,
            modifier,
          );
          const successPercent = Math.round(successChance * 100);
          const label = this.describeSkillCheckLabel(
            choice.skillCheck.ability,
            choice.skillCheck.skill,
          );
          skillCheckMeta = {
            modifier,
            successChance,
            successPercent,
            accessibilityLabel: `Estimated ${successPercent}% chance of success on a ${label} check`,
          };
        }
        return {
          ...choice,
          disabled,
          skillCheckMeta,
        };
      });
  }

  private shouldLockForNode(node: StoryNode | null): boolean {
    if (!node) return false;
    return node.body.some((paragraph) => paragraph.trim().length > 0);
  }

  private handleHeroCreationInput(event: Event): void {
    const form = event.currentTarget as HTMLFormElement | null;
    if (!form) return;
    const target = event.target as HTMLElement | null;
    if (target instanceof HTMLSelectElement && target.dataset.abilitySelect) {
      event.stopPropagation();
      const ability = target.dataset.abilitySelect as Ability;
      const value = Number(target.value);
      if (Number.isFinite(value)) {
        this.handleAbilitySelect(ability, value);
      }
      return;
    }
    this.updateHeroCreationDraft(form);
  }

  private cloneHeroCreationDraft(): HeroCreationDraft {
    const current = this.state.heroCreation;
    return {
      name: current.name,
      portrait: current.portrait,
      raceId: current.raceId,
      classId: current.classId,
      backgroundId: current.backgroundId,
      abilities: {
        method: current.abilities.method,
        assignments: { ...current.abilities.assignments },
        pool: [...current.abilities.pool],
        remainingPoints: current.abilities.remainingPoints,
        rerollsRemaining: current.abilities.rerollsRemaining,
      },
      classLoadoutId: current.classLoadoutId,
      backgroundEquipmentIds: [...current.backgroundEquipmentIds],
    };
  }

  private commitHeroCreationDraft(draft: HeroCreationDraft): void {
    const normalized = normalizeHeroCreation(draft, this.state.heroOptions);
    const preview = buildHeroPreview(normalized);
    this.state = {
      ...this.state,
      heroCreation: {
        ...draft,
        classLoadoutId: normalized.classLoadoutId,
        backgroundEquipmentIds: normalized.backgroundEquipmentIds,
        preview,
      },
    };
    this.requestRender();
  }

  private createAbilityStateForMethod(
    method: AbilityGenerationMethod,
    previous?: HeroCreationAbilities,
  ): HeroCreationAbilities {
    const baseline = createAbilityAssignments(method, ABILITY_ORDER);
    return {
      method,
      assignments: { ...baseline.assignments },
      pool: [...baseline.pool],
      remainingPoints:
        method === 'point-buy'
          ? calculatePointBuyRemaining(baseline.assignments)
          : baseline.remainingPoints,
      rerollsRemaining: method === 'rolled' ? MAX_ABILITY_REROLLS : previous?.rerollsRemaining ?? MAX_ABILITY_REROLLS,
    };
  }

  private sanitizeAbilityState(state: HeroCreationAbilities): HeroCreationAbilities {
    const assignments =
      state.pool.length > 0
        ? clampAssignmentsToPool(state.assignments, state.pool)
        : { ...state.assignments };
    const remainingPoints =
      state.method === 'point-buy' ? calculatePointBuyRemaining(assignments) : state.remainingPoints;
    return {
      ...state,
      assignments,
      pool: [...state.pool],
      remainingPoints,
    };
  }

  private mutateHeroCreationDraft(mutator: (draft: HeroCreationDraft) => void | HeroCreationDraft): void {
    const draft = this.cloneHeroCreationDraft();
    const result = mutator(draft);
    const nextDraft = (result as HeroCreationDraft) ?? draft;
    nextDraft.abilities = this.sanitizeAbilityState(nextDraft.abilities);
    this.commitHeroCreationDraft(nextDraft);
  }

  private handleAbilitySelect(ability: Ability, value: number): void {
    this.mutateHeroCreationDraft((draft) => {
      if (draft.abilities.pool.length === 0) {
        return;
      }
      const nextAssignments = assignAbilityFromPool(
        draft.abilities.pool,
        draft.abilities.assignments,
        ability,
        value,
      );
      if (nextAssignments === draft.abilities.assignments) {
        return;
      }
      draft.abilities = {
        ...draft.abilities,
        assignments: nextAssignments,
      };
    });
  }

  private handlePointBuyAdjust(ability: Ability, delta: number): void {
    this.mutateHeroCreationDraft((draft) => {
      if (draft.abilities.method !== 'point-buy') {
        return;
      }
      const result = adjustPointBuy(draft.abilities.assignments, ability, delta);
      draft.abilities = {
        ...draft.abilities,
        assignments: result.assignments,
        remainingPoints: result.remainingPoints,
      };
    });
  }

  private handleAbilityReroll(): void {
    this.mutateHeroCreationDraft((draft) => {
      if (draft.abilities.method !== 'rolled' || draft.abilities.rerollsRemaining <= 0) {
        return;
      }
      const baseline = createAbilityAssignments('rolled', ABILITY_ORDER);
      draft.abilities = {
        method: 'rolled',
        assignments: { ...baseline.assignments },
        pool: [...baseline.pool],
        remainingPoints: 0,
        rerollsRemaining: Math.max(0, draft.abilities.rerollsRemaining - 1),
      };
    });
  }

  private updateHeroCreationDraft(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const current = this.cloneHeroCreationDraft();
    current.name = String(formData.get('name') ?? '');
    current.portrait = String(formData.get('portrait') ?? '');
    current.raceId = String(formData.get('race') ?? '');
    current.classId = String(formData.get('class') ?? '');
    current.backgroundId = String(formData.get('background') ?? '');
    const loadoutRaw = String(formData.get('class-loadout') ?? '');
    current.classLoadoutId = loadoutRaw.length > 0 ? loadoutRaw : null;
    current.backgroundEquipmentIds = formData.getAll('background-equipment').map((value) => String(value));

    const methodRaw = String(formData.get('ability-method') ?? current.abilities.method);
    const method = (['standard-array', 'rolled', 'point-buy'] as AbilityGenerationMethod[]).includes(
      methodRaw as AbilityGenerationMethod,
    )
      ? (methodRaw as AbilityGenerationMethod)
      : current.abilities.method;
    if (method !== current.abilities.method) {
      current.abilities = this.createAbilityStateForMethod(method, current.abilities);
    }
    current.abilities = this.sanitizeAbilityState(current.abilities);

    this.commitHeroCreationDraft(current);
  }

  private getNormalizedHeroCreation(): NormalizedHeroCreation {
    const { heroCreation } = this.state;
    return normalizeHeroCreation(
      {
        name: heroCreation.name,
        portrait: heroCreation.portrait,
        raceId: heroCreation.raceId,
        classId: heroCreation.classId,
        backgroundId: heroCreation.backgroundId,
        abilities: heroCreation.abilities,
        classLoadoutId: heroCreation.classLoadoutId,
        backgroundEquipmentIds: heroCreation.backgroundEquipmentIds,
      },
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
        abilities: current.abilities,
        classLoadoutId: current.classLoadoutId,
        backgroundEquipmentIds: current.backgroundEquipmentIds,
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
      classLoadoutId: normalized.classLoadoutId,
      backgroundEquipmentIds: normalized.backgroundEquipmentIds,
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

    const controller = createAbortController();
    this.srdAbortController = controller;
    const signal = getAbortSignal(controller);

    this.state = {
      ...this.state,
      heroOptionsLoading: true,
      heroOptionsError: null,
    };
    this.requestRender();

    try {
      await loadSrdHeroOptions(signal);
      if (signal?.aborted) {
        return;
      }
      this.state = {
        ...this.state,
        heroOptionsLoading: false,
      };
    } catch (error) {
      if (signal?.aborted) {
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

    const controller = createAbortController();
    this.compendiumAbortController = controller;
    const signal = getAbortSignal(controller);

    this.state = {
      ...this.state,
      compendiumLoading: true,
      compendiumError: null,
    };
    this.requestRender();

    try {
      const results = await Promise.all(
        COMPENDIUM_CATEGORY_ORDER.map((entry) => fetchSrdCompendiumIndex(entry.id, signal)),
      );
      if (signal?.aborted) {
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
      if (signal?.aborted) {
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

    const controller = createAbortController();
    this.moduleAbortController = controller;
    const signal = getAbortSignal(controller);

    try {
      await loadConfiguredModules(signal);
    } catch (error) {
      if (!signal?.aborted) {
        console.warn('Content module load failed', error);
      }
    } finally {
      if (this.moduleAbortController === controller) {
        this.moduleAbortController = null;
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

  private describeSkillCheckLabel(ability: Ability, skill?: Skill): string {
    const abilityLabel = this.toTitleCase(ability);
    if (!skill) {
      return abilityLabel;
    }
    const skillLabel = SKILLS.find((definition) => definition.id === skill)?.label;
    return `${abilityLabel} (${skillLabel ?? this.toTitleCase(skill)})`;
  }

  private toTitleCase(value: string): string {
    return value
      .split(/[-_]/)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }

  private setActivePanel(panel: RootState['activePanel']): void {
    if (this.state.activePanel === panel) {
      return;
    }
    this.state = { ...this.state, activePanel: panel };
    this.requestRender();
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
      activePanel,
      quickActionsLocked,
      storyteller,
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
    const abilityAssignments = heroCreation.abilities.assignments;
    const abilityMethod = heroCreation.abilities.method;
    const abilityPool = heroCreation.abilities.pool;
    const abilityPoolOptions = abilityPool.length
      ? Array.from(
          new Set(
            abilityPool.concat(ATTRIBUTE_ORDER.map((ability) => abilityAssignments[ability] ?? 0)),
          ),
        ).sort((a, b) => b - a)
      : [];
    const abilityPoolSummary = abilityPool.reduce((acc, value) => {
      const currentCount = acc.get(value) ?? 0;
      acc.set(value, currentCount + 1);
      return acc;
    }, new Map<number, number>());
    const abilityPoolDisplay = Array.from(abilityPoolSummary.entries()).sort((a, b) => b[0] - a[0]);
    const abilityRemainingPoints = heroCreation.abilities.remainingPoints;
    const abilityRerollsRemaining = heroCreation.abilities.rerollsRemaining;
    const abilityHighlights = ATTRIBUTE_ORDER.map((ability) => {
      const raceBonus = selectedRace?.bonuses?.[ability] ?? 0;
      const classBonus = selectedClass?.bonuses?.[ability] ?? 0;
      const total = raceBonus + classBonus;
      return { ability, raceBonus, classBonus, total };
    }).filter((entry) => entry.total !== 0);
    const classLoadouts = selectedClass?.loadouts ?? [];
    const selectedLoadout =
      classLoadouts.find((entry) => entry.id === normalizedCreation.classLoadoutId) ??
      classLoadouts.find((entry) => entry.defaultSelected) ??
      classLoadouts[0] ??
      null;
    const backgroundEquipment = selectedBackground?.equipment ?? [];
    const selectedBackgroundEquipmentIds = new Set(normalizedCreation.backgroundEquipmentIds);
    const activeBackgroundEquipment = backgroundEquipment.filter((entry) =>
      selectedBackgroundEquipmentIds.has(entry.id),
    );
    const startingItems =
      heroCreation.preview?.inventory ?? selectedLoadout?.items ?? selectedClass?.startingItems ?? [];
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
    const heroNameIsDefault =
      heroNameTrimmed.length === 0 || heroNameTrimmed === DEFAULT_HERO_NAME;
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
    const heroPortrait =
      hero?.portrait && hero.portrait.trim().length > 0 ? hero.portrait : DEFAULT_HERO_PORTRAIT;
    const heroPortraitUrl = encodeURI(heroPortrait);
    const heroNameDisplay = hero?.name ?? DEFAULT_HERO_NAME;
    const heroClassName = hero?.heroClass?.name ?? 'Classless Wanderer';
    const heroLevelLabel = hero ? `Level ${hero.level} ${heroClassName}` : 'Awaiting your legend';
    const heroRaceLabel =
      hero?.race && hero.race.trim().length > 0 ? this.toTitleCase(hero.race) : 'Unknown origin';
    const heroBackgroundLabel = hero?.background?.name ?? 'No background selected';
    const heroOriginLabel = hero
      ? `${heroRaceLabel} • ${heroBackgroundLabel}`
      : 'Choose a race and background to define your story.';
    const heroHpDisplay = hero ? `${hero.currentHP}/${hero.maxHP}` : '—';
    const heroAcDisplay = hero?.armorClass != null ? String(hero.armorClass) : '—';
    const heroGoldDisplay = hero?.gold != null ? `${hero.gold} gp` : '—';
    const heroSkillChipData = (hero ? this.previewTopSkills(hero) : []).map((entry) => ({
      label: entry.label,
      display: entry.value >= 0 ? `+${entry.value}` : `${entry.value}`,
    }));
    const storyChoices = choices.map((choice) => ({
      ...choice,
      disabled: choice.disabled || quickActionsLocked,
    }));
    const modeChipLabel =
      mode === 'combat' ? 'Combat Turn' : mode === 'creation' ? 'Create Hero' : 'Story Phase';
    const modeChipClass = mode;
    const storyContent = html`
      <dd-story-panel .data=${node}></dd-story-panel>
      ${mode !== 'creation'
        ? html`<dd-arcane-storyteller .data=${storyteller}></dd-arcane-storyteller>`
        : null}
      ${mode === 'combat' && combat.encounter && combat.snapshot
        ? html`<dd-combat-hud
            .data=${{ snapshot: combat.snapshot, enemyName: combat.encounter.enemy.name }}
          ></dd-combat-hud>`
        : html`<dd-dialogue-list
            .data=${storyChoices}
            .locked=${quickActionsLocked}
          ></dd-dialogue-list>`}
    `;
    const heroContent = html`
      <dd-character-sheet
        .data=${{
          hero,
          factions,
          achievements,
        }}
      ></dd-character-sheet>
      <dd-quest-tracker .data=${quests}></dd-quest-tracker>
    `;
    const toolsContent = html`
      <dd-combat-planner .data=${{ hero }}></dd-combat-planner>
      <dd-dice-workbench .hero=${hero}></dd-dice-workbench>
      <dd-downtime-planner .data=${{ hero }}></dd-downtime-planner>
    `;
    const loreContent = html`
      <dd-node-map .data=${mapNodes}></dd-node-map>
      <dd-journal-log .data=${journal}></dd-journal-log>
      <dd-dnd-compendium .data=${compendiumData}></dd-dnd-compendium>
    `;
    const tabDefinitions: Array<{ id: RootState['activePanel']; label: string; icon: string }> = [
      { id: 'story', label: 'Story', icon: '📖' },
      { id: 'hero', label: 'Hero', icon: '🛡️' },
      { id: 'tools', label: 'Tools', icon: '🛠️' },
      { id: 'lore', label: 'Lore', icon: '🗺️' },
    ];
    render(
      html`
        <style>
          :host {
            display: block;
            box-sizing: border-box;
            position: relative;
            width: min(100vw, 100dvh, 480px);
            height: 100dvh;
            margin: 0 auto;
            padding: 0.75rem;
            color: var(--dd-text);
          }

          .app-shell {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            height: 100%;
            border-radius: 24px;
            padding: 0.75rem;
            background: radial-gradient(circle at top, rgba(34, 24, 54, 0.92), rgba(12, 8, 20, 0.94));
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(18px);
            overflow: hidden;
          }

          .app-header {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            flex-shrink: 0;
          }

          .mode-chip {
            align-self: flex-start;
            font-size: 0.75rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            padding: 0.4rem 0.8rem;
            border-radius: 999px;
            background: rgba(240, 179, 90, 0.16);
            color: rgba(240, 179, 90, 0.95);
          }

          .mode-chip.combat {
            background: rgba(242, 125, 114, 0.22);
            color: rgba(255, 184, 176, 0.95);
          }

          .mode-chip.creation {
            background: rgba(106, 192, 255, 0.22);
            color: rgba(106, 192, 255, 0.94);
          }

          .hero-card {
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
            padding: 1.1rem;
            border-radius: 20px;
            background: rgba(24, 18, 36, 0.9);
            border: 1px solid rgba(255, 210, 164, 0.2);
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          }

          .hero-card__identity {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1rem;
            align-items: center;
          }

          .hero-card__portrait {
            width: 72px;
            height: 72px;
            border-radius: 18px;
            border: 2px solid rgba(240, 179, 90, 0.6);
            background-size: cover;
            background-position: center;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
          }

          .hero-card__name {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.35rem;
            letter-spacing: 0.06em;
          }

          .hero-card__meta {
            margin: 0.2rem 0 0;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.78);
          }

          .hero-card__meta--sub {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.8rem;
          }

          .hero-card__meta--muted {
            color: rgba(255, 255, 255, 0.55);
            font-size: 0.8rem;
            margin: 0;
          }

          .hero-card__stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
            gap: 0.75rem;
          }

          .stat-pill {
            display: grid;
            gap: 0.15rem;
            padding: 0.65rem 0.75rem;
            border-radius: 14px;
            background: rgba(10, 6, 18, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            text-align: center;
          }

          .stat-pill span {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: rgba(255, 255, 255, 0.65);
          }

          .stat-pill strong {
            font-size: 1.05rem;
            font-family: 'Cinzel', serif;
            letter-spacing: 0.04em;
          }

          .hero-card__skills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .skill-chip {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.35rem 0.6rem;
            border-radius: 999px;
            background: rgba(106, 192, 255, 0.18);
            color: rgba(106, 192, 255, 0.92);
            font-size: 0.75rem;
            letter-spacing: 0.04em;
          }

          .skill-chip strong {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.92);
          }

          .app-main {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 0.75rem;
            border-radius: 18px;
            border: 1px solid rgba(255, 210, 164, 0.16);
            background: linear-gradient(180deg, rgba(26, 18, 38, 0.92), rgba(12, 8, 20, 0.96));
            overflow: hidden;
          }

          .panel-scroll {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            padding-right: 0.35rem;
            scroll-behavior: smooth;
          }

          .panel-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .panel-scroll::-webkit-scrollbar-thumb {
            background: rgba(240, 179, 90, 0.3);
            border-radius: 999px;
          }

          .panel-stack {
            display: grid;
            gap: 1rem;
            padding-bottom: 1.25rem;
          }

          .panel-stack[hidden] {
            display: none !important;
          }

          .tab-bar {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0.5rem;
            padding: 0.5rem;
            border-radius: 999px;
            background: rgba(10, 6, 18, 0.95);
            border: 1px solid rgba(255, 210, 164, 0.2);
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(12px);
            flex-shrink: 0;
            margin-top: 0.25rem;
          }

          .tab-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.2rem;
            padding: 0.6rem 0.4rem;
            border-radius: 14px;
            border: none;
            background: transparent;
            color: rgba(255, 255, 255, 0.72);
            font: inherit;
            cursor: pointer;
            transition: background 150ms ease, color 150ms ease;
          }

          .tab-button .icon {
            font-size: 1.2rem;
          }

          .tab-button span {
            font-size: 0.65rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .tab-button.active {
            background: rgba(240, 179, 90, 0.16);
            color: rgba(240, 179, 90, 0.95);
            box-shadow: inset 0 0 0 1px rgba(240, 179, 90, 0.35);
          }

          .tab-button:focus-visible {
            outline: none;
            box-shadow: 0 0 0 3px rgba(106, 192, 255, 0.25);
          }

          @media (min-width: 540px) {
            :host {
              padding: 1.5rem;
            }

            .app-shell {
              padding: 1.25rem;
            }

            .app-main {
              padding: 1rem;
            }

            .hero-card__portrait {
              width: 84px;
              height: 84px;
            }
          }

          @media (min-width: 900px) {
            :host {
              width: min(520px, 100dvh);
            }
          }

          @media (max-width: 420px) {
            :host {
              padding: 0.5rem;
            }

            .app-shell {
              border-radius: 20px;
              padding: 0.6rem;
            }

            .tab-bar {
              padding: 0.45rem;
            }
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
            overflow-y: auto;
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

          .form-section {
            display: grid;
            gap: 1rem;
            padding: 1.25rem;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(20, 15, 32, 0.65);
          }

          .form-section h2 {
            margin: 0;
            font-size: 1.05rem;
            letter-spacing: 0.05em;
            font-family: 'Cinzel', serif;
          }

          .ability-methods {
            display: grid;
            gap: 0.65rem;
          }

          .ability-method {
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: start;
            gap: 0.75rem;
            padding: 0.7rem 0.9rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
            cursor: pointer;
            transition: border-color 150ms ease, background 150ms ease;
          }

          .ability-method input[type='radio'] {
            margin-top: 0.35rem;
          }

          .ability-method.selected {
            border-color: rgba(240, 179, 90, 0.6);
            background: rgba(240, 179, 90, 0.08);
          }

          .ability-method strong {
            display: block;
            font-size: 0.95rem;
            margin-bottom: 0.2rem;
          }

          .ability-method span.description {
            display: block;
            font-size: 0.8rem;
            color: var(--dd-muted);
          }

          .ability-pool {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.75);
          }

          .ability-pool span {
            padding: 0.25rem 0.5rem;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(255, 255, 255, 0.05);
          }

          .ability-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.75rem;
          }

          .ability-card {
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
            padding: 0.75rem;
            display: grid;
            gap: 0.5rem;
          }

          .ability-card header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
          }

          .ability-value {
            font-size: 1.35rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .ability-card select {
            width: 100%;
            padding: 0.5rem 0.6rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(12, 9, 20, 0.65);
            color: inherit;
          }

          .ability-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
          }

          .ability-controls button {
            border: 1px solid rgba(255, 255, 255, 0.14);
            background: rgba(255, 255, 255, 0.06);
            color: inherit;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: grid;
            place-items: center;
            cursor: pointer;
            transition: background 150ms ease, transform 150ms ease;
          }

          .ability-controls button:hover {
            background: rgba(240, 179, 90, 0.2);
            transform: translateY(-1px);
          }

          .ability-remaining {
            font-size: 0.8rem;
            color: rgba(137, 227, 185, 0.85);
          }

          .ability-reroll {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.85rem;
            padding: 0.4rem 0.65rem;
            border-radius: 999px;
            border: 1px solid rgba(106, 192, 255, 0.45);
            background: rgba(106, 192, 255, 0.12);
            color: rgba(196, 232, 255, 0.95);
            cursor: pointer;
            transition: transform 150ms ease, background 150ms ease;
          }

          .ability-reroll[disabled] {
            cursor: not-allowed;
            opacity: 0.6;
          }

          .ability-reroll:not([disabled]):hover {
            transform: translateY(-1px);
            background: rgba(106, 192, 255, 0.2);
          }

          .loadout-options {
            display: grid;
            gap: 0.75rem;
          }

          .loadout-card {
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
            padding: 0.9rem;
            display: grid;
            gap: 0.4rem;
            cursor: pointer;
          }

          .loadout-card.selected {
            border-color: rgba(240, 179, 90, 0.6);
            background: rgba(240, 179, 90, 0.08);
          }

          .loadout-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .loadout-header strong {
            font-size: 0.95rem;
          }

          .loadout-card input[type='radio'] {
            margin: 0;
          }

          .loadout-card p {
            margin: 0;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.75);
          }

          .loadout-recommendations {
            font-size: 0.75rem;
            color: rgba(106, 192, 255, 0.9);
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .equipment-options {
            display: grid;
            gap: 0.6rem;
          }

          .equipment-option {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.6rem;
            align-items: start;
            padding: 0.6rem 0.75rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
          }

          .equipment-option strong {
            display: block;
            font-size: 0.9rem;
          }

          .equipment-option p {
            margin: 0;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.75);
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

          .kit-meta {
            margin: 0 0 0.4rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.6);
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

          @media (max-width: 768px) {
            .creation-overlay {
              align-items: flex-start;
              padding: 1.5rem 1rem;
            }

            .creation-panel {
              padding: 1.75rem;
              border-radius: 20px;
            }

            .creation-content {
              grid-template-columns: minmax(0, 1fr);
              gap: 1.5rem;
            }
          }

          @media (max-width: 540px) {
            .creation-panel {
              padding: 1.5rem;
            }
          }
        </style>
        <div class="app-shell" data-mode=${mode} data-panel=${activePanel}>
          <header class="app-header">
            <span class="mode-chip ${modeChipClass}">${modeChipLabel}</span>
            <div class="hero-card">
              <div class="hero-card__identity">
                <div
                  class="hero-card__portrait"
                  style=${`background-image: url("${heroPortraitUrl}")`}
                  aria-hidden="true"
                ></div>
                <div>
                  <h1 class="hero-card__name">${heroNameDisplay}</h1>
                  <p class="hero-card__meta">${heroLevelLabel}</p>
                  <p class="hero-card__meta hero-card__meta--sub">${heroOriginLabel}</p>
                </div>
              </div>
              <div class="hero-card__stats">
                <div class="stat-pill">
                  <span>HP</span>
                  <strong>${heroHpDisplay}</strong>
                </div>
                <div class="stat-pill">
                  <span>AC</span>
                  <strong>${heroAcDisplay}</strong>
                </div>
                <div class="stat-pill">
                  <span>Gold</span>
                  <strong>${heroGoldDisplay}</strong>
                </div>
              </div>
              ${heroSkillChipData.length > 0
                ? html`<div class="hero-card__skills">
                    ${heroSkillChipData.map(
                      (skill) => html`<span class="skill-chip">
                          ${skill.label}
                          <strong>${skill.display}</strong>
                        </span>`,
                    )}
                  </div>`
                : html`<p class="hero-card__meta hero-card__meta--muted">
                    ${hero
                      ? 'Top proficiencies will appear here as your legend grows.'
                      : 'Complete hero creation to reveal your heroic proficiencies.'}
                  </p>`}
            </div>
          </header>
          <main class="app-main" aria-live="polite">
            <div class="panel-scroll">
              <div
                class="panel-stack"
                id="panel-story"
                role="tabpanel"
                aria-labelledby="tab-story"
                ?hidden=${activePanel !== 'story'}
              >
                ${storyContent}
              </div>
              <div
                class="panel-stack"
                id="panel-hero"
                role="tabpanel"
                aria-labelledby="tab-hero"
                ?hidden=${activePanel !== 'hero'}
              >
                ${heroContent}
              </div>
              <div
                class="panel-stack"
                id="panel-tools"
                role="tabpanel"
                aria-labelledby="tab-tools"
                ?hidden=${activePanel !== 'tools'}
              >
                ${toolsContent}
              </div>
              <div
                class="panel-stack"
                id="panel-lore"
                role="tabpanel"
                aria-labelledby="tab-lore"
                ?hidden=${activePanel !== 'lore'}
              >
                ${loreContent}
              </div>
            </div>
          </main>
          <nav class="tab-bar" role="tablist" aria-label="Primary navigation">
            ${tabDefinitions.map(
              (tab) => html`
                <button
                  id=${`tab-${tab.id}`}
                  class="tab-button ${activePanel === tab.id ? 'active' : ''}"
                  type="button"
                  role="tab"
                  aria-selected=${activePanel === tab.id ? 'true' : 'false'}
                  aria-controls=${`panel-${tab.id}`}
                  tabindex=${activePanel === tab.id ? '0' : '-1'}
                  @click=${(event: Event) => this.handleTabActivate(event, tab.id)}
                >
                  <span class="icon" aria-hidden="true">${tab.icon}</span>
                  <span>${tab.label}</span>
                </button>
              `,
            )}
          </nav>
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
                              placeholder="https://api.dicebear.com/7.x/adventurer/svg?seed=aria"
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
                      <div class="form-section">
                        <h2>Ability Scores</h2>
                        <div class="ability-methods">
                          ${ABILITY_METHOD_OPTIONS.map(
                            (option) => html`
                              <label
                                class="ability-method ${abilityMethod === option.id ? 'selected' : ''}"
                              >
                                <input
                                  type="radio"
                                  name="ability-method"
                                  value=${option.id}
                                  .checked=${abilityMethod === option.id}
                                />
                                <div>
                                  <strong>${option.label}</strong>
                                  <span class="description">${option.description}</span>
                                </div>
                              </label>
                            `,
                          )}
                        </div>
                        ${abilityMethod === 'point-buy'
                          ? html`<div class="ability-remaining">Points remaining: ${abilityRemainingPoints}</div>`
                          : abilityPoolDisplay.length > 0
                            ? html`<div class="ability-pool">
                                ${abilityPoolDisplay.map(
                                  ([value, count]) => html`<span>
                                    ${value}${count > 1 ? html`×${count}` : ''}
                                  </span>`,
                                )}
                              </div>`
                            : null}
                        ${abilityMethod === 'rolled'
                          ? html`<button
                              class="ability-reroll"
                              type="button"
                              ?disabled=${abilityRerollsRemaining <= 0}
                              @click=${(event: Event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.handleAbilityReroll();
                              }}
                            >
                              🔄 Reroll (${abilityRerollsRemaining} left)
                            </button>`
                          : null}
                        <div class="ability-grid">
                          ${ATTRIBUTE_ORDER.map((ability) => {
                            const label = this.formatAbilityLabel(ability);
                            const value = abilityAssignments[ability] ?? DEFAULT_BASE_ABILITY_SCORE;
                            if (abilityMethod === 'point-buy') {
                              return html`
                                <div class="ability-card">
                                  <header>
                                    <span>${label}</span>
                                    <span>${value}</span>
                                  </header>
                                  <div class="ability-controls">
                                    <button
                                      type="button"
                                      @click=${(event: Event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        this.handlePointBuyAdjust(ability as Ability, -1);
                                      }}
                                    >
                                      −
                                    </button>
                                    <div class="ability-value">${value}</div>
                                    <button
                                      type="button"
                                      @click=${(event: Event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        this.handlePointBuyAdjust(ability as Ability, 1);
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              `;
                            }
                            return html`
                              <div class="ability-card">
                                <header>
                                  <span>${label}</span>
                                  <span>${value}</span>
                                </header>
                                <select
                                  data-ability-select=${ability}
                                  .value=${String(value)}
                                >
                                  ${abilityPoolOptions.map(
                                    (optionValue) => html`<option value=${optionValue}>${optionValue}</option>`,
                                  )}
                                </select>
                              </div>
                            `;
                          })}
                        </div>
                      </div>
                      ${classLoadouts.length > 0
                        ? html`<div class="form-section">
                            <h2>Class Loadout</h2>
                            <div class="loadout-options">
                              ${classLoadouts.map((loadout) => {
                                const isSelected = selectedLoadout?.id === loadout.id;
                                return html`
                                  <label class="loadout-card ${isSelected ? 'selected' : ''}">
                                    <div class="loadout-header">
                                      <input
                                        type="radio"
                                        name="class-loadout"
                                        value=${loadout.id}
                                        .checked=${isSelected}
                                      />
                                      <strong>${loadout.name}</strong>
                                    </div>
                                    <p>${loadout.summary}</p>
                                    ${loadout.recommendedAbilities && loadout.recommendedAbilities.length > 0
                                      ? html`<div class="loadout-recommendations">
                                          Focus:
                                          ${loadout.recommendedAbilities
                                            .map((entry) => this.formatAbilityLabel(entry))
                                            .join(', ')}
                                        </div>`
                                      : null}
                                  </label>
                                `;
                              })}
                            </div>
                          </div>`
                        : null}
                      ${backgroundEquipment.length > 0
                        ? html`<div class="form-section">
                            <h2>Background Equipment</h2>
                            <div class="equipment-options">
                              ${backgroundEquipment.map((kit) => {
                                const checked = selectedBackgroundEquipmentIds.has(kit.id);
                                return html`
                                  <label class="equipment-option">
                                    <input
                                      type="checkbox"
                                      name="background-equipment"
                                      value=${kit.id}
                                      .checked=${checked}
                                    />
                                    <div>
                                      <strong>${kit.name}</strong>
                                      <p>${kit.description}</p>
                                    </div>
                                  </label>
                                `;
                              })}
                            </div>
                          </div>`
                        : null}
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
                                ${selectedLoadout
                                  ? html`<p class="kit-meta">Class Loadout: ${selectedLoadout.name}</p>`
                                  : null}
                                ${activeBackgroundEquipment.length > 0
                                  ? html`<p class="kit-meta">
                                      Background Gear:
                                      ${activeBackgroundEquipment.map((kit) => kit.name).join(', ')}
                                    </p>`
                                  : null}
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

const ROOT_ELEMENT_TAG = 'dd-root';

if (!customElements.get(ROOT_ELEMENT_TAG)) {
  customElements.define(ROOT_ELEMENT_TAG, DDRoot);
}
