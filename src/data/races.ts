import type { Ability } from '../systems/types';

export interface HeroRaceOption {
  id: string;
  name: string;
  description: string;
  bonuses: Partial<Record<Ability, number>>;
}

export const BASE_HERO_RACES: HeroRaceOption[] = [
  {
    id: 'human',
    name: 'Human',
    description: 'Versatile and adaptive wanderers of every land.',
    bonuses: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    },
  },
  {
    id: 'elf',
    name: 'High Elf',
    description: 'Graceful scholars attuned to magic and the wilds.',
    bonuses: {
      dexterity: 2,
      intelligence: 1,
      wisdom: 1,
    },
  },
  {
    id: 'dwarf',
    name: 'Ember Dwarf',
    description: 'Forged in subterranean fires, resilient and steadfast.',
    bonuses: {
      constitution: 2,
      strength: 1,
    },
  },
];
