import { fillTemplate, pickBlueprint, renderOracleChoice, type OracleTemplateContext } from '../data/oracle-blueprints';
import { type ArcaneNarrativeResult, type Effect, type Hero, type StoryChoice, type StoryNode } from './types';

interface StorytellerConfig {
  endpoint?: string;
  apiKey?: string;
  model?: string;
  timeoutMs?: number;
}

interface ExternalStoryChoice {
  id?: string;
  text?: unknown;
  description?: unknown;
  icon?: unknown;
  toNode?: unknown;
  hotkey?: unknown;
  requirements?: unknown;
  effects?: unknown;
  skillCheck?: unknown;
  combat?: unknown;
}

interface ExternalStoryNode {
  id?: unknown;
  title?: unknown;
  summary?: unknown;
  body?: unknown;
  background?: unknown;
  ambient?: unknown;
  tags?: unknown;
  art?: unknown;
  choices?: unknown;
}

function createRandomId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function isAbortError(error: unknown): boolean {
  return Boolean(error && typeof error === 'object' && (error as { name?: string }).name === 'AbortError');
}

function cloneChoice(choice: StoryChoice): StoryChoice {
  return {
    ...choice,
    requirements: choice.requirements ? [...choice.requirements] : undefined,
    effects: choice.effects ? choice.effects.map((effect) => ({ ...effect })) : undefined,
    skillCheck: choice.skillCheck
      ? {
          ...choice.skillCheck,
          success: { ...choice.skillCheck.success },
          failure: { ...choice.skillCheck.failure },
        }
      : undefined,
    combat: choice.combat
      ? {
          ...choice.combat,
          enemy: { ...choice.combat.enemy },
          victoryEffects: choice.combat.victoryEffects
            ? choice.combat.victoryEffects.map((effect) => ({ ...effect }))
            : undefined,
          defeatEffects: choice.combat.defeatEffects
            ? choice.combat.defeatEffects.map((effect) => ({ ...effect }))
            : undefined,
        }
      : undefined,
  };
}

export class ArcaneStorytellerEngine {
  private readonly endpoint: string;
  private readonly apiKey: string | null;
  private readonly model: string | null;
  private readonly timeoutMs: number;

  constructor(config: StorytellerConfig = {}) {
    this.endpoint = config.endpoint?.trim() ?? '';
    this.apiKey = config.apiKey?.trim() || null;
    this.model = config.model?.trim() || null;
    this.timeoutMs = config.timeoutMs ?? 20000;
  }

  async improvise(
    prompt: string,
    hero: Hero | null,
    returnNodeId: string | null,
    signal?: AbortSignal,
  ): Promise<ArcaneNarrativeResult> {
    if (this.endpoint) {
      try {
        const llmResult = await this.invokeEndpoint(prompt, hero, returnNodeId, signal);
        if (llmResult) {
          return llmResult;
        }
      } catch (error) {
        if (isAbortError(error)) {
          throw error;
        }
        console.warn('Arcane storyteller endpoint failed, falling back to offline oracle.', error);
      }
    }

    return this.generateOffline(prompt, hero, returnNodeId);
  }

  private async invokeEndpoint(
    prompt: string,
    hero: Hero | null,
    returnNodeId: string | null,
    signal?: AbortSignal,
  ): Promise<ArcaneNarrativeResult | null> {
    if (typeof fetch === 'undefined') return null;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    if (signal) {
      if (signal.aborted) {
        controller.abort();
      } else {
        const abortListener = () => controller.abort();
        signal.addEventListener('abort', abortListener, { once: true });
        controller.signal.addEventListener(
          'abort',
          () => signal.removeEventListener('abort', abortListener),
          { once: true },
        );
      }
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        body: JSON.stringify({
          prompt,
          hero: hero
            ? {
                name: hero.name,
                class: hero.heroClass.name,
                classId: hero.heroClass.id,
                background: hero.background.name,
                backgroundId: hero.background.id,
                level: hero.level,
                attributes: hero.attributes,
                skills: hero.skills,
              }
            : null,
          returnNodeId,
          model: this.model ?? undefined,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.warn('Arcane storyteller endpoint returned non-OK status.', response.status);
        return null;
      }

      const payload = (await response.json()) as { node?: ExternalStoryNode } | ExternalStoryNode;
      const rawNode = 'node' in payload && payload.node ? payload.node : payload;
      const node = this.normalizeExternalNode(rawNode, returnNodeId);
      if (!node) return null;

      return {
        node,
        origin: 'oracle-llm',
        prompt,
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  private normalizeExternalNode(raw: ExternalStoryNode, returnNodeId: string | null): StoryNode | null {
    if (!raw || typeof raw !== 'object') return null;

    const title = typeof raw.title === 'string' && raw.title.trim().length > 0 ? raw.title.trim() : null;
    const summary =
      typeof raw.summary === 'string' && raw.summary.trim().length > 0 ? raw.summary.trim() : null;
    const background =
      typeof raw.background === 'string' && raw.background.trim().length > 0
        ? raw.background
        : 'linear-gradient(180deg, rgba(24,20,38,0.92), rgba(10,8,20,0.95))';
    const ambient = typeof raw.ambient === 'string' ? raw.ambient : undefined;
    const art = typeof raw.art === 'string' ? raw.art : undefined;
    const tags = Array.isArray(raw.tags)
      ? raw.tags.filter((entry): entry is string => typeof entry === 'string')
      : undefined;
    const body = Array.isArray(raw.body)
      ? raw.body.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0)
      : [];

    const choicesInput = Array.isArray(raw.choices) ? (raw.choices as ExternalStoryChoice[]) : [];
    const choices: StoryChoice[] = choicesInput
      .map((choice) => this.normalizeExternalChoice(choice))
      .filter((choice): choice is StoryChoice => Boolean(choice));

    if (!title || body.length === 0) {
      return null;
    }

    const id = typeof raw.id === 'string' && raw.id.trim().length > 0 ? raw.id.trim() : createRandomId('oracle');
    const safeChoices = this.ensureReturnChoice(choices, returnNodeId);

    return {
      id,
      title,
      summary: summary ?? title,
      body,
      background,
      ambient,
      art,
      tags,
      origin: 'oracle-llm',
      choices: safeChoices.map((choice) => cloneChoice(choice)),
    };
  }

  private normalizeExternalChoice(choice: ExternalStoryChoice): StoryChoice | null {
    if (!choice || typeof choice !== 'object') return null;
    const text = typeof choice.text === 'string' ? choice.text.trim() : '';
    if (!text) return null;
    const id = typeof choice.id === 'string' && choice.id.trim().length > 0
      ? choice.id.trim()
      : createRandomId('choice');

    const normalized: StoryChoice = {
      id,
      text,
      description: typeof choice.description === 'string' ? choice.description : undefined,
      icon: typeof choice.icon === 'string' ? choice.icon : undefined,
      hotkey: typeof choice.hotkey === 'string' ? choice.hotkey : undefined,
      toNode: typeof choice.toNode === 'string' ? choice.toNode : undefined,
    };

    if (choice.effects && Array.isArray(choice.effects)) {
      const sanitizedEffects = choice.effects
        .map((effect) => sanitizeEffect(effect))
        .filter((effect): effect is Effect => Boolean(effect));
      if (sanitizedEffects.length > 0) {
        normalized.effects = sanitizedEffects.map((effect) => ({ ...effect }));
      }
    }
    if (choice.skillCheck && typeof choice.skillCheck === 'object') {
      const skill = choice.skillCheck as {
        ability?: unknown;
        difficultyClass?: unknown;
        flavor?: unknown;
        success?: unknown;
        failure?: unknown;
      };
      if (typeof skill.ability === 'string' && typeof skill.difficultyClass === 'number') {
        normalized.skillCheck = {
          ability: skill.ability as any,
          difficultyClass: skill.difficultyClass,
          flavor: typeof skill.flavor === 'string' ? skill.flavor : undefined,
          success: {
            resultText:
              typeof (skill.success as { resultText?: unknown })?.resultText === 'string'
                ? ((skill.success as { resultText?: string }).resultText as string)
                : 'The attempt succeeds.',
            nextNode:
              typeof (skill.success as { nextNode?: unknown })?.nextNode === 'string'
                ? ((skill.success as { nextNode?: string }).nextNode as string)
                : undefined,
          },
          failure: {
            resultText:
              typeof (skill.failure as { resultText?: unknown })?.resultText === 'string'
                ? ((skill.failure as { resultText?: string }).resultText as string)
                : 'The attempt fails.',
            nextNode:
              typeof (skill.failure as { nextNode?: unknown })?.nextNode === 'string'
                ? ((skill.failure as { nextNode?: string }).nextNode as string)
                : undefined,
          },
        };
      }
    }
    return normalized;
  }

  private ensureReturnChoice(choices: StoryChoice[], returnNodeId: string | null): StoryChoice[] {
    const safeReturn = returnNodeId ?? null;
    if (!safeReturn) {
      return choices.length > 0 ? choices : [];
    }

    if (choices.some((choice) => choice.toNode === safeReturn)) {
      return choices;
    }

    return [
      ...choices,
      {
        id: createRandomId('return'),
        text: 'Withdraw to safety',
        description: 'You can always step back to the path you know.',
        toNode: safeReturn,
      },
    ];
  }

  private generateOffline(
    prompt: string,
    hero: Hero | null,
    returnNodeId: string | null,
  ): ArcaneNarrativeResult {
    const { blueprint, motif } = pickBlueprint(hero, prompt);
    const heroName = hero?.name ?? 'The adventurer';
    const heroClassName = hero?.heroClass.name ?? 'wanderer';
    const heroBackgroundName = hero?.background.name ?? 'mysterious past';
    const context: OracleTemplateContext = {
      heroName,
      heroClassName,
      heroClassId: hero?.heroClass.id ?? 'unknown',
      heroBackgroundName,
      heroBackgroundId: hero?.background.id ?? 'unknown',
      prompt,
      motif,
    };

    const safeReturn = returnNodeId ?? blueprint.safeReturnNode;
    const title = fillTemplate(randomFrom(blueprint.titleTemplates), context);
    const summaryParts = [fillTemplate(randomFrom(blueprint.summaryTemplates), context)];

    const classHook = hero?.heroClass.id ? blueprint.classHooks?.[hero.heroClass.id] : null;
    const backgroundHook = hero?.background.id ? blueprint.backgroundHooks?.[hero.background.id] : null;
    if (classHook?.summary) summaryParts.push(fillTemplate(classHook.summary, context));
    if (backgroundHook?.summary) summaryParts.push(fillTemplate(backgroundHook.summary, context));

    const body: string[] = blueprint.paragraphTemplates.map((template) => fillTemplate(template, context));
    if (classHook?.paragraph) body.push(fillTemplate(classHook.paragraph, context));
    if (backgroundHook?.paragraph) body.push(fillTemplate(backgroundHook.paragraph, context));

    const choices = blueprint.choices.map((choice) => renderOracleChoice(choice, context, safeReturn));
    const safeChoices = this.ensureChoiceReturn(choices, safeReturn);

    const node: StoryNode = {
      id: createRandomId('oracle'),
      title,
      summary: summaryParts.join(' '),
      body,
      background: blueprint.background,
      ambient: blueprint.ambient,
      tags: [...new Set([...(blueprint.tags ?? []), 'Oracle', 'Offline'])],
      origin: 'oracle-blueprint',
      choices: safeChoices.map((choice) => cloneChoice(choice)),
    };

    return { node, origin: 'oracle-blueprint', prompt };
  }

  private ensureChoiceReturn(choices: StoryChoice[], safeReturn: string): StoryChoice[] {
    if (choices.some((choice) => choice.toNode === safeReturn)) {
      return choices;
    }

    return [
      ...choices,
      {
        id: createRandomId('return'),
        text: 'Follow the threads back',
        description: 'No vision should trap a lone adventurer.',
        toNode: safeReturn,
      },
    ];
  }
}

function sanitizeEffect(effect: unknown): Effect | null {
  if (!effect || typeof effect !== 'object') return null;
  const raw = effect as Record<string, unknown>;
  switch (raw.type) {
    case 'log':
      return typeof raw.entry === 'string' ? { type: 'log', entry: raw.entry } : null;
    case 'setNode':
      return typeof raw.nodeId === 'string' ? { type: 'setNode', nodeId: raw.nodeId } : null;
    case 'setAmbient':
      return { type: 'setAmbient', track: typeof raw.track === 'string' ? raw.track : undefined };
    case 'grantGold':
      return typeof raw.amount === 'number' ? { type: 'grantGold', amount: raw.amount } : null;
    case 'modifyHP':
      return typeof raw.delta === 'number' ? { type: 'modifyHP', delta: raw.delta } : null;
    default:
      return null;
  }
}

function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)] ?? list[0];
}
