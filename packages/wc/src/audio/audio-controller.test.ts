import { describe, expect, it, vi } from 'vitest';
import { AudioController } from './audio-controller';
import { defaultAudioManifest } from './manifest';

class FakeAudioBuffer {
  private data: Float32Array;
  constructor(length: number, sampleRate: number) {
    this.data = new Float32Array(length);
    this.sampleRate = sampleRate;
    this.length = length;
  }
  readonly sampleRate: number;
  readonly length: number;
  getChannelData() {
    return this.data;
  }
}

class FakeGainNode {
  gain = { value: 1 };
  connect = vi.fn(() => this);
}

class FakeBufferSource {
  buffer: AudioBuffer | null = null;
  connect = vi.fn(() => this);
  start = vi.fn();
}

class FakeAudioContext {
  sampleRate = 44100;
  state: AudioContextState = 'running';
  destination = {} as AudioNode;
  resume = vi.fn(async () => {});
  createGain = vi.fn(() => new FakeGainNode() as unknown as GainNode);
  createBufferSource = vi.fn(() => new FakeBufferSource() as unknown as AudioBufferSourceNode);
  createBuffer = vi.fn((channels: number, length: number, sampleRate: number) =>
    new FakeAudioBuffer(length, sampleRate) as unknown as AudioBuffer
  );
  decodeAudioData = vi.fn(async () => this.createBuffer(1, 128, this.sampleRate));
}

describe('AudioController', () => {
  it('generates tone buffers without external fetches', async () => {
    const manifest = { click: defaultAudioManifest.click };
    const context = new FakeAudioContext();
    const controller = new AudioController(manifest, async () => context as unknown as AudioContext);
    await controller.preload();
    await controller.play('click');
    expect(context.createBuffer).toHaveBeenCalled();
    expect(context.createBufferSource).toHaveBeenCalled();
  });
});
