import spriteMarkup from './icons.svg?raw';

let injected = false;

function placeSprite(): void {
  if (injected) return;
  if (typeof document === 'undefined') return;
  if (document.getElementById('dd-ui-icon-sprite')) {
    injected = true;
    return;
  }
  const template = document.createElement('template');
  template.innerHTML = spriteMarkup;
  const svg = template.content.querySelector('svg');
  if (!svg) return;
  svg.id = 'dd-ui-icon-sprite';
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.style.position = 'absolute';
  svg.style.width = '0';
  svg.style.height = '0';
  svg.style.overflow = 'hidden';
  document.body.prepend(svg);
  injected = true;
}

export function ensureIconSprite(): void {
  if (injected) return;
  if (typeof document === 'undefined') return;
  if (document.body) {
    placeSprite();
  } else {
    document.addEventListener('DOMContentLoaded', placeSprite, { once: true });
  }
}
