type AudioMap = Record<string, string>;

export interface PlayOptions {
  volume?: number;
}

export class AudioController {
  private context: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private gain: GainNode | null = null;
  private muted = false;
  private masterVolume = 1;
  constructor(private manifest: AudioMap) {}

  async preload(): Promise<void> {
    await Promise.all(Object.entries(this.manifest).map(([id, url]) => this.loadBuffer(id, url)));
  }

  async loadBuffer(id: string, url: string): Promise<void> {
    const ctx = await this.getContext();
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = await ctx.decodeAudioData(arrayBuffer);
    this.buffers.set(id, buffer);
  }

  async play(id: string, options: PlayOptions = {}): Promise<void> {
    if (this.muted) return;
    const buffer = this.buffers.get(id);
    if (!buffer) {
      const asset = this.manifest[id];
      if (!asset) return;
      await this.loadBuffer(id, asset);
      return this.play(id, options);
    }
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

  private async getContext(): Promise<AudioContext> {
    if (!this.context) {
      this.context = new AudioContext();
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

const defaultManifest: AudioMap = {};

let defaultController: AudioController | null = null;

export function getAudioController(manifest: AudioMap = defaultManifest): AudioController {
  if (!defaultController) {
    defaultController = new AudioController(manifest);
  }
  return defaultController;
}
