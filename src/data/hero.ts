import type { HeroBackgroundOption, HeroClassOption } from '../systems/types';

export const BASE_HERO_CLASSES: HeroClassOption[] = [
  {
    id: 'blade-dancer',
    name: 'Blade Dancer',
    description: 'An agile duelist who channels grace into deadly strikes.',
    bonuses: {
      dexterity: 2,
      charisma: 1,
    },
    loadouts: [
      {
        id: 'blade-dancer-duelist',
        name: "Duelist's Finery",
        description: 'Graceful gear tailored for open-floor duels.',
        items: [
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
          {
            id: 'starlit-veil',
            name: 'Starlit Veil',
            description: 'A gleaming cloak that flares to deflect blows.',
            type: 'armor',
            bonus: {
              ability: 'charisma',
              value: 1,
            },
          },
        ],
      },
      {
        id: 'blade-dancer-shadow',
        name: 'Shadow Ambusher',
        description: 'Lightweight blades and tools for surprise attacks.',
        items: [
          {
            id: 'twin-daggers',
            name: 'Twin Crescent Daggers',
            description: 'Matched blades balanced for rapid strikes.',
            type: 'weapon',
            bonus: {
              ability: 'dexterity',
              value: 1,
            },
          },
          {
            id: 'silent-step-boots',
            name: 'Silent-Step Boots',
            description: 'Boots lined with whisperleaf to dampen every footfall.',
            type: 'trinket',
            bonus: {
              ability: 'dexterity',
              value: 1,
            },
          },
        ],
      },
    ],
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
      {
        id: 'starlit-veil',
        name: 'Starlit Veil',
        description: 'A gleaming cloak that flares to deflect blows.',
        type: 'armor',
        bonus: {
          ability: 'charisma',
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
    loadouts: [
      {
        id: 'rift-mage-ritualist',
        name: 'Ritualist Satchel',
        description: 'Implements for measured spellcraft.',
        items: [
          {
            id: 'grimoire',
            name: 'Grimoire of Embers',
            description: 'Pages flicker with living flame.',
            type: 'trinket',
          },
          {
            id: 'ember-focus',
            name: 'Crystallized Ember Focus',
            description: 'A focus shard that steadies volatile rift energy.',
            type: 'trinket',
            bonus: {
              ability: 'wisdom',
              value: 1,
            },
          },
        ],
      },
      {
        id: 'rift-mage-battlemage',
        name: 'Battlemage Cache',
        description: 'Armaments for spellcasters who stand on the front line.',
        items: [
          {
            id: 'arcane-staff',
            name: 'Arc-Singed Staff',
            description: 'A staff crackling with runic wards.',
            type: 'weapon',
            bonus: {
              ability: 'intelligence',
              value: 1,
            },
          },
          {
            id: 'volatile-tonic',
            name: 'Volatile Tonic',
            description: 'A single-use draught that restores spell stamina.',
            type: 'consumable',
          },
        ],
      },
    ],
    startingItems: [
      {
        id: 'grimoire',
        name: 'Grimoire of Embers',
        description: 'Pages flicker with living flame.',
        type: 'trinket',
      },
      {
        id: 'ember-focus',
        name: 'Crystallized Ember Focus',
        description: 'A focus shard that steadies volatile rift energy.',
        type: 'trinket',
        bonus: {
          ability: 'wisdom',
          value: 1,
        },
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
    loadouts: [
      {
        id: 'warden-guardian',
        name: 'Guardian Bulwark',
        description: 'Heavy armor favored by oathbound sentinels.',
        items: [
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
          {
            id: 'oathbreaker-maul',
            name: 'Oathbreaker Maul',
            description: 'A weighty hammer that keeps foes at bay.',
            type: 'weapon',
          },
        ],
      },
      {
        id: 'warden-vanguard',
        name: 'Vanguard Pursuit',
        description: 'Lean kit for Wardens who hunt threats beyond the walls.',
        items: [
          {
            id: 'warden-spear',
            name: 'Verdyn Pursuer Spear',
            description: 'Balanced spear etched with warding runes.',
            type: 'weapon',
            bonus: {
              ability: 'strength',
              value: 1,
            },
          },
          {
            id: 'hunter-cloak',
            name: 'Huntercloak Mantle',
            description: 'Weathered mantle that muffles armor clatter.',
            type: 'trinket',
          },
        ],
      },
    ],
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
      {
        id: 'oathbreaker-maul',
        name: 'Oathbreaker Maul',
        description: 'A weighty hammer that keeps foes at bay.',
        type: 'weapon',
      },
    ],
  },
];

export const BASE_HERO_BACKGROUNDS: HeroBackgroundOption[] = [
  {
    id: 'exiled-noble',
    name: 'Exiled Noble',
    description: 'Banished for defying corrupt tradition.',
    feature: 'Gain +1 reputation with any lawful faction after aiding them.',
    startingItems: [
      {
        id: 'signet-ring',
        name: 'Signet Ring of House Verdyn',
        description: 'Proof of a title stripped but not forgotten.',
        type: 'trinket',
      },
      {
        id: 'brocade-coat',
        name: 'Brocade Coat',
        description: 'Fine attire that marks your noble upbringing.',
        type: 'armor',
      },
    ],
  },
  {
    id: 'wild-scout',
    name: 'Wild Scout',
    description: 'You hunted and foraged alone across the Ember Wilds.',
    feature: 'Advantage to track beasts and navigate the wilds.',
    startingItems: [
      {
        id: 'trailbow',
        name: 'Trailbow',
        description: 'A short bow crafted from emberwood, ideal for ambushes.',
        type: 'weapon',
      },
      {
        id: 'foragers-pack',
        name: "Forager's Pack",
        description: 'Tools and herbs that extend your self-sufficiency.',
        type: 'consumable',
      },
    ],
  },
  {
    id: 'arcane-apprentice',
    name: 'Arcane Apprentice',
    description: 'Once tutored by the Circle of Embers.',
    feature: 'You recognize arcane symbols and relics with ease.',
    startingItems: [
      {
        id: 'apprentice-robes',
        name: 'Apprentice Robes',
        description: 'Lightweight robes lined with arcane sigils.',
        type: 'armor',
      },
      {
        id: 'glyph-kit',
        name: 'Glyph Etching Kit',
        description: 'Tools and inks for inscribing temporary wards.',
        type: 'trinket',
      },
    ],
  },
];
