(function () {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll('[data-theme]');
  const backgroundSelector = document.querySelector('.background-selector');
  const backgroundPreview = document.querySelector('.background-preview');
  const layers = backgroundPreview?.querySelectorAll('.background-preview__layer');
  const audioButtons = document.querySelectorAll('[data-audio]');
  const audioToggle = document.querySelector('[data-audio-toggle]');
  const muteLabel = audioToggle?.querySelector('span');
  const moteLayer = document.querySelector('.mote-layer');
  const backgrounds = [
    { id: 'castle', label: 'Castle Study' },
    { id: 'forest', label: 'Forest Glade' },
    { id: 'dungeon', label: 'Dungeon Stone' },
    { id: 'library', label: 'Arcane Library' },
    { id: 'desert', label: 'Desert Ruin' },
    { id: 'snow', label: 'Snowbound Pass' }
  ];

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    themeButtons.forEach((button) => {
      const active = button.dataset.theme === theme;
      button.setAttribute('aria-pressed', String(active));
    });
  };

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => applyTheme(button.dataset.theme));
  });

  const lazyLoadBackground = (id) => {
    layers?.forEach((layer) => {
      const depth = layer.dataset.depth;
      const url = `backgrounds/${id}-${depth === 'fg' ? 'parallax-fg' : 'parallax-bg'}.webp`;
      layer.style.backgroundImage = `url('${url}')`;
    });
    backgroundPreview?.setAttribute('data-scene', id);
    if (backgroundPreview) {
      backgroundPreview.querySelector('.background-preview__caption').textContent = `${backgrounds.find((bg) => bg.id === id)?.label ?? ''} scene preview`;
    }
  };

  if (backgroundSelector) {
    backgrounds.forEach((bg, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = bg.label;
      button.setAttribute('role', 'radio');
      button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      button.addEventListener('click', () => {
        backgroundSelector.querySelectorAll('button').forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
        button.setAttribute('aria-pressed', 'true');
        lazyLoadBackground(bg.id);
        const audioHelper = window.EmberAudio;
        audioHelper?.play('page');
      });
      backgroundSelector.appendChild(button);
      if (index === 0) {
        lazyLoadBackground(bg.id);
      }
    });
  }

  const initMotes = () => {
    if (!moteLayer) return;
    for (let i = 0; i < 20; i += 1) {
      const mote = document.createElement('span');
      mote.className = 'mote';
      mote.style.setProperty('--index', String(i));
      mote.style.left = `${Math.random() * 100}%`;
      mote.style.bottom = `${Math.random() * 100}%`;
      moteLayer.appendChild(mote);
    }
  };

  initMotes();

  audioButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.audio;
      window.EmberAudio?.play(id);
    });
  });

  audioToggle?.addEventListener('click', () => {
    const muted = window.EmberAudio?.toggleMute();
    if (muteLabel) {
      muteLabel.textContent = muted ? 'Muted' : 'Mute';
    }
    audioToggle.setAttribute('aria-pressed', String(Boolean(muted)));
  });

  const optionsThemeSelect = document.querySelector('#opt-theme');
  optionsThemeSelect?.addEventListener('change', (event) => {
    const value = event.target.value;
    applyTheme(value);
  });

  const volumeRange = document.querySelector('#opt-volume');
  volumeRange?.addEventListener('input', (event) => {
    const value = Number(event.target.value) / 100;
    window.EmberAudio?.setVolume(value);
  });

  const motionToggle = document.querySelector('#opt-motion');
  motionToggle?.addEventListener('change', (event) => {
    root.classList.toggle('prefers-reduced', event.target.checked);
  });
})();
