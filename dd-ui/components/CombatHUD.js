(function () {
  const hud = document.querySelector('.combat-hud');
  if (!hud) return;
  const floaters = hud.querySelectorAll('.floater');

  const resetFloater = (floater) => {
    floater.style.animation = 'none';
    void floater.offsetWidth;
    floater.style.animation = '';
  };

  hud.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.closest('.action')) {
      floaters.forEach(resetFloater);
    }
  });
})();
