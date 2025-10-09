(function () {
  document.querySelectorAll('[data-component="tabs"]').forEach((tabs) => {
    const tabButtons = Array.from(tabs.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

    const focusTab = (index) => {
      tabButtons.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.setAttribute('tabindex', selected ? '0' : '-1');
        panels[i].hidden = !selected;
      });
      tabButtons[index].focus();
    };

    tabButtons.forEach((tab, index) => {
      tab.addEventListener('click', () => focusTab(index));
      tab.addEventListener('keydown', (event) => {
        let nextIndex = index;
        if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
          nextIndex = (index + 1) % tabButtons.length;
        } else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
          nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = tabButtons.length - 1;
        } else {
          return;
        }
        event.preventDefault();
        focusTab(nextIndex);
      });
    });
  });
})();
