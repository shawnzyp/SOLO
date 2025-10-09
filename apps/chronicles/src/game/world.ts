import { cloneItem } from './codex';
import { rollD20, rollDamage } from './dice';
import { getNode } from './story-data';
import { createInitialAchievements, getAchievementDefinition } from './achievements';
import { createInitialRegions } from './atlas';
import type {
  CombatState,
  Encounter,
  StoryChoice,
  StoryNode,
  Subscriber,
  ToastMessage,
  WorldStateSnapshot,
  CharacterState,
  Quest,
} from './types';

function deepClone<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

const subscribers = new Set<Subscriber>();
const STORAGE_KEY = 'chronicles-save-v2';

const initialCharacter: CharacterState = {
  name: 'Aria Valebright',
  race: 'Half-Elf',
  class: 'Spellblade',
  background: 'Circle Envoy',
  portrait: '🛡️',
  level: 3,
  experience: 920,
  attributes: {
    strength: 13,
    dexterity: 16,
    constitution: 14,
    intelligence: 15,
    wisdom: 12,
    charisma: 11,
  },
  skills: {
    athletics: 2,
    acrobatics: 5,
    stealth: 5,
    arcana: 4,
    history: 3,
    insight: 2,
    investigation: 4,
    medicine: 1,
    perception: 3,
    persuasion: 2,
    performance: 1,
    survival: 2,
  },
  hp: { current: 27, max: 27 },
  ac: 15,
  inventory: [
    {
      id: 'longsword',
      name: 'Ancestral Longsword',
      description: 'Inherited from your mentor. 1d8+3 slashing.',
      quantity: 1,
      type: 'weapon',
      bonus: '+1 to attack rolls.',
    },
    {
      id: 'healingPotion',
      name: "Potion of Wayfarer's Vitality",
      description: 'Restore 2d4 + 2 HP when consumed.',
      quantity: 2,
      type: 'consumable',
    },
  ],
  factions: {
    circle: 8,
    blackGuild: -1,
    townGuard: 4,
  },
  achievements: ['Circle Envoy'],
};

const baseQuests: Quest[] = [
  {
    id: 'emberShard',
    title: 'Chronicles of the Ember Shard',
    description: "Reach the Duskfen ritual and decide the shard's fate before rival factions intervene.",
    tags: ['Circle of Embers', 'Main Quest'],
    status: 'active',
    progress: 'Awaiting your decision in Emberfall.',
  },
  {
    id: 'loneLegacy',
    title: 'Legacy of the Lone Adventurer',
    description: 'Complete three solo contracts without aid.',
    tags: ['Achievement'],
    status: 'completed',
    progress: 'Legends whisper of your solitary triumphs.',
  },
  {
    id: 'guildFavor',
    title: 'Marker of the Black Guild',
    description: 'A dormant debt carried by those who bargain with the Black Guild.',
    tags: ['Black Guild'],
    status: 'completed',
    progress: 'No obligations currently owed.',
  },
];

function buildInitialState(): WorldStateSnapshot {
  const character = deepClone(initialCharacter);
  const quests = deepClone(baseQuests);
  const now = Date.now();
  const achievements = createInitialAchievements();
  const map = createInitialRegions().map((region) =>
    region.id === 'emberfall'
      ? { ...region, status: 'visited', discoveredAt: now }
      : region,
  );
  const combat: CombatState = {
    active: false,
    hero: {
      name: character.name,
      hp: { ...character.hp },
      ac: character.ac,
      attackBonus: 6,
      damage: '1d8+3',
      portrait: character.portrait,
    },
    enemy: {
      name: '—',
      hp: { current: 0, max: 0 },
      ac: 10,
      attackBonus: 0,
      damage: '1d4',
      portrait: '❔',
    },
    turn: 'hero',
    log: [],
  };

  return {
    character,
    quests,
    journal: [
      {
        id: 'entry-intro',
        timestamp: now,
        text: 'Summoned by the Circle of Embers to secure the Duskfen shard.',
      },
    ],
    currentNodeId: 'intro',
    combat,
    toasts: [],
    achievements,
    map,
    visitedNodes: ['intro'],
  };
}

function mergeCharacter(saved: Partial<CharacterState> | undefined, base: CharacterState): CharacterState {
  if (!saved) {
    return base;
  }
  return {
    ...base,
    ...saved,
    hp: { ...base.hp, ...(saved.hp ?? {}) },
    inventory: Array.isArray(saved.inventory) ? saved.inventory : base.inventory,
    factions: { ...base.factions, ...(saved.factions ?? {}) },
    achievements: Array.isArray(saved.achievements) ? saved.achievements : base.achievements,
  };
}

function loadState(): WorldStateSnapshot | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage?.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<WorldStateSnapshot>;
    const base = buildInitialState();
    const achievements = createInitialAchievements(parsed.achievements);
    const map = createInitialRegions(parsed.map);
    return {
      ...base,
      ...parsed,
      character: mergeCharacter(parsed.character, base.character),
      quests: Array.isArray(parsed.quests) ? parsed.quests : base.quests,
      journal: Array.isArray(parsed.journal) ? parsed.journal : base.journal,
      achievements,
      map,
      visitedNodes: Array.isArray(parsed.visitedNodes) ? parsed.visitedNodes : base.visitedNodes,
      combat: {
        ...base.combat,
        ...(parsed.combat ?? {}),
        active: false,
        log: [],
      },
      toasts: [],
      currentNodeId: typeof parsed.currentNodeId === 'string' ? parsed.currentNodeId : base.currentNodeId,
    };
  } catch (error) {
    console.warn('Failed to load saved adventure state', error);
    return null;
  }
}

let state: WorldStateSnapshot = loadState() ?? buildInitialState();

function persistState() {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const payload: WorldStateSnapshot = {
      ...state,
      toasts: [],
      combat: { ...state.combat, active: false, log: [] },
    };
    window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to persist adventure state', error);
  }
}

function clearPersisted() {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage?.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear adventure save', error);
  }
}

function notify() {
  for (const subscriber of subscribers) {
    subscriber(deepClone(state));
  }
  persistState();
}

function pushToast(toast: ToastMessage) {
  state = { ...state, toasts: [...state.toasts, toast] };
  notify();
  setTimeout(() => {
    state = { ...state, toasts: state.toasts.filter((entry) => entry.id !== toast.id) };
    notify();
  }, 5200);
}

function addJournalEntry(text: string) {
  const entry = {
    id: `journal-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    timestamp: Date.now(),
    text,
  };
  state = { ...state, journal: [entry, ...state.journal].slice(0, 40) };
}

function updateQuest(update: { questId: string; status?: Quest['status']; progress?: string }) {
  state = {
    ...state,
    quests: state.quests.map((quest) =>
      quest.id === update.questId
        ? { ...quest, status: update.status ?? quest.status, progress: update.progress ?? quest.progress }
        : quest,
    ),
  };
}

function modifyFaction(name: string, delta: number) {
  const factions = {
    ...state.character.factions,
    [name]: (state.character.factions[name] ?? 0) + delta,
  };
  state = { ...state, character: { ...state.character, factions } };
}

function grantItem(itemId: string | undefined) {
  if (!itemId) return;
  const item = cloneItem(itemId);
  if (!item) return;
  const existing = state.character.inventory.find((entry) => entry.id === item.id);
  let inventory;
  if (existing) {
    inventory = state.character.inventory.map((entry) =>
      entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
    );
  } else {
    inventory = [...state.character.inventory, item];
  }
  state = { ...state, character: { ...state.character, inventory } };
}

function adjustExperience(xp: number) {
  const character = { ...state.character, experience: state.character.experience + xp };
  state = { ...state, character };
}

function discoverRegion(regionId: string, options: { visited?: boolean; announce?: boolean } = {}) {
  const { visited = false, announce = true } = options;
  const region = state.map.find((entry) => entry.id === regionId);
  if (!region) return;
  const timestamp = Date.now();
  let nextStatus = region.status;
  if (visited) {
    if (region.status === 'visited') {
      return;
    }
    nextStatus = 'visited';
  } else if (region.status === 'locked') {
    nextStatus = 'available';
  } else {
    return;
  }

  const updatedRegion = {
    ...region,
    status: nextStatus,
    discoveredAt: region.discoveredAt ?? timestamp,
  };
  state = {
    ...state,
    map: state.map.map((entry) => (entry.id === regionId ? updatedRegion : entry)),
  };

  if (announce && nextStatus !== 'visited') {
    pushToast({
      id: `region-${regionId}-${timestamp}`,
      type: 'info',
      title: 'Region Revealed',
      body: `${updatedRegion.icon} ${updatedRegion.name} now marks your atlas.`,
      tone: 'notify',
    });
    addJournalEntry(`Mapped ${updatedRegion.name}: ${updatedRegion.description}`);
  }
}

function unlockAchievement(achievementId: string) {
  const achievement = state.achievements.find((entry) => entry.id === achievementId);
  if (!achievement || achievement.unlockedAt) {
    return;
  }
  const unlockedAt = Date.now();
  const definition = getAchievementDefinition(achievementId) ?? achievement;
  const updatedAchievements = state.achievements.map((entry) =>
    entry.id === achievementId ? { ...entry, unlockedAt } : entry,
  );
  const characterAchievements = state.character.achievements.includes(definition.name)
    ? state.character.achievements
    : [...state.character.achievements, definition.name];

  state = {
    ...state,
    achievements: updatedAchievements,
    character: { ...state.character, achievements: characterAchievements },
  };

  pushToast({
    id: `achievement-${achievementId}-${unlockedAt}`,
    type: 'success',
    title: 'Achievement Unlocked',
    body: `${definition.icon} ${definition.name}`,
    tone: 'victory',
    icon: definition.icon,
  });
  addJournalEntry(`Achievement earned: ${definition.name} — ${definition.description}`);
}

function setCombat(combat: CombatState) {
  state = { ...state, combat };
  notify();
}

function startEncounter(encounter: Encounter) {
  const hero = {
    name: state.character.name,
    hp: { ...state.character.hp },
    ac: state.character.ac,
    attackBonus: 6,
    damage: '1d8+3',
    portrait: state.character.portrait,
  };
  const combat: CombatState = {
    active: true,
    hero,
    enemy: deepClone(encounter.enemy),
    turn: 'hero',
    log: ['The clash begins!'],
    encounterId: encounter.id,
    victoryNode: encounter.victoryNode,
    defeatNode: encounter.defeatNode,
  };
  setCombat(combat);
  pushToast({
    id: `encounter-${encounter.id}`,
    type: 'info',
    title: 'Encounter',
    body: encounter.description,
    tone: 'combat',
  });
}

function endCombat() {
  if (!state.combat.active) return;
  setCombat({ ...state.combat, active: false });
}

function applyNodeEnter(node: StoryNode | undefined) {
  if (!node) return;
  node.onEnter?.({
    ...state,
    setCurrentNode,
    pushToast,
    addJournalEntry,
    updateQuest,
    modifyFaction,
    grantItem,
    adjustExperience,
    setCombat,
    unlockAchievement,
    discoverRegion,
  });
  if (node.achievementId) {
    unlockAchievement(node.achievementId);
  }
  if (node.encounter) {
    startEncounter(node.encounter);
  } else {
    endCombat();
  }
}

function setCurrentNode(id: string) {
  const node = getNode(id);
  state = {
    ...state,
    currentNodeId: id,
    visitedNodes: state.visitedNodes.includes(id) ? state.visitedNodes : [...state.visitedNodes, id],
  };
  if (node?.unlockRegions) {
    node.unlockRegions.forEach((regionId) => discoverRegion(regionId));
  }
  if (node?.region) {
    discoverRegion(node.region, { visited: true, announce: false });
  }
  applyNodeEnter(node);
  notify();
}

function resolveChoice(choice: StoryChoice) {
  if (choice.reputationDelta) {
    for (const [faction, delta] of Object.entries(choice.reputationDelta)) {
      modifyFaction(faction, delta);
    }
  }
  if (choice.questUpdate) {
    updateQuest(choice.questUpdate);
  }
  if (choice.reward?.itemId) {
    grantItem(choice.reward.itemId);
  }
  if (choice.reward?.xp) {
    adjustExperience(choice.reward.xp);
  }
  if (choice.journalText) {
    addJournalEntry(choice.journalText);
  }
}

function choose(choiceId: string) {
  const node = getNode(state.currentNodeId);
  if (!node?.choices) return;
  const choice = node.choices.find((entry) => entry.id === choiceId);
  if (!choice) return;
  if (choice.condition && !choice.condition(state)) {
    pushToast({
      id: `choice-denied-${choice.id}`,
      type: 'failure',
      title: 'Unavailable',
      body: 'You do not meet the requirements for that choice.',
      tone: 'failure',
    });
    return;
  }
  let destination: string | undefined;
  let outcome: 'success' | 'failure' | 'none' = 'none';
  if (choice.skillCheck) {
    const modifier = choice.skillCheck.skill
      ? state.character.skills[choice.skillCheck.skill]
      : Math.floor((state.character.attributes[choice.skillCheck.ability] - 10) / 2);
    const result = rollD20(modifier + (choice.skillCheck.bonus ?? 0));
    const success = result.total >= choice.skillCheck.dc || result.critical === 'success';
    const criticalFailure = result.critical === 'failure';
    const body = `${choice.skillCheck.description ?? 'Skill check'} → Rolled ${result.roll}${
      modifier >= 0 ? ` + ${modifier}` : ` - ${Math.abs(modifier)}`
    } = ${result.total} vs DC ${choice.skillCheck.dc}.`;
    pushToast({
      id: `skill-${choice.id}-${Date.now()}`,
      type: success ? 'success' : 'failure',
      title: success ? 'Check Succeeds' : criticalFailure ? 'Critical Failure!' : 'Check Fails',
      body,
      tone: success ? 'success' : criticalFailure ? 'defeat' : 'failure',
    });
    destination = typeof choice.next === 'string' ? choice.next : success ? choice.next.success : choice.next.failure;
    state = {
      ...state,
      journal: [
        {
          id: `roll-${Date.now()}`,
          timestamp: Date.now(),
          text: `${choice.label} — ${success ? 'Success' : 'Failure'} (Rolled ${result.total}).`,
        },
        ...state.journal,
      ].slice(0, 40),
    };
    outcome = success ? 'success' : 'failure';
  } else {
    destination = typeof choice.next === 'string' ? choice.next : choice.next.success;
  }
  resolveChoice(choice);
  if (choice.achievementId) {
    unlockAchievement(choice.achievementId);
  }
  if (outcome === 'success' && choice.successAchievementId) {
    unlockAchievement(choice.successAchievementId);
  }
  if (outcome === 'failure' && choice.failureAchievementId) {
    unlockAchievement(choice.failureAchievementId);
  }
  if (destination) {
    setCurrentNode(destination);
  } else {
    notify();
  }
}

function heroAttack() {
  const { combat } = state;
  if (!combat.active || combat.turn !== 'hero') return;
  const result = rollD20(combat.hero.attackBonus);
  let logEntry = `${combat.hero.name} rolls ${result.total} to strike.`;
  const enemy = { ...combat.enemy, hp: { ...combat.enemy.hp } };
  if (result.critical === 'success' || result.total >= enemy.ac) {
    const damage = rollDamage(combat.hero.damage) * (result.critical === 'success' ? 2 : 1);
    enemy.hp.current = Math.max(0, enemy.hp.current - damage);
    logEntry += ` Hit for ${damage} damage!`;
  } else {
    logEntry += ' The attack misses.';
  }
  const updatedCombat: CombatState = {
    ...combat,
    enemy,
    log: [...combat.log, logEntry],
    turn: enemy.hp.current <= 0 ? 'hero' : 'enemy',
    heroDefending: false,
  };
  setCombat(updatedCombat);
  if (enemy.hp.current <= 0) {
    concludeCombat(true);
  } else {
    enemyTurn();
  }
}

function heroDefend() {
  const { combat } = state;
  if (!combat.active || combat.turn !== 'hero') return;
  const updatedCombat: CombatState = {
    ...combat,
    heroDefending: true,
    log: [...combat.log, `${combat.hero.name} braces for impact, raising their guard.`],
    turn: 'enemy',
  };
  setCombat(updatedCombat);
  enemyTurn();
}

function heroUseItem() {
  const potion = state.character.inventory.find((item) => item.id === 'healingPotion' && item.quantity > 0);
  const { combat } = state;
  if (!combat.active || combat.turn !== 'hero') return;
  if (!potion) {
    setCombat({ ...combat, log: [...combat.log, 'No healing potions remain!'] });
    return;
  }
  const healAmount = Math.floor(Math.random() * 4 + 1) + Math.floor(Math.random() * 4 + 1) + 2;
  const updatedInventory = state.character.inventory.map((item) =>
    item.id === potion.id ? { ...item, quantity: item.quantity - 1 } : item,
  );
  const newHp = Math.min(state.character.hp.max, state.character.hp.current + healAmount);
  state = {
    ...state,
    character: { ...state.character, hp: { ...state.character.hp, current: newHp }, inventory: updatedInventory },
  };
  const updatedCombat: CombatState = {
    ...combat,
    hero: { ...combat.hero, hp: { ...combat.hero.hp, current: newHp } },
    log: [...combat.log, `${combat.hero.name} drinks a potion and recovers ${healAmount} HP.`],
    turn: 'enemy',
  };
  setCombat(updatedCombat);
  unlockAchievement('secondWind');
  enemyTurn();
}

function heroFlee() {
  const { combat } = state;
  if (!combat.active || combat.turn !== 'hero') return;
  const result = rollD20(state.character.skills.acrobatics);
  const success = result.total >= combat.enemy.ac;
  const logEntry = success
    ? `${combat.hero.name} slips into the mist and escapes the battle!`
    : `${combat.hero.name} fails to disengage and remains locked in combat.`;
  const updatedCombat: CombatState = {
    ...combat,
    log: [...combat.log, logEntry],
    turn: success ? 'hero' : 'enemy',
  };
  setCombat(updatedCombat);
  if (success) {
    concludeCombat(false, combat.defeatNode);
  } else {
    enemyTurn();
  }
}

function enemyTurn() {
  const { combat } = state;
  if (!combat.active || combat.turn !== 'enemy') return;
  const result = rollD20(combat.enemy.attackBonus);
  let logEntry = `${combat.enemy.name} attacks with a roll of ${result.total}.`;
  let heroAc = combat.hero.ac;
  if (combat.heroDefending) {
    heroAc += 2;
    logEntry += ' Your guard grants +2 AC.';
  }
  if (result.critical === 'success' || result.total >= heroAc) {
    const damage = rollDamage(combat.enemy.damage) * (result.critical === 'success' ? 2 : 1);
    const newHp = Math.max(0, state.character.hp.current - damage);
    state = {
      ...state,
      character: { ...state.character, hp: { ...state.character.hp, current: newHp } },
    };
    const combatHp = Math.max(0, combat.hero.hp.current - damage);
    const damageText = result.critical === 'success' ? `Critical hit for ${damage}!` : `Deals ${damage} damage.`;
    logEntry += ` ${damageText}`;
    const updatedCombat: CombatState = {
      ...combat,
      hero: { ...combat.hero, hp: { ...combat.hero.hp, current: combatHp } },
      log: [...combat.log, logEntry],
      turn: 'hero',
      heroDefending: false,
    };
    setCombat(updatedCombat);
    if (combatHp <= 0) {
      concludeCombat(false);
    }
  } else {
    logEntry += ' The attack misses!';
    const updatedCombat: CombatState = {
      ...combat,
      log: [...combat.log, logEntry],
      turn: 'hero',
      heroDefending: false,
    };
    setCombat(updatedCombat);
  }
}

function concludeCombat(victory: boolean, overrideNode?: string) {
  const { combat } = state;
  if (!combat.active) return;
  const destination = victory ? combat.victoryNode : overrideNode ?? combat.defeatNode;
  if (victory) {
    unlockAchievement('loneDuelist');
  }
  const toast: ToastMessage = {
    id: `combat-${combat.encounterId}-${Date.now()}`,
    type: victory ? 'success' : 'failure',
    title: victory ? 'Victory!' : 'Defeat',
    body: victory ? 'You stand triumphant as the enemy falls.' : 'You are overwhelmed. Fate shifts in dark directions.',
    tone: victory ? 'victory' : 'defeat',
  };
  pushToast(toast);
  state = {
    ...state,
    combat: { ...combat, active: false },
  };
  if (destination) {
    setCurrentNode(destination);
  } else {
    notify();
  }
}

function reset() {
  clearPersisted();
  state = buildInitialState();
  applyNodeEnter(getNode(state.currentNodeId));
  notify();
}

export const World = {
  subscribe(listener: Subscriber) {
    subscribers.add(listener);
    listener(deepClone(state));
    return () => {
      subscribers.delete(listener);
    };
  },
  getState(): WorldStateSnapshot {
    return deepClone(state);
  },
  choose,
  heroAttack,
  heroDefend,
  heroUseItem,
  heroFlee,
  reset,
};

// Initialize first node effects
applyNodeEnter(getNode(state.currentNodeId));
notify();
