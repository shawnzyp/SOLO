const supportsAdopted = Boolean((document as Document & { adoptedStyleSheets?: CSSStyleSheet[] }).adoptedStyleSheets);

type StyleTarget = Document | ShadowRoot;

function createSheet(content: string): CSSStyleSheet | HTMLStyleElement {
  if (supportsAdopted) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(content);
    return sheet;
  }
  const style = document.createElement('style');
  style.textContent = content;
  return style;
}

function appendStyle(root: StyleTarget, sheet: CSSStyleSheet | HTMLStyleElement) {
  if (sheet instanceof CSSStyleSheet) {
    const adopted = (root as Document & { adoptedStyleSheets: CSSStyleSheet[] }).adoptedStyleSheets ?? [];
    if (!adopted.includes(sheet)) {
      (root as Document & { adoptedStyleSheets: CSSStyleSheet[] }).adoptedStyleSheets = [...adopted, sheet];
    }
    return;
  }

  const style = sheet.cloneNode(true) as HTMLStyleElement;
  if (root instanceof Document) {
    (root.head ?? root.body ?? root).appendChild(style);
  } else {
    root.appendChild(style);
  }
}

export class ThemeController {
  private tokensSheet: CSSStyleSheet | HTMLStyleElement | null = null;
  private globalSheet: CSSStyleSheet | HTMLStyleElement | null = null;
  constructor(private tokensCss: string, private globalCss: string) {}

  applyToRoot(root: StyleTarget): void {
    if (!this.tokensSheet) {
      this.tokensSheet = createSheet(this.tokensCss);
    }
    if (!this.globalSheet) {
      this.globalSheet = createSheet(this.globalCss);
    }

    appendStyle(root, this.tokensSheet);
    appendStyle(root, this.globalSheet);
  }
}
