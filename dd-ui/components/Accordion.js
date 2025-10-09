(function () {
  document.querySelectorAll('[data-component="accordion"]').forEach((accordion) => {
    accordion.querySelectorAll('.accordion__trigger').forEach((trigger) => {
      const panel = accordion.querySelector('#' + trigger.getAttribute('aria-controls'));
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
      });
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          trigger.click();
        }
      });
    });
  });
})();
