import type { MutableWorldState, StoryNode } from './types';

const updateQuest = (questId: string, status: 'active' | 'completed' | 'failed', progress?: string) =>
  (state: MutableWorldState) => state.updateQuest({ questId, status, progress });

export const STORY_NODES: StoryNode[] = [
  {
    id: 'intro',
    title: 'Whispers Beneath the Embered Veil',
    location: 'The Gilded Griffin Tavern',
    ambiance: 'tavern',
    background: 'tavern',
    narrative: [
      'In the heart of Emberfall, the night market hums with secrets. Beneath lanterns painted with dragonfire sigils, whispers coil around your table like smoke.',
      'A courier from the Circle of Embers slides a vellum envelope before you. The seal bears the mark of the Lone Adventurer—a title you earned through trials and scars.',
      'The missive speaks of a ritual deep within the Duskfen Forest, where a shard of imprisoned starlight threatens to shatter its bonds. The Circle pleads for your intervention before rival factions claim it for war.',
    ],
    choices: [
      {
        id: 'intro_perception',
        label: 'Survey the tavern patrons for hidden agents',
        hint: 'Perception (DC 13)',
        skillCheck: { ability: 'wisdom', skill: 'perception', dc: 13, description: 'You scan for anyone tracking the courier.' },
        next: { success: 'guild_offer', failure: 'street_alarm' },
        journalText: 'You studied the Griffin\'s patrons for unusual movements.',
      },
      {
        id: 'intro_accept',
        label: 'Accept the Circle\'s charge and depart immediately',
        hint: 'Gain faction favor',
        reputationDelta: { circle: 5 },
        next: 'wilderness',
        journalText: 'You pledged to defend the shard before rivals arrive.',
        questUpdate: { questId: 'emberShard', progress: 'Departed Emberfall for the Duskfen Forest.' },
      },
    ],
  },
  {
    id: 'guild_offer',
    title: 'Eyes of the Black Guild',
    location: 'Shadowed Alcove',
    ambiance: 'city',
    background: 'gloom',
    narrative: [
      'Your trained gaze spots a figure cloaked in onyx leather, sigils of the Black Guild glinting beneath their cloak. They raise a goblet in acknowledgement, inviting parley.',
      'The agent proposes an alliance: share the shard, and the Guild will ensure no blood is spilled in Emberfall—so long as you owe them a favor yet to be named.',
    ],
    choices: [
      {
        id: 'guild_decline',
        label: 'Decline the bargain and remain loyal to the Circle',
        next: 'wilderness',
        reputationDelta: { circle: 3, blackGuild: -3 },
        journalText: 'You turned down the Guild and reaffirmed your oath to the Circle of Embers.',
      },
      {
        id: 'guild_accept',
        label: 'Strike a covert accord with the Black Guild',
        hint: 'Requires neutral or better reputation with the Black Guild',
        condition: (state) => (state.character.factions.blackGuild ?? 0) >= 0,
        next: 'wilderness',
        reputationDelta: { blackGuild: 5, circle: -5 },
        questUpdate: { questId: 'guildFavor', status: 'active', progress: 'You owe a favor to the Black Guild.' },
        journalText: 'You sealed a secret pact with the Black Guild before venturing forth.',
      },
    ],
    onEnter: updateQuest('emberShard', 'active', 'Uncovered Black Guild interest in the shard.'),
  },
  {
    id: 'street_alarm',
    title: 'A Stir in the Streets',
    location: 'Moonlit Alley',
    ambiance: 'city',
    background: 'gloom',
    narrative: [
      'You spot movement—too late. A guild cutpurse bolts into the alley, alarm raised. The Circle loses a measure of confidence in your subtlety.',
      'The courier urges haste before the Guild tightens its net around the Duskfen approaches.',
    ],
    choices: [
      {
        id: 'street_depart',
        label: 'Push through the crowd and ride for the forest',
        next: 'wilderness',
        reputationDelta: { circle: -2, blackGuild: 2 },
        journalText: 'Black Guild eyes followed your departure into the night.',
      },
    ],
    onEnter: updateQuest('emberShard', 'active', 'The Black Guild now watches the roads to Duskfen.'),
  },
  {
    id: 'wilderness',
    title: 'Approach to the Duskfen',
    location: 'Forest Edge',
    ambiance: 'wilderness',
    background: 'forest',
    narrative: [
      'Fog clings to twisted trees as you enter the Duskfen. Embermotes drift on the air, sparks from the imprisoned starlight ahead.',
      'Tracks reveal you are not alone—the Black Guild hunts the shard as well. You ready your blade as a shadow detaches from the mire.',
    ],
    choices: [
      {
        id: 'wilderness_prepare',
        label: 'Ready for the ambush and charge',
        next: 'ambush',
        journalText: 'Steel drawn, you advanced into the Duskfen ambush.',
      },
      {
        id: 'wilderness_scout',
        label: 'Attempt to sneak around the ambush site',
        hint: 'Stealth (DC 14)',
        skillCheck: { ability: 'dexterity', skill: 'stealth', dc: 14, description: 'You melt into the fog, seeking a vantage.' },
        next: { success: 'ritual_site', failure: 'ambush' },
        journalText: 'You tried to outmaneuver the ambushers.',
      },
    ],
    onEnter: updateQuest('emberShard', 'active', 'Entered the Duskfen Forest in pursuit of the shard.'),
  },
  {
    id: 'ambush',
    title: 'Steel in the Mist',
    location: 'Duskfen Clearing',
    ambiance: 'combat',
    background: 'forest',
    narrative: [
      'A Black Guild enforcer lunges from the mist, twin blades swirling with alchemical sparks. The duel for the shard begins.',
    ],
    encounter: {
      id: 'blackGuildEnforcer',
      description: 'A disciplined rogue of the Black Guild, adept at exploiting openings.',
      enemy: {
        name: 'Black Guild Enforcer',
        hp: { current: 18, max: 18 },
        ac: 14,
        attackBonus: 5,
        damage: '1d8+3',
        portrait: '🤺',
      },
      victoryNode: 'ritual_site',
      defeatNode: 'defeat',
    },
  },
  {
    id: 'ritual_site',
    title: 'The Shard\'s Resonance',
    location: 'Ancient Stone Circle',
    ambiance: 'ritual',
    background: 'ruins',
    narrative: [
      'An obsidian monolith pulses with caged starlight. Circle druids chant a warding litany, relieved at your arrival. The shard sings—a melody that promises both salvation and ruin.',
      'With the enforcer defeated or evaded, you may sanctify the shard or harness it for your own ascent.',
    ],
    choices: [
      {
        id: 'ritual_sanctify',
        label: 'Sanctify the shard with the Circle of Embers',
        next: 'victory',
        reputationDelta: { circle: 10 },
        questUpdate: { questId: 'emberShard', status: 'completed', progress: 'You consecrated the shard to the Circle.' },
        reward: { xp: 250 },
        journalText: 'You consecrated the shard, preserving balance in Emberfall.',
      },
      {
        id: 'ritual_channel',
        label: 'Channel the shard\'s power alone',
        hint: 'Arcana (DC 15)',
        skillCheck: { ability: 'intelligence', skill: 'arcana', dc: 15, description: 'You weave sigils to bind the shard to your will.' },
        next: { success: 'ascendant', failure: 'defeat' },
        reputationDelta: { circle: -8, blackGuild: 4 },
        reward: { xp: 400, itemId: 'emberSigil' },
        journalText: 'You dared to wield the shard\'s raw light.',
      },
    ],
  },
  {
    id: 'ascendant',
    title: 'Ascendant Ember',
    location: 'Starlit Nexus',
    ambiance: 'ritual',
    background: 'ruins',
    narrative: [
      'Power floods your veins as the shard bows to your command. Factions will tremble, but for now the light obeys.',
      'The Circle eyes you warily even as some kneel; the Black Guild whispers of a new force in Emberfall.',
    ],
    onEnter: (state) => {
      state.adjustExperience(500);
      state.addJournalEntry('You seized the shard and reshaped destiny. A new legend ignites.');
    },
  },
  {
    id: 'victory',
    title: 'Guardian of Emberfall',
    location: 'Circle Sanctum',
    ambiance: 'ritual',
    background: 'ruins',
    narrative: [
      'The Circle crowns you Guardian of Emberfall. Songs ripple through the sanctum as the shard\'s radiance is contained once more.',
      'Your legend grows, and Emberfall sleeps safely beneath your vigil—for now.',
    ],
    onEnter: (state) => {
      state.adjustExperience(350);
      state.addJournalEntry('Emberfall hails you as guardian and savior.');
    },
  },
  {
    id: 'defeat',
    title: 'Echoes of Failure',
    location: 'Shattered Grove',
    ambiance: 'ritual',
    background: 'gloom',
    narrative: [
      'Pain blossoms as the shard slips from your grasp. The Black Guild melts into the night with stolen starlight while the Circle cries out in despair.',
      'Dark omens stir above Emberfall. Yet failure writes its own lessons—you may rise again, wiser and unbroken.',
    ],
    onEnter: (state) => {
      state.updateQuest({ questId: 'emberShard', status: 'failed', progress: 'The shard fell to the Black Guild.' });
      state.addJournalEntry('Defeat in the Duskfen haunts your legend. The tale demands a new attempt.');
    },
  },
];

export function getNode(id: string): StoryNode | undefined {
  return STORY_NODES.find((node) => node.id === id);
}
