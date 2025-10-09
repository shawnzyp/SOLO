export const iconSprite = /* html */ `
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-sword" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 20l5.5-5.5" />
    <path d="M14 5l5 5-9 9-5-5 9-9z" />
    <path d="M3 21l3-3" />
  </symbol>
  <symbol id="icon-shield" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3l7 3v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3z" />
  </symbol>
  <symbol id="icon-quest" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 4h9l3 3v13H6z" />
    <path d="M9 9h6" />
    <path d="M9 13h5" />
  </symbol>
  <symbol id="icon-close" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6l12 12M6 18L18 6" />
  </symbol>
  <symbol id="icon-warning" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 4l9 16H3z" />
    <path d="M12 10v4" />
    <path d="M12 17h.01" />
  </symbol>
  <symbol id="icon-audio" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9v6h3l4 4V5l-4 4z" />
    <path d="M16 9.5a3.5 3.5 0 010 5" />
  </symbol>
  <symbol id="icon-play" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="currentColor" stroke-linejoin="round">
    <path d="M8 6l10 6-10 6z" />
  </symbol>
</svg>`;

export const iconIds = [
  'sword',
  'shield',
  'quest',
  'close',
  'warning',
  'audio',
  'play'
] as const;

export type IconId = (typeof iconIds)[number];
