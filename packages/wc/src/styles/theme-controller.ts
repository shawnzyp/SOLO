import tokens from '../tokens/tokens.json' assert { type: 'json' };

function buildCSS(scope: ':host' | ':root'): string {
  const lines: string[] = [];
  for (const [group, values] of Object.entries(tokens)) {
    for (const [name, value] of Object.entries(values as Record<string, string>)) {
      lines.push(`--${group}-${name}: ${value};`);
    }
  }
  return `${scope}{${lines.join('')}}`;
}

const tokenSheet = (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(buildCSS(':host'));
  return sheet;
})();

const rootSheet = (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(buildCSS(':root'));
  return sheet;
})();

export class ThemeController {
  static supportsAdoption = Array.isArray((document as any).adoptedStyleSheets);

  static bootstrapGlobal(): void {
    if (!this.supportsAdoption) {
      if (!document.head.querySelector('style[data-dd-ui="tokens"]')) {
        const style = document.createElement('style');
        style.dataset.ddUi = 'tokens';
        style.textContent = buildCSS(':root');
        document.head.appendChild(style);
      }
      return;
    }
    const current = ((document as any).adoptedStyleSheets as CSSStyleSheet[]) ?? [];
    if (!current.includes(rootSheet)) {
      (document as any).adoptedStyleSheets = [...current, rootSheet];
    }
  }

  static applyToShadow(root: ShadowRoot | DocumentFragment): void {
    if (this.supportsAdoption) {
      const sheets = ((root as any).adoptedStyleSheets as CSSStyleSheet[]) ?? [];
      if (!sheets.includes(tokenSheet)) {
        (root as any).adoptedStyleSheets = [...sheets, tokenSheet];
      }
      return;
    }
    const existing = (root as any).querySelector?.('style[data-dd-ui="tokens"]');
    if (!existing) {
      const style = document.createElement('style');
      style.dataset.ddUi = 'tokens';
      style.textContent = buildCSS(':host');
      (root as any).prepend?.(style);
    }
  }
}
