(function () {
  function init() {
    const hud = document.querySelector('.combat-hud');
    if (!hud || hud.dataset.bound === 'true') return;
    hud.dataset.bound = 'true';
    const actionButtons = hud.querySelectorAll('.combat-hud__action-bar .btn');
    const floaters = hud.querySelector('.combat-hud__floaters');

    function spawnFloater(text, tone = 'damage') {
      const floater = document.createElement('div');
      floater.className = `combat-hud__floater combat-hud__floater--${tone}`;
      floater.textContent = text;
      floater.style.top = `${Math.random() * 40 + 20}%`;
      floater.style.left = `${45 + Math.random() * 10}%`;
      floaters.appendChild(floater);
      setTimeout(() => floater.remove(), 800);
    }

    actionButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        spawnFloater(`-${Math.floor(Math.random() * 18) + 6}`);
        window.DDAudio?.play('click');
      });
    });
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
