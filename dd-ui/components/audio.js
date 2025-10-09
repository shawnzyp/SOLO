(function () {
  const audioMap = {
    click: { ogg: 'audio/click.ogg', mp3: 'audio/click.mp3', volume: 0.5 },
    confirm: { ogg: 'audio/confirm.ogg', mp3: 'audio/confirm.mp3', volume: 0.6 },
    error: { ogg: 'audio/error.ogg', mp3: 'audio/error.mp3', volume: 0.65 },
    achievement: { ogg: 'audio/achievement.ogg', mp3: 'audio/achievement.mp3', volume: 0.7 },
    page: { ogg: 'audio/page.ogg', mp3: 'audio/page.mp3', volume: 0.45 },
    quest: { ogg: 'audio/quest.ogg', mp3: 'audio/quest.mp3', volume: 0.55 }
  };

  const prefersReducedAudio = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = { muted: prefersReducedAudio, volume: 1 };

  const loadAudio = (id) => {
    const data = audioMap[id];
    if (!data) return null;
    const audio = new Audio();
    audio.src = data.mp3;
    audio.volume = data.volume * state.volume * (state.muted ? 0 : 1);
    audio.preload = 'auto';
    return audio;
  };

  const cache = new Map();

  const play = (id) => {
    if (state.muted) return;
    if (!cache.has(id)) {
      cache.set(id, loadAudio(id));
    }
    const audio = cache.get(id)?.cloneNode();
    if (audio) {
      audio.volume = (audio.volume || 1) * state.volume;
      audio.play().catch(() => {});
    }
  };

  const setVolume = (value) => {
    state.volume = Math.max(0, Math.min(1, value));
  };

  const toggleMute = () => {
    state.muted = !state.muted;
    return state.muted;
  };

  window.EmberAudio = { play, setVolume, toggleMute, state };
})();
