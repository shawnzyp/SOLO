export function adopted(root: ShadowRoot, ...sheets: CSSStyleSheet[]){
  // @ts-ignore
  if (root.adoptedStyleSheets !== undefined) {
    // @ts-ignore
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...sheets];
  } else {
    const style = document.createElement('style');
    style.textContent = sheets.map(s=>Array.from(s.cssRules).map(r=>r.cssText).join('\n')).join('\n');
    root.appendChild(style);
  }
}
export function css(strings: TemplateStringsArray, ...vals: any[]): CSSStyleSheet {
  const sheet = new CSSStyleSheet();
  // @ts-ignore
  sheet.replaceSync(String.raw(strings, ...vals));
  return sheet;
}