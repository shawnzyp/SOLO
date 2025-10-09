import { adopted, css } from '../styles/style-util';
import { loadGlobalCSS } from '../styles/base-styles';
import { audio } from '../audio/audio-controller';

const style = css`
:host{display:inline-flex}
button{appearance:none;cursor:pointer;user-select:none;border:1px solid rgba(255,255,255,0.08);background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.2));color: var(--color-text);border-radius: var(--radius-md);padding: var(--space-sm) var(--space-md);box-shadow:var(--shadow-low);display:inline-flex;align-items:center;gap:8px}
button.primary{ border-color: var(--color-accent) }
button:focus-visible{ outline:2px solid var(--color-accent); outline-offset:2px }
svg{ width: 1.1em; height: 1.1em }
`;
export class DDButton extends HTMLElement{
  static get observedAttributes(){ return ['variant','icon','aria-label']; }
  private btn!: HTMLButtonElement; private sheets: CSSStyleSheet[] = [];
  get variant(){ return this.getAttribute('variant') || 'primary'; }
  get icon(){ return this.getAttribute('icon'); }
  async connectedCallback(){
    const root = this.attachShadow({mode:'open'});
    this.sheets = await loadGlobalCSS(); adopted(root, ...this.sheets, style);
    this.btn = document.createElement('button'); this.btn.className = this.variant; this.btn.part.add('button');
    if(this.icon){
      this.btn.innerHTML = `<svg aria-hidden="true"><use href="${new URL('../icons/icons.svg', import.meta.url).toString()}#${this.icon}"></use></svg><slot></slot>`;
    } else { this.btn.innerHTML = `<slot></slot>`; }
    this.btn.addEventListener('click', ()=>audio.play('click'));
    root.appendChild(this.btn);
    if(!this.hasAttribute('role')) this.setAttribute('role','button');
    if(!this.hasAttribute('tabindex')) this.setAttribute('tabindex','0');
    this.addEventListener('keydown', (e:KeyboardEvent)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); this.btn.click(); } });
  }
  attributeChangedCallback(){ if(this.btn) this.btn.className = this.variant; }
}
customElements.define('dd-button', DDButton);