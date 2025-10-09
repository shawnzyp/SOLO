(function () {
  function init() {
    const menu = document.querySelector('[data-component="menu-system"]');
    if (!menu || menu.dataset.bound === 'true') return;
    menu.dataset.bound = 'true';

    const buttons = Array.from(menu.querySelectorAll('.menu-item'));
    let current = 0;

    function setActive(index) {
      current = (index + buttons.length) % buttons.length;
      buttons.forEach((btn, i) => {
        btn.tabIndex = i === current ? 0 : -1;
      });
      buttons[current].focus();
    }

    menu.addEventListener('keydown', (event) => {
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        setActive(current + delta);
      }
    });

    setActive(0);

    const paletteToggle = menu.querySelector('[data-command-palette]');
    const palette = menu.querySelector('.command-palette');
    const paletteInput = palette?.querySelector('input');

    function openPalette() {
      if (!palette) return;
      palette.hidden = false;
      paletteInput?.focus();
    }

    function closePalette() {
      if (!palette) return;
      palette.hidden = true;
      paletteToggle?.focus();
    }

    paletteToggle?.addEventListener('click', openPalette);

    document.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'p' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        palette?.hidden ? openPalette() : closePalette();
      }
      if (event.key === 'Escape' && palette && !palette.hidden) {
        closePalette();
      }
    });
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
