import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ThemeController } from '../styles/theme-controller';

export interface CharacterStat {
  name: string;
  value: number;
}

export interface CharacterSkill {
  name: string;
  rank: number;
}

export interface CharacterInventoryItem {
  name: string;
  qty: number;
}

export interface CharacterFaction {
  name: string;
  standing: 'ally' | 'neutral' | 'hostile';
}

export interface CharacterCondition {
  name: string;
  description: string;
}

export interface CharacterSheetData {
  name: string;
  level: number;
  ancestry: string;
  stats: CharacterStat[];
  skills: CharacterSkill[];
  inventory: CharacterInventoryItem[];
  factions: CharacterFaction[];
  conditions: CharacterCondition[];
}

const styles = css`
  :host {
    display: block;
    background: rgba(14, 15, 19, 0.8);
    border-radius: var(--radius-lg);
    border: var(--border-gold);
    padding: var(--space-xl);
    font-family: var(--font-ui);
    color: var(--color-text);
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
  }
  h2 {
    margin: 0;
    font-family: var(--font-display);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .grid {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  }
  section {
    background: rgba(20, 22, 28, 0.75);
    border-radius: var(--radius-md);
    border: var(--border-hairline);
    padding: var(--space-md);
  }
  section h3 {
    margin: 0 0 var(--space-sm);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-muted);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.35rem;
  }
  .stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export class DdCharacterSheet extends LitElement {
  static override styles = styles;

  @property({ type: Object }) data?: CharacterSheetData;

  protected createRenderRoot() {
    const root = super.createRenderRoot() as ShadowRoot;
    ThemeController.applyToShadow(root);
    return root;
  }

  render() {
    if (!this.data) {
      return html`<p role="status">No character selected.</p>`;
    }
    const { name, level, ancestry, stats, skills, inventory, factions, conditions } = this.data;
    return html`
      <header>
        <h2>${name}</h2>
        <div class="meta">Level ${level} · ${ancestry}</div>
      </header>
      <div class="grid">
        <section>
          <h3>Attributes</h3>
          <ul>
            ${stats.map((stat) => html`<li class="stat"><span>${stat.name}</span><strong>${stat.value}</strong></li>`)}
          </ul>
        </section>
        <section>
          <h3>Skills</h3>
          <ul>
            ${skills.map((skill) => html`<li class="stat"><span>${skill.name}</span><strong>+${skill.rank}</strong></li>`)}
          </ul>
        </section>
        <section>
          <h3>Inventory</h3>
          <ul>
            ${inventory.map((item) => html`<li>${item.name} ×${item.qty}</li>`)}
          </ul>
        </section>
        <section>
          <h3>Factions</h3>
          <ul>
            ${factions.map((faction) => html`<li>${faction.name} — ${faction.standing}</li>`)}
          </ul>
        </section>
        <section>
          <h3>Conditions</h3>
          <ul>
            ${conditions.map((condition) => html`<li><strong>${condition.name}</strong> — ${condition.description}</li>`)}
          </ul>
        </section>
      </div>
    `;
  }
}

if (!customElements.get('dd-character-sheet')) {
  customElements.define('dd-character-sheet', DdCharacterSheet);
}
