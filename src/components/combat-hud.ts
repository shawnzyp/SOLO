import { html, render } from 'lit-html';
import type { CombatAction, CombatSnapshot } from '../systems/combat';

export class DDCombatHud extends HTMLElement {
  private snapshot: CombatSnapshot | null = null;
  private enemyName = 'Enemy';
  private selectedConsumableId: string | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(value: { snapshot: CombatSnapshot | null; enemyName: string }) {
    this.snapshot = value.snapshot;
    this.enemyName = value.enemyName;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    const snapshot = this.snapshot;
    this.ensureConsumableSelection(snapshot);
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            border-radius: 16px;
            padding: 1rem;
            background: rgba(22, 16, 30, 0.9);
            backdrop-filter: blur(8px);
            box-shadow: 0 10px 36px rgba(0, 0, 0, 0.45);
          }

          h3 {
            margin: 0 0 0.75rem;
            font-family: 'Cinzel', serif;
            letter-spacing: 0.04em;
          }

          .bars {
            display: grid;
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          .turn-indicator {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.85rem;
            border-radius: 999px;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 0.75rem;
            background: rgba(106, 192, 255, 0.18);
            color: rgba(179, 226, 255, 0.95);
          }

          .turn-indicator.hero {
            background: rgba(137, 227, 185, 0.18);
            color: rgba(137, 227, 185, 0.95);
          }

          .defense-note {
            font-size: 0.75rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: rgba(179, 226, 255, 0.85);
            margin-top: -0.4rem;
            margin-bottom: 0.5rem;
          }

          .bar {
            position: relative;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            overflow: hidden;
            height: 14px;
          }

          .bar-fill.hero {
            background: linear-gradient(90deg, #f27d72, #f0b35a);
          }

          .bar-fill.enemy {
            background: linear-gradient(90deg, #68b7ff, #6a46ff);
          }

          .insights {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 0.6rem;
            margin-bottom: 1rem;
          }

          .insight-card {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            padding: 0.6rem 0.75rem;
            display: grid;
            gap: 0.2rem;
          }

          .insight-card .label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.6);
          }

          .insight-card strong {
            font-size: 1rem;
          }

          .insight-card .meta {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          button {
            padding: 0.85rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(40, 28, 58, 0.85);
            color: inherit;
            cursor: pointer;
            font-size: 0.95rem;
            transition: transform 150ms ease, border-color 200ms ease;
          }

          button:hover {
            transform: translateY(-2px);
            border-color: rgba(240, 179, 90, 0.75);
          }

          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          select {
            appearance: none;
            padding: 0.65rem 0.75rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 210, 164, 0.18);
            background: rgba(30, 22, 44, 0.85);
            color: inherit;
            font-size: 0.9rem;
          }

          select:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .item-action {
            display: grid;
            gap: 0.45rem;
          }

          .consumable-summary {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 0.6rem 0.75rem;
            margin-bottom: 1rem;
            display: grid;
            gap: 0.35rem;
          }

          .consumable-summary .row {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
          }

          .consumable-summary .row.spent {
            opacity: 0.6;
          }

          .hint {
            font-size: 0.75rem;
            letter-spacing: 0.04em;
            color: rgba(255, 255, 255, 0.6);
            margin-top: -0.5rem;
            margin-bottom: 0.5rem;
          }

          .outcome {
            font-size: 0.85rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: rgba(240, 179, 90, 0.9);
            margin-bottom: 0.5rem;
          }

          .log {
            max-height: 180px;
            overflow-y: auto;
            background: rgba(12, 10, 20, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 0.75rem;
          }

          .log-entry {
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
          }

          .log-entry.success {
            color: var(--dd-success);
          }

          .log-entry.danger {
            color: var(--dd-danger);
          }

          .log-entry.info {
            color: var(--dd-muted);
          }
        </style>
        ${snapshot
          ? html`
              <h3>Combat: ${this.enemyName}</h3>
              <div class="turn-indicator ${snapshot.heroTurn ? 'hero' : 'enemy'}">
                ${snapshot.heroTurn ? 'Your move' : `${this.enemyName} prepares to strike`}
              </div>
              ${snapshot.defending
                ? html`<div class="defense-note">Guard raised — incoming damage reduced.</div>`
                : null}
              ${snapshot.status !== 'ongoing'
                ? html`<div class="outcome">Encounter ${snapshot.status}</div>`
                : null}
              <div class="bars">
                <div>
                  <div>Hero HP: ${snapshot.heroHP} / ${snapshot.heroMaxHP}</div>
                  <div class="bar">
                    <div
                      class="bar-fill hero"
                      style="width: ${(snapshot.heroHP / snapshot.heroMaxHP) * 100}%"
                    ></div>
                  </div>
                </div>
                <div>
                  <div>${this.enemyName} HP: ${snapshot.enemyHP} / ${snapshot.enemyMaxHP}</div>
                  <div class="bar">
                    <div
                      class="bar-fill enemy"
                      style="width: ${(snapshot.enemyHP / snapshot.enemyMaxHP) * 100}%"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="insights">
                <div class="insight-card">
                  <span class="label">Attack Bonus</span>
                  <strong>${snapshot.heroAttackBonus >= 0 ? '+' : ''}${snapshot.heroAttackBonus}</strong>
                </div>
                <div class="insight-card">
                  <span class="label">Weapon</span>
                  <strong>${snapshot.heroWeaponName}</strong>
                  <span class="meta">${snapshot.heroDamageRange.notation}</span>
                </div>
                <div class="insight-card">
                  <span class="label">Damage Window</span>
                  <strong>${snapshot.heroDamageRange.min} - ${snapshot.heroDamageRange.max}</strong>
                </div>
                <div class="insight-card">
                  <span class="label">Hero Armor</span>
                  <strong>${snapshot.heroArmorClass}</strong>
                </div>
                <div class="insight-card">
                  <span class="label">Enemy Armor</span>
                  <strong>${snapshot.enemyArmorClass}</strong>
                </div>
                <div class="insight-card">
                  <span class="label">Escape DC</span>
                  <strong>${snapshot.fleeDifficulty}</strong>
                </div>
              </div>
              ${snapshot.consumables.length > 0
                ? html`
                    <div class="consumable-summary">
                      ${snapshot.consumables.map(
                        (item) => html`
                          <div class="row ${item.remaining === 0 ? 'spent' : ''}">
                            <span>${item.name}</span>
                            <span>${item.remaining}/${item.max}</span>
                          </div>
                        `,
                      )}
                    </div>
                  `
                : html`<div class="hint">No consumables equipped.</div>`}
              <div class="actions">
                <button @click=${() => this.queueAction('attack')} ?disabled=${snapshot.status !== 'ongoing'}>
                  Attack
                </button>
                <button @click=${() => this.queueAction('defend')} ?disabled=${snapshot.status !== 'ongoing'}>
                  Defend
                </button>
                <div class="item-action">
                  <select
                    @change=${(event: Event) => this.onConsumableChange(event)}
                    ?disabled=${snapshot.consumables.length === 0}
                    .value=${this.selectedConsumableId ?? ''}
                  >
                    ${snapshot.consumables.length === 0
                      ? html`<option value="" disabled selected>None equipped</option>`
                      : null}
                    ${snapshot.consumables.map(
                      (item) => html`
                        <option value=${item.id} ?selected=${item.id === this.selectedConsumableId}>
                          ${item.name} (${item.remaining}/${item.max})
                        </option>
                      `,
                    )}
                  </select>
                  <button
                    @click=${() => this.queueAction('use-item', this.selectedConsumableId ?? undefined)}
                    ?disabled=${
                      snapshot.status !== 'ongoing' ||
                      !this.selectedConsumableId ||
                      !snapshot.consumables.find((item) => item.id === this.selectedConsumableId && item.remaining > 0)
                    }
                  >
                    Use Item
                  </button>
                </div>
                <button @click=${() => this.queueAction('flee')} ?disabled=${snapshot.status !== 'ongoing'}>
                  Flee
                </button>
              </div>
              <div class="log">
                ${snapshot.logs.map(
                  (entry) => html`<div class="log-entry ${entry.tone}">${entry.text}</div>`,
                )}
              </div>
            `
          : html`<p>Awaiting combat encounter...</p>`}
      `,
      this.shadowRoot,
    );
  }

  private ensureConsumableSelection(snapshot: CombatSnapshot | null): void {
    if (!snapshot) {
      this.selectedConsumableId = null;
      return;
    }
    const available = snapshot.consumables.filter((entry) => entry.remaining > 0);
    if (available.length === 0) {
      this.selectedConsumableId = null;
      return;
    }
    if (!this.selectedConsumableId || !available.some((entry) => entry.id === this.selectedConsumableId)) {
      this.selectedConsumableId = available[0].id;
    }
  }

  private onConsumableChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedConsumableId = select.value || null;
    this.update();
  }

  private queueAction(action: CombatAction, itemId?: string): void {
    this.dispatchEvent(
      new CustomEvent('combat-action', {
        detail: { action, itemId },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define('dd-combat-hud', DDCombatHud);
