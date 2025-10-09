import { defaultAudioManifest } from './manifest';

export interface PlayOptions {
  volume?: number;
}

export interface ToneStep {
  frequency: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
}

export interface ToneAsset {
  kind: 'tone';
  steps: ToneStep[];
  attack?: number;
  release?: number;
}

export type AudioSource = string | ToneAsset;

export type AudioManifest = Record<string, AudioSource>;

function isToneAsset(source: AudioSource): source is ToneAsset {
  return typeof source === 'object' && source !== null && (source as ToneAsset).kind === 'tone';
}

type ContextFactory = () => Promise<AudioContext> | AudioContext;

function resolveContextFactory(factory?: ContextFactory): () => Promise<AudioContext> {
  if (factory) {
    return async () => Promise.resolve(await factory());
  }
  const AnyAudioContext =
    (globalThis as unknown as { AudioContext?: typeof AudioContext }).AudioContext ??
    (globalThis as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return async () => {
    if (!AnyAudioContext) {
      throw new Error('Web Audio API is not available in this environment.');
    }
    return new AnyAudioContext();
  };
}

export class AudioController {
  private context: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private gain: GainNode | null = null;
  private muted = false;
  private masterVolume = 1;
  private readonly getContextFactory: () => Promise<AudioContext>;

  constructor(private manifest: AudioManifest, contextFactory?: ContextFactory) {
    this.getContextFactory = resolveContextFactory(contextFactory);
  }

  async preload(): Promise<void> {
    await Promise.all(Object.keys(this.manifest).map((id) => this.ensureBuffer(id)));
  }

  async play(id: string, options: PlayOptions = {}): Promise<void> {
    if (this.muted) return;
    const buffer = await this.ensureBuffer(id);
    if (!buffer) return;
    const ctx = await this.getContext();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = this.masterVolume * (options.volume ?? 1);
    source.connect(gain).connect(this.gain ?? ctx.destination);
    source.start();
  }

  setMuted(value: boolean): void {
    this.muted = value;
  }

  setVolume(value: number): void {
    this.masterVolume = Math.min(1, Math.max(0, value));
    if (this.gain) {
      this.gain.gain.value = this.masterVolume;
    }
  }

  private async ensureBuffer(id: string): Promise<AudioBuffer | null> {
    if (this.buffers.has(id)) {
      return this.buffers.get(id) ?? null;
    }
    const source = this.manifest[id];
    if (!source) {
      return null;
    }
    const ctx = await this.getContext();
    let buffer: AudioBuffer | null = null;
    if (isToneAsset(source)) {
      buffer = this.renderToneBuffer(ctx, source);
    } else {
      const response = await fetch(source);
      const arrayBuffer = await response.arrayBuffer();
      buffer = await ctx.decodeAudioData(arrayBuffer);
    }
    if (buffer) {
      this.buffers.set(id, buffer);
    }
    return buffer;
  }

  private renderToneBuffer(ctx: BaseAudioContext, asset: ToneAsset): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const totalDuration = asset.steps.reduce((sum, step) => sum + Math.max(step.duration, 0), 0) + (asset.release ?? 0.05);
    const totalSamples = Math.max(1, Math.floor(totalDuration * sampleRate));
    const buffer = ctx.createBuffer(1, totalSamples, sampleRate);
    const data = buffer.getChannelData(0);
    let sampleIndex = 0;

    for (const step of asset.steps) {
      const duration = Math.max(step.duration, 0.01);
      const stepSamples = Math.min(Math.floor(duration * sampleRate), totalSamples - sampleIndex);
      if (stepSamples <= 0) continue;
      const increment = (2 * Math.PI * step.frequency) / sampleRate;
      let phase = 0;
      for (let i = 0; i < stepSamples; i += 1) {
        const amplitude = step.gain ?? 1;
        const value = amplitude * this.sampleWave(step.type ?? 'sine', phase);
        data[sampleIndex + i] = value;
        phase += increment;
      }
      sampleIndex += stepSamples;
    }

    const attackSamples = Math.min(Math.floor((asset.attack ?? 0.008) * sampleRate), totalSamples);
    for (let i = 0; i < attackSamples; i += 1) {
      const fade = i / Math.max(1, attackSamples);
      data[i] *= fade;
    }

    const releaseSamples = Math.min(Math.floor((asset.release ?? 0.08) * sampleRate), totalSamples);
    for (let i = 0; i < releaseSamples; i += 1) {
      const index = totalSamples - i - 1;
      if (index < 0) break;
      const fade = i / Math.max(1, releaseSamples);
      data[index] *= 1 - fade;
    }

    return buffer;
  }

  private sampleWave(type: OscillatorType, phase: number): number {
    const normalized = (phase / (2 * Math.PI)) % 1;
    switch (type) {
      case 'square':
        return Math.sign(Math.sin(phase)) || 1;
      case 'sawtooth':
        return 2 * normalized - 1;
      case 'triangle':
        return 1 - 4 * Math.abs(Math.round(normalized - 0.25) - (normalized - 0.25));
      case 'sine':
      case 'custom':
      default:
        return Math.sin(phase);
    }
  }

  private async getContext(): Promise<AudioContext> {
    if (!this.context) {
      this.context = await this.getContextFactory();
      this.gain = this.context.createGain();
      this.gain.gain.value = this.masterVolume;
      this.gain.connect(this.context.destination);
    }
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    return this.context;
  }
}

let defaultController: AudioController | null = null;

export function getAudioController(manifest: AudioManifest = defaultAudioManifest): AudioController {
  if (!defaultController) {
    defaultController = new AudioController(manifest);
  }
  return defaultController;
}

export { defaultAudioManifest } from './manifest';
