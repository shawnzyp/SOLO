import tokensUrl from '../tokens/tokens.css?url';
import themeUrl from '../styles/theme.css?url';
import motionUrl from '../styles/motion.css?url';
import resetUrl from '../styles/reset.css?url';
export async function loadGlobalCSS(): Promise<CSSStyleSheet[]> {
  const urls = [resetUrl, tokensUrl, themeUrl, motionUrl];
  const sheets: CSSStyleSheet[] = [];
  for (const u of urls){
    const cssText = await fetch(u).then(r=>r.text());
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    sheets.push(sheet);
  }
  return sheets;
}