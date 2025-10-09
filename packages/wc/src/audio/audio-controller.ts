export type AudioClipId = 'click' | 'confirm' | 'error' | 'achievement' | 'page' | 'quest';

type ClipConfig = {
  id: AudioClipId;
  frequency: number;
  type: OscillatorType;
  duration: number;
};

const CLIPS: ClipConfig[] = [
  { id: 'click', frequency: 340, type: 'square', duration: 0.08 },
  { id: 'confirm', frequency: 520, type: 'sine', duration: 0.4 },
  { id: 'error', frequency: 140, type: 'sawtooth', duration: 0.35 },
  { id: 'achievement', frequency: 660, type: 'triangle', duration: 0.7 },
  { id: 'page', frequency: 260, type: 'triangle', duration: 0.25 },
  { id: 'quest', frequency: 420, type: 'sine', duration: 0.45 }
];

export interface AudioControllerOptions {
  volume?: number;
  muted?: boolean;
}

export class AudioController {
  #ctx?: AudioContext;
  #gain?: GainNode;
  #volume = 0.5;
  #muted = false;

  constructor(options: AudioControllerOptions = {}) {
    if (typeof options.volume === 'number') this.#volume = options.volume;
    if (typeof options.muted === 'boolean') this.#muted = options.muted;
  }

  async play(id: AudioClipId): Promise<void> {
    if (this.#muted) return;
    const clip = CLIPS.find((c) => c.id === id);
    if (!clip) return;
    await this.ensureContext();
    if (!this.#ctx || !this.#gain) return;
    const osc = this.#ctx.createOscillator();
    osc.type = clip.type;
    osc.frequency.value = clip.frequency;
    const gain = this.#ctx.createGain();
    gain.gain.value = this.#gain.gain.value * 0.8;
    osc.connect(gain).connect(this.#gain);
    osc.start();
    osc.stop(this.#ctx.currentTime + clip.duration);
  }

  async ensureContext(): Promise<void> {
    if (this.#ctx) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const gain = ctx.createGain();
    gain.gain.value = this.#volume;
    gain.connect(ctx.destination);
    this.#ctx = ctx;
    this.#gain = gain;
  }

  set volume(value: number) {
    this.#volume = Math.max(0, Math.min(1, value));
    if (this.#gain) this.#gain.gain.value = this.#volume;
  }

  get volume(): number {
    return this.#volume;
  }

  set muted(value: boolean) {
    this.#muted = value;
  }

  get muted(): boolean {
    return this.#muted;
  }
}

export const globalAudio = new AudioController();
