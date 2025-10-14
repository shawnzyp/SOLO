import type { Ability, ArcaneNarrativeContext, Hero, StoryChoice } from '../systems/types';

export interface OracleTemplateContext {
  heroName: string;
  heroClassName: string;
  heroClassId: string;
  heroBackgroundName: string;
  heroBackgroundId: string;
  prompt: string;
  motif: string;
  currentNodeTitle: string;
  currentNodeSummary: string;
  factionSnapshot: string;
  journalHighlight: string;
  achievementHighlight: string;
}

export interface OracleBlueprintChoice {
  id: string;
  textTemplates: string[];
  descriptionTemplates?: string[];
  ensureReturn?: boolean;
  toNode?: string | null;
  icon?: string;
  motifHint?: string;
  skill?: {
    ability: Ability;
    difficultyClass: number;
    successTemplates: string[];
    failureTemplates: string[];
  };
}

export interface OracleBlueprint {
  id: string;
  titleTemplates: string[];
  summaryTemplates: string[];
  background: string;
  ambient?: string;
  tags?: string[];
  motifs: string[];
  paragraphTemplates: string[];
  classHooks?: Record<string, { summary?: string; paragraph?: string }>;
  backgroundHooks?: Record<string, { summary?: string; paragraph?: string }>;
  choices: OracleBlueprintChoice[];
  safeReturnNode: string;
}

export interface OracleBlueprintSelection {
  blueprint: OracleBlueprint;
  motif: string;
}

export const ORACLE_BLUEPRINTS: OracleBlueprint[] = [
  {
    id: 'ember-echo',
    titleTemplates: [
      'Echoes Along the Ember Road',
      'Glissade of Sparks Beside the Rift',
      'When Ash Whispers Answer {{heroName}}',
    ],
    summaryTemplates: [
      'Volatile echoes thrum through the Ember Road as {{heroName}} contemplates {{prompt}}.',
      'A shimmer of unstable light coils near the Rift, daring you to grasp insight about {{prompt}}.',
    ],
    background:
      'linear-gradient(180deg, rgba(66,24,88,0.92), rgba(18,10,36,0.96))',
    ambient: 'audio/arcane-hum.mp3',
    tags: ['Oracle', 'Arcana'],
    motifs: [
      'embers swirling like fireflies',
      'a bell tolling thrice from the Rift',
      'glyphs sketching themselves in violet light',
    ],
    paragraphTemplates: [
      'The air tightens as {{motif}} gather around you. The Ember Road is quiet save for your heartbeat counting down new possibilities.',
      'Strands of light lash the cobbles, weaving scenes that answer your thoughts on {{prompt}}.',
    ],
    classHooks: {
      'rift-mage': {
        summary:
          'The phenomenon resonates with techniques you studied in the Circle of Embers.',
        paragraph:
          'Your rift training lets you snare a strand of power, feeling the familiar pull of void currents seeking a will to guide them.',
      },
      'blade-dancer': {
        paragraph:
          'You respond with a dancer’s poise, sketching sigils in the air with your blade to sculpt the story taking shape.',
      },
    },
    backgroundHooks: {
      'arcane-apprentice': {
        summary: 'Old mentor voices echo in the crackle, urging careful transcription.',
        paragraph:
          'Memories of the Circle’s scriptorium flit by. You catalogue each flicker, determined to share it in the journal later.',
      },
    },
    choices: [
      {
        id: 'stabilize-echo',
        textTemplates: [
          'Stabilize the arcane echo',
          'Bind the story-thread to the Ember Road',
        ],
        descriptionTemplates: [
          'You attempt to channel the raw phenomenon into a coherent scene.',
        ],
        skill: {
          ability: 'intelligence',
          difficultyClass: 14,
          successTemplates: [
            'The echo calms beneath your focus, revealing a lucid path through the vision.',
          ],
          failureTemplates: [
            'The echo bucks your grasp and ripples away, leaving sparks that sting your fingertips.',
          ],
        },
      },
      {
        id: 'ride-the-surge',
        textTemplates: ['Ride the surge into the vision'],
        descriptionTemplates: [
          'You let the energy sweep you along, trusting instinct over training.',
        ],
      },
      {
        id: 'withdraw',
        textTemplates: ['Step back toward safer ground'],
        ensureReturn: true,
      },
    ],
    safeReturnNode: 'tavern-common-room',
  },
  {
    id: 'verdyn-bazaar-rumor',
    titleTemplates: [
      'Rumors Beneath Verdyn Lanterns',
      'Lanternlight and Secret Concords',
    ],
    summaryTemplates: [
      'Verdyn’s midnight bazaar hums with intrigue as whispers answer {{heroName}}\'s musing on {{prompt}}.',
    ],
    background:
      'linear-gradient(180deg, rgba(58,32,62,0.92), rgba(18,8,26,0.96))',
    ambient: 'audio/city-night.mp3',
    tags: ['Social', 'Oracle'],
    motifs: [
      'saffron smoke curling from street braziers',
      'dice clattering in back-alley games',
      'coded knocks behind canvas stalls',
    ],
    paragraphTemplates: [
      'Verdyn’s night market blooms like a secret garden. Merchants hush as {{motif}} slip through the crowd.',
      'A masked broker hints that the answer to {{prompt}} awaits if you play their little drama.',
    ],
    classHooks: {
      'blade-dancer': {
        summary: 'Your reputation among performers grants subtle nods of respect.',
        paragraph:
          'Fellow artists weave you into their choreography, distracting the broker while you catch their coded gestures.',
      },
      warden: {
        paragraph:
          'Sentries of the Verdyn Watch recognize your oath and discreetly form a perimeter, keeping trouble at bay.',
      },
    },
    backgroundHooks: {
      'exiled-noble': {
        summary: 'Old courtly instincts flare when you see a rival crest hidden in the crowd.',
        paragraph:
          'You offer a noble’s bow, reminding the broker that you command debts from distant courts.',
      },
    },
    choices: [
      {
        id: 'play-the-broker',
        textTemplates: ['Match the broker\'s riddles'],
        descriptionTemplates: [
          'You lean into the social dance, improvising lies within lies.',
        ],
        skill: {
          ability: 'charisma',
          difficultyClass: 13,
          successTemplates: [
            'The crowd gasps as you turn the final riddle, earning a whispered revelation.',
          ],
          failureTemplates: [
            'The broker chuckles at your stumble, offering only half-truths before drifting away.',
          ],
        },
      },
      {
        id: 'shadow-the-contact',
        textTemplates: ['Follow the masked contact'],
        descriptionTemplates: [
          'You slip between tents to shadow the contact toward a hidden ledger.',
        ],
      },
      {
        id: 'return-to-commons',
        textTemplates: ['Retreat toward the commons'],
        ensureReturn: true,
      },
    ],
    safeReturnNode: 'tavern-common-room',
  },
  {
    id: 'ember-wilds-trial',
    titleTemplates: [
      'Trial of the Ember Wilds',
      'Where the Ember Pines Lean Close',
    ],
    summaryTemplates: [
      'The wilds answer {{heroName}}\'s thoughts on {{prompt}} with a living challenge.',
    ],
    background:
      'linear-gradient(180deg, rgba(28,52,44,0.92), rgba(10,20,18,0.96))',
    ambient: 'audio/wind-night.mp3',
    tags: ['Exploration', 'Oracle'],
    motifs: [
      'spores glowing beneath moss',
      'distant howls echoing in harmony',
      'stone monoliths beating like drums',
    ],
    paragraphTemplates: [
      'The Ember Wilds part to reveal a glade where {{motif}} guide your steps.',
      'Nature itself seems ready to judge how you pursue answers about {{prompt}}.',
    ],
    classHooks: {
      warden: {
        summary: 'Your oath to guard the frontier earns reverent silence from nearby spirits.',
        paragraph:
          'You plant your maul like a banner, promising to defend the glade should the trial turn violent.',
      },
    },
    backgroundHooks: {
      'wild-scout': {
        summary: 'Years in the wild have taught you the rhythm of trials like this.',
        paragraph:
          'You trace the scent of rain-soaked soil and ready snares that might placate whatever guardian awaits.',
      },
    },
    choices: [
      {
        id: 'commune-spirits',
        textTemplates: ['Commune with the glade spirits'],
        descriptionTemplates: [
          'You kneel and speak the rites of respect you learned on lonely marches.',
        ],
        skill: {
          ability: 'wisdom',
          difficultyClass: 12,
          successTemplates: [
            'Spirits ring you with warm light, imparting a trail that leads safely onward.',
          ],
          failureTemplates: [
            'The spirits remain distant; vines tug at your boots until you retreat.',
          ],
        },
      },
      {
        id: 'test-your-mettle',
        textTemplates: ['Test your mettle against the guardian stones'],
        descriptionTemplates: [
          'You set your stance, daring the monolith drums to judge your resolve.',
        ],
      },
      {
        id: 'back-to-road',
        textTemplates: ['Head back toward the Ember Road'],
        ensureReturn: true,
      },
    ],
    safeReturnNode: 'verdyn-road',
  },
];

export function pickBlueprint(
  hero: Hero | null,
  prompt: string,
  narrativeContext?: ArcaneNarrativeContext,
): OracleBlueprintSelection {
  if (!ORACLE_BLUEPRINTS.length) {
    throw new Error('No oracle blueprints configured.');
  }

  const classId = hero?.heroClass.id ?? '';
  const backgroundId = hero?.background.id ?? '';

  const currentTags = new Set(
    (narrativeContext?.currentNode?.tags ?? []).map((tag) => tag.toLowerCase()),
  );
  const notableFactions = narrativeContext?.factionStandings ?? [];

  const weighted = ORACLE_BLUEPRINTS.reduce<Array<{ score: number; blueprint: OracleBlueprint }>>(
    (acc, blueprint) => {
      let score = 1;
      if (classId && blueprint.classHooks && blueprint.classHooks[classId]) {
        score += 2;
      }
      if (backgroundId && blueprint.backgroundHooks && blueprint.backgroundHooks[backgroundId]) {
        score += 1;
      }
      if (prompt.toLowerCase().includes('rift') && blueprint.tags?.includes('Arcana')) {
        score += 1;
      }
      if (prompt.toLowerCase().includes('court') && blueprint.id === 'verdyn-bazaar-rumor') {
        score += 1;
      }
      const blueprintTags = (blueprint.tags ?? []).map((tag) => tag.toLowerCase());
      let tagAffinity = 0;
      for (const tag of currentTags) {
        if (blueprintTags.includes(tag)) {
          tagAffinity += 1;
        }
      }
      if (tagAffinity > 0) {
        score += tagAffinity;
      }
      if (notableFactions.some((faction) => faction.value >= 10) && blueprintTags.includes('social')) {
        score += 0.5;
      }
      acc.push({ score, blueprint });
      return acc;
    },
    [],
  );

  const total = weighted.reduce((sum, entry) => sum + entry.score, 0);
  const roll = Math.random() * total;
  let cumulative = 0;
  let selection = weighted[0];
  for (const entry of weighted) {
    cumulative += entry.score;
    if (roll <= cumulative) {
      selection = entry;
      break;
    }
  }

  const motifSource = selection.blueprint.motifs;
  const motif = motifSource[Math.floor(Math.random() * motifSource.length)] ?? 'whispers in the air';
  return { blueprint: selection.blueprint, motif };
}

export function renderOracleChoice(
  blueprintChoice: OracleBlueprintChoice,
  context: OracleTemplateContext,
  returnNodeId: string,
): StoryChoice {
  const text = fillTemplate(randomFrom(blueprintChoice.textTemplates), context);
  const description = blueprintChoice.descriptionTemplates?.length
    ? fillTemplate(randomFrom(blueprintChoice.descriptionTemplates), context)
    : undefined;

  const choice: StoryChoice = {
    id: `${blueprintChoice.id}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    description,
    toNode: blueprintChoice.ensureReturn ? returnNodeId : blueprintChoice.toNode ?? undefined,
    icon: blueprintChoice.icon,
  };

  if (blueprintChoice.skill) {
    choice.skillCheck = {
      ability: blueprintChoice.skill.ability,
      difficultyClass: blueprintChoice.skill.difficultyClass,
      flavor: blueprintChoice.motifHint
        ? fillTemplate(blueprintChoice.motifHint, context)
        : undefined,
      success: {
        resultText: fillTemplate(
          randomFrom(blueprintChoice.skill.successTemplates),
          context,
        ),
        nextNode: returnNodeId,
      },
      failure: {
        resultText: fillTemplate(
          randomFrom(blueprintChoice.skill.failureTemplates),
          context,
        ),
        nextNode: returnNodeId,
      },
    };
  }

  return choice;
}

export function fillTemplate(template: string, context: OracleTemplateContext): string {
  return template
    .replace(/{{heroName}}/g, context.heroName)
    .replace(/{{heroClassName}}/g, context.heroClassName)
    .replace(/{{heroClassId}}/g, context.heroClassId)
    .replace(/{{heroBackgroundName}}/g, context.heroBackgroundName)
    .replace(/{{heroBackgroundId}}/g, context.heroBackgroundId)
    .replace(/{{prompt}}/g, context.prompt)
    .replace(/{{motif}}/g, context.motif)
    .replace(/{{currentNodeTitle}}/g, context.currentNodeTitle)
    .replace(/{{currentNodeSummary}}/g, context.currentNodeSummary)
    .replace(/{{factionSnapshot}}/g, context.factionSnapshot)
    .replace(/{{journalHighlight}}/g, context.journalHighlight)
    .replace(/{{achievementHighlight}}/g, context.achievementHighlight);
}

function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)] ?? list[0];
}
