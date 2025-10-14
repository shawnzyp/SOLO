import { fillTemplate, pickBlueprint, renderOracleChoice, type OracleTemplateContext } from '../data/oracle-blueprints';
import {
  type ArcaneNarrativeContext,
  type ArcaneNarrativeResult,
  type Effect,
  type Hero,
  type StoryChoice,
  type StoryNode,
} from './types';
import type {
  ChatCompletion,
  ChatCompletionRequestNonStreaming,
  InitProgressReport,
  MLCEngine,
  ModelRecord,
} from '@mlc-ai/web-llm';

interface StorytellerConfig {
  endpoint?: string;
  apiKey?: string;
  model?: string;
  timeoutMs?: number;
}

interface ImproviseOptions {
  signal?: AbortSignal;
  onStatus?: (status: string) => void;
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

type WebLLMModule = typeof import('@mlc-ai/web-llm');

interface WebLLMPayload {
  prompt: string;
  hero: {
    name: string;
    class: string;
    classId: string;
    background: string;
    backgroundId: string;
    level: number;
  } | null;
  returnNodeId: string | null;
  context: ArcaneNarrativeContext;
}

function createRandomId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function isAbortError(error: unknown): boolean {
  return Boolean(error && typeof error === 'object' && (error as { name?: string }).name === 'AbortError');
}

function createAbortError(): Error {
  const error = new Error('Aborted');
  error.name = 'AbortError';
  return error;
}

function safeOnStatus(
  callback: ((status: string) => void) | undefined,
  status: string,
  signal?: AbortSignal,
): void {
  if (!callback || (signal?.aborted ?? false)) return;
  callback(status);
}

function supportsWebGPU(): boolean {
  return typeof navigator !== 'undefined' && 'gpu' in navigator;
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
  private webllmModulePromise: Promise<WebLLMModule> | null = null;
  private webllmEnginePromise: Promise<MLCEngine> | null = null;
  private webllmModelId: string | null = null;

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
    narrativeContext: ArcaneNarrativeContext,
    options?: ImproviseOptions,
  ): Promise<ArcaneNarrativeResult> {
    const narrativeSignals: ArcaneNarrativeContext = {
      ...narrativeContext,
      prompt,
      returnNodeId,
    };
    const signal = options?.signal;
    const onStatus = options?.onStatus;
    if (signal?.aborted) {
      throw createAbortError();
    }

    if (this.endpoint) {
      safeOnStatus(onStatus, 'Contacting the remote oracle…', signal);
      try {
        const llmResult = await this.invokeEndpoint(
          prompt,
          hero,
          returnNodeId,
          narrativeSignals,
          options,
        );
        if (llmResult) {
          return llmResult;
        }
        safeOnStatus(onStatus, 'Remote oracle unavailable. Seeking another source…', signal);
      } catch (error) {
        if (isAbortError(error)) {
          throw error;
        }
        console.warn('Arcane storyteller endpoint failed, falling back to offline oracle.', error);
        safeOnStatus(onStatus, 'Remote oracle faltered; attuning to local arcana…', signal);
      }
    }

    try {
      const localResult = await this.improviseWithWebLLM(
        prompt,
        hero,
        returnNodeId,
        narrativeSignals,
        options,
      );
      if (localResult) {
        return localResult;
      }
    } catch (error) {
      if (isAbortError(error)) {
        throw error;
      }
      console.warn('Arcane storyteller WebLLM failed, falling back to offline oracle.', error);
      safeOnStatus(onStatus, 'Local oracle could not respond. Relying on offline lore…', signal);
    }

    return this.generateOffline(prompt, hero, returnNodeId, narrativeSignals, options);
  }

  private async invokeEndpoint(
    prompt: string,
    hero: Hero | null,
    returnNodeId: string | null,
    narrativeContext: ArcaneNarrativeContext,
    options?: ImproviseOptions,
  ): Promise<ArcaneNarrativeResult | null> {
    if (typeof fetch === 'undefined') return null;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    const signal = options?.signal;
    let abortListener: (() => void) | null = null;
    if (signal) {
      if (signal.aborted) {
        controller.abort();
      } else {
        abortListener = () => controller.abort();
        signal.addEventListener('abort', abortListener, { once: true });
      }
    }

    try {
      safeOnStatus(options?.onStatus, 'Awaiting the remote oracle…', signal);
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
          context: narrativeContext,
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

      safeOnStatus(options?.onStatus, 'Remote oracle replied.', signal);
      return {
        node,
        origin: 'oracle-llm',
        prompt,
      };
    } finally {
      clearTimeout(timeout);
      if (abortListener && signal) {
        signal.removeEventListener('abort', abortListener);
      }
    }
  }

  private async improviseWithWebLLM(
    prompt: string,
    hero: Hero | null,
    returnNodeId: string | null,
    narrativeContext: ArcaneNarrativeContext,
    options?: ImproviseOptions,
  ): Promise<ArcaneNarrativeResult | null> {
    if (typeof window === 'undefined') return null;
    const signal = options?.signal;
    if (!supportsWebGPU()) {
      safeOnStatus(options?.onStatus, 'Local oracle unavailable: WebGPU support not detected.', signal);
      return null;
    }

    let engine: MLCEngine | null = null;
    try {
      engine = await this.ensureWebLLMEngine(options);
    } catch (error) {
      if (isAbortError(error)) {
        throw error;
      }
      console.warn('Arcane storyteller failed to initialize the WebLLM engine.', error);
      return null;
    }

    if (!engine) {
      return null;
    }

    safeOnStatus(options?.onStatus, 'Consulting the local oracle…', signal);

    const request: ChatCompletionRequestNonStreaming = {
      messages: [
        { role: 'system', content: this.buildWebLLMSystemPrompt() },
        {
          role: 'user',
          content: JSON.stringify(
            this.buildWebLLMPayload(prompt, hero, returnNodeId, narrativeContext),
            null,
            2,
          ),
        },
      ],
      temperature: 0.7,
      max_tokens: 700,
      response_format: { type: 'json_object' },
    };

    const completionPromise = engine.chat.completions.create(request) as Promise<ChatCompletion>;
    let completion: ChatCompletion;
    try {
      completion = await this.withAbort(completionPromise, signal, () => engine?.interruptGenerate());
    } catch (error) {
      if (isAbortError(error)) {
        throw error;
      }
      console.warn('Arcane storyteller WebLLM request failed.', error);
      return null;
    }

    const content = this.extractWebLLMContent(completion);
    if (!content) {
      console.warn('Arcane storyteller WebLLM returned empty content.');
      return null;
    }

    let parsed: { node?: ExternalStoryNode } | ExternalStoryNode;
    try {
      parsed = JSON.parse(content) as { node?: ExternalStoryNode } | ExternalStoryNode;
    } catch (error) {
      console.warn('Arcane storyteller WebLLM returned invalid JSON.', error);
      return null;
    }

    const rawNode =
      parsed && typeof parsed === 'object' && 'node' in parsed
        ? (parsed as { node?: ExternalStoryNode }).node ?? null
        : parsed;
    if (!rawNode) {
      console.warn('Arcane storyteller WebLLM payload missing node definition.');
      return null;
    }

    const node = this.normalizeExternalNode(rawNode, returnNodeId);
    if (!node) {
      console.warn('Arcane storyteller WebLLM response could not be normalized.');
      return null;
    }

    safeOnStatus(options?.onStatus, 'Local oracle replied.', signal);
    return {
      node,
      origin: 'oracle-llm',
      prompt,
    };
  }

  private async ensureWebLLMEngine(options?: ImproviseOptions): Promise<MLCEngine | null> {
    if (typeof window === 'undefined') return null;

    const module = await this.loadWebLLMModule().catch((error) => {
      if (isAbortError(error)) {
        throw error;
      }
      console.warn('Arcane storyteller could not load WebLLM module.', error);
      return null;
    });
    if (!module) {
      return null;
    }

    if (!this.webllmEnginePromise) {
      const modelId = this.selectWebLLMModelId(module.prebuiltAppConfig?.model_list ?? []);
      const updateStatus = (report: InitProgressReport) => {
        const ratio = typeof report.progress === 'number' ? Math.max(0, Math.min(1, report.progress)) : null;
        const stage = report.text ?? report.stage ?? 'Preparing the local oracle…';
        const prefix = ratio !== null ? `[${Math.round(ratio * 100)}%] ` : '';
        safeOnStatus(options?.onStatus, `${prefix}${stage}`, options?.signal);
      };

      safeOnStatus(options?.onStatus, `Loading local oracle model (${modelId})…`, options?.signal);
      this.webllmEnginePromise = module
        .CreateMLCEngine(modelId, { initProgressCallback: updateStatus })
        .then((engine) => {
          safeOnStatus(options?.onStatus, 'Local oracle ready.', options?.signal);
          return engine;
        })
        .catch((error) => {
          this.webllmEnginePromise = null;
          throw error;
        });
    } else {
      safeOnStatus(options?.onStatus, 'Local oracle ready.', options?.signal);
    }

    try {
      return await this.webllmEnginePromise;
    } catch (error) {
      this.webllmEnginePromise = null;
      throw error;
    }
  }

  private async loadWebLLMModule(): Promise<WebLLMModule> {
    if (this.webllmModulePromise) {
      return this.webllmModulePromise;
    }

    this.webllmModulePromise = import('@mlc-ai/web-llm') as Promise<WebLLMModule>;
    try {
      return await this.webllmModulePromise;
    } catch (error) {
      this.webllmModulePromise = null;
      throw error;
    }
  }

  private selectWebLLMModelId(models: ModelRecord[]): string {
    if (this.webllmModelId) {
      return this.webllmModelId;
    }
    const preferred = models.find((entry) => /gemma-2.*2b.*it/i.test(entry.model_id));
    const fallback = models.find((entry) => /phi-3\.5.*mini.*it/i.test(entry.model_id));
    const selected = preferred ?? fallback ?? models[0];
    this.webllmModelId = selected?.model_id ?? 'Llama-3.1-8B-Instruct-q4f16_1-MLC';
    return this.webllmModelId;
  }

  private buildWebLLMSystemPrompt(): string {
    return [
      'You are the Arcane Storyteller for a solo Dungeons & Dragons journaling experience.',
      'Craft an immersive fantasy scene as structured JSON. Follow this schema:',
      '{',
      '  "node": {',
      '    "title": "evocative title (max 90 characters)",',
      '    "summary": "1-2 sentence scene summary",',
      '    "background": "CSS gradient or color string",',
      '    "ambient": "optional ambient audio hint or null",',
      '    "tags": ["Oracle", "LLM", "..."],',
      '    "body": ["2-4 sentence paragraph", "..."],',
      '    "choices": [',
      '      {',
      '        "id": "kebab-case-id",',
      '        "text": "Short imperative option",',
      '        "description": "1 sentence elaboration",',
      '        "toNode": "target node id or null",',
      '        "effects": [],',
      '        "skillCheck": null',
      '      }',
      '    ]',
      '  }',
      '}',
      'Rules:',
      '- Keep everything PG-13 and avoid graphic violence.',
      '- Use second-person narration for paragraphs.',
      '- Produce exactly three distinct choices.',
      '- If a returnNodeId is provided, at least one choice must use it as the toNode.',
      '- Weave details from the prompt, hero, and context to keep continuity.',
      '- Provide rich sensory details and stakes without referencing dice mechanics.',
      '- Respond with compact JSON only—no extra commentary.',
    ].join('\n');
  }

  private buildWebLLMPayload(
    prompt: string,
    hero: Hero | null,
    returnNodeId: string | null,
    narrativeContext: ArcaneNarrativeContext,
  ): WebLLMPayload {
    return {
      prompt,
      hero: hero
        ? {
            name: hero.name,
            class: hero.heroClass.name,
            classId: hero.heroClass.id,
            background: hero.background.name,
            backgroundId: hero.background.id,
            level: hero.level,
          }
        : null,
      returnNodeId,
      context: narrativeContext,
    };
  }

  private extractWebLLMContent(completion: ChatCompletion): string | null {
    const choice = completion.choices?.[0];
    const content = choice?.message?.content;
    return typeof content === 'string' ? content.trim() : null;
  }

  private async withAbort<T>(
    promise: Promise<T>,
    signal?: AbortSignal,
    onAbort?: () => void | Promise<void>,
  ): Promise<T> {
    if (!signal) {
      return promise;
    }
    if (signal.aborted) {
      await onAbort?.();
      throw createAbortError();
    }

    return new Promise<T>((resolve, reject) => {
      const abortHandler = () => {
        signal.removeEventListener('abort', abortHandler);
        Promise.resolve(onAbort?.())
          .then(() => reject(createAbortError()))
          .catch(reject);
      };
      signal.addEventListener('abort', abortHandler, { once: true });
      promise.then(
        (value) => {
          signal.removeEventListener('abort', abortHandler);
          resolve(value);
        },
        (error) => {
          signal.removeEventListener('abort', abortHandler);
          reject(error);
        },
      );
    });
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
        skill?: unknown;
        difficultyClass?: unknown;
        flavor?: unknown;
        success?: unknown;
        failure?: unknown;
      };
      if (typeof skill.ability === 'string' && typeof skill.difficultyClass === 'number') {
        normalized.skillCheck = {
          ability: skill.ability as any,
          skill: typeof skill.skill === 'string' ? (skill.skill as any) : undefined,
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
    narrativeContext: ArcaneNarrativeContext,
    options?: ImproviseOptions,
  ): ArcaneNarrativeResult {
    safeOnStatus(options?.onStatus, 'Consulting offline oracle blueprints…', options?.signal);
    const { blueprint, motif } = pickBlueprint(hero, prompt, narrativeContext);
    const heroName = hero?.name ?? 'The adventurer';
    const heroClassName = hero?.heroClass.name ?? 'wanderer';
    const heroBackgroundName = hero?.background.name ?? 'mysterious past';
    const currentNodeTitle =
      narrativeContext.currentNode?.title ?? 'the shifting paths of the Ember Road';
    const currentNodeSummary =
      narrativeContext.currentNode?.summary ?? 'uncertain omens surrounding the journey ahead';
    const factionSnapshot = (narrativeContext.factionStandings ?? []).length
      ? (narrativeContext.factionStandings ?? [])
          .slice(0, 3)
          .map(
            (standing) =>
              `${standing.name} (${standing.value >= 0 ? '+' : ''}${Math.round(standing.value)})`,
          )
          .join(', ')
      : 'no notable faction sway';
    const journalHighlight = (narrativeContext.journalHighlights ?? []).length
      ? (narrativeContext.journalHighlights ?? [])
          .slice(-2)
          .map((entry) => entry.text)
          .join(' / ')
      : 'The journal awaits its next entry.';
    const achievementHighlight = (narrativeContext.achievements ?? []).length
      ? (narrativeContext.achievements ?? [])
          .slice(0, 2)
          .map((achievement) => achievement.title)
          .join(', ')
      : 'No great deeds etched in memory yet.';
    const context: OracleTemplateContext = {
      heroName,
      heroClassName,
      heroClassId: hero?.heroClass.id ?? 'unknown',
      heroBackgroundName,
      heroBackgroundId: hero?.background.id ?? 'unknown',
      prompt,
      motif,
      currentNodeTitle,
      currentNodeSummary,
      factionSnapshot,
      journalHighlight,
      achievementHighlight,
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

    safeOnStatus(options?.onStatus, 'Offline oracle replied.', options?.signal);
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
