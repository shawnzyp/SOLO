(function () {
  const host = document.querySelector('[data-component="achievement"]');
  if (!host) return;
  const trigger = host.querySelector('[data-achievement-trigger]');
  const badge = host.querySelector('.achievement__badge');

  const showBadge = () => {
    badge.hidden = false;
    badge.classList.add('is-visible');
    badge.dispatchEvent(new CustomEvent('toast', { bubbles: true, detail: { title: 'Achievement', body: 'Keeper of the Ember Vault' } }));
    setTimeout(() => badge.classList.remove('is-visible'), 1200);
  };

  trigger?.addEventListener('click', () => {
    showBadge();
    const audioHelper = window.EmberAudio;
    audioHelper?.play('achievement');
  });
})();
