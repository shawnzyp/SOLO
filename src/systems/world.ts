import { rollD20, rollFromNotation, type RollResult } from './dice';
import {
  SKILLS,
  type Ability,
  type Achievement,
  type ArcaneNarrativeContext,
  type ArcaneNarrativeResult,
  type CombatEncounter,
  type Condition,
  type DowntimeBuff,
  type DowntimeState,
  type DowntimeTaskRecord,
  type DowntimeUpdate,
  type Effect,
  type Hero,
  type InventoryItem,
  type JournalEntry,
  type Quest,
  type QuestStatus,
  type Skill,
  type StoryChoice,
  type StoryNode,
  type WorldState,
  type DiscoveredNode,
  type OracleSceneRecord,
} from './types';
import { storyNodes, getNodeById, registerDynamicNode, resetDynamicNodes } from '../data/story';
import { ArcaneStorytellerEngine } from './storyteller';
import { SafeEventTarget } from './event-target';
import { clone } from './clone';

export type WorldEventType =
  | 'state-change'
  | 'journal-entry'
  | 'toast'
  | 'combat-start'
  | 'combat-end';

export interface ToastMessage {
  id: string;
  title: string;
  body: string;
  tone: 'info' | 'success' | 'danger';
}

export interface WorldEventDetailMap {
  'state-change': WorldState;
  'journal-entry': JournalEntry;
  toast: ToastMessage;
  'combat-start': CombatEncounter;
  'combat-end': { victory: boolean; result: 'victory' | 'defeat' | 'flee' };
}

export interface ChoiceResolution {
  nextNodeId: string | null;
  narrative?: string;
  roll?: RollResult;
  toast?: ToastMessage[];
  combat?: CombatEncounter | null;
}

const STORAGE_KEY = 'dd-chronicles-world';
const ARCANE_STORYTELLER_CONFIG = {
  endpoint: normalizeEnv(import.meta.env?.VITE_ARCANE_STORYTELLER_URL),
  apiKey: normalizeEnv(import.meta.env?.VITE_ARCANE_STORYTELLER_KEY),
  model: normalizeEnv(import.meta.env?.VITE_ARCANE_STORYTELLER_MODEL),
};

interface DamageProfile {
  diceCount: number;
  diceSize: number;
  modifier: number;
}

export class World implements EventTarget {
  private readonly events = new SafeEventTarget();
  private state: WorldState = {
    hero: null,
    factions: {},
    quests: {},
    achievements: {},
    journal: [],
    currentNodeId: null,
    ambientTrack: undefined,
    discoveredNodes: {},
    oracleScenes: {},
    downtime: { tasks: {}, activeBuffs: [] },
  };
  private storyteller = new ArcaneStorytellerEngine({
    endpoint: ARCANE_STORYTELLER_CONFIG.endpoint ?? undefined,
    apiKey: ARCANE_STORYTELLER_CONFIG.apiKey ?? undefined,
    model: ARCANE_STORYTELLER_CONFIG.model ?? undefined,
  });
  private persistenceDisabled = false;

  addEventListener(
    type: WorldEventType,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.events.addEventListener(type, listener, options);
  }

  removeEventListener(
    type: WorldEventType,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ): void {
    this.events.removeEventListener(type, listener, options);
  }

  dispatchEvent(event: Event): boolean {
    return this.events.dispatchEvent(event);
  }

  get snapshot(): WorldState {
    return clone(this.state);
  }

  get currentNode(): StoryNode | null {
    return this.state.currentNodeId ? getNodeById(this.state.currentNodeId) : null;
  }

  restore(): void {
    if (typeof window === 'undefined' || this.persistenceDisabled) return;
    try {
      const storage = window.localStorage;
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as WorldState;
      if (!parsed.discoveredNodes) {
        parsed.discoveredNodes = {};
      }
      if (!parsed.oracleScenes) {
        parsed.oracleScenes = {};
      }
      if (!parsed.downtime) {
        parsed.downtime = { tasks: {}, activeBuffs: [] };
      } else {
        parsed.downtime.tasks = parsed.downtime.tasks ?? {};
        parsed.downtime.activeBuffs = parsed.downtime.activeBuffs ?? [];
        Object.entries(parsed.downtime.tasks).forEach(([id, task]) => {
          const record = task as DowntimeTaskRecord;
          if (!Array.isArray(record.history)) {
            record.history = [];
          } else {
            record.history = record.history.map((entry) => ({ ...entry }));
          }
          parsed.downtime.tasks[id] = { ...record };
        });
      }
      this.state = parsed;
      this.pruneExpiredDowntimeBuffs();
      this.restoreOracleScenes(parsed.oracleScenes);
      this.emit('state-change', this.snapshot);
    } catch (error) {
      console.warn('Failed to restore world state', error);
      if (error instanceof DOMException) {
        this.persistenceDisabled = true;
        return;
      }
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (storageError) {
        if (storageError instanceof DOMException) {
          this.persistenceDisabled = true;
        }
      }
    }
  }

  setHero(hero: Hero, startingNodeId: string): void {
    this.state.hero = hero;
    this.state.journal = [];
    this.state.quests = {};
    this.state.achievements = {};
    this.state.factions = buildInitialFactions();
    this.state.ambientTrack = undefined;
    this.state.discoveredNodes = {};
    this.state.oracleScenes = {};
    this.state.downtime = { tasks: {}, activeBuffs: [] };
    resetDynamicNodes();
    this.state.currentNodeId = null;
    this.addJournalEntry(
      `${hero.name}, a ${hero.race} ${hero.heroClass.name}, vows to walk the Ember Road alone.`,
    );
    this.setCurrentNode(startingNodeId);
  }

  updateHero(hero: Hero): void {
    this.state.hero = hero;
    this.persist();
    this.emit('state-change', this.snapshot);
  }

  consumeItem(itemId: string): void {
    const hero = this.state.hero;
    if (!hero) return;

    const index = hero.inventory.findIndex((entry) => entry.id === itemId);
    if (index === -1) {
      this.emit('toast', {
        id: `inventory-missing-${Date.now()}`,
        title: 'Inventory',
        body: 'That item is no longer in your pack.',
        tone: 'danger',
      });
      return;
    }

    const item = hero.inventory[index];
    if (item.type !== 'consumable') {
      this.emit('toast', {
        id: `inventory-invalid-${Date.now()}`,
        title: item.name,
        body: 'Only consumable items can be used from the pack.',
        tone: 'info',
      });
      return;
    }

    const charges = inferConsumableCharges(item);
    if (charges.remaining <= 0) {
      this.emit('toast', {
        id: `inventory-empty-${Date.now()}`,
        title: item.name,
        body: 'The item is fully expended.',
        tone: 'danger',
      });
      return;
    }

    const { attemptedHealing, healingAmount } = evaluateHealingEffect(item, hero);
    const effects: string[] = [];
    let tone: ToastMessage['tone'] = 'info';

    if (attemptedHealing) {
      const before = hero.currentHP;
      hero.currentHP = Math.min(hero.maxHP, hero.currentHP + healingAmount);
      const restored = hero.currentHP - before;
      if (restored > 0) {
        effects.push(`Recovered ${restored} HP.`);
        tone = 'success';
      } else {
        effects.push('Already at full health.');
      }
    }

    if (item.bonus && typeof item.bonus.value === 'number') {
      if (item.bonus.ability) {
        const ability = item.bonus.ability;
        hero.attributes[ability] = (hero.attributes[ability] ?? 10) + item.bonus.value;
        effects.push(`${formatAbilityName(ability)} +${item.bonus.value}.`);
        tone = 'success';
      } else {
        hero.maxHP += item.bonus.value;
        hero.currentHP = Math.min(hero.maxHP, hero.currentHP + item.bonus.value);
        effects.push(`Vitality increased by ${item.bonus.value}.`);
        tone = 'success';
      }
    }

    const remaining = Math.max(0, charges.remaining - 1);
    const maxCharges = typeof item.maxCharges === 'number' ? item.maxCharges : charges.max;

    if (remaining > 0) {
      const updated: InventoryItem = { ...item, charges: remaining, maxCharges };
      hero.inventory.splice(index, 1, updated);
      if (maxCharges > 1) {
        effects.push(`Charges remaining: ${remaining}/${maxCharges}.`);
      }
    } else {
      hero.inventory.splice(index, 1);
      effects.push('The item is consumed.');
    }

    hero.inventory = [...hero.inventory];
    this.addJournalEntry(`Used ${item.name}.`);

    const body = effects.length > 0 ? effects.join(' ') : 'No discernible effect.';
    const toast: ToastMessage = {
      id: `inventory-use-${item.id}-${Date.now()}`,
      title: item.name,
      body,
      tone,
    };

    this.persist();
    this.emit('state-change', this.snapshot);
    this.emit('toast', toast);
  }

  addJournalEntry(text: string): void {
    const entry: JournalEntry = {
      id: `entry-${this.state.journal.length + 1}`,
      timestamp: Date.now(),
      text,
    };
    this.state.journal = [...this.state.journal, entry];
    this.emit('journal-entry', entry);
  }

  applyDowntimeUpdate(update: DowntimeUpdate): void {
    const now = Date.now();
    const existing = this.state.downtime.tasks[update.task.id];
    const history = existing?.history ?? [];
    const record: DowntimeTaskRecord = {
      ...update.task,
      history: [
        ...history,
        {
          timestamp: now,
          type: update.eventType,
          progress: update.task.progress,
          notes: update.task.notes,
        },
      ],
    };
    this.state.downtime.tasks[record.id] = record;
    this.state.downtime.lastActivityAt = now;

    if (update.journalEntry) {
      this.addJournalEntry(update.journalEntry);
    }

    if (update.factionAdjustments) {
      update.factionAdjustments.forEach((adjustment) => {
        if (!adjustment || !adjustment.delta) return;
        const faction = this.state.factions[adjustment.factionId];
        if (!faction) return;
        faction.value += adjustment.delta;
        if (adjustment.reason) {
          this.addJournalEntry(adjustment.reason);
        } else {
          this.addJournalEntry(
            `${faction.name} reputation ${adjustment.delta >= 0 ? 'increased' : 'decreased'} to ${faction.value}.`,
          );
        }
      });
    }

    if (typeof update.buff !== 'undefined') {
      this.state.downtime.activeBuffs = this.state.downtime.activeBuffs.filter(
        (buff) =>
          (update.buff ? buff.id !== update.buff.id : true) && buff.sourceTaskId !== update.task.id,
      );
      if (update.buff) {
        this.state.downtime.activeBuffs = [...this.state.downtime.activeBuffs, update.buff];
      }
    }

    this.pruneExpiredDowntimeBuffs();
    this.persist();
    this.emit('state-change', this.snapshot);
  }

  async improviseNarrative(
    prompt: string,
    options?: { signal?: AbortSignal; onStatus?: (status: string) => void },
  ): Promise<ArcaneNarrativeResult> {
    const hero = this.state.hero;
    if (!hero) {
      throw new Error('A hero must be created before summoning the Arcane Storyteller.');
    }
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      throw new Error('Describe the scene you wish to summon.');
    }

    const currentNode = this.currentNode;
    const narrativeContext: ArcaneNarrativeContext = {
      prompt: trimmedPrompt,
      returnNodeId: this.state.currentNodeId,
      currentNode: currentNode
        ? {
            id: currentNode.id,
            title: currentNode.title,
            summary: currentNode.summary,
            tags: currentNode.tags,
            background: currentNode.background,
            ambient: currentNode.ambient,
            origin: currentNode.origin,
          }
        : null,
      factionStandings: Object.values(this.state.factions)
        .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
        .slice(0, 4)
        .map((standing) => ({
          id: standing.id,
          name: standing.name,
          description: standing.description,
          value: standing.value,
        })),
      journalHighlights: this.state.journal
        .slice(-3)
        .map((entry) => ({ id: entry.id, timestamp: entry.timestamp, text: entry.text })),
      achievements: Object.values(this.state.achievements)
        .sort((a, b) => b.unlockedAt - a.unlockedAt)
        .slice(0, 4)
        .map((achievement) => ({
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          unlockedAt: achievement.unlockedAt,
        })),
    };

    const result = await this.storyteller.improvise(
      trimmedPrompt,
      hero,
      this.state.currentNodeId,
      narrativeContext,
      options,
    );
    const oracleNode = this.registerOracleNode(result.node, this.state.currentNodeId);
    this.addJournalEntry(`Arcane Storyteller conjures: ${oracleNode.title}.`);
    this.setCurrentNode(oracleNode.id);
    return { ...result, node: oracleNode };
  }

  applyChoice(choice: StoryChoice): ChoiceResolution {
    const hero = this.state.hero;
    if (!hero) throw new Error('No hero created.');

    const toastMessages: ToastMessage[] = [];
    this.addJournalEntry(`Choice taken: ${choice.text}.`);
    let rollResult: RollResult | undefined;
    let nextNodeId: string | null = choice.toNode ?? null;
    let narrative: string | undefined;
    let combat: CombatEncounter | null = null;

    if (choice.skillCheck) {
      const modifier = this.getModifier(choice.skillCheck.ability, choice.skillCheck.skill);
      const checkLabel = this.formatSkillCheckLabel(
        choice.skillCheck.ability,
        choice.skillCheck.skill,
      );
      rollResult = rollD20(modifier);
      const passed =
        rollResult.isCriticalSuccess || rollResult.total >= choice.skillCheck.difficultyClass;
      const outcome = passed ? choice.skillCheck.success : choice.skillCheck.failure;
      narrative = outcome.resultText;
      const modifierLabel = `${modifier >= 0 ? '+' : ''}${modifier}`;
      const rollDescriptor = rollResult.isCriticalSuccess
        ? 'Critical Success!'
        : rollResult.isCriticalFailure
          ? 'Critical Failure!'
          : passed
            ? 'Success'
            : 'Failure';
      this.addJournalEntry(
        `${checkLabel} check ${rollDescriptor}: ` +
          `Rolled ${rollResult.roll}${modifierLabel} = ${rollResult.total} vs DC ${choice.skillCheck.difficultyClass}.`,
      );
      if (outcome.effects) {
        this.applyEffects(outcome.effects, toastMessages);
      }
      if (outcome.nextNode) {
        nextNodeId = outcome.nextNode;
      }
      toastMessages.push({
        id: `skill-${choice.id}`,
        title: `${checkLabel} Check`,
        body: `Rolled ${rollResult.total} (${rollResult.roll}${modifier >= 0 ? '+' : ''}${modifier}).`,
        tone: passed ? 'success' : 'danger',
      });
    }

    if (choice.effects) {
      this.applyEffects(choice.effects, toastMessages);
    }

    if (choice.combat) {
      combat = {
        ...choice.combat,
        enemy: { ...choice.combat.enemy },
      };
      this.addJournalEntry(`Combat engaged: ${choice.combat.enemy.name}.`);
      this.emit('combat-start', combat);
    } else if (nextNodeId) {
      this.setCurrentNode(nextNodeId);
    }

    if (narrative) {
      this.addJournalEntry(narrative);
    }

    if (toastMessages.length > 0) {
      toastMessages.forEach((toast) => this.emit('toast', toast));
    }

    this.persist();

    return {
      nextNodeId: this.state.currentNodeId,
      narrative,
      roll: rollResult,
      toast: toastMessages,
      combat,
    };
  }

  concludeCombat(result: 'victory' | 'defeat' | 'flee', encounter: CombatEncounter, heroOutcome?: Hero): void {
    const toastMessages: ToastMessage[] = [];
    let outcome: 'victory' | 'defeat' | 'flee' = 'victory';

    if (heroOutcome) {
      this.updateHero(heroOutcome);
    }

    if (result === 'victory') {
      if (encounter.victoryEffects) {
        this.applyEffects(encounter.victoryEffects, toastMessages);
      }
      outcome = 'victory';
      if (encounter.victoryNode) {
        this.setCurrentNode(encounter.victoryNode);
      }
      toastMessages.push({
        id: `combat-${encounter.id}`,
        title: 'Victory!',
        body: `${encounter.enemy.name} is defeated.`,
        tone: 'success',
      });
      this.addJournalEntry(`Victory claimed over ${encounter.enemy.name}.`);
    } else if (result === 'defeat') {
      if (encounter.defeatEffects) {
        this.applyEffects(encounter.defeatEffects, toastMessages);
      }
      outcome = 'defeat';
      toastMessages.push({
        id: `combat-${encounter.id}-defeat`,
        title: 'Defeat',
        body: 'You are forced to retreat and lick your wounds.',
        tone: 'danger',
      });
      if (encounter.fleeNode) {
        this.setCurrentNode(encounter.fleeNode);
      }
      this.addJournalEntry(`Defeated by ${encounter.enemy.name}.`);
    } else if (result === 'flee') {
      outcome = 'flee';
      toastMessages.push({
        id: `combat-${encounter.id}-flee`,
        title: 'Retreat',
        body: 'You disengage and escape the battle.',
        tone: 'info',
      });
      if (encounter.fleeNode) {
        this.setCurrentNode(encounter.fleeNode);
      }
      this.addJournalEntry(`You fled from ${encounter.enemy.name}.`);
    }

    this.emit('combat-end', { victory: outcome === 'victory', result: outcome });

    toastMessages.forEach((toast) => this.emit('toast', toast));
    this.persist();
    this.emit('state-change', this.snapshot);
  }

  setCurrentNode(nodeId: string): void {
    this.state.currentNodeId = nodeId;
    const toastMessages: ToastMessage[] = [];
    const initialNode = getNodeById(nodeId);

    if (initialNode?.onEnter) {
      this.applyEffects(initialNode.onEnter, toastMessages);
    }

    const finalNodeId = this.state.currentNodeId ?? nodeId;
    const finalNode = finalNodeId ? getNodeById(finalNodeId) : initialNode;
    const discovery = finalNodeId ? this.trackDiscoveredNode(finalNodeId) : null;
    if (discovery?.isNew && finalNode) {
      toastMessages.push({
        id: `discover-${finalNode.id}-${Date.now()}`,
        title: 'New Location Unlocked',
        body: finalNode.title,
        tone: 'info',
      });
    }

    if (finalNode?.ambient) {
      this.applyEffects([{ type: 'setAmbient', track: finalNode.ambient }], toastMessages);
    }

    toastMessages.forEach((toast) => this.emit('toast', toast));

    this.addJournalEntry(`Arrived at ${finalNode?.title ?? 'an unknown location'}.`);
    this.persist();
    this.emit('state-change', this.snapshot);
  }

  checkConditions(conditions?: Condition[]): boolean {
    if (!conditions || conditions.length === 0) return true;
    return conditions.every((condition) => this.evaluateCondition(condition));
  }

  getModifier(ability: Ability, skill?: Skill): number {
    const hero = this.state.hero;
    if (!hero) return 0;
    const abilityScore = hero.attributes[ability];
    const abilityModifier = Math.floor((abilityScore - 10) / 2);
    if (!skill) return abilityModifier;
    const skillBonus = hero.skills[skill];
    return typeof skillBonus === 'number' ? skillBonus : abilityModifier;
  }

  private formatSkillCheckLabel(ability: Ability, skill?: Skill): string {
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

  private evaluateCondition(condition: Condition): boolean {
    const hero = this.state.hero;
    switch (condition.type) {
      case 'faction': {
        const faction = this.state.factions[condition.id];
        if (!faction) return false;
        const value = faction.value;
        return compare(value, condition.operator ?? 'gte', Number(condition.value ?? 0));
      }
      case 'quest': {
        const quest = this.state.quests[condition.id];
        if (!quest) return false;
        return quest.status === condition.value;
      }
      case 'attribute': {
        if (!hero) return false;
        const value = hero.attributes[condition.id as Ability];
        return compare(value, condition.operator ?? 'gte', Number(condition.value ?? 0));
      }
      case 'item': {
        if (!hero) return false;
        return hero.inventory.some((item) => item.id === condition.id);
      }
      case 'skill': {
        if (!hero) return false;
        const skillValue = hero.skills[condition.id as Skill] ?? 0;
        return compare(skillValue, condition.operator ?? 'gte', Number(condition.value ?? 0));
      }
      default:
        return false;
    }
  }

  private trackDiscoveredNode(nodeId: string): { entry: DiscoveredNode; isNew: boolean } | null {
    const node = getNodeById(nodeId);
    if (!node) return null;

    const timestamp = Date.now();
    const existing = this.state.discoveredNodes[nodeId];
    if (existing) {
      existing.lastVisitedAt = timestamp;
      existing.visits += 1;
      return { entry: existing, isNew: false };
    }

    const entry: DiscoveredNode = {
      id: node.id,
      title: node.title,
      summary: node.summary,
      tags: node.tags ? [...node.tags] : undefined,
      firstVisitedAt: timestamp,
      lastVisitedAt: timestamp,
      visits: 1,
    };

    this.state.discoveredNodes[nodeId] = entry;
    return { entry, isNew: true };
  }

  private registerOracleNode(node: StoryNode, returnNodeId: string | null): StoryNode {
    const normalized = this.normalizeOracleNode(node, returnNodeId);
    registerDynamicNode(normalized);
    this.state.oracleScenes[normalized.id] = this.toOracleRecord(normalized);
    return normalized;
  }

  private normalizeOracleNode(node: StoryNode, returnNodeId: string | null): StoryNode {
    const origin = node.origin === 'oracle-llm' ? 'oracle-llm' : 'oracle-blueprint';
    const normalizedChoices = this.ensureOracleReturn(
      node.choices.map((choice) => this.cloneStoryChoice(choice)),
      returnNodeId,
    );
    return {
      id: node.id,
      title: node.title,
      summary: node.summary,
      body: node.body.map((paragraph) => paragraph.trim()).filter((paragraph) => paragraph.length > 0),
      background: node.background,
      ambient: node.ambient,
      art: node.art,
      tags: node.tags ? [...node.tags] : undefined,
      origin,
      choices: normalizedChoices,
    };
  }

  private ensureOracleReturn(choices: StoryChoice[], returnNodeId: string | null): StoryChoice[] {
    const fallbackNode = returnNodeId ?? 'tavern-common-room';
    if (choices.some((choice) => choice.toNode === fallbackNode)) {
      return choices;
    }
    return [
      ...choices,
      {
        id: `oracle-return-${Date.now()}`,
        text: returnNodeId ? 'Step back from the vision' : 'Return to Verdyn',
        description: returnNodeId
          ? 'Return to where you began summoning this tale.'
          : 'Retrace your steps to Verdyn to anchor the vision.',
        toNode: fallbackNode,
      },
    ];
  }

  private toOracleRecord(node: StoryNode): OracleSceneRecord {
    return {
      id: node.id,
      title: node.title,
      summary: node.summary,
      background: node.background,
      body: [...node.body],
      ambient: node.ambient,
      art: node.art,
      tags: node.tags ? [...node.tags] : undefined,
      origin: node.origin === 'oracle-llm' ? 'oracle-llm' : 'oracle-blueprint',
      choices: node.choices.map((choice) => this.cloneStoryChoice(choice)),
    };
  }

  private buildNodeFromRecord(record: OracleSceneRecord): StoryNode {
    return {
      id: record.id,
      title: record.title,
      summary: record.summary,
      background: record.background,
      body: [...record.body],
      ambient: record.ambient,
      art: record.art,
      tags: record.tags ? [...record.tags] : undefined,
      origin: record.origin,
      choices: record.choices.map((choice) => this.cloneStoryChoice(choice)),
    };
  }

  private restoreOracleScenes(records: Record<string, OracleSceneRecord>): void {
    resetDynamicNodes();
    Object.values(records).forEach((record) => {
      const node = this.buildNodeFromRecord(record);
      registerDynamicNode(node);
    });
  }

  private cloneStoryChoice(choice: StoryChoice): StoryChoice {
    return {
      ...choice,
      requirements: choice.requirements ? choice.requirements.map((condition) => ({ ...condition })) : undefined,
      effects: choice.effects ? choice.effects.map((effect) => ({ ...effect })) : undefined,
      skillCheck: choice.skillCheck
        ? {
            ...choice.skillCheck,
            success: { ...choice.skillCheck.success },
            failure: { ...choice.skillCheck.failure },
          }
        : undefined,
      combat: choice.combat
        ? {
            ...choice.combat,
            enemy: { ...choice.combat.enemy },
            victoryEffects: choice.combat.victoryEffects
              ? choice.combat.victoryEffects.map((effect) => ({ ...effect }))
              : undefined,
            defeatEffects: choice.combat.defeatEffects
              ? choice.combat.defeatEffects.map((effect) => ({ ...effect }))
              : undefined,
          }
        : undefined,
    };
  }

  private applyEffects(effects: Effect[], toastMessages: ToastMessage[]): void {
    effects.forEach((effect) => {
      switch (effect.type) {
        case 'updateFaction': {
          const faction = this.state.factions[effect.factionId];
          if (faction) {
            faction.value += effect.delta;
            this.addJournalEntry(
              `${faction.name} reputation ${effect.delta >= 0 ? 'increased' : 'decreased'} to ${faction.value}.`,
            );
            toastMessages.push({
              id: `faction-${effect.factionId}-${Date.now()}`,
              title: faction.name,
              body: `Reputation ${effect.delta >= 0 ? '+' : ''}${effect.delta}.`,
              tone: effect.delta >= 0 ? 'success' : 'danger',
            });
          }
          break;
        }
        case 'setFaction': {
          const faction = this.state.factions[effect.factionId];
          if (faction) {
            faction.value = effect.value;
          }
          break;
        }
        case 'log':
          this.addJournalEntry(effect.entry);
          break;
        case 'modifyHP': {
          const hero = this.state.hero;
          if (hero) {
            hero.currentHP = Math.max(0, Math.min(hero.maxHP, hero.currentHP + effect.delta));
            toastMessages.push({
              id: `hp-${Date.now()}`,
              title: 'Vitality',
              body: effect.delta >= 0 ? `Recovered ${effect.delta} HP.` : `Lost ${-effect.delta} HP.`,
              tone: effect.delta >= 0 ? 'info' : 'danger',
            });
          }
          break;
        }
        case 'addQuest': {
          const quest: Quest = {
            ...effect.quest,
            objectives: effect.quest.objectives
              ? effect.quest.objectives.map((objective) => ({
                  ...objective,
                  completed: Boolean(objective.completed),
                }))
              : undefined,
            progress:
              effect.quest.progress ?? (effect.quest.status === 'completed' ? 1 : 0),
            updatedAt: Date.now(),
          };
          this.state.quests[quest.id] = quest;
          toastMessages.push({
            id: `quest-${quest.id}`,
            title: `Quest Started: ${quest.title}`,
            body: quest.summary,
            tone: 'info',
          });
          break;
        }
        case 'updateQuest': {
          const quest = this.state.quests[effect.questId];
          if (quest) {
            quest.status = effect.status;
            if (effect.summary) quest.summary = effect.summary;
            if (typeof effect.progress === 'number') {
              quest.progress = effect.progress;
            }
            if (quest.status === 'completed') {
              quest.progress = 1;
            }
            if (quest.objectives) {
              const completedIds = new Set(effect.completeObjectives ?? []);
              quest.objectives = quest.objectives.map((objective) => {
                const completed =
                  quest.status === 'completed' || completedIds.has(objective.id)
                    ? true
                    : objective.completed ?? false;
                return { ...objective, completed };
              });
            }
            quest.updatedAt = Date.now();
            toastMessages.push({
              id: `quest-${quest.id}-${effect.status}`,
              title: `${quest.title} ${effect.status === 'completed' ? 'Completed' : 'Updated'}`,
              body: quest.summary,
              tone: effect.status === 'completed' ? 'success' : 'info',
            });
          }
          break;
        }
        case 'grantItem': {
          const hero = this.state.hero;
          if (hero) {
            hero.inventory = [...hero.inventory, effect.item];
            toastMessages.push({
              id: `item-${effect.item.id}`,
              title: 'New Item',
              body: effect.item.name,
              tone: 'success',
            });
          }
          break;
        }
        case 'grantGold': {
          const hero = this.state.hero;
          if (hero) {
            hero.gold += effect.amount;
            toastMessages.push({
              id: `gold-${Date.now()}`,
              title: 'Treasure',
              body: `Gained ${effect.amount} gold.`,
              tone: 'success',
            });
          }
          break;
        }
        case 'achievement':
          this.state.achievements[effect.achievement.id] = effect.achievement;
          toastMessages.push({
            id: `ach-${effect.achievement.id}`,
            title: `Achievement Unlocked`,
            body: effect.achievement.title,
            tone: 'success',
          });
          break;
        case 'setNode':
          this.state.currentNodeId = effect.nodeId;
          break;
        case 'setAmbient':
          this.state.ambientTrack = effect.track;
          break;
        default:
          break;
      }
    });
  }

  private emit<Type extends WorldEventType>(type: Type, detail: WorldEventDetailMap[Type]): void {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }

  private persist(): void {
    if (typeof window === 'undefined' || this.persistenceDisabled) return;
    try {
      this.pruneExpiredDowntimeBuffs();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (error) {
      console.warn('Failed to persist world state', error);
      if (error instanceof DOMException) {
        this.persistenceDisabled = true;
      }
    }
  }

  private pruneExpiredDowntimeBuffs(state: DowntimeState = this.state.downtime, referenceTime = Date.now()): void {
    if (!state?.activeBuffs) return;
    state.activeBuffs = state.activeBuffs.filter(
      (buff: DowntimeBuff) => !buff.expiresAt || buff.expiresAt > referenceTime,
    );
  }
}

const HEALING_KEYWORDS = /(heal|restore|recover|regain|mend|soothe|potion|elixir|tonic|salve|ration|bandage|draught|remedy|antidote|balm)/i;

function inferConsumableCharges(item: InventoryItem): { remaining: number; max: number } {
  if (typeof item.charges === 'number') {
    const maxValue =
      typeof item.maxCharges === 'number' ? item.maxCharges : Math.max(item.charges, 1);
    return { remaining: item.charges, max: maxValue };
  }

  if (typeof item.maxCharges === 'number') {
    return { remaining: item.maxCharges, max: item.maxCharges };
  }

  const text = `${item.name ?? ''} ${item.description ?? ''}`;
  const ratioMatch = text.match(/(\d+)\s*\/\s*(\d+)\s*(?:charges|uses|doses|applications)?/i);
  if (ratioMatch) {
    const remaining = parseInt(ratioMatch[1], 10);
    const max = parseInt(ratioMatch[2], 10);
    return { remaining, max };
  }

  const chargeMatch = text.match(/(\d+)\s*(?:charges|uses|doses|applications|sips|swigs|vials|bolts|shots)/i);
  if (chargeMatch) {
    const value = parseInt(chargeMatch[1], 10);
    return { remaining: value, max: value };
  }

  const parenMatch = text.match(/\((\d+)\)/);
  if (parenMatch) {
    const value = parseInt(parenMatch[1], 10);
    return { remaining: value, max: value };
  }

  const xMatch = text.match(/x\s*(\d+)/i);
  if (xMatch) {
    const value = parseInt(xMatch[1], 10);
    return { remaining: value, max: value };
  }

  return { remaining: 1, max: 1 };
}

function evaluateHealingEffect(
  item: InventoryItem,
  hero: Hero,
): { attemptedHealing: boolean; healingAmount: number } {
  const text = `${item.name ?? ''} ${item.description ?? ''}`.trim();
  if (!text) {
    return { attemptedHealing: false, healingAmount: 0 };
  }

  const flatMatch = text.match(/(?:heal|restore|regain|recover|gain)\s*(\d+)\s*(?:hp|hit points?)/i);
  if (flatMatch) {
    const base = parseInt(flatMatch[1], 10);
    const amount = Math.max(0, base + getAbilityModifierFromHero(hero, 'constitution'));
    return { attemptedHealing: true, healingAmount: amount };
  }

  const hasHealingCue = HEALING_KEYWORDS.test(text);
  if (hasHealingCue) {
    const profile = extractDamageProfileFromText(text);
    if (profile) {
      const notation = formatDamageNotation({
        diceCount: profile.diceCount,
        diceSize: profile.diceSize,
        modifier: profile.modifier + getAbilityModifierFromHero(hero, 'constitution'),
      });
      const amount = Math.max(1, rollFromNotation(notation));
      return { attemptedHealing: true, healingAmount: amount };
    }

    const baseline = Math.max(1, 6 + getAbilityModifierFromHero(hero, 'constitution'));
    return { attemptedHealing: true, healingAmount: baseline };
  }

  return { attemptedHealing: false, healingAmount: 0 };
}

function extractDamageProfileFromText(text: string | undefined): DamageProfile | null {
  if (!text) return null;
  const match = text.match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);
  if (!match) return null;
  const diceCount = parseInt(match[1], 10);
  const diceSize = parseInt(match[2], 10);
  const modifier = match[4] ? parseInt(match[4], 10) * (match[3] === '-' ? -1 : 1) : 0;
  return { diceCount, diceSize, modifier };
}

function formatDamageNotation(profile: DamageProfile): string {
  const modifier = profile.modifier;
  const base = `${profile.diceCount}d${profile.diceSize}`;
  if (modifier === 0) {
    return base;
  }
  const sign = modifier > 0 ? '+' : '-';
  return `${base}${sign}${Math.abs(modifier)}`;
}

function getAbilityModifierFromHero(hero: Hero, ability: Ability): number {
  const score = hero.attributes[ability] ?? 10;
  return Math.floor((score - 10) / 2);
}

function formatAbilityName(ability: Ability): string {
  return ability.charAt(0).toUpperCase() + ability.slice(1);
}

function compare(left: number, operator: NonNullable<Condition['operator']>, right: number): boolean {
  switch (operator) {
    case 'gt':
      return left > right;
    case 'gte':
      return left >= right;
    case 'lt':
      return left < right;
    case 'lte':
      return left <= right;
    case 'eq':
    default:
      return left === right;
  }
}

function normalizeEnv(value?: string): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function buildInitialFactions(): Record<string, { id: string; name: string; description: string; value: number }> {
  return {
    'town-guard': {
      id: 'town-guard',
      name: 'Verdyn Watch',
      description: 'The vigilant guard that protects the frontier city of Verdyn.',
      value: 0,
    },
    'black-guild': {
      id: 'black-guild',
      name: 'Black Guild',
      description: 'Shadowy brokers dealing in secrets and forbidden relics.',
      value: 0,
    },
    circle: {
      id: 'circle',
      name: 'Circle of Embers',
      description: 'Mystics safeguarding arcane knowledge tied to the Ember Rift.',
      value: 0,
    },
  };
}

export function listAvailableChoices(node: StoryNode, world: World): StoryChoice[] {
  return node.choices
    .filter((choice) => !choice.hidden)
    .map((choice) => ({ ...choice }))
    .filter((choice) => world.checkConditions(choice.requirements));
}

export function hasActiveHero(world: World): boolean {
  return Boolean(world.snapshot.hero);
}

export function resetWorld(world: World): void {
  resetDynamicNodes();
  const blank: WorldState = {
    hero: null,
    factions: buildInitialFactions(),
    quests: {},
    achievements: {},
    journal: [],
    currentNodeId: null,
    ambientTrack: undefined,
    discoveredNodes: {},
    oracleScenes: {},
  };
  (world as unknown as { state: WorldState }).state = blank;
  world.dispatchEvent(new CustomEvent('state-change', { detail: world.snapshot }));
}

export function listStoryNodes(): StoryNode[] {
  return storyNodes;
}
