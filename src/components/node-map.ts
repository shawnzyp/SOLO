import { html, render } from 'lit-html';
import type { DiscoveredNode } from '../systems/types';

interface NodeMapEntry extends DiscoveredNode {
  isCurrent: boolean;
}

export class DDNodeMap extends HTMLElement {
  private nodes: NodeMapEntry[] = [];
  private sortMode: 'recent' | 'first' | 'visits' | 'alphabetical' = 'recent';
  private tagFilter = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(nodes: NodeMapEntry[]) {
    this.nodes = nodes;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    const nodes = this.getProcessedNodes();
    const tagSummary = this.getTagSummary();
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 16px;
            padding: 1rem 1.25rem;
            background: radial-gradient(circle at top, rgba(28, 20, 40, 0.95), rgba(14, 10, 24, 0.85));
            backdrop-filter: blur(6px);
            position: relative;
            overflow: hidden;
          }

          h3 {
            margin: 0 0 0.75rem;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            letter-spacing: 0.04em;
          }

          header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-bottom: 0.75rem;
          }

          header .meta {
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.65);
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.2rem;
          }

          .controls {
            display: grid;
            gap: 0.5rem;
            margin-bottom: 0.9rem;
          }

          @media (min-width: 540px) {
            .controls {
              grid-template-columns: minmax(0, 1fr) auto;
              align-items: center;
            }
          }

          .controls input[type='search'] {
            width: 100%;
            padding: 0.35rem 0.55rem;
            border-radius: 8px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(16, 12, 24, 0.75);
            color: inherit;
            font: inherit;
          }

          .controls select {
            appearance: none;
            border-radius: 8px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(16, 12, 24, 0.75);
            color: inherit;
            font: inherit;
            padding: 0.35rem 0.6rem;
            min-width: 160px;
          }

          .constellation {
            position: relative;
            display: grid;
            gap: 1rem;
          }

          .constellation::before {
            content: '';
            position: absolute;
            top: 1.25rem;
            bottom: 1.25rem;
            left: 0.55rem;
            width: 2px;
            background: linear-gradient(180deg, rgba(240, 179, 90, 0.35), rgba(106, 192, 255, 0.2));
          }

          article {
            position: relative;
            margin-left: 1.5rem;
            padding: 0.75rem 0.9rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            background: rgba(18, 14, 28, 0.85);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
            transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
          }

          article::before {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            left: -1.55rem;
            top: 1.1rem;
            background: radial-gradient(circle, rgba(240, 179, 90, 0.95), rgba(240, 179, 90, 0.2));
            box-shadow: 0 0 8px rgba(240, 179, 90, 0.55);
          }

          article.current {
            border-color: rgba(137, 227, 185, 0.6);
            box-shadow: 0 12px 28px rgba(137, 227, 185, 0.2);
            transform: translateX(4px);
          }

          article.current::before {
            background: radial-gradient(circle, rgba(137, 227, 185, 0.95), rgba(137, 227, 185, 0.2));
            box-shadow: 0 0 12px rgba(137, 227, 185, 0.55);
          }

          h4 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            letter-spacing: 0.03em;
          }

          p {
            margin: 0.4rem 0 0.6rem;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
            margin-bottom: 0.5rem;
          }

          .tag {
            padding: 0.15rem 0.55rem;
            border-radius: 999px;
            background: rgba(106, 192, 255, 0.16);
            color: rgba(179, 226, 255, 0.95);
            font-size: 0.7rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          .tag-set {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
          }

          .meta small {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.55);
          }

          footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.75rem;
            letter-spacing: 0.04em;
            color: rgba(255, 255, 255, 0.65);
          }

          footer span {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
          }

          .empty {
            padding: 1.25rem 0.5rem;
            text-align: center;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }
        </style>
        <header>
          <div>
            <h3>World Map</h3>
            ${tagSummary.topTags.length > 0
              ? html`<div class="tag-set">
                  ${tagSummary.topTags.map((tag) => html`<span class="tag">${tag}</span>`)}
                </div>`
              : null}
          </div>
          <div class="meta">
            <span>${nodes.length} locations shown</span>
            <small>${tagSummary.uniqueTags} unique tags discovered</small>
          </div>
        </header>
        <div class="controls">
          <input
            type="search"
            placeholder="Filter by name or tag"
            .value=${this.tagFilter}
            @input=${(event: Event) => this.handleFilterInput(event)}
            aria-label="Filter locations"
          />
          <select
            .value=${this.sortMode}
            @change=${(event: Event) => this.handleSortChange(event)}
            aria-label="Sort locations"
          >
            <option value="recent">Recently visited</option>
            <option value="first">First discovered</option>
            <option value="visits">Most visited</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
        ${nodes.length > 0
          ? html`
              <div class="constellation">
                ${nodes.map(
                  (node) => html`
                    <article class=${node.isCurrent ? 'current' : ''}>
                      <h4>${node.title}</h4>
                      <p>${node.summary}</p>
                      ${node.tags && node.tags.length > 0
                        ? html`<div class="tags">
                            ${node.tags.map((tag) => html`<span class="tag">${tag}</span>`)}
                          </div>`
                        : null}
                      <footer>
                        <span>
                          ${node.visits === 1 ? 'Visited once' : `Visited ${node.visits} times`}
                        </span>
                        <span>${new Date(node.lastVisitedAt).toLocaleString()}</span>
                      </footer>
                    </article>
                  `,
                )}
              </div>
            `
          : html`<div class="empty">Chart new territory to reveal the constellation of your journey.</div>`}
      `,
      this.shadowRoot,
    );
  }

  private getProcessedNodes(): NodeMapEntry[] {
    const query = this.tagFilter.trim().toLowerCase();
    const filtered = this.nodes.filter((node) => {
      if (!query) return true;
      const haystack = [
        node.title,
        node.summary,
        ...(node.tags ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });

    const byRecent = (a: NodeMapEntry, b: NodeMapEntry) => b.lastVisitedAt - a.lastVisitedAt;
    const byFirst = (a: NodeMapEntry, b: NodeMapEntry) => a.firstVisitedAt - b.firstVisitedAt;
    const byVisits = (a: NodeMapEntry, b: NodeMapEntry) => b.visits - a.visits;
    const byAlphabetical = (a: NodeMapEntry, b: NodeMapEntry) => a.title.localeCompare(b.title);

    const sorter =
      this.sortMode === 'recent'
        ? byRecent
        : this.sortMode === 'first'
        ? byFirst
        : this.sortMode === 'visits'
        ? byVisits
        : byAlphabetical;

    return [...filtered].sort((a, b) => {
      const result = sorter(a, b);
      if (result !== 0) return result;
      return a.title.localeCompare(b.title);
    });
  }

  private handleFilterInput(event: Event): void {
    const input = event.currentTarget as HTMLInputElement | null;
    this.tagFilter = input?.value ?? '';
    this.update();
  }

  private handleSortChange(event: Event): void {
    const select = event.currentTarget as HTMLSelectElement | null;
    const value = (select?.value ?? 'recent') as typeof this.sortMode;
    if (this.sortMode === value) return;
    this.sortMode = value;
    this.update();
  }

  private getTagSummary(): { uniqueTags: number; topTags: string[] } {
    const tagCounts = new Map<string, number>();
    for (const node of this.nodes) {
      for (const tag of node.tags ?? []) {
        const key = tag.trim();
        if (!key) continue;
        tagCounts.set(key, (tagCounts.get(key) ?? 0) + 1);
      }
    }
    const uniqueTags = tagCounts.size;
    const topTags = [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 3)
      .map(([tag]) => tag);
    return { uniqueTags, topTags };
  }
}

customElements.define('dd-node-map', DDNodeMap);
