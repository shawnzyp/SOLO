import { adopted, css } from '../styles/style-util';
import { loadGlobalCSS } from '../styles/base-styles';

const style = css`
:host{position:fixed;inset:auto 0 0 auto;display:block;z-index:1000;padding:var(--space-md)}
.stack{display:flex;flex-direction:column;gap:8px;align-items:flex-end}
.toast{background:var(--color-surface1);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-md);padding:10px 12px;box-shadow:var(--shadow-mid)}
`;
type Toast = { title:string; body?:string; variant?:'info'|'success'|'warning'|'danger'; };
export class DDToast extends HTMLElement{
  private stack!: HTMLElement; private sheets: CSSStyleSheet[] = [];
  async connectedCallback(){
    const root = this.attachShadow({mode:'open'}); this.sheets = await loadGlobalCSS(); adopted(root, ...this.sheets, style);
    this.stack = document.createElement('div'); this.stack.className='stack'; root.appendChild(this.stack);
    (window as any).ddToast = this;
  }
  push(t:Toast){
    const el = document.createElement('div'); el.className='toast pop'; el.setAttribute('role','status'); el.setAttribute('aria-live','polite');
    el.innerHTML = `<strong>${t.title}</strong>${t.body?`<div>${t.body}</div>`:''}`;
    this.stack.appendChild(el); setTimeout(()=>el.remove(), 3000);
  }
}
customElements.define('dd-toast', DDToast);