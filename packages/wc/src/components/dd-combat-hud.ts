import { adopted, css } from '../styles/style-util';
import { loadGlobalCSS } from '../styles/base-styles';

type Actor = { name:string; hp:number; hpMax:number; ac:number };
type HUDData = { player: Actor; enemies: Actor[]; turn: 'player'|'enemy'; };

const style = css`
:host{display:block}
.hud{display:grid;grid-template-columns:2fr 3fr;gap:12px;align-items:start}
.card{background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.18));border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);box-shadow:var(--shadow-low);padding:var(--space-md)}
.h{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.badge{border:1px solid rgba(255,255,255,0.1);border-radius:999px;padding:2px 8px}
.bar{height:10px;background:#2d2f3a;border-radius:6px;overflow:hidden}
.fill{height:100%;background:linear-gradient(90deg, var(--color-primary), var(--color-accent))}
.enemies{display:flex;flex-direction:column;gap:8px}
.enemy{display:flex;align-items:center;justify-content:space-between}
.actions{display:flex;gap:8px;flex-wrap:wrap}
button{padding:8px 10px;border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.08);background:var(--color-surface1);color:var(--color-text);cursor:pointer}
.turn{font-weight:600;color:var(--color-accent)}
`;

export class DDCombatHUD extends HTMLElement {
  private sheets: CSSStyleSheet[] = [];
  private _data: HUDData | null = null;
  set data(v: HUDData){ this._data = v; this.render(); }
  get data(): HUDData { return this._data!; }

  async connectedCallback(){
    const root = this.attachShadow({mode:'open'});
    this.sheets = await loadGlobalCSS();
    adopted(root, ...this.sheets, style);
    this.render();
  }

  private badge(text:string){ const s = document.createElement('span'); s.className='badge'; s.textContent=text; return s; }
  private bar(pct:number){ const d = document.createElement('div'); d.className='bar'; const f = document.createElement('div'); f.className='fill'; f.style.width = Math.max(0,Math.min(100,Math.round(pct)))+'%'; d.appendChild(f); return d; }

  private render(){
    if(!this.shadowRoot || !this._data){ this.shadowRoot && (this.shadowRoot.innerHTML = '<div class="card">No combat data</div>'); return; }
    const d = this._data;
    const wrap = document.createElement('div'); wrap.className='hud';
    // Left: player card
    const pc = document.createElement('div'); pc.className='card';
    const hpPct = 100*d.player.hp/d.player.hpMax;
    const head = document.createElement('div'); head.className='h';
    head.innerHTML = \`<strong>\${d.player.name}</strong>\`;
    const badges = document.createElement('div'); badges.append(this.badge('AC '+d.player.ac), this.badge('HP '+d.player.hp+'/'+d.player.hpMax));
    head.appendChild(badges);
    pc.append(head, this.bar(hpPct));
    const actions = document.createElement('div'); actions.className='actions';
    const mk = (id:string, label:string)=>{ const b = document.createElement('button'); b.textContent = label; b.addEventListener('click',()=>this.dispatchEvent(new CustomEvent(id))); return b; };
    actions.append(mk('attack','Attack'), mk('defend','Defend'), mk('useitem','Use Item'), mk('flee','Flee'));
    pc.appendChild(actions);

    // Right: enemies and turn
    const right = document.createElement('div'); right.className='card';
    const turn = document.createElement('div'); turn.className='h'; turn.innerHTML = \`<div class="turn">Turn: \${d.turn}</div>\`; right.appendChild(turn);
    const list = document.createElement('div'); list.className='enemies';
    d.enemies.forEach(e=>{
      const row = document.createElement('div'); row.className='enemy';
      const left = document.createElement('div'); left.textContent = e.name;
      const rightRow = document.createElement('div'); rightRow.style.display='flex'; rightRow.style.gap='8px'; rightRow.append(this.badge('AC '+e.ac), this.badge('HP '+e.hp+'/'+e.hpMax));
      const bar = this.bar(100*e.hp/e.hpMax);
      const col = document.createElement('div'); col.style.flex='1'; col.style.marginLeft='12px'; col.append(bar);
      row.append(left, col, rightRow);
      list.appendChild(row);
    });
    right.appendChild(list);

    wrap.append(pc, right);
    this.shadowRoot.innerHTML = ''; this.shadowRoot.appendChild(wrap);
  }
}
customElements.define('dd-combat-hud', DDCombatHUD);
