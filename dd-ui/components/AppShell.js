(function () {
  const header = document.querySelector('[data-component="app-shell"]');
  if (!header) return;

  const nav = header.querySelector('#primary-nav');
  const toggle = header.querySelector('.app-shell__menu-toggle');
  const main = document.querySelector('.app-shell__main');

  if (toggle && nav) {
    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      nav.setAttribute('aria-expanded', String(open));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-expanded', 'false');
      }
    });

    nav.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        close();
        toggle.focus();
      }
    });
  }

  if (main) {
    window.addEventListener('hashchange', () => {
      main.focus({ preventScroll: true });
    });
  }
})();
