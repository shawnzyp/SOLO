import type {
  Achievement,
  FactionStanding,
  Hero,
  JournalEntry,
  Quest,
  StoryChoice,
  StoryNode,
  WorldState,
} from './types';

type StoryGeneratorOrigin = 'remote' | 'fallback';

export interface StoryGeneratorContext {
  hero: Hero;
  currentNode: StoryNode | null;
  journal: JournalEntry[];
  quests: Quest[];
  factions: FactionStanding[];
  achievements: Achievement[];
  prompt?: string;
}

export interface GeneratedStoryResult {
  node: StoryNode;
  origin: StoryGeneratorOrigin;
  model?: string;
  prompt?: string;
  rawResponse?: unknown;
}

interface RemoteChoicePayload {
  id?: string;
  text: string;
  description?: string;
  toNode?: string;
}

interface RemoteStoryPayload {
  id?: string;
  title?: string;
  summary?: string;
  body?: string[];
  background?: string;
  ambient?: string;
  tags?: string[];
  choices?: RemoteChoicePayload[];
  art?: string;
  model?: string;
}

interface RemoteResponseEnvelope {
  content?: string;
  data?: unknown;
  model?: string;
}

const DEFAULT_MODEL = (import.meta as { env: Record<string, string | undefined> }).env
  .VITE_STORY_AI_MODEL ?? 'gpt-4o-mini';

const REMOTE_ENDPOINT = (import.meta as { env: Record<string, string | undefined> }).env
  .VITE_STORY_AI_ENDPOINT;
const REMOTE_API_KEY = (import.meta as { env: Record<string, string | undefined> }).env
  .VITE_STORY_AI_API_KEY;

const FALLBACK_BACKGROUNDS = [
  'linear-gradient(180deg, rgba(22, 18, 36, 0.92), rgba(12, 10, 22, 0.96))',
  'linear-gradient(180deg, rgba(54, 24, 46, 0.92), rgba(24, 12, 32, 0.96))',
  'linear-gradient(180deg, rgba(18, 34, 44, 0.92), rgba(8, 18, 28, 0.96))',
  'linear-gradient(180deg, rgba(42, 26, 58, 0.92), rgba(18, 10, 28, 0.96))',
];

const FALLBACK_THEMES = [
  {
    title: 'Shadows Over ${location}',
    summary: 'An omen ripples through ${location}, bending destiny around ${heroName}.',
    hooks: [
      'A rogue constellation flickers overhead, its light pointing toward a forgotten vault.',
      'An envoy of spectral ravens arrives, each bearing a single ember-feather that hums with latent power.',
      'A chorus of distant bells tolls in an impossible rhythm, as if counting down to a hidden catastrophe.',
    ],
  },
  {
    title: 'Echoes of the Ember Road',
    summary: 'A memory not yet lived coils around ${heroName}, promising peril and wonder.',
    hooks: [
      'An ancient caravan appears in the moonlight, each wagon occupied by a future version of familiar allies.',
      'A fissure splits the air, leaking fragrances from lands that have not yet been charted.',
      'A solitary harp begins to play itself, spinning melodies that weave glimpses of possible destinies.',
    ],
  },
  {
    title: 'Dreams Beneath the Rift',
    summary: 'The Ember Rift stirs and births an unexpected tale for ${heroName}.',
    hooks: [
      'A prism of solidified dawnlight hovers above the path, refracting scenes of triumph and disaster.',
      'A traveling oracle asleep on their feet murmurs secrets to anyone brave enough to listen.',
      'A map etched in starlight unfurls at your feet, plotting roads that do not exist on any chart.',
    ],
  },
];

const FALLBACK_RETURNS = [
  { id: 'tavern-common-room', label: 'Return to the Emberlight Tavern' },
  { id: 'prologue-awakening', label: 'Return to the Chronicles Prologue' },
  { id: 'verdyn-road', label: 'Follow the Verdyn Road' },
];

function randomChoice<T>(values: T[]): T {
  if (values.length === 0) {
    throw new Error('Cannot choose from an empty collection.');
  }
  return values[Math.floor(Math.random() * values.length) % values.length];
}

function sanitizeParagraphs(paragraphs: unknown): string[] {
  if (!Array.isArray(paragraphs)) return [];
  return paragraphs
    .map((paragraph) => String(paragraph ?? '').trim())
    .filter((paragraph) => paragraph.length > 0);
}

function ensureChoices(
  choices: RemoteChoicePayload[] | undefined,
  fallback: { id: string; label: string }[],
  currentNode: StoryNode | null,
): StoryChoice[] {
  const mapped = (choices ?? [])
    .map((choice, index) => {
      const id = choice.id?.trim().length ? choice.id : `ai-choice-${index + 1}`;
      const text = choice.text?.trim();
      if (!text) return null;
      const description = choice.description?.trim();
      const toNode = choice.toNode?.trim();
      return {
        id,
        text,
        description: description?.length ? description : undefined,
        toNode: toNode?.length ? toNode : undefined,
      } satisfies StoryChoice;
    })
    .filter((value): value is StoryChoice => value !== null);

  const choicesWithTargets = mapped.filter((choice) => choice.toNode);
  if (choicesWithTargets.length === 0) {
    if (currentNode) {
      mapped.push({
        id: `ai-return-${currentNode.id}`,
        text: `Rejoin ${currentNode.title}`,
        description: 'Retrace your steps to the prior narrative thread.',
        toNode: currentNode.id,
      });
    }
    const randomReturn = randomChoice(fallback);
    mapped.push({
      id: `ai-return-${randomReturn.id}`,
      text: randomReturn.label,
      description: 'Slip back onto a familiar path when ready.',
      toNode: randomReturn.id,
    });
  }

  return mapped;
}

function buildFallbackStory(context: StoryGeneratorContext): GeneratedStoryResult {
  const location = context.currentNode?.title ?? 'Verdyn';
  const heroName = context.hero.name;
  const theme = randomChoice(FALLBACK_THEMES);
  const title = theme.title.replace('${location}', location).replace('${heroName}', heroName);
  const summary = theme.summary.replace('${location}', location).replace('${heroName}', heroName);
  const hook = randomChoice(theme.hooks);

  const secondaryHook = randomChoice(
    theme.hooks.filter((candidate) => candidate !== hook).length > 0
      ? theme.hooks.filter((candidate) => candidate !== hook)
      : theme.hooks,
  );

  const body: string[] = [
    `${context.prompt?.trim() ? `${context.prompt.trim()} ` : ''}${hook}`.trim(),
    secondaryHook,
    `The air crackles with possibility as ${heroName} senses the timeline tilting in a new direction.`,
  ];

  const background = randomChoice(FALLBACK_BACKGROUNDS);

  const choices = ensureChoices([], FALLBACK_RETURNS, context.currentNode);

  const node: StoryNode = {
    id: `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    summary,
    body,
    background,
    choices,
    tags: ['AI Improv'],
  };

  return {
    node,
    origin: 'fallback',
    model: 'procedural-story-forge',
    prompt: context.prompt,
  };
}

function tryParseJson(content: string): RemoteStoryPayload | null {
  const trimmed = content.trim();
  if (!trimmed) return null;
  const jsonStart = trimmed.indexOf('{');
  const jsonEnd = trimmed.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) return null;
  try {
    const parsed = JSON.parse(trimmed.slice(jsonStart, jsonEnd + 1)) as RemoteStoryPayload;
    return parsed;
  } catch {
    return null;
  }
}

function normalizeRemoteStory(
  payload: RemoteStoryPayload,
  context: StoryGeneratorContext,
): GeneratedStoryResult | null {
  const title = payload.title?.trim();
  const summary = payload.summary?.trim();
  const body = sanitizeParagraphs(payload.body);

  if (!title && !summary && body.length === 0) {
    return null;
  }

  const node: StoryNode = {
    id: payload.id?.trim().length ? payload.id : `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    title: title || `Uncharted Thread of ${context.hero.name}`,
    summary: summary || 'An improvised beat stitched by the arcane storyteller.',
    body: body.length > 0 ? body : [summary || title || ''],
    background:
      payload.background?.trim()?.length
        ? payload.background
        : randomChoice(FALLBACK_BACKGROUNDS),
    ambient: payload.ambient?.trim()?.length ? payload.ambient : undefined,
    art: payload.art?.trim()?.length ? payload.art : undefined,
    tags: payload.tags?.length ? payload.tags : ['AI Improv'],
    choices: ensureChoices(payload.choices, FALLBACK_RETURNS, context.currentNode),
  };

  return {
    node,
    origin: 'remote',
    model: payload.model ?? DEFAULT_MODEL,
    prompt: context.prompt,
    rawResponse: payload,
  };
}

async function requestRemoteStory(
  context: StoryGeneratorContext,
  signal?: AbortSignal,
): Promise<GeneratedStoryResult | null> {
  if (typeof fetch !== 'function') return null;
  if (!REMOTE_ENDPOINT) return null;

  const payload = {
    model: DEFAULT_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are an improvisational Dungeons & Dragons storyteller. Respond only with JSON matching the schema {"title": string, "summary": string, "body": string[], "background"?: string, "ambient"?: string, "tags"?: string[], "choices"?: Array<{"id"?: string, "text": string, "description"?: string, "toNode"?: string}>, "model"?: string}.',
      },
      {
        role: 'user',
        content: JSON.stringify({
          hero: {
            name: context.hero.name,
            class: context.hero.heroClass.name,
            race: context.hero.race,
            level: context.hero.level,
            topSkills: Object.entries(context.hero.skills)
              .sort(([, a], [, b]) => Number(b) - Number(a))
              .slice(0, 4)
              .map(([skill, value]) => ({ skill, value })),
          },
          currentNode: context.currentNode
            ? {
                id: context.currentNode.id,
                title: context.currentNode.title,
                summary: context.currentNode.summary,
                tags: context.currentNode.tags,
              }
            : null,
          prompt: context.prompt ?? null,
          recentJournal: context.journal.slice(-6).map((entry) => entry.text),
          activeQuests: context.quests.map((quest) => ({
            id: quest.id,
            title: quest.title,
            status: quest.status,
          })),
          factionStandings: context.factions.map((faction) => ({
            id: faction.id,
            name: faction.name,
            value: faction.value,
          })),
          achievements: context.achievements.slice(-5).map((achievement) => ({
            id: achievement.id,
            title: achievement.title,
          })),
        }),
      },
    ],
    temperature: 0.9,
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (REMOTE_API_KEY) {
    headers.Authorization = `Bearer ${REMOTE_API_KEY}`;
  }

  let response: Response;
  try {
    response = await fetch(REMOTE_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal,
    });
  } catch (error) {
    console.warn('Story AI request failed to reach endpoint', error);
    return null;
  }

  if (!response.ok) {
    console.warn('Story AI endpoint responded with error', response.status, response.statusText);
    return null;
  }

  let json: RemoteResponseEnvelope | undefined;
  try {
    json = (await response.json()) as RemoteResponseEnvelope;
  } catch (error) {
    console.warn('Failed to parse Story AI response as JSON', error);
    return null;
  }

  const content = typeof json?.content === 'string' ? json.content : undefined;
  const payloadData = content ? tryParseJson(content) : undefined;
  const parsed = payloadData ?? (json?.data as RemoteStoryPayload | undefined);

  if (!parsed) {
    console.warn('Story AI response did not include recognizable payload', json);
    return null;
  }

  const normalized = normalizeRemoteStory(parsed, context);
  if (normalized) {
    normalized.model = json?.model ?? normalized.model;
  }
  return normalized;
}

export async function generateStoryBeat(
  context: StoryGeneratorContext,
  signal?: AbortSignal,
): Promise<GeneratedStoryResult> {
  const remote = await requestRemoteStory(context, signal);
  if (remote) {
    return remote;
  }
  return buildFallbackStory(context);
}

export function summarizeStoryResult(result: GeneratedStoryResult): string {
  const originLabel = result.origin === 'remote' ? 'AI model' : 'arcane dice';
  return `${result.node.title} (${originLabel})`;
}

export function buildStoryGeneratorContext(state: WorldState): Partial<StoryGeneratorContext> {
  const hero = state.hero;
  if (!hero) {
    return {};
  }
  return {
    hero,
    journal: [...state.journal],
    quests: Object.values(state.quests),
    factions: Object.values(state.factions),
    achievements: Object.values(state.achievements),
  };
}
