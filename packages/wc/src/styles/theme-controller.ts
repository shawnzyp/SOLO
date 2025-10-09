import tokens from '../tokens/tokens.json' assert { type: 'json' };

type Scope = ':host' | ':root';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const supportsConstructable =
  isBrowser &&
  typeof CSSStyleSheet !== 'undefined' &&
  'replaceSync' in CSSStyleSheet.prototype &&
  'adoptedStyleSheets' in Document.prototype;

function buildCSS(scope: Scope): string {
  const lines: string[] = [];
  for (const [group, values] of Object.entries(tokens)) {
    for (const [name, value] of Object.entries(values as Record<string, string>)) {
      lines.push(`--${group}-${name}: ${value};`);
    }
  }
  return `${scope}{${lines.join('')}}`;
}

const hostCSS = buildCSS(':host');
const rootCSS = buildCSS(':root');

const tokenSheet = supportsConstructable ? new CSSStyleSheet() : undefined;
if (tokenSheet) {
  tokenSheet.replaceSync(hostCSS);
}

const rootSheet = supportsConstructable ? new CSSStyleSheet() : undefined;
if (rootSheet) {
  rootSheet.replaceSync(rootCSS);
}

const sharedSheets: CSSStyleSheet[] = [];

function ensureStyleElement(target: ParentNode, css: string, id: string): void {
  const existing = (target as Element | ShadowRoot).querySelector?.(`style[data-dd-ui="${id}"]`);
  if (existing) return;
  const style = document.createElement('style');
  style.dataset.ddUi = id;
  style.textContent = css;
  target.prepend(style);
}

export class ThemeController {
  static get supportsAdoption(): boolean {
    return supportsConstructable;
  }

  static registerSharedSheet(sheet: CSSStyleSheet): void {
    if (!supportsConstructable) return;
    if (!sharedSheets.includes(sheet)) {
      sharedSheets.push(sheet);
    }
  }

  static bootstrapGlobal(): void {
    if (!isBrowser) return;
    if (supportsConstructable && rootSheet) {
      const current = (document.adoptedStyleSheets ?? []) as CSSStyleSheet[];
      if (!current.includes(rootSheet)) {
        document.adoptedStyleSheets = [...current, rootSheet];
      }
      sharedSheets.forEach((sheet) => {
        if (!document.adoptedStyleSheets.includes(sheet)) {
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
        }
      });
      return;
    }
    ensureStyleElement(document.head, rootCSS, 'tokens');
  }

  static applyToShadow(root: ShadowRoot | DocumentFragment): void {
    if (!isBrowser) return;
    if (supportsConstructable && tokenSheet) {
      const adopted = ((root as any).adoptedStyleSheets as CSSStyleSheet[]) ?? [];
      const next = adopted.includes(tokenSheet) ? adopted : [...adopted, tokenSheet];
      const withShared = sharedSheets.reduce((acc, sheet) => (acc.includes(sheet) ? acc : [...acc, sheet]), next);
      (root as any).adoptedStyleSheets = withShared;
      return;
    }
    ensureStyleElement(root, hostCSS, 'tokens');
  }
}
