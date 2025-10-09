import { adopted, css } from '../styles/style-util';
import { loadGlobalCSS } from '../styles/base-styles';

type Option = { id:string; label:string; hotkey?:string; disabled?:boolean; tooltip?:string };

const style = css`
:host{display:block}
.list{display:flex;flex-direction:column;gap:8px}
.btn{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.08);background:var(--color-surface1);color:var(--color-text);cursor:pointer}
.btn[aria-disabled="true"]{opacity:.6;cursor:not-allowed}
kbd{border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:0 6px;font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;background:var(--color-surface0)}
`;

export class DDDialogueList extends HTMLElement {
  private sheets: CSSStyleSheet[] = [];
  private opts: Option[] = [];
  private list!: HTMLElement;

  set options(v: Option[]) { this.opts = v || []; this.renderList(); }
  get options(): Option[] { return this.opts; }

  async connectedCallback(){
    const root = this.attachShadow({mode:'open'});
    this.sheets = await loadGlobalCSS();
    adopted(root, ...this.sheets, style);
    this.list = document.createElement('div');
    this.list.className = 'list';
    root.appendChild(this.list);
    this.renderList();
    this.addEventListener('keydown', (e:KeyboardEvent)=>{
      const k = e.key;
      const match = this.opts.find(o=>o.hotkey===k);
      if(match && !match.disabled){
        e.preventDefault();
        this.select(match.id);
      }
    });
  }

  private renderList(){
    if(!this.shadowRoot) return;
    if(!this.list) return;
    this.list.innerHTML = '';
    this.opts.forEach((o, idx)=>{
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.setAttribute('role','button');
      btn.setAttribute('aria-disabled', String(!!o.disabled));
      btn.title = o.tooltip || '';
      btn.innerHTML = `${o.hotkey?`<kbd>${o.hotkey}</kbd>`:''}<span>${o.label}</span>`;
      btn.addEventListener('click', ()=>{ if(!o.disabled) this.select(o.id); });
      this.list.appendChild(btn);
    });
  }

  private select(id:string){
    this.dispatchEvent(new CustomEvent('select', { detail: { id } }));
  }
}
customElements.define('dd-dialogue-list', DDDialogueList);
