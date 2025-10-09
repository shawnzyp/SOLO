(function () {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const context = AudioContextClass ? new AudioContextClass() : null;
  let manifest = {};
  let muted = false;
  let volume = 0.7;
  const reduceQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  if (reduceQuery?.matches) {
    volume = 0.4;
  }

  const ready = context
    ? fetch('audio/audio.json')
        .then((response) => (response.ok ? response.json() : {}))
        .then((json) => {
          manifest = json;
          return manifest;
        })
        .catch(() => (manifest = {}))
    : Promise.resolve({});

  function computeDuration(definition) {
    const base = definition.duration ?? 0.4;
    if (!Array.isArray(definition.oscillators)) return base;
    const maxOsc = definition.oscillators.reduce((acc, osc) => {
      const total = (osc.delay ?? 0) + (osc.duration ?? base);
      return Math.max(acc, total);
    }, base);
    return Math.max(base, maxOsc);
  }

  function scheduleOscillator(definition, master, startTime, baseDuration) {
    if (!context) return;
    const osc = context.createOscillator();
    const gain = context.createGain();
    gain.gain.value = definition.gain ?? 0.5;
    osc.type = definition.type || 'sine';
    const freq = definition.frequency ?? 440;
    const begin = startTime + (definition.delay ?? 0);
    const end = begin + (definition.duration ?? baseDuration);
    if (Array.isArray(freq)) {
      if (freq.length === 0) {
        osc.frequency.setValueAtTime(440, begin);
      } else {
        const step = (end - begin) / Math.max(1, freq.length - 1);
        freq.forEach((value, index) => {
          if (index === 0) {
            osc.frequency.setValueAtTime(value, begin);
          } else {
            osc.frequency.linearRampToValueAtTime(value, begin + step * index);
          }
        });
      }
    } else {
      osc.frequency.setValueAtTime(freq, begin);
    }
    if (typeof definition.detune === 'number') {
      osc.detune.setValueAtTime(definition.detune, begin);
    }
    osc.connect(gain);
    gain.connect(master);
    osc.start(begin);
    osc.stop(end);
  }

  function applyEnvelope(node, env, startTime, baseDuration) {
    const attack = env?.attack ?? 0.01;
    const decay = env?.decay ?? 0.12;
    const sustain = env?.sustain ?? 0.4;
    const release = env?.release ?? 0.2;
    const peak = volume * (env?.peak ?? 1);
    node.gain.cancelScheduledValues(startTime);
    node.gain.setValueAtTime(0.0001, startTime);
    node.gain.linearRampToValueAtTime(Math.max(0.0001, peak), startTime + attack);
    node.gain.linearRampToValueAtTime(Math.max(0.0001, peak * sustain), startTime + attack + decay);
    node.gain.linearRampToValueAtTime(Math.max(0.0001, peak * sustain), startTime + baseDuration);
    node.gain.linearRampToValueAtTime(0.0001, startTime + baseDuration + release);
  }

  async function play(id) {
    if (!context || muted) return;
    if (context.state === 'suspended') {
      try {
        await context.resume();
      } catch (error) {
        return;
      }
    }
    await ready;
    const definition = manifest[id];
    if (!definition) return;
    const startTime = context.currentTime;
    const master = context.createGain();
    master.connect(context.destination);
    const baseDuration = computeDuration(definition);
    applyEnvelope(master, definition.envelope, startTime, baseDuration);
    (definition.oscillators || []).forEach((osc) =>
      scheduleOscillator(osc, master, startTime, baseDuration)
    );
  }

  const api = {
    async play(id) {
      await play(id);
    },
    setVolume(value) {
      volume = Math.min(1, Math.max(0, value));
    },
    mute(state = true) {
      muted = Boolean(state);
    },
    toggleMute() {
      muted = !muted;
      return muted;
    }
  };

  window.DDAudio = api;
})();
