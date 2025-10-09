(function () {
  function init() {
    const tabs = document.querySelector('[data-component="tabs"]');
    if (!tabs || tabs.dataset.bound === 'true') return;
    tabs.dataset.bound = 'true';

    const tabButtons = Array.from(tabs.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

    function activateTab(index, focus = true) {
      tabButtons.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
        if (selected && focus) tab.focus();
      });
    }

    tabButtons.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(index, false));
      tab.addEventListener('keydown', (event) => {
        const currentIndex = tabButtons.findIndex((t) => t === event.currentTarget);
        if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
        }
        let nextIndex = currentIndex;
        if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabButtons.length;
        if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabButtons.length - 1;
        if (nextIndex !== currentIndex) activateTab(nextIndex);
      });
    });
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
