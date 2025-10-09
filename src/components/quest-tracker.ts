import { html, render } from 'lit-html';
import type { Quest } from '../systems/types';

export class DDQuestTracker extends HTMLElement {
  private quests: Quest[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(quests: Quest[]) {
    this.quests = quests;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 16px;
            padding: 1rem;
            background: rgba(18, 14, 28, 0.8);
            backdrop-filter: blur(6px);
          }

          h3 {
            margin: 0 0 0.75rem;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            letter-spacing: 0.04em;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.5rem;
          }

          li {
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 0.75rem;
            background: rgba(30, 22, 40, 0.85);
          }

          .status {
            display: inline-flex;
            align-items: center;
            padding: 0.15rem 0.5rem;
            border-radius: 999px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.35rem;
          }

          .status.active {
            background: rgba(90, 140, 255, 0.2);
            color: #87c0ff;
          }

          .status.completed {
            background: rgba(137, 227, 185, 0.18);
            color: var(--dd-success);
          }

          .status.failed {
            background: rgba(242, 125, 114, 0.18);
            color: var(--dd-danger);
          }

          p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }
        </style>
        <h3>Quest Journal</h3>
        <ul>
          ${this.quests.length > 0
            ? this.quests.map(
                (quest) => html`
                  <li>
                    <span class="status ${quest.status}">${quest.status}</span>
                    <div><strong>${quest.title}</strong></div>
                    <p>${quest.summary}</p>
                    ${quest.reward ? html`<p>Reward: ${quest.reward}</p>` : null}
                  </li>
                `,
              )
            : html`<li><p>No active quests—forge your path!</p></li>`}
        </ul>
      `,
      this.shadowRoot,
    );
  }
}

customElements.define('dd-quest-tracker', DDQuestTracker);
