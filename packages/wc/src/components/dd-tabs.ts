import { adopted, css } from '../styles/style-util';
import { loadGlobalCSS } from '../styles/base-styles';

const style = css`
:host{display:block}
.tablist{display:flex;gap:8px;margin-bottom:var(--space-sm)}
button{padding:6px 10px;border-radius:var(--radius-sm);border:1px solid rgba(255,255,255,0.08);background:var(--color-surface1);color:var(--color-text)}
button[aria-selected="true"]{border-color:var(--color-accent)}
.panel{border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);padding:var(--space-md);background:var(--color-surface0)}
`;
export class DDTabs extends HTMLElement{
  static get observedAttributes(){ return ['value']; }
  private sheets: CSSStyleSheet[] = []; private tabs: HTMLButtonElement[] = []; private panels: HTMLElement[] = [];
  get value(){ return this.getAttribute('value')||''; } set value(v:string){ this.setAttribute('value', v); }
  async connectedCallback(){
    const root = this.attachShadow({mode:'open'}); this.sheets = await loadGlobalCSS(); adopted(root, ...this.sheets, style);
    const tablist = document.createElement('div'); tablist.className='tablist'; tablist.setAttribute('role','tablist');
    this.tabs = Array.from(this.querySelectorAll('[data-tab]')) as HTMLButtonElement[];
    this.panels = Array.from(this.querySelectorAll('[data-panel]')) as HTMLElement[];
    this.tabs.forEach((t)=>{
      const id = t.getAttribute('data-tab')!; t.setAttribute('role','tab');
      t.addEventListener('click', ()=>this.select(id));
      t.addEventListener('keydown', (e:KeyboardEvent)=>{
        const idx = this.tabs.indexOf(t);
        if(e.key==='ArrowRight') this.tabs[(idx+1)%this.tabs.length].focus();
        if(e.key==='ArrowLeft') this.tabs[(idx-1+this.tabs.length)%this.tabs.length].focus();
        if(e.key==='Enter' || e.key===' ') this.select(id);
      });
      const clone = t.cloneNode(true) as HTMLButtonElement; clone.setAttribute('aria-selected', 'false'); tablist.appendChild(clone);
    });
    const container = document.createElement('div'); container.className='panel'; const slot = document.createElement('slot'); container.appendChild(slot);
    root.append(tablist, container);
    if(!this.value && this.tabs[0]) this.value = this.tabs[0].getAttribute('data-tab')!; this.sync();
  }
  attributeChangedCallback(){ this.sync(); }
  select(id:string){ this.value = id; this.dispatchEvent(new CustomEvent('change',{detail:{value:id}})); }
  sync(){
    const val = this.value;
    this.querySelectorAll('[data-tab]').forEach((el)=>{
      const id = el.getAttribute('data-tab'); el.setAttribute('aria-selected', String(id===val));
    });
    this.querySelectorAll('[data-panel]').forEach(el=>{ const id = el.getAttribute('data-panel'); (el as HTMLElement).style.display = id===val ? 'block' : 'none'; });
  }
}
customElements.define('dd-tabs', DDTabs);