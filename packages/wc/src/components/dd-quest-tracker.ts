import { adopted, css } from '../styles/style-util';
import { loadGlobalCSS } from '../styles/base-styles';

type Quest = { id:string; title:string; state:'active'|'complete'|'failed'; faction?:string; reward?:string };

const style = css`
:host{display:block}
.list{display:flex;flex-direction:column;gap:8px}
.item{display:flex;justify-content:space-between;align-items:center;border:1px solid rgba(255,255,255,0.06);background:var(--color-surface1);border-radius:var(--radius-md);padding:8px 10px}
.badges{display:flex;gap:6px;align-items:center}
.badge{border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:2px 8px;font-size:.85em}
.badge.active{border-color:var(--color-info);color:var(--color-info)}
.badge.complete{border-color:var(--color-success);color:var(--color-success)}
.badge.failed{border-color:var(--color-danger);color:var(--color-danger)}
`;

export class DDQuestTracker extends HTMLElement {
  private sheets: CSSStyleSheet[] = [];
  private quests: Quest[] = [];
  set data(v: Quest[]){ this.quests = v || []; this.render(); }
  get data(): Quest[]{ return this.quests; }

  async connectedCallback(){
    const root = this.attachShadow({mode:'open'});
    this.sheets = await loadGlobalCSS();
    adopted(root, ...this.sheets, style);
    this.render();
  }

  private render(){
    if(!this.shadowRoot) return;
    const wrap = document.createElement('div');
    wrap.className='list';
    (this.quests || []).forEach(q=>{
      const row = document.createElement('div'); row.className='item';
      const left = document.createElement('div'); left.textContent = q.title;
      const right = document.createElement('div'); right.className='badges';
      const state = document.createElement('span'); state.className='badge '+q.state; state.textContent = q.state;
      right.appendChild(state);
      if(q.faction){ const f = document.createElement('span'); f.className='badge'; f.textContent = q.faction; right.appendChild(f); }
      if(q.reward){ const r = document.createElement('span'); r.className='badge'; r.textContent = q.reward; right.appendChild(r); }
      row.append(left,right); wrap.appendChild(row);
    });
    this.shadowRoot.innerHTML = ''; this.shadowRoot.appendChild(wrap);
  }
}
customElements.define('dd-quest-tracker', DDQuestTracker);
