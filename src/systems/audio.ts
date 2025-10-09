const CROSSFADE_DURATION = 1500;
const AMBIENT_VOLUME = 0.4;

const TOAST_TONES = {
  success: { frequency: 880, type: 'triangle' as OscillatorType },
  info: { frequency: 660, type: 'sine' as OscillatorType },
  danger: { frequency: 320, type: 'sawtooth' as OscillatorType },
};

type ToastTone = keyof typeof TOAST_TONES;

type CueType = 'combat-start' | 'victory' | 'defeat' | 'flee';

const CUE_TONES: Record<CueType, { sequence: number[]; type: OscillatorType }> = {
  'combat-start': { sequence: [440, 520, 660], type: 'square' },
  victory: { sequence: [660, 880, 990, 1320], type: 'triangle' },
  defeat: { sequence: [300, 240, 200], type: 'sawtooth' },
  flee: { sequence: [440, 330, 392], type: 'sine' },
};

function now() {
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

export class AudioManager {
  private ambient: HTMLAudioElement | null = null;
  private ambientTrack: string | undefined;
  private pendingAmbient: string | undefined;
  private audioContext: AudioContext | null = null;
  private unlocked = false;
  private unlockHandler = () => this.unlock();

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('pointerdown', this.unlockHandler, { once: true });
    }
  }

  setAmbient(track?: string): void {
    if (typeof window === 'undefined') return;
    if (!this.unlocked) {
      this.pendingAmbient = track;
      return;
    }

    if (!track) {
      this.fadeOutAmbient();
      this.ambientTrack = undefined;
      return;
    }

    if (this.ambientTrack === track) {
      if (this.ambient && this.ambient.paused) {
        void this.ambient.play().catch(() => undefined);
      }
      return;
    }

    const newAudio = new Audio(track);
    newAudio.loop = true;
    newAudio.volume = 0;
    newAudio.crossOrigin = 'anonymous';

    void newAudio.play().catch(() => {
      // Autoplay may be blocked if the track changes after an interaction.
      // Store as pending to retry on the next unlock attempt.
      this.pendingAmbient = track;
    });

    const previous = this.ambient;
    this.ambient = newAudio;
    this.ambientTrack = track;

    const startTime = now();
    const fade = () => {
      if (!this.ambient) return;
      const progress = Math.min(1, (now() - startTime) / CROSSFADE_DURATION);
      this.ambient.volume = AMBIENT_VOLUME * progress;
      if (previous) {
        previous.volume = AMBIENT_VOLUME * (1 - progress);
        if (progress >= 1) {
          previous.pause();
        }
      }
      if (progress < 1) {
        requestAnimationFrame(fade);
      }
    };
    requestAnimationFrame(fade);
  }

  playToastTone(tone: ToastTone): void {
    const config = TOAST_TONES[tone];
    if (!config) return;
    this.playTone(config.frequency, 0.22, config.type);
  }

  playCue(type: CueType): void {
    const config = CUE_TONES[type];
    if (!config) return;
    const context = this.ensureContext();
    if (!context) return;

    const start = context.currentTime;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.35, start + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.9);
    gain.connect(context.destination);

    config.sequence.forEach((frequency, index) => {
      const osc = context.createOscillator();
      osc.type = config.type;
      osc.frequency.setValueAtTime(frequency, start + index * 0.18);
      osc.connect(gain);
      osc.start(start + index * 0.18);
      osc.stop(start + index * 0.18 + 0.45);
    });
  }

  dispose(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointerdown', this.unlockHandler);
    }
    this.fadeOutAmbient();
    if (this.audioContext) {
      void this.audioContext.close();
      this.audioContext = null;
    }
  }

  private fadeOutAmbient(): void {
    if (!this.ambient) return;
    const audio = this.ambient;
    const startVolume = audio.volume;
    const startTime = now();
    const fade = () => {
      const progress = Math.min(1, (now() - startTime) / CROSSFADE_DURATION);
      audio.volume = startVolume * (1 - progress);
      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        audio.pause();
      }
    };
    requestAnimationFrame(fade);
  }

  private unlock(): void {
    this.unlocked = true;
    const context = this.ensureContext();
    if (context?.state === 'suspended') {
      void context.resume();
    }
    if (this.pendingAmbient) {
      const track = this.pendingAmbient;
      this.pendingAmbient = undefined;
      this.setAmbient(track);
    }
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioContext) {
      try {
        this.audioContext = new AudioContext();
      } catch (error) {
        console.warn('Unable to initialise audio context', error);
        return null;
      }
    }
    if (this.audioContext.state === 'suspended' && this.unlocked) {
      void this.audioContext.resume();
    }
    return this.audioContext;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType): void {
    const context = this.ensureContext();
    if (!context) return;

    const start = context.currentTime;
    const oscillator = context.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.25, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(start);
    oscillator.stop(start + duration + 0.05);
  }
}

export type { ToastTone, CueType };
