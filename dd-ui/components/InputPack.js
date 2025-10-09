(function () {
  const segmentedGroups = document.querySelectorAll('.input-pack__segmented');
  segmentedGroups.forEach((group) => {
    const buttons = Array.from(group.querySelectorAll('.segmented'));
    group.setAttribute('role', 'radiogroup');

    const setActive = (button) => {
      buttons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
        btn.setAttribute('tabindex', active ? '0' : '-1');
      });
    };

    buttons.forEach((btn, index) => {
      btn.dataset.index = String(index);
      if (!btn.hasAttribute('aria-pressed')) {
        btn.setAttribute('aria-pressed', String(btn.classList.contains('is-active')));
        btn.setAttribute('tabindex', btn.classList.contains('is-active') ? '0' : '-1');
      }

      btn.addEventListener('click', () => setActive(btn));

      btn.addEventListener('keydown', (event) => {
        const current = buttons.indexOf(btn);
        let nextIndex = current;
        if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
          nextIndex = (current + 1) % buttons.length;
        } else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
          nextIndex = (current - 1 + buttons.length) % buttons.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = buttons.length - 1;
        } else {
          return;
        }
        event.preventDefault();
        const next = buttons[nextIndex];
        setActive(next);
        next.focus();
      });
    });
  });
})();
