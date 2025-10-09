import { rollD20, type RollResult } from './dice';
import type {
  Ability,
  Achievement,
  CombatEncounter,
  Condition,
  Effect,
  Hero,
  JournalEntry,
  Quest,
  QuestStatus,
  Skill,
  StoryChoice,
  StoryNode,
  WorldState,
} from './types';
import { storyNodes, getNodeById } from '../data/story';

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

export class World extends EventTarget {
  private state: WorldState = {
    hero: null,
    factions: {},
    quests: {},
    achievements: {},
    journal: [],
    currentNodeId: null,
    ambientTrack: undefined,
  };

  constructor() {
    super();
  }

  get snapshot(): WorldState {
    return structuredClone(this.state);
  }

  get currentNode(): StoryNode | null {
    return this.state.currentNodeId ? getNodeById(this.state.currentNodeId) : null;
  }

  restore(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as WorldState;
      this.state = parsed;
      this.emit('state-change', this.snapshot);
    } catch (error) {
      console.warn('Failed to restore world state', error);
    }
  }

  setHero(hero: Hero, startingNodeId: string): void {
    this.state.hero = hero;
    this.state.currentNodeId = startingNodeId;
    this.state.journal = [];
    this.state.quests = {};
    this.state.achievements = {};
    this.state.factions = buildInitialFactions();
    this.persist();
    this.emit('state-change', this.snapshot);
  }

  updateHero(hero: Hero): void {
    this.state.hero = hero;
    this.persist();
    this.emit('state-change', this.snapshot);
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

  applyChoice(choice: StoryChoice): ChoiceResolution {
    const hero = this.state.hero;
    if (!hero) throw new Error('No hero created.');

    const toastMessages: ToastMessage[] = [];
    let rollResult: RollResult | undefined;
    let nextNodeId: string | null = choice.toNode ?? null;
    let narrative: string | undefined;
    let combat: CombatEncounter | null = null;

    if (choice.skillCheck) {
      const modifier = this.getModifier(choice.skillCheck.ability);
      rollResult = rollD20(modifier);
      const passed =
        rollResult.isCriticalSuccess || rollResult.total >= choice.skillCheck.difficultyClass;
      const outcome = passed ? choice.skillCheck.success : choice.skillCheck.failure;
      narrative = outcome.resultText;
      if (outcome.effects) {
        this.applyEffects(outcome.effects, toastMessages);
      }
      if (outcome.nextNode) {
        nextNodeId = outcome.nextNode;
      }
      toastMessages.push({
        id: `skill-${choice.id}`,
        title: `${choice.skillCheck.ability.toUpperCase()} Check`,
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

  concludeCombat(result: 'victory' | 'defeat' | 'flee', encounter: CombatEncounter): void {
    const toastMessages: ToastMessage[] = [];
    let outcome: 'victory' | 'defeat' | 'flee' = 'victory';

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
    }

    this.emit('combat-end', { victory: outcome === 'victory', result: outcome });

    toastMessages.forEach((toast) => this.emit('toast', toast));
    this.persist();
  }

  setCurrentNode(nodeId: string): void {
    this.state.currentNodeId = nodeId;
    const node = getNodeById(nodeId);
    if (node?.onEnter) {
      const toastMessages: ToastMessage[] = [];
      this.applyEffects(node.onEnter, toastMessages);
      toastMessages.forEach((toast) => this.emit('toast', toast));
    }
    if (node?.ambient) {
      this.applyEffects([{ type: 'setAmbient', track: node.ambient }], []);
    }
    this.addJournalEntry(`Arrived at ${node?.title ?? 'an unknown location'}.`);
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
    return abilityModifier + (hero.skills[skill] ?? 0);
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
        case 'addQuest':
          this.state.quests[effect.quest.id] = effect.quest;
          toastMessages.push({
            id: `quest-${effect.quest.id}`,
            title: `Quest Started: ${effect.quest.title}`,
            body: effect.quest.summary,
            tone: 'info',
          });
          break;
        case 'updateQuest': {
          const quest = this.state.quests[effect.questId];
          if (quest) {
            quest.status = effect.status;
            if (effect.summary) quest.summary = effect.summary;
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
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }
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
  const blank: WorldState = {
    hero: null,
    factions: buildInitialFactions(),
    quests: {},
    achievements: {},
    journal: [],
    currentNodeId: null,
    ambientTrack: undefined,
  };
  (world as unknown as { state: WorldState }).state = blank;
  world.dispatchEvent(new CustomEvent('state-change', { detail: world.snapshot }));
}

export function listStoryNodes(): StoryNode[] {
  return storyNodes;
}
