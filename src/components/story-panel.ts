import { html, render } from 'lit-html';
import type { StoryNode } from '../systems/types';

export class DDStoryPanel extends HTMLElement {
  private node: StoryNode | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(node: StoryNode | null) {
    this.node = node;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    const node = this.node;
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid var(--dd-panel-border);
            background: rgba(20, 16, 32, 0.8);
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(6px);
            min-height: 340px;
            position: relative;
            overflow: hidden;
          }

          header {
            margin-bottom: 1rem;
          }

          h1 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-weight: 700;
            font-size: 1.75rem;
            letter-spacing: 0.04em;
          }

          .summary {
            margin: 0.35rem 0 0;
            color: var(--dd-muted);
            font-style: italic;
          }

          .body {
            position: relative;
            padding: 1rem;
            border-radius: 12px;
            background: linear-gradient(180deg, rgba(39, 30, 54, 0.85), rgba(18, 12, 30, 0.92));
            border: 1px solid rgba(255, 240, 220, 0.08);
            overflow-y: auto;
            max-height: 320px;
          }

          .body p {
            margin: 0 0 1rem;
            animation: fade-in 500ms ease forwards;
            opacity: 0;
          }

          .body p:last-of-type {
            margin-bottom: 0;
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .background-veil {
            position: absolute;
            inset: 0;
            background: ${node?.background ?? 'transparent'};
            opacity: 0.25;
            z-index: -1;
            filter: saturate(130%);
          }
        </style>
        <div class="background-veil"></div>
        ${node
          ? html`
              <header>
                <h1>${node.title}</h1>
                <p class="summary">${node.summary}</p>
              </header>
              <div class="body">
                ${node.body.map((paragraph) => html`<p>${paragraph}</p>`) ?? ''}
              </div>
            `
          : html`<p>Awaiting the first lines of your chronicle...</p>`}
      `,
      this.shadowRoot,
    );
  }
}

customElements.define('dd-story-panel', DDStoryPanel);
