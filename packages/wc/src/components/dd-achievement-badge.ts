import { adopted, css } from '../styles/style-util';
import { loadGlobalCSS } from '../styles/base-styles';

const style = css`
:host{display:inline-block}
.badge{display:inline-flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid var(--color-accent);border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.25));box-shadow:var(--shadow-low)}
svg{width:1.2em;height:1.2em;color:var(--color-accent)}
`;
export class DDAchievementBadge extends HTMLElement{
  static get observedAttributes(){ return ['title','icon']; }
  get title(){ return this.getAttribute('title')||''; }
  get icon(){ return this.getAttribute('icon')||'trophy'; }
  async connectedCallback(){
    const root = this.attachShadow({mode:'open'});
    const sheets = await loadGlobalCSS(); adopted(root, ...sheets, style); this.render();
  }
  attributeChangedCallback(){ this.render(); }
  render(){
    if(!this.shadowRoot) return;
    const sprite = new URL('../icons/icons.svg', import.meta.url).toString();
    this.shadowRoot.innerHTML = `<span class="badge pop"><svg aria-hidden="true"><use href="${sprite}#${this.icon}"></use></svg><slot>${this.title}</slot></span>`;
  }
}
customElements.define('dd-achievement-badge', DDAchievementBadge);