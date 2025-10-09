(function () {
  const host = document.querySelector('[data-component="toast"]');
  if (!host) return;
  const stack = host.querySelector('.toast-stack');
  const trigger = host.querySelector('[data-toast-trigger]');
  let counter = 0;

  const makeToast = ({ title, body, tone = 'success' }) => {
    const toast = document.createElement('div');
    toast.className = `toast toast--${tone}`;
    toast.setAttribute('role', 'status');
    toast.style.animation = 'achievement-pop var(--duration-slow) var(--easing-out-back) forwards';
    toast.innerHTML = `<div class="toast__title">${title}</div><div class="toast__body">${body}</div>`;
    stack.appendChild(toast);
    counter += 1;
    const toastId = counter;
    setTimeout(() => {
      if (counter === toastId) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px)';
      }
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  trigger?.addEventListener('click', () => {
    makeToast({
      title: 'Quest Updated',
      body: 'The Ember Archive now tracks the Relic of Dawnspark.'
    });
  });

  const relay = (event) => {
    makeToast(event.detail);
  };

  host.addEventListener('toast', relay);
  document.addEventListener('toast', relay);
})();
