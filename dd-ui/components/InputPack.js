(function () {
  function init() {
    const segmented = document.querySelector('.input-pack .segmented');
    if (!segmented || segmented.dataset.bound === 'true') return;
    segmented.dataset.bound = 'true';
    const buttons = Array.from(segmented.querySelectorAll('.segmented__option'));
    segmented.addEventListener('click', (event) => {
      const btn = event.target.closest('.segmented__option');
      if (!btn) return;
      buttons.forEach((b) => b.classList.toggle('is-selected', b === btn));
      segmented.dataset.value = btn.dataset.value;
      segmented.setAttribute('aria-activedescendant', btn.id || btn.dataset.value);
    });
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
