(function () {
  const host = document.querySelector('[data-component="modal"]');
  if (!host) return;

  const openButtons = host.querySelectorAll('[data-modal-open]');
  const modal = host.querySelector('.modal');
  const dismissButtons = host.querySelectorAll('[data-modal-dismiss]');
  let lastFocused;

  const getFocusable = () => Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));

  const openModal = () => {
    lastFocused = document.activeElement;
    modal.hidden = false;
    modal.classList.add('menu-enter');
    const [first] = getFocusable();
    first?.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    lastFocused?.focus({ preventScroll: true });
  };

  openButtons.forEach((button) => button.addEventListener('click', openModal));
  dismissButtons.forEach((button) => button.addEventListener('click', closeModal));

  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key === 'Tab') {
      const focusable = getFocusable();
      const index = focusable.indexOf(document.activeElement);
      if (event.shiftKey && index === 0) {
        event.preventDefault();
        focusable[focusable.length - 1]?.focus();
      } else if (!event.shiftKey && index === focusable.length - 1) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    }
  });
})();
