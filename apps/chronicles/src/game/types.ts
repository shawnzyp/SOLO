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
  | 'investigation'
  | 'medicine'
  | 'perception'
  | 'persuasion'
  | 'performance'
  | 'survival';

export interface AttributeBlock {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type SkillBlock = Record<Skill, number>;

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  type: 'weapon' | 'armor' | 'consumable' | 'artifact';
  bonus?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'active' | 'completed' | 'failed';
  progress?: string;
}

export interface JournalEntry {
  id: string;
  timestamp: number;
  text: string;
}

export interface CharacterState {
  name: string;
  race: string;
  class: string;
  background: string;
  portrait: string;
  level: number;
  experience: number;
  attributes: AttributeBlock;
  skills: SkillBlock;
  hp: { current: number; max: number };
  ac: number;
  inventory: InventoryItem[];
  factions: Record<string, number>;
  achievements: string[];
}

export interface SkillCheck {
  ability: Ability;
  skill?: Skill;
  dc: number;
  description?: string;
  bonus?: number;
}

export interface StoryChoice {
  id: string;
  label: string;
  hint?: string;
  next: string | { success: string; failure: string };
  skillCheck?: SkillCheck;
  reputationDelta?: Partial<Record<string, number>>;
  questUpdate?: { questId: string; status?: Quest['status']; progress?: string };
  reward?: { xp?: number; gold?: number; itemId?: string };
  condition?: (state: WorldStateSnapshot) => boolean;
  journalText?: string;
}

export interface EncounterParticipant {
  name: string;
  hp: { current: number; max: number };
  ac: number;
  attackBonus: number;
  damage: string;
  portrait: string;
}

export interface Encounter {
  id: string;
  description: string;
  enemy: EncounterParticipant;
  victoryNode: string;
  defeatNode: string;
}

export interface StoryNode {
  id: string;
  title: string;
  location: string;
  ambiance: 'tavern' | 'wilderness' | 'ritual' | 'combat' | 'city';
  background: 'tavern' | 'forest' | 'ruins' | 'gloom';
  narrative: string[];
  choices?: StoryChoice[];
  encounter?: Encounter;
  onEnter?: (state: MutableWorldState) => void;
}

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'failure';
  title: string;
  body: string;
}

export interface CombatState {
  active: boolean;
  hero: EncounterParticipant;
  enemy: EncounterParticipant;
  turn: 'hero' | 'enemy';
  log: string[];
  encounterId?: string;
  victoryNode?: string;
  defeatNode?: string;
  heroDefending?: boolean;
}

export interface WorldStateSnapshot {
  character: CharacterState;
  quests: Quest[];
  journal: JournalEntry[];
  currentNodeId: string;
  combat: CombatState;
  toasts: ToastMessage[];
}

export interface MutableWorldState extends WorldStateSnapshot {
  setCurrentNode: (id: string) => void;
  pushToast: (toast: ToastMessage) => void;
  addJournalEntry: (text: string) => void;
  updateQuest: (update: { questId: string; status?: Quest['status']; progress?: string }) => void;
  modifyFaction: (name: string, delta: number) => void;
  grantItem: (itemId: string) => void;
  adjustExperience: (xp: number) => void;
  setCombat: (combat: CombatState) => void;
}

export type Subscriber = (state: WorldStateSnapshot) => void;
