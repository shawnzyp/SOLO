import { html, render } from 'lit-html';
import type { JournalEntry } from '../systems/types';

export class DDJournalLog extends HTMLElement {
  private entries: JournalEntry[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(entries: JournalEntry[]) {
    this.entries = entries;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    const timeline = [...this.entries].sort((a, b) => b.timestamp - a.timestamp);
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 16px;
            padding: 1rem;
            background: rgba(14, 10, 22, 0.78);
            backdrop-filter: blur(6px);
            max-height: 320px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
          }

          h3 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            letter-spacing: 0.04em;
          }

          button {
            appearance: none;
            background: rgba(240, 179, 90, 0.12);
            border: 1px solid rgba(240, 179, 90, 0.3);
            color: rgba(240, 179, 90, 0.9);
            border-radius: 999px;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            padding: 0.25rem 0.65rem;
            cursor: pointer;
            transition: background 160ms ease, transform 160ms ease;
          }

          button:hover {
            background: rgba(240, 179, 90, 0.24);
            transform: translateY(-1px);
          }

          .log {
            overflow-y: auto;
            padding-right: 0.25rem;
          }

          ol {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.85rem;
          }

          li {
            position: relative;
            padding-left: 1.25rem;
          }

          li::before {
            content: '';
            position: absolute;
            left: 0.35rem;
            top: 0.2rem;
            bottom: -0.2rem;
            width: 1px;
            background: linear-gradient(180deg, rgba(240, 179, 90, 0.35), rgba(106, 192, 255, 0.15));
          }

          li::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0.35rem;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(240, 179, 90, 0.9), rgba(240, 179, 90, 0.2));
            box-shadow: 0 0 8px rgba(240, 179, 90, 0.45);
          }

          strong {
            display: block;
            font-size: 0.85rem;
            letter-spacing: 0.03em;
          }

          time {
            display: block;
            font-size: 0.72rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.55);
            margin-bottom: 0.25rem;
          }

          p {
            margin: 0;
            font-size: 0.82rem;
            color: var(--dd-muted);
            line-height: 1.45;
          }

          .empty {
            font-size: 0.85rem;
            color: var(--dd-muted);
            text-align: center;
            padding: 1.5rem 0.5rem;
          }
        </style>
        <header>
          <h3>Journal</h3>
          <button type="button" @click=${() => this.scrollToTop()}>Top</button>
        </header>
        <div class="log">
          ${timeline.length > 0
            ? html`<ol>
                ${timeline.map(
                  (entry) => html`
                    <li>
                      <time>${new Date(entry.timestamp).toLocaleString()}</time>
                      <p>${entry.text}</p>
                    </li>
                  `,
                )}
              </ol>`
            : html`<div class="empty">Every legend begins with the first entry.</div>`}
        </div>
      `,
      this.shadowRoot,
    );
  }

  private scrollToTop(): void {
    const container = this.shadowRoot?.querySelector('.log');
    if (!container) return;
    container.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

customElements.define('dd-journal-log', DDJournalLog);
