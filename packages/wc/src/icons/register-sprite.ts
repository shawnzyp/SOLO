import { iconSprite } from './sprite';

let injected = false;

export function ensureSprite(target: Document | ShadowRoot = document): void {
  if (injected) return;
  const container = target instanceof Document ? target.body : target;
  if (!container) return;
  const wrapper = document.createElement('div');
  wrapper.setAttribute('data-dd-icons', '');
  wrapper.style.display = 'none';
  wrapper.innerHTML = iconSprite;
  container.appendChild(wrapper);
  injected = true;
}
