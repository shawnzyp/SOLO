import type { Skill } from '../systems/types';

export interface OracleSkillChallenge {
  id: string;
  skill: Skill;
  label: string;
  description: string;
  difficulty: { min: number; max: number };
  success: string;
  failure: string;
  flavor?: string;
}

export interface OracleFreeChoice {
  id: string;
  text: string;
  description?: string;
}

export interface OracleBlueprint {
  id: string;
  titleTemplates: string[];
  summaryTemplates: string[];
  openings: string[];
  midbeats: string[];
  climaxes: string[];
  matches?: {
    classes?: string[];
    backgrounds?: string[];
    tags?: string[];
  };
  motifs?: string[];
  palettes?: string[];
  tags?: string[];
  freeChoices?: OracleFreeChoice[];
  skillChallenges?: OracleSkillChallenge[];
}

export const ORACLE_BLUEPRINTS: OracleBlueprint[] = [
  {
    id: 'rift-echo',
    matches: {
      classes: ['rift-mage'],
      backgrounds: ['arcane-apprentice'],
    },
    titleTemplates: [
      'Rift Echoes at ${location}',
      '${heroName} Courts the Ember Rift',
      'Glyphsong Beneath ${location}',
    ],
    summaryTemplates: [
      'Arcane murmurs gather around ${heroName}, promising revelation if ${topSkillLabel} stays keen.',
      'The Ember Rift leans close to the ${heroClass}, eager to answer ${promptSummary}.',
    ],
    openings: [
      '${promptPreface} Lattices of molten sigils coil around ${heroName}, sketching maps that overlap ${location}.',
      'The air warps into prisms of emberlight as ${heroName} whispers ${promptSummary}, and the Rift replies with a patient hum.',
      'Loose rune-ash lifts from the floor, orbiting ${heroName} like wary fireflies that spell out forgotten invocations.',
    ],
    midbeats: [
      'Fragments of future incantations drift past, each reflecting ${heroClass} training and the lingering scent of ${motif}.',
      '${heroName} senses the glyphs testing ${topSkillLabel} with riddles only a ${heroBackground} would recognize.',
      'A mirrored version of ${heroName} gestures urgently from within the anomaly, hinting at a cost only ${heroClass} adepts truly grasp.',
    ],
    climaxes: [
      'The anomaly demands a bargain: harvest the power, parley with the echoing spirits, or retreat before time folds.',
      'Glyphstorm winds pull in nearby memories, daring ${heroName} to reshape destiny with a single focused act.',
      'A hungry silence settles, waiting for ${heroName} to anchor the rift before it rewrites ${location}.',
    ],
    motifs: ['ember lightning', 'gravity-lensed starlight', 'singing crystal dust'],
    palettes: [
      'radial-gradient(circle at 20% 20%, rgba(255, 149, 73, 0.52), rgba(18, 8, 42, 0.95))',
      'linear-gradient(200deg, rgba(237, 94, 188, 0.42), rgba(24, 14, 64, 0.94))',
    ],
    tags: ['Arcane Flare'],
    freeChoices: [
      {
        id: 'bottle-sparks',
        text: 'Bottle the drifting sparks',
        description: 'Condense the excess magic into a portable mote for later rituals.',
      },
      {
        id: 'map-the-resonance',
        text: 'Map the resonance pattern',
        description: 'Trace how the rift now intersects familiar ley lines around ${location}.',
      },
    ],
    skillChallenges: [
      {
        id: 'stabilize-glyphs',
        skill: 'arcana',
        label: 'Stabilize the glyph storm',
        description: 'Align the orbiting runes before they collapse into backlash.',
        difficulty: { min: 12, max: 18 },
        success: 'The glyphs obey ${heroName}, weaving into a sigil attuned to the ${heroClass}\'s cadence.',
        failure: 'A surge of wild flame snaps at ${heroName}\'s focus, scattering fragments of insight into the void.',
        flavor: 'Arcana check to control volatile magic',
      },
      {
        id: 'parley-with-echo',
        skill: 'insight',
        label: 'Parley with the echo',
        description: 'Listen for the consciousness trapped in the rift and learn what it wants.',
        difficulty: { min: 11, max: 17 },
        success: 'The echo agrees to guide future spells, whispering a secret verse into ${heroName}\'s mind.',
        failure: 'The presence recoils, leaving behind a chill omen that unsettles the party.',
        flavor: 'Insight check to read arcane intent',
      },
      {
        id: 'anchor-reality',
        skill: 'history',
        label: 'Anchor the anomaly in lore',
        description: 'Recite ancient rites that pin the rift safely to Verdyn\'s timeline.',
        difficulty: { min: 13, max: 19 },
        success: 'Old treaties respond, binding the tear with braided light familiar to ${heroBackground} traditions.',
        failure: 'The wrong verse warps, and a phantom memory seeps into ${heroName}\'s thoughts.',
        flavor: 'History check recalling planar accords',
      },
    ],
  },
  {
    id: 'shadow-raid',
    matches: {
      classes: ['blade-dancer'],
      backgrounds: ['exiled-noble'],
      tags: ['Intrigue'],
    },
    titleTemplates: [
      'Masque of Veils in ${location}',
      '${heroName}\'s Shadow Waltz',
      'The Velvet Raid on ${location}',
    ],
    summaryTemplates: [
      'Secrets ripple through ${location} as ${heroName} slips between candlelit conspiracies.',
      'An old rival recognizes the ${heroBackground}\'s poise, forcing ${heroName} into a duel of whispers.',
    ],
    openings: [
      '${promptPreface} Perfumed smoke swirls while masked courtiers barter in coded gestures.',
      'An orchestral swell hides the footfalls of ${heroName}, who glides past silver mirrors toward ${motif}.',
      '${heroClass} instincts sense pressure plates beneath silk rugs, turning every pivot into a test of balance.',
    ],
    midbeats: [
      'A familiar sigil flashes on a signet ring, recalling why ${heroName} was cast from noble graces.',
      'Rumors of ${promptSummary} reach the ears of a scheming patron who offers cooperation—for a price.',
      'Hidden servants trade glances, ready to raise an alarm unless ${heroName} keeps ${topSkillLabel} razor sharp.',
    ],
    climaxes: [
      'The vault door opens onto a balcony of moonlight, but three divergent paths await ${heroName}\'s lead.',
      'An assassin steps from the drapery, spinning a blade that hums in the same rhythm as the ${heroClass}.',
      'The court\'s music halts mid-note, demanding a confession or a daring escape.',
    ],
    motifs: ['perfumed smoke', 'muted harpsichord chords', 'mirror-bright moonlight'],
    palettes: [
      'linear-gradient(185deg, rgba(40, 12, 38, 0.92), rgba(10, 4, 22, 0.94))',
      'radial-gradient(circle at 80% 10%, rgba(255, 188, 122, 0.35), rgba(14, 6, 24, 0.95))',
    ],
    tags: ['Intrigue', 'Stealth'],
    freeChoices: [
      {
        id: 'cut-a-deal',
        text: 'Cut a deal with the rival patron',
        description: 'Trade a future favor for safe passage through the noble house.',
      },
      {
        id: 'leave-a-mark',
        text: 'Leave a signature flourish',
        description: 'Stage a subtle calling card that unsettles the nobles for nights to come.',
      },
    ],
    skillChallenges: [
      {
        id: 'navigate-traps',
        skill: 'acrobatics',
        label: 'Dance across the trap lattice',
        description: 'Weave through pressure plates and silent tripwires lining the gallery.',
        difficulty: { min: 12, max: 18 },
        success: '${heroName} flows like liquid silver, never once disturbing the hidden alarms.',
        failure: 'A wire snaps taut, and bells threaten to peel unless ${heroName} improvises fast.',
        flavor: 'Acrobatics check to slip through hazards',
      },
      {
        id: 'silence-the-room',
        skill: 'stealth',
        label: 'Silence the watchful attendants',
        description: 'Muffle gossiping attendants before they can shout.',
        difficulty: { min: 11, max: 17 },
        success: 'One by one, the attendants nod off as ${heroName} guides them with hypnotic misdirection.',
        failure: 'A single gasp escapes, echoing toward the main hall.',
        flavor: 'Stealth check to manage witnesses',
      },
      {
        id: 'command-the-floor',
        skill: 'persuasion',
        label: 'Command the ballroom',
        description: 'Turn the confrontation into a performance everyone applauds.',
        difficulty: { min: 13, max: 19 },
        success: 'The crowd erupts in praise, convinced ${heroName} orchestrated the drama for their delight.',
        failure: 'Doubts linger, and suspicious eyes track every movement afterward.',
        flavor: 'Persuasion check for social dominance',
      },
    ],
  },
  {
    id: 'verdyn-stand',
    matches: {
      classes: ['warden'],
      backgrounds: ['wild-scout'],
      tags: ['Wilderness'],
    },
    titleTemplates: [
      'Verdyn Stand at ${location}',
      '${heroName} Guards the Ember Wilds',
      'Oathbound Watch on ${location}',
    ],
    summaryTemplates: [
      'Old oaths wake within ${heroName} as the wilds whisper of encroaching threats.',
      'The spirits of Verdyn rally behind the ${heroClass}, trusting ${topSkillLabel} to hold the line.',
    ],
    openings: [
      '${promptPreface} Weathered stones tremble as something massive stalks the treeline beyond ${location}.',
      'Fresh claw marks score the watchtower, and the wind carries a plea from allied sentries.',
      'The scent of ozone and crushed pine reveals that planar predators now prowl ancestral territory.',
    ],
    midbeats: [
      '${heroName} spots displaced wildlife, every trail begging for the ${topSkillLabel} honed on the frontier.',
      'A wounded Verdyn scout relays a half-finished warning before collapsing into ${heroName}\'s arms.',
      'Ancestral runes glow on the shield, syncing heartbeat to heartbeat with ${motif}.',
    ],
    climaxes: [
      'Two paths diverge: intercept the beast before it reaches the farms, or seal the breach it crawled through.',
      'Thunderheads gather as if the land itself will strike at whatever ${heroName} chooses.',
      'An oathkeeper\'s bell tolls in the distance, promising reinforcement if someone can reach it.',
    ],
    motifs: ['low thunder', 'amber-lit rain', 'echoing war drums'],
    palettes: [
      'linear-gradient(180deg, rgba(26, 46, 34, 0.88), rgba(12, 20, 18, 0.95))',
      'radial-gradient(circle at 10% 90%, rgba(173, 255, 201, 0.35), rgba(14, 24, 18, 0.92))',
    ],
    tags: ['Wilderness', 'Duty'],
    freeChoices: [
      {
        id: 'call-the-wardens',
        text: 'Sound the warden horn',
        description: 'Summon distant allies who still honor Verdyn oaths.',
      },
      {
        id: 'fortify-ground',
        text: 'Fortify the ground',
        description: 'Raise improvised barricades and sanctify the soil with quick rites.',
      },
    ],
    skillChallenges: [
      {
        id: 'track-the-threat',
        skill: 'survival',
        label: 'Track the encroaching threat',
        description: 'Read the broken branches and spoor to anticipate the attack.',
        difficulty: { min: 12, max: 18 },
        success: '${heroName} charts a swift intercept course, gaining ground before the beast senses pursuit.',
        failure: 'The trail splits across planar seams, leaving ${heroName} guessing at the true danger.',
        flavor: 'Survival check to master the terrain',
      },
      {
        id: 'rally-the-spirits',
        skill: 'insight',
        label: 'Rally Verdyn spirits',
        description: 'Appeal to guardian spirits for a borrowed surge of strength.',
        difficulty: { min: 11, max: 17 },
        success: 'Ancient whispers braid into ${heroName}\'s resolve, granting glimpses of enemy tactics.',
        failure: 'The spirits fall silent, wary of intervening without a clearer promise.',
        flavor: 'Insight check to commune with guardians',
      },
      {
        id: 'brace-the-breach',
        skill: 'athletics',
        label: 'Brace the planar breach',
        description: 'Hold the rift closed long enough for allies to seal it.',
        difficulty: { min: 14, max: 20 },
        success: 'Muscles burn but the tear yields, sparing nearby homesteads from the oncoming storm.',
        failure: 'The strain hurls ${heroName} backward, leaving the breach yawning wider.',
        flavor: 'Athletics check to endure crushing force',
      },
    ],
  },
  {
    id: 'wandering-muse',
    titleTemplates: [
      'Song of the Wandering Muse',
      'Unscripted Beat near ${location}',
      '${heroName}\'s Uncharted Interlude',
    ],
    summaryTemplates: [
      'Chance encounters coil around ${heroName}, spinning a thread of improvisation.',
      'The storyteller answers with layered visions, no bridge required—only curiosity.',
    ],
    openings: [
      '${promptPreface} Colors deepen in the sky, hinting at possibilities that refuse to stay still.',
      'A traveling tinker hums a tune ${heroName} somehow remembers from a dream.',
      'Footsteps echo twice as loud, as if a second version of the party walks just out of sight.',
    ],
    midbeats: [
      'A stranger offers a fragment of lore about ${location}, but the tale contradicts every known account.',
      'An abandoned campfire reignites in welcome hues, waiting for ${heroName} to choose a direction.',
      'Windblown tarot cards arrange themselves into a spread tailored to ${heroBackground} lessons.',
    ],
    climaxes: [
      'Three omens collide: a beckoning path of ghost-lanterns, a churning stormfront, and a whispered bargain.',
      'The air resonates with ${motif}, nudging ${heroName} toward whichever instinct feels least expected.',
      'A future journal entry arrives early, ink still wet, asking ${heroName} to decide how it should end.',
    ],
    motifs: ['distant festival drums', 'rainbow fog', 'silver moths'],
    palettes: [
      'linear-gradient(200deg, rgba(68, 32, 74, 0.82), rgba(18, 26, 44, 0.9))',
      'radial-gradient(circle at 50% 50%, rgba(120, 210, 255, 0.28), rgba(18, 16, 32, 0.94))',
    ],
    tags: ['AI Oracle'],
    freeChoices: [
      {
        id: 'follow-the-lanterns',
        text: 'Follow the lantern-lit trail',
        description: 'Trust the beckoning lights even if they loop away from the known quest.',
      },
      {
        id: 'record-the-omen',
        text: 'Record the omen in your journal',
        description: 'Commit the mysterious spread to memory for later reflection.',
      },
    ],
    skillChallenges: [
      {
        id: 'decipher-the-tarot',
        skill: 'insight',
        label: 'Decipher the tarot sequence',
        description: 'Interpret the cards before the wind steals them away.',
        difficulty: { min: 10, max: 16 },
        success: 'The spread reveals a hidden ally waiting at the next crossroad.',
        failure: 'The cards scatter into the night, their meaning teasingly unresolved.',
        flavor: 'Insight check to read fate\'s pattern',
      },
      {
        id: 'chart-anew',
        skill: 'perception',
        label: 'Chart a new course',
        description: 'Spot subtle cues in the environment that point toward adventure.',
        difficulty: { min: 11, max: 17 },
        success: 'Fresh trails emerge, carrying ${heroName} toward verdant discoveries.',
        failure: 'Every road seems familiar, threatening to loop back on itself.',
        flavor: 'Perception check to find the unexpected',
      },
      {
        id: 'weave-the-tune',
        skill: 'persuasion',
        label: 'Weave the tune into local legend',
        description: 'Perform the dream-song so the land itself remembers it.',
        difficulty: { min: 12, max: 18 },
        success: 'Listeners join the chorus, and morale surges for the journey ahead.',
        failure: 'The notes falter, leaving an awkward silence that begs to be filled later.',
        flavor: 'Persuasion check to inspire the crowd',
      },
    ],
  },
];
