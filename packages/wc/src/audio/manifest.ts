import type { AudioSource, ToneAsset, ToneStep } from './audio-controller';

function tone(steps: ToneStep[], attack = 0.01, release = 0.12): ToneAsset {
  return { kind: 'tone', steps, attack, release };
}

export const defaultAudioManifest: Record<string, AudioSource> = {
  click: tone(
    [
      { frequency: 720, duration: 0.06, type: 'square', gain: 0.5 },
      { frequency: 540, duration: 0.05, type: 'triangle', gain: 0.4 }
    ],
    0.005,
    0.08
  ),
  confirm: tone(
    [
      { frequency: 520, duration: 0.15, type: 'triangle', gain: 0.45 },
      { frequency: 780, duration: 0.18, type: 'sine', gain: 0.55 }
    ],
    0.01,
    0.2
  ),
  error: tone(
    [
      { frequency: 200, duration: 0.14, type: 'square', gain: 0.55 },
      { frequency: 160, duration: 0.18, type: 'sawtooth', gain: 0.4 }
    ],
    0.006,
    0.3
  ),
  achievement: tone(
    [
      { frequency: 640, duration: 0.18, type: 'triangle', gain: 0.45 },
      { frequency: 880, duration: 0.2, type: 'sine', gain: 0.5 },
      { frequency: 1040, duration: 0.24, type: 'sine', gain: 0.45 }
    ],
    0.012,
    0.35
  ),
  page: tone(
    [
      { frequency: 360, duration: 0.12, type: 'triangle', gain: 0.35 },
      { frequency: 300, duration: 0.1, type: 'sine', gain: 0.3 }
    ],
    0.008,
    0.16
  ),
  quest: tone(
    [
      { frequency: 480, duration: 0.1, type: 'triangle', gain: 0.4 },
      { frequency: 620, duration: 0.16, type: 'sine', gain: 0.45 },
      { frequency: 520, duration: 0.12, type: 'triangle', gain: 0.35 }
    ],
    0.01,
    0.22
  )
};

export type DefaultAudioManifest = typeof defaultAudioManifest;
