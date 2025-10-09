export type AmbienceKey = 'tavern' | 'wilderness' | 'ritual' | 'combat' | 'city';

type CueKey = 'success' | 'failure' | 'notify' | 'victory' | 'defeat' | 'combat';

class SoundscapeController {
  private context: AudioContext | null = null;
  private ambienceGain: GainNode | null = null;
  private ambienceOscillators: OscillatorNode[] = [];
  private unlocked = false;
  private currentAmbience: AmbienceKey | null = null;

  unlock() {
    if (this.unlocked) return;
    this.context = new AudioContext();
    this.ambienceGain = this.context.createGain();
    this.ambienceGain.gain.value = 0.12;
    this.ambienceGain.connect(this.context.destination);
    this.unlocked = true;
  }

  playAmbience(kind: AmbienceKey) {
    if (!this.unlocked || !this.context || !this.ambienceGain) return;
    if (this.currentAmbience === kind) return;
    this.stopAmbience();
    const { context } = this;
    const frequencies = this.getFrequencies(kind);
    this.ambienceOscillators = frequencies.map((frequency, index) => {
      const osc = context.createOscillator();
      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = frequency;
      const gain = context.createGain();
      gain.gain.value = 0.35 / (index + 1);
      osc.connect(gain);
      gain.connect(this.ambienceGain!);
      osc.start();
      return osc;
    });
    this.currentAmbience = kind;
  }

  stopAmbience() {
    this.ambienceOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (error) {
        // noop
      }
    });
    this.ambienceOscillators = [];
    this.currentAmbience = null;
  }

  playCue(cue: CueKey) {
    if (!this.unlocked || !this.context) return;
    const duration = 0.4;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const now = this.context.currentTime;
    const { frequency, type } = this.getCueConfig(cue);
    osc.frequency.setValueAtTime(frequency, now);
    osc.type = type;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(this.context.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  private getFrequencies(kind: AmbienceKey): number[] {
    switch (kind) {
      case 'tavern':
        return [196, 261.6, 329.6];
      case 'wilderness':
        return [174.6, 220, 277.2];
      case 'ritual':
        return [147, 207.6, 311];
      case 'combat':
        return [110, 165, 220, 330];
      case 'city':
        return [130.8, 196, 246.9];
      default:
        return [220, 330];
    }
  }

  private getCueConfig(cue: CueKey): { frequency: number; type: OscillatorType } {
    switch (cue) {
      case 'success':
        return { frequency: 523.3, type: 'triangle' };
      case 'failure':
        return { frequency: 164.8, type: 'sawtooth' };
      case 'victory':
        return { frequency: 659.3, type: 'square' };
      case 'defeat':
        return { frequency: 98, type: 'sine' };
      case 'combat':
        return { frequency: 440, type: 'sawtooth' };
      case 'notify':
      default:
        return { frequency: 392, type: 'triangle' };
    }
  }
}

export const Soundscape = new SoundscapeController();
