import '@solo/dd-wc/register-all';
import { DdToast, ThemeController, globalAudio } from '@solo/dd-wc';
import type { CombatActionEvent } from '@solo/dd-wc';

ThemeController.bootstrapGlobal();

const toastButton = document.querySelector('#demo-toast');
if (toastButton) {
  toastButton.addEventListener('click', () => {
    DdToast.show('Quest updated!', { variant: 'info' });
  });
}

const achievement = document.querySelector('dd-achievement-badge');
if (achievement) {
  achievement.addEventListener('click', () => {
    globalAudio.play('achievement');
    DdToast.show('Achievement logged', { variant: 'success' });
  });
}

const dialogue = document.querySelector('dd-dialogue-list');
dialogue?.addEventListener('dd-dialogue-select', (event: Event) => {
  const detail = (event as CustomEvent).detail.option;
  DdToast.show(`You selected ${detail.label}`, { variant: 'info' });
});

const combatHud = document.querySelector('dd-combat-hud');
combatHud?.addEventListener('dd-combat-action', (event: Event) => {
  const detail = (event as CombatActionEvent).detail;
  const message = `Action ${detail.action} triggered.`;
  DdToast.show(message, { variant: detail.action === 'flee' ? 'warning' : 'success' });
  if (detail.action === 'attack') {
    globalAudio.play('click');
  } else if (detail.action === 'defend') {
    globalAudio.play('confirm');
  } else if (detail.action === 'flee') {
    globalAudio.play('error');
  }
});

const modalTrigger = document.querySelector('#open-modal');
const modal = document.querySelector('dd-modal');
modalTrigger?.addEventListener('click', () => {
  modal?.setAttribute('open', '');
});
modal?.addEventListener('dd-modal-close', () => {
  modal?.removeAttribute('open');
});

const themeToggle = document.querySelector('#theme-toggle');
const root = document.documentElement;
const themes: Record<string, string> = {
  ember: 'radial-gradient(circle at top, rgba(179,58,58,0.2), transparent 60%), var(--color-bg)',
  parchment: '#E9E1CF',
  obsidian: '#0E0F13'
};

themeToggle?.addEventListener('change', (event) => {
  const value = (event.target as HTMLSelectElement).value;
  root.style.setProperty('--demo-background', themes[value]);
});

const reducedMotionToggle = document.querySelector('#motion-toggle');
reducedMotionToggle?.addEventListener('change', (event) => {
  const checked = (event.target as HTMLInputElement).checked;
  document.body.dataset.motion = checked ? 'reduced' : 'full';
});

const muteToggle = document.querySelector('#mute-toggle');
muteToggle?.addEventListener('change', (event) => {
  const checked = (event.target as HTMLInputElement).checked;
  globalAudio.muted = checked;
});

const actionButton = document.querySelector('#action-sound');
actionButton?.addEventListener('click', () => globalAudio.play('click'));

const toastRegion = document.createElement('dd-toast');
document.body.appendChild(toastRegion);
