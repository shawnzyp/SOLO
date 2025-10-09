export const baseTheme = /* css */ `
:host {
  color: var(--color-text);
  font-family: var(--font-ui);
}

*, *::before, *::after {
  box-sizing: border-box;
}

button {
  font: inherit;
}
`;

export const surfaceStyles = /* css */ `
.surface-0 {
  background: color-mix(in oklab, var(--color-bg) 80%, var(--color-surface-0));
}
.surface-1 {
  background: var(--color-surface-1);
  box-shadow: var(--shadow-low);
  border: var(--border-hairline);
}
.surface-2 {
  background: var(--color-surface-2);
  box-shadow: var(--shadow-mid);
  border: var(--border-gold);
}
`;

export const globalStyles = `${baseTheme}\n${surfaceStyles}`;
