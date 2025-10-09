(function () {
  function init() {
    const trigger = document.querySelector('[data-toast-trigger]');
    const stack = document.querySelector('.toast-stack');
    if (!trigger || !stack || trigger.dataset.bound === 'true') return;
    trigger.dataset.bound = 'true';

    function createToast(message, tone = 'info') {
      const toast = document.createElement('div');
      toast.className = `toast toast--${tone}`;
      toast.innerHTML = `<strong>${message}</strong><span>Updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
      stack.appendChild(toast);
      window.DDAudio?.play('quest');
      setTimeout(() => dismissToast(toast), 3200);
    }

    function dismissToast(toast) {
      toast.classList.add('toast--exit');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }

    trigger.addEventListener('click', () => createToast('Quest Journal Updated', 'info'));
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
