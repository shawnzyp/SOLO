import type { Hero } from './types';
import type { HeroRaceOption } from '../data/races';
import type {
  HeroBackgroundOption,
  HeroClassOption,
  Ability,
  Skill,
} from './types';
import { BASE_HERO_CLASSES, BASE_HERO_BACKGROUNDS } from '../data/hero';
import { BASE_HERO_RACES } from '../data/races';
import { SKILLS } from './types';
import { fetchSrdHeroOptions } from './dnd5e';

type HeroClassRegistration = HeroClassOption & { skillFocus?: Skill[] };

type HeroOptionListener = (snapshot: HeroOptionSnapshot) => void;

export interface HeroOptionSnapshot {
  races: HeroRaceOption[];
  classes: HeroClassOption[];
  backgrounds: HeroBackgroundOption[];
}

const heroOptionListeners = new Set<HeroOptionListener>();

let heroRaces: HeroRaceOption[] = [...BASE_HERO_RACES];
let heroClasses: HeroClassOption[] = [...BASE_HERO_CLASSES];
let heroBackgrounds: HeroBackgroundOption[] = [...BASE_HERO_BACKGROUNDS];

const classSkillFocus = new Map<string, Skill[]>([
  ['blade-dancer', ['acrobatics', 'stealth', 'persuasion']],
  ['rift-mage', ['arcana', 'history', 'insight']],
  ['warden', ['athletics', 'survival', 'perception']],
]);

const abilitySkillLookup: Record<Ability, Skill[]> = {
  strength: ['athletics'],
  dexterity: ['acrobatics', 'stealth'],
  constitution: ['athletics'],
  intelligence: ['arcana', 'history'],
  wisdom: ['insight', 'perception', 'survival'],
  charisma: ['persuasion'],
};

const BASE_ATTRIBUTES: Record<Ability, number> = {
  strength: 12,
  dexterity: 12,
  constitution: 12,
  intelligence: 12,
  wisdom: 12,
  charisma: 12,
};

function notifyHeroOptionListeners(): void {
  const snapshot = getHeroOptionSnapshot();
  heroOptionListeners.forEach((listener) => listener(snapshot));
}

function mergeOptionList<T extends { id: string; name: string }>(
  current: T[],
  additions: T[],
): { list: T[]; changed: boolean } {
  if (additions.length === 0) {
    return { list: current, changed: false };
  }

  const next = new Map(current.map((entry) => [entry.id, entry] as const));
  let changed = false;

  for (const addition of additions) {
    const existing = next.get(addition.id);
    if (!existing) {
      next.set(addition.id, addition);
      changed = true;
      continue;
    }

    const serializedExisting = JSON.stringify(existing);
    const serializedIncoming = JSON.stringify(addition);
    if (serializedExisting !== serializedIncoming) {
      next.set(addition.id, { ...existing, ...addition });
      changed = true;
    }
  }

  if (!changed) {
    return { list: current, changed: false };
  }

  const sorted = Array.from(next.values()).sort((a, b) => a.name.localeCompare(b.name));
  return { list: sorted, changed: true };
}

function stripSkillFocus(entry: HeroClassRegistration): HeroClassOption {
  const { skillFocus, ...rest } = entry;
  return rest;
}

function inferSkillFocusFromClass(entry: HeroClassOption): Skill[] {
  const bonuses = entry.bonuses ?? {};
  const rankedAbilities = Object.entries(bonuses)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
    .map(([ability]) => ability as Ability);

  const collected: Skill[] = [];
  for (const ability of rankedAbilities) {
    const relevant = abilitySkillLookup[ability] ?? [];
    for (const skill of relevant) {
      if (!collected.includes(skill)) {
        collected.push(skill);
      }
      if (collected.length >= 3) {
        return collected.slice(0, 3);
      }
    }
  }

  // Fallback focus if no bonuses are present.
  const defaults: Skill[] = ['athletics', 'perception', 'persuasion'];
  for (const skill of defaults) {
    if (!collected.includes(skill)) {
      collected.push(skill as Skill);
    }
    if (collected.length >= 3) {
      break;
    }
  }

  return collected.slice(0, 3);
}

function registerClassFocus(entry: HeroClassRegistration): void {
  if (entry.skillFocus && entry.skillFocus.length > 0) {
    classSkillFocus.set(entry.id, entry.skillFocus);
    return;
  }

  if (!classSkillFocus.has(entry.id)) {
    classSkillFocus.set(entry.id, inferSkillFocusFromClass(entry));
  }
}

export function registerHeroRaces(entries: HeroRaceOption[]): void {
  const { list, changed } = mergeOptionList(heroRaces, entries);
  if (!changed) return;
  heroRaces = list;
  notifyHeroOptionListeners();
}

export function registerHeroClasses(entries: HeroClassRegistration[]): void {
  const sanitized = entries.map(stripSkillFocus);
  const { list, changed } = mergeOptionList(heroClasses, sanitized);
  let focusChanged = false;

  entries.forEach((entry) => {
    const serializedExisting = JSON.stringify(classSkillFocus.get(entry.id) ?? []);
    registerClassFocus(entry);
    const serializedIncoming = JSON.stringify(classSkillFocus.get(entry.id) ?? []);
    if (serializedExisting !== serializedIncoming) {
      focusChanged = true;
    }
  });

  if (!changed && !focusChanged) return;
  if (changed) {
    heroClasses = list;
  }
  notifyHeroOptionListeners();
}

export function registerHeroBackgrounds(entries: HeroBackgroundOption[]): void {
  const { list, changed } = mergeOptionList(heroBackgrounds, entries);
  if (!changed) return;
  heroBackgrounds = list;
  notifyHeroOptionListeners();
}

export function registerHeroContentModule(module: {
  id: string;
  name: string;
  races?: HeroRaceOption[];
  classes?: HeroClassRegistration[];
  backgrounds?: HeroBackgroundOption[];
}): void {
  if (module.races) {
    registerHeroRaces(module.races);
  }
  if (module.classes) {
    registerHeroClasses(module.classes);
  }
  if (module.backgrounds) {
    registerHeroBackgrounds(module.backgrounds);
  }
}

export function getHeroOptionSnapshot(): HeroOptionSnapshot {
  return {
    races: [...heroRaces],
    classes: [...heroClasses],
    backgrounds: [...heroBackgrounds],
  };
}

export function subscribeHeroOptions(listener: HeroOptionListener): () => void {
  heroOptionListeners.add(listener);
  return () => {
    heroOptionListeners.delete(listener);
  };
}

export async function loadSrdHeroOptions(signal?: AbortSignal): Promise<void> {
  const content = await fetchSrdHeroOptions(signal);
  registerHeroRaces(content.races);
  registerHeroClasses(content.classes.map((entry) => ({ ...entry, skillFocus: inferSkillFocusFromClass(entry) })));
  registerHeroBackgrounds(content.backgrounds);
}

export function listHeroRaces(): HeroRaceOption[] {
  return [...heroRaces];
}

export function listHeroClasses(): HeroClassOption[] {
  return [...heroClasses];
}

export function listHeroBackgrounds(): HeroBackgroundOption[] {
  return [...heroBackgrounds];
}

export interface HeroCreationOptions {
  name: string;
  portrait: string;
  raceId: string;
  classId: string;
  backgroundId: string;
  baseAbilities: Record<Ability, number>;
  loadoutId?: string | null;
  includeBackgroundKit?: boolean;
}

const CLASS_HIT_POINTS: Record<string, number> = {
  'srd-barbarian': 14,
  'srd-bard': 10,
  'srd-cleric': 12,
  'srd-druid': 10,
  'srd-fighter': 12,
  'srd-monk': 10,
  'srd-paladin': 12,
  'srd-ranger': 12,
  'srd-rogue': 10,
  'srd-sorcerer': 8,
  'srd-warlock': 10,
  'srd-wizard': 8,
  'blade-dancer': 12,
  'rift-mage': 10,
  warden: 14,
};

export function createHero(options: HeroCreationOptions): Hero {
  const heroClass = heroClasses.find((entry) => entry.id === options.classId);
  const background = heroBackgrounds.find((entry) => entry.id === options.backgroundId);
  const race = heroRaces.find((entry) => entry.id === options.raceId);

  if (!heroClass || !background || !race) {
    throw new Error('Invalid hero creation data.');
  }

  const attributes: Record<Ability, number> = { ...BASE_ATTRIBUTES };

  Object.entries(options.baseAbilities ?? {}).forEach(([ability, value]) => {
    const key = ability as Ability;
    if (typeof value === 'number' && Number.isFinite(value)) {
      attributes[key] = Math.max(1, Math.floor(value));
    }
  });

  Object.entries(race.bonuses ?? {}).forEach(([ability, value]) => {
    attributes[ability as Ability] += value ?? 0;
  });
  Object.entries(heroClass.bonuses ?? {}).forEach(([ability, value]) => {
    attributes[ability as Ability] += value ?? 0;
  });

  const focusSkills = classSkillFocus.get(heroClass.id) ?? [];

  const loadouts = heroClass.loadouts && heroClass.loadouts.length > 0
    ? heroClass.loadouts
    : heroClass.startingItems
      ? [
          {
            id: `${heroClass.id}-default-loadout`,
            name: `${heroClass.name} Standard`,
            items: heroClass.startingItems,
          },
        ]
      : [];

  const selectedLoadout = loadouts.find((entry) => entry.id === options.loadoutId);
  const classItems = selectedLoadout?.items ?? loadouts[0]?.items ?? heroClass.startingItems ?? [];
  const includeBackgroundKit = options.includeBackgroundKit !== false;
  const backgroundItems = includeBackgroundKit ? background.startingItems ?? [] : [];
  const inventory = [...classItems, ...backgroundItems];

  const skills: Record<Skill, number> = SKILLS.reduce((acc, skill) => {
    const abilityScore = attributes[skill.ability];
    const abilityModifier = Math.floor((abilityScore - 10) / 2);
    const isFocused = focusSkills.includes(skill.id);
    acc[skill.id] = abilityModifier + (isFocused ? 2 : 0);
    return acc;
  }, {} as Record<Skill, number>);

  const constitutionModifier = Math.floor((attributes.constitution - 10) / 2);
  const baseHP = CLASS_HIT_POINTS[heroClass.id] ?? 12;
  const maxHP = Math.max(baseHP + constitutionModifier * 2, baseHP);
  const dexModifier = Math.floor((attributes.dexterity - 10) / 2);
  const armorBonus = inventory.some((item) => item.type === 'armor') ? 2 : 0;
  const armorClass = 10 + dexModifier + armorBonus;

  return {
    name: options.name,
    race: race.name,
    heroClass,
    background,
    portrait: options.portrait,
    level: 1,
    experience: 0,
    attributes,
    skills,
    maxHP,
    currentHP: maxHP,
    armorClass,
    inventory,
    gold: 25,
  };
}
