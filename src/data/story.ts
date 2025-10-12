import type { CombatEncounter, StoryNode } from '../systems/types';

const goblinAmbush: CombatEncounter = {
  id: 'goblin-ambush',
  description: 'A cunning goblin scout lunges from the shadows with a wicked blade.',
  enemy: {
    id: 'goblin-scout',
    name: 'Goblin Scout',
    level: 1,
    maxHP: 10,
    currentHP: 10,
    armorClass: 13,
    attackBonus: 3,
    damage: '1d6+1',
    portrait: '/assets/enemies/goblin.png',
  },
  victoryNode: 'verdyn-road',
  fleeNode: 'tavern-common-room',
  victoryEffects: [
    { type: 'grantGold', amount: 8 },
    {
      type: 'grantItem',
      item: {
        id: 'ember-shard',
        name: 'Ember Shard',
        description: 'A warm fragment of crystal humming with latent fire magic.',
        type: 'trinket',
      },
    },
    {
      type: 'achievement',
      achievement: {
        id: 'first-blood',
        title: 'First Blood',
        description: 'Defeated an enemy in single combat.',
        unlockedAt: Date.now(),
      },
    },
  ],
  defeatEffects: [
    { type: 'modifyHP', delta: -5 },
    { type: 'updateFaction', factionId: 'town-guard', delta: -1 },
    { type: 'setNode', nodeId: 'tavern-common-room' },
  ],
};

export const storyNodes: StoryNode[] = [
  {
    id: 'prologue-awakening',
    title: 'Chronicles Begin',
    summary: 'You awaken to a world poised on the brink of change.',
    body: [
      'Verdyn, frontier of the Ember Wilds, breathes in hues of violet dawn. Your journey begins on a lonely road as the world whispers of danger and opportunity.',
      'As the lone adventurer, you feel the tug of destiny drawing you toward the Ember Rift—a chasm where magic spills like molten light.',
    ],
    background: 'linear-gradient(180deg, rgba(39,22,55,0.9), rgba(12,12,28,0.95))',
    ambient: 'audio/ambience-wind.mp3',
    tags: ['Verdyn Outskirts'],
    choices: [
      {
        id: 'enter-verdyn',
        text: 'Approach the city of Verdyn',
        toNode: 'tavern-common-room',
        effects: [
          {
            type: 'addQuest',
            quest: {
              id: 'ember-rift',
              title: 'Ember Rift Mystery',
              summary: 'Discover why the Ember Rift has begun to pulse with wild magic.',
              status: 'active',
              faction: 'Circle of Embers',
              location: 'Ember Wilds',
              recommendedLevel: 1,
              progress: 0.25,
              objectives: [
                {
                  id: 'verdyn-arrival',
                  description: 'Arrive in Verdyn and gather whispers about the Ember Rift.',
                },
                {
                  id: 'choose-allies',
                  description: "Earn the trust of Verdyn's factions for guidance.",
                },
                {
                  id: 'secure-shard',
                  description: 'Secure an Ember Shard capable of unlocking the Rift.',
                },
              ],
            },
          },
          {
            type: 'log',
            entry: 'Destiny beckons you toward Verdyn and the Ember Rift beyond.',
          },
        ],
      },
    ],
  },
  {
    id: 'tavern-common-room',
    title: 'Emberlight Tavern',
    summary: 'A haven of warmth, rumor, and opportunity.',
    body: [
      'The Emberlight Tavern is alive with lute music and the glow of enchanted lanterns. Patrons share tales of the Ember Rift\'s surging magic.',
      'A hooded figure gestures you closer while the town guard captain watches from the bar.',
    ],
    background: 'url(/assets/backgrounds/tavern.jpg)',
    ambient: 'audio/tavern-chatter.mp3',
    tags: ['Verdyn'],
    choices: [
      {
        id: 'speak-captain',
        text: 'Speak with Captain Thalia of the Verdyn Watch',
        description: 'Offer your aid to the town guard.',
        effects: [
          {
            type: 'updateFaction',
            factionId: 'town-guard',
            delta: 2,
          },
          {
            type: 'log',
            entry: 'You pledged assistance to the Verdyn Watch.',
          },
        ],
        toNode: 'verdyn-road',
      },
      {
        id: 'black-guild',
        text: 'Meet the hooded broker of the Black Guild',
        description: 'Whispers of relics and forbidden lore await.',
        effects: [
          {
            type: 'updateFaction',
            factionId: 'black-guild',
            delta: 2,
          },
          {
            type: 'log',
            entry: 'The Black Guild hints at relics buried in the Ember Wilds.',
          },
        ],
        toNode: 'guild-offer',
      },
      {
        id: 'rest',
        text: 'Take a moment to rest',
        description: 'Restore a portion of your vitality.',
        effects: [{ type: 'modifyHP', delta: 5 }],
        toNode: 'tavern-common-room',
      },
    ],
  },
  {
    id: 'guild-offer',
    title: 'Shadowed Proposal',
    summary: 'The Black Guild offers a perilous contract.',
    body: [
      'The broker slides a parchment across the table. "Retrieve an Ember Shard from the wilds, and the Guild will owe you."',
      'Accepting could earn powerful allies—or dangerous debts.',
    ],
    background: 'linear-gradient(180deg, rgba(35,26,44,0.95), rgba(8,8,18,0.98))',
    ambient: 'audio/whispers.mp3',
    tags: ['Verdyn', 'Black Guild'],
    choices: [
      {
        id: 'accept-guild-contract',
        text: 'Accept the contract',
        effects: [
          {
            type: 'addQuest',
            quest: {
              id: 'guild-contract',
              title: 'Guild Contract: Ember Shard',
              summary: 'Secure an Ember Shard from the wilds for the Black Guild.',
              status: 'active',
              faction: 'Black Guild',
              reward: 'Favor of the Black Guild',
              location: 'Black Guild Network',
              recommendedLevel: 2,
              progress: 0.33,
              objectives: [
                {
                  id: 'accept-contract',
                  description: 'Seal your pact with the Black Guild broker.',
                  completed: true,
                },
                {
                  id: 'retrieve-shard',
                  description: 'Recover an Ember Shard from the Ember Wilds.',
                },
                {
                  id: 'return-to-broker',
                  description: 'Return the shard to the broker to collect your favor.',
                  optional: true,
                },
              ],
            },
          },
        ],
        toNode: 'verdyn-road',
      },
      {
        id: 'decline',
        text: 'Decline politely',
        effects: [
          {
            type: 'updateFaction',
            factionId: 'black-guild',
            delta: -1,
          },
        ],
        toNode: 'tavern-common-room',
      },
    ],
  },
  {
    id: 'verdyn-road',
    title: 'Road to the Ember Wilds',
    summary: 'The wind carries the scent of char and wildflowers.',
    body: [
      'Beyond Verdyn\'s gate, the Ember Wilds stretch across crimson forests and obsidian ridges. Rumors speak of creatures warped by raw magic.',
      'A rustle in the underbrush betrays movement—someone (or something) watches you.',
    ],
    background: 'url(/assets/backgrounds/forest.jpg)',
    ambient: 'audio/wind-forest.mp3',
    tags: ['Ember Wilds'],
    choices: [
      {
        id: 'perception-check',
        text: 'Scan the treeline',
        description: 'Use your perception to spot danger.',
        skillCheck: {
          ability: 'wisdom',
          difficultyClass: 13,
          flavor: 'You narrow your eyes and let instincts guide you.',
          success: {
            resultText: 'You spot a goblin scout readying an ambush.',
            effects: [
              {
                type: 'log',
                entry: 'You anticipated the goblin ambush and took the advantage.',
              },
              {
                type: 'updateFaction',
                factionId: 'town-guard',
                delta: 1,
              },
            ],
            nextNode: 'forest-ambush',
          },
          failure: {
            resultText: 'You miss the subtle clues as the goblin charges!',
            effects: [{ type: 'modifyHP', delta: -2 }],
            nextNode: 'forest-ambush',
          },
        },
      },
      {
        id: 'call-out',
        text: 'Call out to whoever hides',
        description: 'Perhaps diplomacy will win the day.',
        skillCheck: {
          ability: 'charisma',
          difficultyClass: 12,
          success: {
            resultText: 'Your words startle the goblin into parley.',
            effects: [
              {
                type: 'log',
                entry: 'The goblin shares rumors of glowing crystals falling from the sky.',
              },
              {
                type: 'achievement',
                achievement: {
                  id: 'silver-tongue',
                  title: 'Silver Tongue',
                  description: 'Defused a hostile encounter with words.',
                  unlockedAt: Date.now(),
                },
              },
            ],
            nextNode: 'goblin-parley',
          },
          failure: {
            resultText: 'Your shout provokes the goblin to attack!',
            nextNode: 'forest-ambush',
          },
        },
      },
      {
        id: 'press-on',
        text: 'Press onward without caution',
        combat: goblinAmbush,
      },
    ],
  },
  {
    id: 'forest-ambush',
    title: 'Goblin Ambush',
    summary: 'Steel flashes and magic flares.',
    body: [
      'The goblin leaps with a hiss, blade arcing toward you. Battle is inevitable.',
    ],
    background: 'linear-gradient(180deg, rgba(67,28,28,0.9), rgba(18,10,10,0.95))',
    ambient: 'audio/combat-drums.mp3',
    onEnter: [{ type: 'log', entry: 'Combat initiated: Goblin Scout.' }],
    tags: ['Ember Wilds', 'Combat Encounter'],
    choices: [
      {
        id: 'fight',
        text: 'Enter combat stance',
        combat: goblinAmbush,
      },
      {
        id: 'flee',
        text: 'Retreat toward Verdyn',
        toNode: 'tavern-common-room',
        effects: [{ type: 'updateFaction', factionId: 'town-guard', delta: -1 }],
      },
    ],
  },
  {
    id: 'goblin-parley',
    title: 'Unexpected Ally',
    summary: 'Not all goblins serve the darkness.',
    body: [
      'The goblin introduces himself as Skritch, a scout fleeing from warped chieftains. He offers to trade knowledge for safe passage.',
    ],
    background: 'linear-gradient(180deg, rgba(26,44,35,0.9), rgba(8,18,12,0.95))',
    tags: ['Ember Wilds', 'Allies'],
    choices: [
      {
        id: 'trade-info',
        text: 'Trade rations for secrets',
        effects: [
          { type: 'grantGold', amount: -5 },
          {
            type: 'log',
            entry: 'Skritch reveals a hidden path to the Ember Rift gate.',
          },
          {
            type: 'updateQuest',
            questId: 'ember-rift',
            status: 'completed',
            summary: 'Skritch guided you to a secret way into the Ember Rift.',
            progress: 1,
            completeObjectives: ['verdyn-arrival', 'choose-allies', 'secure-shard'],
          },
        ],
        toNode: 'ember-gate',
      },
      {
        id: 'dismiss',
        text: 'Refuse and continue alone',
        toNode: 'verdyn-road',
      },
    ],
  },
  {
    id: 'ember-gate',
    title: 'Gate of Emberlight',
    summary: 'Flames dance along ancient runes as the Rift calls.',
    body: [
      'An enormous gate carved from obsidian and copper bars the way. The runes glow, reacting to the Ember Shard pulsing in your pack.',
      'Your next choice will define the course of your legend.',
    ],
    background: 'url(/assets/backgrounds/gate.jpg)',
    ambient: 'audio/arcane-hum.mp3',
    tags: ['Ember Rift', 'Ancient Ruins'],
    choices: [
      {
        id: 'use-shard',
        text: 'Channel the Ember Shard to open the gate',
        requirements: [{ type: 'item', id: 'ember-shard' }],
        effects: [
          {
            type: 'achievement',
            achievement: {
              id: 'gate-breaker',
              title: 'Gatebreaker',
              description: 'Opened the Ember Gate using ancient magic.',
              unlockedAt: Date.now(),
            },
          },
        ],
        toNode: 'ember-rift-threshold',
      },
      {
        id: 'search-runes',
        text: 'Study the runes for another solution',
        skillCheck: {
          ability: 'intelligence',
          difficultyClass: 14,
          success: {
            resultText: 'You decipher a rune that weakens the seal.',
            effects: [
              {
                type: 'log',
                entry: 'Your knowledge of runes revealed a hidden release sequence.',
              },
            ],
            nextNode: 'ember-rift-threshold',
          },
          failure: {
            resultText: 'The runes flare angrily, searing your hand.',
            effects: [{ type: 'modifyHP', delta: -4 }],
            nextNode: 'verdyn-road',
          },
        },
      },
      {
        id: 'return',
        text: 'Return to Verdyn to prepare more',
        toNode: 'tavern-common-room',
      },
    ],
  },
  {
    id: 'ember-rift-threshold',
    title: 'Threshold of the Rift',
    summary: 'The beginning of countless possibilities.',
    body: [
      'Beyond the gate, a chasm of shimmering embers pulses with life. Pathways of floating stone beckon, each leading toward unknown adventures.',
      'Your chronicle has only begun, yet the world already shifts in response to your legend.',
    ],
    background: 'linear-gradient(180deg, rgba(62,14,46,0.95), rgba(8,6,12,0.95))',
    ambient: 'audio/epic-rise.mp3',
    tags: ['Ember Rift', 'Threshold'],
    choices: [
      {
        id: 'enter-rift',
        text: 'Step into the Ember Rift (Coming Soon)',
        description: 'Future modules will continue your saga.',
        toNode: 'ember-rift-threshold',
      },
      {
        id: 'return-verdyn',
        text: 'Return to Verdyn to regroup',
        toNode: 'tavern-common-room',
      },
    ],
  },
];

const nodesById = new Map(storyNodes.map((node) => [node.id, node] as const));

export function getNodeById(id: string): StoryNode | null {
  return nodesById.get(id) ?? null;
}
