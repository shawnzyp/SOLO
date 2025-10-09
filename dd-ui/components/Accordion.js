(function () {
  function init() {
    const container = document.querySelector('[data-component="accordion"]');
    if (!container || container.dataset.bound === 'true') return;
    container.dataset.bound = 'true';
    const triggers = Array.from(container.querySelectorAll('.accordion__trigger'));
    const panels = Array.from(container.querySelectorAll('.accordion__panel'));

    const closeAll = () => {
      triggers.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
      panels.forEach((panel) => panel.classList.remove('is-open'));
    };

    triggers.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        closeAll();
        if (!isExpanded) {
          btn.setAttribute('aria-expanded', 'true');
          panels[index].classList.add('is-open');
        }
      });
    });
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
