(function () {
  function init() {
    document.querySelectorAll('.button-demo [data-sound]').forEach((btn) => {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        window.DDAudio?.play(btn.dataset.sound);
      });
    });
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
