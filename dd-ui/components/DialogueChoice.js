(function () {
  function init() {
    const dialogue = document.querySelector('[data-component="dialogue"]');
    if (!dialogue || dialogue.dataset.bound === 'true') return;
    dialogue.dataset.bound = 'true';
    const options = Array.from(dialogue.querySelectorAll('[role="option"]'));

    function selectOption(option) {
      options.forEach((el) => {
        const isActive = el === option;
        el.setAttribute('aria-selected', String(isActive));
        el.tabIndex = isActive ? 0 : -1;
      });
      option.focus();
      window.DDAudio?.play('confirm');
    }

    options.forEach((option, index) => {
      option.addEventListener('click', () => selectOption(option));
      option.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectOption(option);
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          selectOption(options[(index + 1) % options.length]);
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          selectOption(options[(index - 1 + options.length) % options.length]);
        }
      });
    });
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
