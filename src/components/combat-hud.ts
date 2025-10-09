import { html, render } from 'lit-html';
import type { CombatSnapshot } from '../systems/combat';

export class DDCombatHud extends HTMLElement {
  private snapshot: CombatSnapshot | null = null;
  private enemyName = 'Enemy';

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

          .actions {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
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
              <div class="actions">
                <button @click=${() => this.queueAction('attack')} ?disabled=${snapshot.status !== 'ongoing'}>
                  Attack
                </button>
                <button @click=${() => this.queueAction('defend')} ?disabled=${snapshot.status !== 'ongoing'}>
                  Defend
                </button>
                <button @click=${() => this.queueAction('use-item')} ?disabled=${snapshot.status !== 'ongoing'}>
                  Use Item
                </button>
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

  private queueAction(action: string): void {
    this.dispatchEvent(
      new CustomEvent('combat-action', {
        detail: { action },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define('dd-combat-hud', DDCombatHud);
