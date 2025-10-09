(function () {
  const dialogue = document.querySelector('[data-component="dialogue"]');
  if (!dialogue) return;
  const buttons = Array.from(dialogue.querySelectorAll('[role="option"]'));

  const select = (button) => {
    buttons.forEach((btn) => {
      const active = btn === button;
      btn.setAttribute('aria-selected', String(active));
      btn.classList.toggle('is-active', active);
    });
    const event = new CustomEvent('toast', {
      bubbles: true,
      detail: {
        title: 'Choice Selected',
        body: button.textContent?.trim() ?? 'Choice registered'
      }
    });
    dialogue.dispatchEvent(event);
  };

  buttons.forEach((button, index) => {
    button.dataset.index = String(index);
    button.addEventListener('click', () => select(button));
  });

  window.addEventListener('keydown', (event) => {
    if (!/^[1-4]$/.test(event.key)) return;
    const index = Number(event.key) - 1;
    if (buttons[index]) {
      event.preventDefault();
      buttons[index].focus();
      select(buttons[index]);
    }
  });
})();
