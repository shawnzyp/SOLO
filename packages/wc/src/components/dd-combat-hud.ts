import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ThemeController } from '../styles/theme-controller';

interface ActionSlot {
  id: string;
  icon: string;
  label: string;
  cooldown?: number;
}

interface TurnEntry {
  id: string;
  name: string;
  initiative: number;
  active?: boolean;
}

export interface CombatHudData {
  actionBar: ActionSlot[];
  turnOrder: TurnEntry[];
  enemyName: string;
  enemyHealth: number;
  enemyHealthMax: number;
}

const styles = css`
  :host {
    display: grid;
    gap: var(--space-lg);
    color: var(--color-text);
    font-family: var(--font-ui);
  }
  .action-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
    gap: var(--space-sm);
  }
  .slot {
    background: rgba(20, 22, 28, 0.85);
    border-radius: var(--radius-md);
    border: var(--border-hairline);
    padding: var(--space-sm);
    display: grid;
    place-items: center;
    text-align: center;
    gap: 0.35rem;
  }
  .slot span {
    font-size: 0.75rem;
  }
  .turn-order {
    display: flex;
    gap: var(--space-sm);
    overflow-x: auto;
    padding-bottom: var(--space-sm);
  }
  .turn {
    min-width: 8rem;
    background: rgba(14, 15, 19, 0.75);
    border-radius: var(--radius-md);
    border: var(--border-hairline);
    padding: var(--space-sm) var(--space-md);
  }
  .turn[data-active='true'] {
    border-color: var(--color-accent);
    box-shadow: 0 0 12px rgba(200, 162, 74, 0.35);
  }
  .enemy {
    background: rgba(20, 22, 28, 0.9);
    border-radius: var(--radius-lg);
    border: var(--border-gold);
    padding: var(--space-md) var(--space-lg);
  }
  progress {
    width: 100%;
    height: 12px;
    border-radius: 999px;
    overflow: hidden;
    background: rgba(179, 58, 58, 0.2);
  }
`;

export class DdCombatHud extends LitElement {
  static styles = styles;

  @property({ type: Object }) data?: CombatHudData;

  protected createRenderRoot() {
    const root = super.createRenderRoot() as ShadowRoot;
    ThemeController.applyToShadow(root);
    return root;
  }

  render() {
    if (!this.data) return html`<p role="status">Combat idle.</p>`;
    const { actionBar, turnOrder, enemyHealth, enemyHealthMax, enemyName } = this.data;
    const healthPercent = Math.max(0, Math.min(1, enemyHealth / enemyHealthMax));
    return html`
      <div class="enemy">
        <strong>${enemyName}</strong>
        <progress max="1" value=${healthPercent}></progress>
        <div>${Math.round(healthPercent * 100)}%</div>
      </div>
      <div class="action-bar" role="list">
        ${actionBar.map(
          (slot) => html`
            <div class="slot" role="listitem">
              <svg width="32" height="32" aria-hidden="true">
                <use href="#icon-${slot.icon}"></use>
              </svg>
              <span>${slot.label}</span>
              ${typeof slot.cooldown === 'number'
                ? html`<small>CD ${slot.cooldown.toFixed(1)}s</small>`
                : null}
            </div>
          `
        )}
      </div>
      <div class="turn-order" aria-label="Turn order">
        ${turnOrder.map(
          (entry) => html`
            <div class="turn" data-active=${entry.active ? 'true' : 'false'}>
              <div>${entry.name}</div>
              <small>Initiative ${entry.initiative}</small>
            </div>
          `
        )}
      </div>
    `;
  }
}

if (!customElements.get('dd-combat-hud')) {
  customElements.define('dd-combat-hud', DdCombatHud);
}
