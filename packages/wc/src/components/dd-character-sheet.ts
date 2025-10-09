import { adopted, css } from '../styles/style-util';
import { loadGlobalCSS } from '../styles/base-styles';

type SheetData = {
  name:string;
  level:number;
  hp:number; hpMax:number;
  ac:number;
  stats: Record<string, number>;
  skills: Record<string, number>;
  inventory: string[];
  factions: Record<string, number>;
  conditions?: string[];
};

const style = css`
:host{display:block}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.card{background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.18));border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);box-shadow:var(--shadow-low);padding:var(--space-md)}
.hdr{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.badge{border:1px solid rgba(255,255,255,0.1);border-radius:999px;padding:2px 8px}
ul{margin:0;padding-left:18px}
.bar{height:10px;background:#2d2f3a;border-radius:6px;overflow:hidden}
.fill{height:100%;background:linear-gradient(90deg, var(--color-primary), var(--color-accent))}
`;

export class DDCharacterSheet extends HTMLElement {
  private sheets: CSSStyleSheet[] = [];
  private _data: SheetData | null = null;
  set data(v: SheetData){ this._data = v; this.render(); }
  get data(): SheetData { return this._data!; }

  async connectedCallback(){
    const root = this.attachShadow({mode:'open'});
    this.sheets = await loadGlobalCSS();
    adopted(root, ...this.sheets, style);
    // Try parse JSON from attribute if present
    if(this.hasAttribute('data-json')){
      try{ this._data = JSON.parse(this.getAttribute('data-json')!); }catch{}
    }
    this.render();
  }

  private render(){
    if(!this.shadowRoot || !this._data) { this.shadowRoot && (this.shadowRoot.innerHTML = '<div class="card">No character data</div>'); return; }
    const d = this._data;
    const hpPct = Math.max(0, Math.min(100, Math.round(100*d.hp/d.hpMax)));
    const el = document.createElement('div');
    el.className = 'grid';
    const core = document.createElement('div');
    core.className = 'card';
    core.innerHTML = \`
      <div class="hdr">
        <h3 style="margin:0;font-family:var(--font-display)">\${d.name}</h3>
        <span class="badge">Level \${d.level}</span>
        <span class="badge">AC \${d.ac}</span>
        <span class="badge">HP \${d.hp}/\${d.hpMax}</span>
      </div>
      <div class="bar" style="margin-top:8px"><div class="fill" style="width:\${hpPct}%"></div></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">\${Object.entries(d.stats).map(([k,v])=>\`<span class="badge">\${k.toUpperCase()} \${v>=0?'+':''}\${v}</span>\`).join('')}</div>
    \`;
    const skills = document.createElement('div');
    skills.className = 'card';
    skills.innerHTML = '<h4 style="margin-top:0">Skills</h4>' + Object.entries(d.skills).map(([k,v])=>\`<span class="badge">\${k} \${v>=0?'+':''}\${v}</span>\`).join(' ');
    const inv = document.createElement('div');
    inv.className = 'card';
    inv.innerHTML = '<h4 style="margin-top:0">Inventory</h4><ul>'+d.inventory.map(i=>'<li>'+i+'</li>').join('')+'</ul>';
    const fac = document.createElement('div');
    fac.className = 'card';
    fac.innerHTML = '<h4 style="margin-top:0">Factions</h4>' + Object.entries(d.factions).map(([k,v])=>\`<div>\${k}: \${v}</div>\`).join('');
    el.append(core, skills, inv, fac);
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(el);
  }
}
customElements.define('dd-character-sheet', DDCharacterSheet);
