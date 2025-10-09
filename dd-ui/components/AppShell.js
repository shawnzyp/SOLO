(function () {
  function init() {
    const shell = document.querySelector('.app-shell');
    if (!shell || shell.dataset.bound === 'true') return;
    shell.dataset.bound = 'true';

    const menuToggle = shell.querySelector('.app-shell__menu-toggle');
    const nav = shell.querySelector('.app-shell__nav');

    function closeNav() {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }

    menuToggle?.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open');
      if (!expanded) {
        const firstLink = nav.querySelector('a');
        firstLink?.focus();
      }
    });

    nav?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
