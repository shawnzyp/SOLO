import { html, render } from 'lit-html';
import type { JournalEntry } from '../systems/types';

export class DDJournalLog extends HTMLElement {
  private entries: JournalEntry[] = [];
  private filterText = '';
  private sortOrder: 'newest' | 'oldest' = 'newest';

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
    const timeline = this.getProcessedEntries();
    const query = this.filterText.trim();
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

          h3 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            letter-spacing: 0.04em;
          }

          header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .header-meta {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.3rem;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
          }

          .toolbar {
            display: grid;
            gap: 0.5rem;
          }

          @media (min-width: 520px) {
            .toolbar {
              grid-template-columns: minmax(0, 1fr) auto auto;
              align-items: center;
            }
          }

          .toolbar input[type='search'] {
            width: 100%;
            padding: 0.35rem 0.55rem;
            border-radius: 8px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(16, 12, 24, 0.75);
            color: inherit;
            font: inherit;
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

          .toolbar button {
            white-space: nowrap;
          }

          .toggle {
            background: rgba(106, 192, 255, 0.14);
            border-color: rgba(106, 192, 255, 0.3);
            color: rgba(179, 226, 255, 0.95);
          }

          .toggle[selected] {
            background: rgba(106, 192, 255, 0.25);
            border-color: rgba(106, 192, 255, 0.5);
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

          mark {
            background: rgba(240, 179, 90, 0.25);
            color: inherit;
            border-radius: 4px;
            padding: 0 0.1rem;
          }
        </style>
        <header>
          <h3>Journal</h3>
          <div class="header-meta">
            <span>${timeline.length} entries</span>
            <button type="button" @click=${() => this.scrollToTop()}>Scroll to top</button>
          </div>
        </header>
        <div class="toolbar">
          <input
            type="search"
            placeholder="Search journal entries"
            .value=${this.filterText}
            @input=${(event: Event) => this.handleFilterInput(event)}
            aria-label="Search journal entries"
          />
          <button
            type="button"
            class="toggle"
            ?selected=${this.sortOrder === 'newest'}
            @click=${() => this.setSortOrder('newest')}
          >
            Newest first
          </button>
          <button
            type="button"
            class="toggle"
            ?selected=${this.sortOrder === 'oldest'}
            @click=${() => this.setSortOrder('oldest')}
          >
            Oldest first
          </button>
        </div>
        <div class="log">
          ${timeline.length > 0
            ? html`<ol>
                ${timeline.map(
                  (entry) => html`
                    <li>
                      <time>${new Date(entry.timestamp).toLocaleString()}</time>
                      <p>${this.renderEntryText(entry.text, query)}</p>
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

  private handleFilterInput(event: Event): void {
    const input = event.currentTarget as HTMLInputElement | null;
    this.filterText = input?.value ?? '';
    this.update();
  }

  private setSortOrder(order: 'newest' | 'oldest'): void {
    if (this.sortOrder === order) return;
    this.sortOrder = order;
    this.update();
  }

  private getProcessedEntries(): JournalEntry[] {
    const query = this.filterText.trim().toLowerCase();
    const sorted = [...this.entries].sort((a, b) =>
      this.sortOrder === 'newest' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp,
    );
    if (!query) {
      return sorted;
    }
    return sorted.filter((entry) => {
      const text = entry.text.toLowerCase();
      const timestampLabel = new Date(entry.timestamp).toLocaleString().toLowerCase();
      return text.includes(query) || timestampLabel.includes(query);
    });
  }

  private renderEntryText(text: string, query: string): unknown {
    if (!query) {
      return text;
    }
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'ig');
    const segments = text.split(regex);
    return segments.map((segment, index) =>
      index % 2 === 1 ? html`<mark>${segment}</mark>` : segment,
    );
  }
}

customElements.define('dd-journal-log', DDJournalLog);
