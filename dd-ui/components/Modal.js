(function () {
  const modals = new Map();
  let activeModal = null;
  let lastFocused = null;

  function trapFocus(event) {
    if (!activeModal) return;
    const focusable = activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  function openModal(id) {
    const modal = modals.get(id);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    activeModal = modal;
    document.body.style.overflow = 'hidden';
    const focusTarget = modal.querySelector('[data-modal-close]') || modal.querySelector('button, input, select, textarea');
    focusTarget?.focus();
    document.addEventListener('keydown', trapFocus);
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.hidden = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', trapFocus);
    const returnFocus = lastFocused;
    activeModal = null;
    returnFocus?.focus();
  }

  function bindTriggers() {
    document.querySelectorAll('[data-modal-open]').forEach((btn) => {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
    });
  }

  function init() {
    document.querySelectorAll('.modal[data-modal]').forEach((modal) => {
      if (!modals.has(modal.dataset.modal)) {
        modals.set(modal.dataset.modal, modal);
      }
    });
    bindTriggers();
  }

  document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('[data-modal-close]');
    if (closeButton) {
      closeModal();
    }
  });

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
