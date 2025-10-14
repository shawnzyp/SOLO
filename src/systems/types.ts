export type Ability =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type Skill =
  | 'athletics'
  | 'acrobatics'
  | 'stealth'
  | 'arcana'
  | 'history'
  | 'insight'
  | 'perception'
  | 'persuasion'
  | 'survival';

export interface SkillDefinition {
  id: Skill;
  label: string;
  ability: Ability;
}

export const SKILLS: SkillDefinition[] = [
  { id: 'athletics', label: 'Athletics', ability: 'strength' },
  { id: 'acrobatics', label: 'Acrobatics', ability: 'dexterity' },
  { id: 'stealth', label: 'Stealth', ability: 'dexterity' },
  { id: 'arcana', label: 'Arcana', ability: 'intelligence' },
  { id: 'history', label: 'History', ability: 'intelligence' },
  { id: 'insight', label: 'Insight', ability: 'wisdom' },
  { id: 'perception', label: 'Perception', ability: 'wisdom' },
  { id: 'persuasion', label: 'Persuasion', ability: 'charisma' },
  { id: 'survival', label: 'Survival', ability: 'wisdom' },
];

export type QuestStatus = 'active' | 'completed' | 'failed';

export interface QuestObjective {
  id: string;
  description: string;
  completed?: boolean;
  optional?: boolean;
}

export interface Quest {
  id: string;
  title: string;
  summary: string;
  status: QuestStatus;
  faction?: string;
  reward?: string;
  location?: string;
  recommendedLevel?: number;
  progress?: number;
  objectives?: QuestObjective[];
  updatedAt?: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable' | 'trinket';
  bonus?: {
    ability?: Ability;
    value: number;
  };
  /**
   * Remaining charges for consumable items. When unset the item is treated as either
   * exhausted or single-use depending on the context in which it is parsed.
   */
  charges?: number;
  /**
   * Maximum number of charges a consumable item can hold. This allows combat to
   * restore context between encounters by persisting the original capacity alongside
   * the remaining uses.
   */
  maxCharges?: number;
}

export interface HeroClassLoadout {
  id: string;
  name: string;
  summary: string;
  items: InventoryItem[];
  recommendedAbilities?: Ability[];
  defaultSelected?: boolean;
}

export interface HeroClassOption {
  id: string;
  name: string;
  description: string;
  bonuses: Partial<Record<Ability, number>>;
  startingItems: InventoryItem[];
  loadouts?: HeroClassLoadout[];
}

export interface HeroBackgroundKit {
  id: string;
  name: string;
  description: string;
  items: InventoryItem[];
  defaultSelected?: boolean;
}

export interface HeroBackgroundOption {
  id: string;
  name: string;
  description: string;
  feature: string;
  equipment?: HeroBackgroundKit[];
}

export type AbilityGenerationMethod = 'standard-array' | 'rolled' | 'point-buy';

export interface Hero {
  name: string;
  race: string;
  heroClass: HeroClassOption;
  background: HeroBackgroundOption;
  portrait: string;
  level: number;
  experience: number;
  attributes: Record<Ability, number>;
  skills: Record<Skill, number>;
  maxHP: number;
  currentHP: number;
  armorClass: number;
  inventory: InventoryItem[];
  gold: number;
}

export interface FactionStanding {
  id: string;
  name: string;
  description: string;
  value: number;
}

export interface JournalEntry {
  id: string;
  timestamp: number;
  text: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: number;
}

export interface DiscoveredNode {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  firstVisitedAt: number;
  lastVisitedAt: number;
  visits: number;
}

export type DowntimeFocus = 'Training' | 'Crafting' | 'Research' | 'Social' | 'Exploration';

export type DowntimeRisk = 'low' | 'moderate' | 'high';

export interface DowntimeTask {
  id: string;
  title: string;
  focus: DowntimeFocus;
  days: number;
  risk: DowntimeRisk;
  notes?: string;
  progress: number;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export type DowntimeTaskEventType = 'created' | 'progressed' | 'completed';

export interface DowntimeTaskEventDetail {
  type: DowntimeTaskEventType;
  task: DowntimeTask;
  previousProgress?: number;
  previouslyCompleted?: boolean;
}

export interface DowntimeTaskHistoryEntry {
  timestamp: number;
  type: DowntimeTaskEventType;
  progress: number;
  notes?: string;
}

export interface DowntimeTaskRecord extends DowntimeTask {
  history: DowntimeTaskHistoryEntry[];
}

export interface DowntimeBuff {
  id: string;
  sourceTaskId: string;
  focus: DowntimeFocus;
  label: string;
  description: string;
  magnitude: number;
  createdAt: number;
  expiresAt: number | null;
}

export interface DowntimeState {
  tasks: Record<string, DowntimeTaskRecord>;
  activeBuffs: DowntimeBuff[];
  lastActivityAt?: number;
}

export interface DowntimeUpdate {
  eventType: DowntimeTaskEventType;
  task: DowntimeTask;
  journalEntry?: string;
  factionAdjustments?: Array<{ factionId: string; delta: number; reason?: string }>;
  buff?: DowntimeBuff | null;
}

export interface WorldState {
  hero: Hero | null;
  factions: Record<string, FactionStanding>;
  quests: Record<string, Quest>;
  achievements: Record<string, Achievement>;
  journal: JournalEntry[];
  currentNodeId: string | null;
  ambientTrack?: string;
  discoveredNodes: Record<string, DiscoveredNode>;
  oracleScenes: Record<string, OracleSceneRecord>;
  downtime: DowntimeState;
}

export interface Condition {
  type: 'faction' | 'quest' | 'attribute' | 'item' | 'skill';
  id: string;
  operator?: 'gte' | 'gt' | 'eq' | 'lte' | 'lt';
  value?: number | QuestStatus | boolean;
}

export type Effect =
  | { type: 'updateFaction'; factionId: string; delta: number }
  | { type: 'setFaction'; factionId: string; value: number }
  | { type: 'log'; entry: string }
  | { type: 'modifyHP'; delta: number }
  | { type: 'addQuest'; quest: Quest }
  | {
      type: 'updateQuest';
      questId: string;
      status: QuestStatus;
      summary?: string;
      progress?: number;
      completeObjectives?: string[];
    }
  | { type: 'grantItem'; item: InventoryItem }
  | { type: 'grantGold'; amount: number }
  | { type: 'achievement'; achievement: Achievement }
  | { type: 'setNode'; nodeId: string }
  | { type: 'setAmbient'; track?: string };

export interface SkillCheckOutcome {
  resultText: string;
  effects?: Effect[];
  nextNode?: string;
}

export interface SkillCheck {
  ability: Ability;
  difficultyClass: number;
  success: SkillCheckOutcome;
  failure: SkillCheckOutcome;
  flavor?: string;
}

export interface CombatParticipant {
  id: string;
  name: string;
  level: number;
  maxHP: number;
  currentHP: number;
  armorClass: number;
  attackBonus: number;
  damage: string;
  portrait?: string;
}

export interface CombatEncounter {
  id: string;
  description: string;
  enemy: CombatParticipant;
  victoryEffects?: Effect[];
  defeatEffects?: Effect[];
  fleeNode?: string;
  victoryNode?: string;
}

export interface StoryChoice {
  id: string;
  text: string;
  description?: string;
  icon?: string;
  hotkey?: string;
  toNode?: string;
  requirements?: Condition[];
  effects?: Effect[];
  skillCheck?: SkillCheck;
  combat?: CombatEncounter;
  hidden?: boolean;
}

export type StoryNodeOrigin = 'authored' | 'oracle-llm' | 'oracle-blueprint';

export interface StoryNode {
  id: string;
  title: string;
  summary: string;
  body: string[];
  background: string;
  ambient?: string;
  tags?: string[];
  art?: string;
  origin?: StoryNodeOrigin;
  onEnter?: Effect[];
  choices: StoryChoice[];
}

export interface OracleSceneRecord {
  id: string;
  title: string;
  summary: string;
  background: string;
  body: string[];
  ambient?: string;
  art?: string;
  tags?: string[];
  origin: Exclude<StoryNodeOrigin, 'authored'>;
  choices: StoryChoice[];
}

export interface ArcaneNarrativeNodeSummary {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  background?: string;
  ambient?: string;
  origin?: StoryNodeOrigin;
}

export interface ArcaneNarrativeFactionStanding {
  id: string;
  name: string;
  description: string;
  value: number;
}

export interface ArcaneNarrativeJournalEntry {
  id: string;
  timestamp: number;
  text: string;
}

export interface ArcaneNarrativeAchievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: number;
}

export interface ArcaneNarrativeContext {
  prompt: string;
  returnNodeId: string | null;
  currentNode?: ArcaneNarrativeNodeSummary | null;
  factionStandings?: ArcaneNarrativeFactionStanding[];
  journalHighlights?: ArcaneNarrativeJournalEntry[];
  achievements?: ArcaneNarrativeAchievement[];
}

export interface ArcaneNarrativeResult {
  node: StoryNode;
  origin: Exclude<StoryNodeOrigin, 'authored'>;
  prompt: string;
}
