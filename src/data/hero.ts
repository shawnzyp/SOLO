import type { HeroBackgroundOption, HeroClassOption } from '../systems/types';

export const HERO_CLASSES: HeroClassOption[] = [
  {
    id: 'blade-dancer',
    name: 'Blade Dancer',
    description: 'An agile duelist who channels grace into deadly strikes.',
    bonuses: {
      dexterity: 2,
      charisma: 1,
    },
    startingItems: [
      {
        id: 'sabre',
        name: 'Moonlit Sabre',
        description: 'A curved blade forged from star-steel.',
        type: 'weapon',
        bonus: {
          ability: 'dexterity',
          value: 1,
        },
      },
    ],
  },
  {
    id: 'rift-mage',
    name: 'Rift Mage',
    description: 'A scholar of the Ember Rift wielding unstable spells.',
    bonuses: {
      intelligence: 2,
      wisdom: 1,
    },
    startingItems: [
      {
        id: 'grimoire',
        name: 'Grimoire of Embers',
        description: 'Pages flicker with living flame.',
        type: 'trinket',
      },
    ],
  },
  {
    id: 'warden',
    name: 'Warden',
    description: 'A stalwart defender attuned to ancient oaths.',
    bonuses: {
      strength: 2,
      constitution: 1,
    },
    startingItems: [
      {
        id: 'tower-shield',
        name: 'Verdyn Tower Shield',
        description: 'Shield emblazoned with the Verdyn watch sigil.',
        type: 'armor',
        bonus: {
          ability: 'constitution',
          value: 1,
        },
      },
    ],
  },
];

export const HERO_BACKGROUNDS: HeroBackgroundOption[] = [
  {
    id: 'exiled-noble',
    name: 'Exiled Noble',
    description: 'Banished for defying corrupt tradition.',
    feature: 'Gain +1 reputation with any lawful faction after aiding them.',
  },
  {
    id: 'wild-scout',
    name: 'Wild Scout',
    description: 'You hunted and foraged alone across the Ember Wilds.',
    feature: 'Advantage to track beasts and navigate the wilds.',
  },
  {
    id: 'arcane-apprentice',
    name: 'Arcane Apprentice',
    description: 'Once tutored by the Circle of Embers.',
    feature: 'You recognize arcane symbols and relics with ease.',
  },
];
