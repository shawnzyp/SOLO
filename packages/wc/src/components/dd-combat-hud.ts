import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { DdElement } from './base';

interface ActionItem {
  id: string;
  label: string;
  icon?: string;
  cooldown?: number;
}

interface TurnEntry {
  id: string;
  label: string;
  active?: boolean;
}

export interface CombatHudState {
  playerName: string;
  playerHealth: number;
  playerHealthMax: number;
  actions: ActionItem[];
  turnOrder: TurnEntry[];
}

const styles = css`
  :host {
    display: block;
    border: var(--border-gold);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    background: color-mix(in oklab, var(--color-surface-2), #ffffff 6%);
    box-shadow: var(--shadow-mid);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
  }
  .health {
    width: 100%;
    height: 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }
  .health > div {
    height: 100%;
    background: linear-gradient(90deg, var(--color-danger), color-mix(in oklab, var(--color-danger), #ffffff 14%));
  }
  .actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
  }
  .action {
    align-items: center;
    background: color-mix(in oklab, var(--color-surface-1), #ffffff 4%);
    border: var(--border-hairline);
    border-radius: var(--radius-md);
    display: flex;
    gap: var(--space-sm);
    padding: var(--space-md);
  }
  .turn-order {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
  }
  .turn {
    background: color-mix(in oklab, var(--color-surface-0), #ffffff 6%);
    border-radius: var(--radius-sm);
    padding: var(--space-xs) var(--space-sm);
  }
  .turn[data-active='true'] {
    border: 1px solid var(--color-accent);
  }
`;

export class DdCombatHud extends DdElement {
  static styles = [styles];

  @property({ type: Object }) state: CombatHudState = {
    playerName: 'Adventurer',
    playerHealth: 20,
    playerHealthMax: 20,
    actions: [],
    turnOrder: []
  };

  render() {
    const { playerName, playerHealth, playerHealthMax, actions, turnOrder } = this.state;
    const pct = Math.max(0, Math.min(100, Math.round((playerHealth / Math.max(playerHealthMax, 1)) * 100)));
    return html`
      <div class="header">
        <strong>${playerName}</strong>
        <div class="health" role="progressbar" aria-valuenow=${playerHealth} aria-valuemax=${playerHealthMax} aria-valuemin="0">
          <div style="width:${pct}%"></div>
        </div>
        <span>${playerHealth}/${playerHealthMax}</span>
      </div>
      <div class="actions">
        ${actions.map(
          (action) => html`
            <div class="action" role="button" tabindex="0">
              ${action.icon ? html`<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-${action.icon}"></use></svg>` : null}
              <span>${action.label}</span>
              ${typeof action.cooldown === 'number' ? html`<small>CD ${action.cooldown}</small>` : null}
            </div>
          `
        )}
      </div>
      <div class="turn-order" role="list">
        ${turnOrder.map(
          (entry) => html`<span class="turn" role="listitem" data-active=${entry.active ?? false}>${entry.label}</span>`
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-combat-hud': DdCombatHud;
  }
}
