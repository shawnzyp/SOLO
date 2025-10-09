import type { Hero } from './types';
import type { HeroRaceOption } from '../data/races';
import type { HeroBackgroundOption, HeroClassOption, Ability, Skill } from './types';
import { HERO_CLASSES } from '../data/hero';
import { HERO_BACKGROUNDS } from '../data/hero';
import { HERO_RACES } from '../data/races';
import { SKILLS } from './types';

export interface HeroCreationOptions {
  name: string;
  portrait: string;
  raceId: string;
  classId: string;
  backgroundId: string;
}

const BASE_ATTRIBUTES: Record<Ability, number> = {
  strength: 12,
  dexterity: 12,
  constitution: 12,
  intelligence: 12,
  wisdom: 12,
  charisma: 12,
};

const CLASS_SKILL_FOCUS: Record<string, Skill[]> = {
  'blade-dancer': ['acrobatics', 'stealth', 'persuasion'],
  'rift-mage': ['arcana', 'history', 'insight'],
  warden: ['athletics', 'survival', 'perception'],
};

export function createHero(options: HeroCreationOptions): Hero {
  const heroClass = HERO_CLASSES.find((entry) => entry.id === options.classId);
  const background = HERO_BACKGROUNDS.find((entry) => entry.id === options.backgroundId);
  const race = HERO_RACES.find((entry) => entry.id === options.raceId);

  if (!heroClass || !background || !race) {
    throw new Error('Invalid hero creation data.');
  }

  const attributes: Record<Ability, number> = { ...BASE_ATTRIBUTES };

  Object.entries(race.bonuses).forEach(([ability, value]) => {
    attributes[ability as Ability] += value ?? 0;
  });
  Object.entries(heroClass.bonuses).forEach(([ability, value]) => {
    attributes[ability as Ability] += value ?? 0;
  });

  const skills: Record<Skill, number> = SKILLS.reduce((acc, skill) => {
    const abilityScore = attributes[skill.ability];
    const abilityModifier = Math.floor((abilityScore - 10) / 2);
    const isFocused = CLASS_SKILL_FOCUS[heroClass.id]?.includes(skill.id) ?? false;
    acc[skill.id] = abilityModifier + (isFocused ? 2 : 0);
    return acc;
  }, {} as Record<Skill, number>);

  const constitutionModifier = Math.floor((attributes.constitution - 10) / 2);
  const baseHP = heroClass.id === 'warden' ? 14 : heroClass.id === 'rift-mage' ? 10 : 12;
  const maxHP = baseHP + constitutionModifier * 2;
  const dexModifier = Math.floor((attributes.dexterity - 10) / 2);
  const armorBonus = heroClass.startingItems.some((item) => item.type === 'armor') ? 2 : 0;
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
    inventory: [...heroClass.startingItems],
    gold: 25,
  };
}

export function listHeroRaces(): HeroRaceOption[] {
  return HERO_RACES;
}

export function listHeroClasses(): HeroClassOption[] {
  return HERO_CLASSES;
}

export function listHeroBackgrounds(): HeroBackgroundOption[] {
  return HERO_BACKGROUNDS;
}
