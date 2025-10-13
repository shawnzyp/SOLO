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
        id: 'silkenmail-vest',
        name: 'Silkenmail Vest',
        description: 'Layered silk armor that moves as fluidly as its wearer.',
        type: 'armor',
      },
    ],
    loadouts: [
      {
        id: 'blade-dancer-duelist',
        name: "Duelist's Regalia",
        summary: 'Moonlit sabre paired with ceremonial silkenmail.',
        defaultSelected: true,
        recommendedAbilities: ['dexterity', 'charisma'],
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
            id: 'silkenmail-vest',
            name: 'Silkenmail Vest',
            description: 'Layered silk armor that moves as fluidly as its wearer.',
            type: 'armor',
          },
        ],
      },
      {
        id: 'blade-dancer-shadow',
        name: 'Veiled Skirmisher',
        summary: 'Twin daggers, a shadow-cloak, and tools for infiltration.',
        recommendedAbilities: ['dexterity', 'wisdom'],
        items: [
          {
            id: 'twilight-dagger',
            name: 'Twilight Dagger',
            description: 'A slender blade that fades into the dark when unsheathed.',
            type: 'weapon',
            bonus: {
              ability: 'dexterity',
              value: 1,
            },
          },
          {
            id: 'veil-cloak',
            name: 'Cloak of Veils',
            description: 'A muted cloak used by blade dancers on clandestine missions.',
            type: 'trinket',
          },
          {
            id: 'infiltrators-kit',
            name: "Infiltrator's Kit",
            description: 'Picks, chalk, and garrote wire tucked into hidden pockets.',
            type: 'consumable',
          },
        ],
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
      {
        id: 'ember-focus',
        name: 'Ember Focus',
        description: 'A shard of crystallized flame used to channel spells.',
        type: 'weapon',
      },
    ],
    loadouts: [
      {
        id: 'rift-mage-scholar',
        name: 'Rift Scholar',
        summary: 'Grimoire, arcane focus, and restorative tonics.',
        defaultSelected: true,
        recommendedAbilities: ['intelligence', 'wisdom'],
        items: [
          {
            id: 'grimoire',
            name: 'Grimoire of Embers',
            description: 'Pages flicker with living flame.',
            type: 'trinket',
          },
          {
            id: 'ember-focus',
            name: 'Ember Focus',
            description: 'A shard of crystallized flame used to channel spells.',
            type: 'weapon',
          },
          {
            id: 'rift-tonic',
            name: 'Stabilizing Tonic',
            description: 'A concoction brewed to soothe backlash from chaotic magic.',
            type: 'consumable',
          },
        ],
      },
      {
        id: 'rift-mage-battlemage',
        name: 'Battlemage Armament',
        summary: 'Runed staff, warding mantle, and a clutch of spellshards.',
        recommendedAbilities: ['intelligence', 'constitution'],
        items: [
          {
            id: 'runed-staff',
            name: 'Runed Riftstaff',
            description: 'A staff etched with glyphs that anchor the mage to reality.',
            type: 'weapon',
            bonus: {
              ability: 'intelligence',
              value: 1,
            },
          },
          {
            id: 'warding-mantle',
            name: 'Warding Mantle',
            description: 'A mantle shimmering with latent wards against the void.',
            type: 'armor',
          },
          {
            id: 'spellshards',
            name: 'Spellshard Satchel',
            description: 'Crystalline charges ready to empower destructive invocations.',
            type: 'consumable',
          },
        ],
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
      {
        id: 'oaken-maul',
        name: 'Oaken Maul',
        description: 'A heavy striking weapon hewn from storm-felled timber.',
        type: 'weapon',
      },
    ],
    loadouts: [
      {
        id: 'warden-vanguard',
        name: 'Vanguard Bulwark',
        summary: 'Tower shield, oaken maul, and field rations for long watches.',
        defaultSelected: true,
        recommendedAbilities: ['strength', 'constitution'],
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
            id: 'oaken-maul',
            name: 'Oaken Maul',
            description: 'A heavy striking weapon hewn from storm-felled timber.',
            type: 'weapon',
          },
          {
            id: 'field-rations',
            name: 'Verdyn Field Rations',
            description: 'Hardtack, dried meats, and flasks for frontier patrols.',
            type: 'consumable',
          },
        ],
      },
      {
        id: 'warden-warden-scout',
        name: 'Hinterland Scout',
        summary: 'Longbow, leather mantle, and snare kit for ranged patrols.',
        recommendedAbilities: ['wisdom', 'dexterity'],
        items: [
          {
            id: 'verdyn-longbow',
            name: 'Verdyn Longbow',
            description: 'A recurved bow carved with oath-wood inlays.',
            type: 'weapon',
            bonus: {
              ability: 'dexterity',
              value: 1,
            },
          },
          {
            id: 'leather-mantle',
            name: 'Leather Mantle',
            description: 'Supple armor favored by scouts who range ahead of the wardens.',
            type: 'armor',
          },
          {
            id: 'snare-kit',
            name: 'Snare Kit',
            description: 'Wire loops and spikes for trapping beasts or saboteurs.',
            type: 'consumable',
          },
        ],
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
    equipment: [
      {
        id: 'noble-seal',
        name: 'Family Signet & Papers',
        description: 'A wax seal and writ proving your claim among distant courts.',
        defaultSelected: true,
        items: [
          {
            id: 'signet-ring',
            name: 'Signet Ring of Verdelle',
            description: 'A ring bearing the crest you once defended.',
            type: 'trinket',
          },
          {
            id: 'courtly-attire',
            name: 'Courtly Attire',
            description: 'Elegant clothing suitable for an audience with nobles.',
            type: 'armor',
          },
        ],
      },
      {
        id: 'noble-retainer',
        name: 'Retainer Stipend',
        description: 'Coin and letters of credit entrusted to loyal retainers.',
        items: [
          {
            id: 'retainer-stipend',
            name: 'Retainer Stipend',
            description: 'A small chest containing 25 gold earmarked for companions.',
            type: 'consumable',
          },
        ],
      },
    ],
  },
  {
    id: 'wild-scout',
    name: 'Wild Scout',
    description: 'You hunted and foraged alone across the Ember Wilds.',
    feature: 'Advantage to track beasts and navigate the wilds.',
    equipment: [
      {
        id: 'scout-survival',
        name: 'Survival Pack',
        description: 'Bedroll, flint, and snares gathered from your travels.',
        defaultSelected: true,
        items: [
          {
            id: 'bedroll',
            name: 'Weathered Bedroll',
            description: 'Keeps you warm through the coldest Ember Wild nights.',
            type: 'trinket',
          },
          {
            id: 'hunting-traps',
            name: 'Hunting Traps',
            description: 'Wire snares and carved stakes for small game.',
            type: 'consumable',
          },
        ],
      },
      {
        id: 'scout-companion',
        name: 'Companion Charms',
        description: 'Totems and treats for befriending wild companions.',
        items: [
          {
            id: 'animal-totems',
            name: 'Totems of the Trail',
            description: 'Carved fetishes depicting the spirits who guided you.',
            type: 'trinket',
          },
        ],
      },
    ],
  },
  {
    id: 'arcane-apprentice',
    name: 'Arcane Apprentice',
    description: 'Once tutored by the Circle of Embers.',
    feature: 'You recognize arcane symbols and relics with ease.',
    equipment: [
      {
        id: 'apprentice-satchel',
        name: 'Apprentice Satchel',
        description: 'Spell components, inks, and a battered quill case.',
        defaultSelected: true,
        items: [
          {
            id: 'component-pouch',
            name: 'Component Pouch',
            description: 'A pouch brimming with powdered reagents and crystals.',
            type: 'consumable',
          },
          {
            id: 'scribe-kit',
            name: 'Scribe Kit',
            description: 'Inks, quills, and parchment for recording your studies.',
            type: 'trinket',
          },
        ],
      },
      {
        id: 'apprentice-tutelage',
        name: 'Circle Tutelage Notes',
        description: 'Scrolls detailing the cantrips gifted by your mentor.',
        items: [
          {
            id: 'tutelage-scroll',
            name: 'Scroll of Mentored Cantrip',
            description: 'A scroll containing a minor spell of the Circle of Embers.',
            type: 'consumable',
          },
        ],
      },
    ],
  },
];
