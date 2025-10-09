(function () {
  function init() {
    const trigger = document.querySelector('[data-achievement-trigger]');
    const achievement = document.querySelector('.achievement');
    if (!trigger || !achievement || trigger.dataset.bound === 'true') return;
    trigger.dataset.bound = 'true';

    trigger.addEventListener('click', () => {
      achievement.hidden = false;
      achievement.classList.remove('is-hidden');
      achievement.style.animation = 'none';
      requestAnimationFrame(() => {
        achievement.style.animation = '';
      });
      window.DDAudio?.play('achievement');
      setTimeout(() => {
        achievement.hidden = true;
      }, 2600);
    });
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
