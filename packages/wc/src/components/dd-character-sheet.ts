import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { DdElement } from './base';

export interface StatBlock {
  id: string;
  label: string;
  value: number;
}

export interface SkillBlock {
  id: string;
  label: string;
  rank: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

export interface FactionStanding {
  id: string;
  name: string;
  standing: string;
}

export interface Condition {
  id: string;
  label: string;
  description?: string;
}

export interface CharacterSheetData {
  stats: StatBlock[];
  skills: SkillBlock[];
  inventory: InventoryItem[];
  factions: FactionStanding[];
  conditions: Condition[];
}

const styles = css`
  :host {
    display: block;
  }
  .grid {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  section {
    background: color-mix(in oklab, var(--color-surface-1), #ffffff 4%);
    border: var(--border-hairline);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
  }
  h2 {
    font-family: var(--font-display);
    font-size: 1.1rem;
    margin: 0 0 var(--space-md);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-sm);
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  small {
    color: var(--color-muted);
  }
`;

export class DdCharacterSheet extends DdElement {
  static styles = [styles];

  @property({ type: Object }) data: CharacterSheetData = {
    stats: [],
    skills: [],
    inventory: [],
    factions: [],
    conditions: []
  };

  render() {
    const { stats, skills, inventory, factions, conditions } = this.data;
    return html`
      <div class="grid">
        <section>
          <h2>Stats</h2>
          <ul>
            ${stats.map((stat) => html`<li><span>${stat.label}</span><strong>${stat.value}</strong></li>`)}
          </ul>
        </section>
        <section>
          <h2>Skills</h2>
          <ul>
            ${skills.map((skill) => html`<li><span>${skill.label}</span><strong>${skill.rank}</strong></li>`)}
          </ul>
        </section>
        <section>
          <h2>Inventory</h2>
          <ul>
            ${inventory.map((item) => html`<li><span>${item.name}</span><strong>x${item.quantity}</strong></li>`)}
          </ul>
        </section>
        <section>
          <h2>Factions</h2>
          <ul>
            ${factions.map((faction) => html`<li><span>${faction.name}</span><strong>${faction.standing}</strong></li>`)}
          </ul>
        </section>
        <section>
          <h2>Conditions</h2>
          <ul>
            ${conditions.map((condition) =>
              html`<li><span>${condition.label}</span>${condition.description ? html`<small>${condition.description}</small>` : null}</li>`
            )}
          </ul>
        </section>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-character-sheet': DdCharacterSheet;
  }
}
