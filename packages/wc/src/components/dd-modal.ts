import { adopted, css } from '../styles/style-util';
import { loadGlobalCSS } from '../styles/base-styles';

const style = css`
:host{display:contents}
.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center}
.dialog{min-width:320px;max-width:640px;background:var(--color-surface1);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-lg);box-shadow:var(--shadow-high);padding:var(--space-md)}
.header{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-sm)}
.title{font-family:var(--font-display);letter-spacing:.5px}
`;
function trapFocus(el:HTMLElement){
  const focusable = el.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
  const first = focusable[0], last = focusable[focusable.length-1];
  function onKey(e:KeyboardEvent){
    if(e.key!=='Tab') return;
    if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
  el.addEventListener('keydown', onKey); return ()=>el.removeEventListener('keydown', onKey);
}
export class DDModal extends HTMLElement{
  static get observedAttributes(){ return ['open','title']; }
  private root!: ShadowRoot; private sheets: CSSStyleSheet[] = []; private cleanup?: ()=>void; private prevFocus: Element|null = null;
  get open(){ return this.hasAttribute('open'); } set open(v:boolean){ v?this.setAttribute('open',''):this.removeAttribute('open'); }
  get title(){ return this.getAttribute('title')||''; }
  async connectedCallback(){ this.root = this.attachShadow({mode:'open'}); this.sheets = await loadGlobalCSS(); adopted(this.root, ...this.sheets, style); this.render(); }
  attributeChangedCallback(){ this.render(); }
  render(){
    this.root.innerHTML = ''; if(!this.open) return;
    const backdrop = document.createElement('div'); backdrop.className = 'backdrop'; backdrop.setAttribute('role','dialog'); backdrop.setAttribute('aria-modal','true');
    const dialog = document.createElement('div'); dialog.className = 'dialog card gold';
    const head = document.createElement('div'); head.className = 'header';
    const h = document.createElement('h3'); h.className='title'; h.textContent = this.title;
    const close = document.createElement('button'); close.textContent = 'Close'; close.addEventListener('click', ()=>this.close());
    head.append(h, close);
    const slot = document.createElement('slot');
    dialog.append(head, slot); backdrop.append(dialog); this.root.appendChild(backdrop);
    this.prevFocus = document.activeElement; this.cleanup = trapFocus(dialog); dialog.focus();
    backdrop.addEventListener('click', (e)=>{ if(e.target===backdrop) this.close(); });
    this.addEventListener('keydown', (e:KeyboardEvent)=>{ if(e.key==='Escape') this.close(); });
  }
  close(){ this.removeAttribute('open'); this.cleanup?.(); this.dispatchEvent(new CustomEvent('openchange', { detail: { open:false } })); if(this.prevFocus instanceof HTMLElement) this.prevFocus.focus(); }
}
customElements.define('dd-modal', DDModal);