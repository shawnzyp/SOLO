(function () {
  const menu = document.querySelector('[data-component="menu"]');
  if (!menu) return;

  const mainItems = Array.from(menu.querySelectorAll('.menu__item'));
  const tabs = Array.from(menu.querySelectorAll('.menu__tabs [role="tab"]'));
  const panels = Array.from(menu.querySelectorAll('.menu__panel'));
  const palette = menu.querySelector('.menu__palette');

  const focusTab = (index) => {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('tabindex', selected ? '0' : '-1');
      panels[i].hidden = !selected;
    });
    tabs[index].focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => focusTab(index));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
        next = (index + 1) % tabs.length;
      } else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
        next = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'Home') {
        next = 0;
      } else if (event.key === 'End') {
        next = tabs.length - 1;
      } else {
        return;
      }
      event.preventDefault();
      focusTab(next);
    });
  });

  mainItems.forEach((item, index) => {
    item.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        mainItems[(index + 1) % mainItems.length].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        mainItems[(index - 1 + mainItems.length) % mainItems.length].focus();
      }
    });
  });

  const togglePalette = (open) => {
    palette.setAttribute('aria-hidden', String(!open));
    if (open) {
      palette.querySelector('button')?.focus();
    }
  };

  window.addEventListener('keydown', (event) => {
    if (event.metaKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      togglePalette(palette.getAttribute('aria-hidden') === 'true');
    } else if (event.key === 'Escape' && palette.getAttribute('aria-hidden') === 'false') {
      togglePalette(false);
    }
  });

  palette?.addEventListener('click', (event) => {
    if (event.target === palette) {
      togglePalette(false);
    }
  });
})();
