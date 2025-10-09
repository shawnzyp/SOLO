import { html, render } from 'lit-html';
import type { StoryNode } from '../systems/types';

export class DDStoryPanel extends HTMLElement {
  private node: StoryNode | null = null;
  private typedParagraphs: string[] = [];
  private typingTimeout: ReturnType<typeof setTimeout> | null = null;
  private activeParagraphIndex = 0;
  private isTyping = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  disconnectedCallback(): void {
    this.stopTyping();
  }

  set data(node: StoryNode | null) {
    const previousId = this.node?.id ?? null;
    this.node = node;
    if (!node) {
      this.stopTyping();
      this.typedParagraphs = [];
      this.update();
      return;
    }

    if (node.id !== previousId) {
      this.startTypewriter();
    } else {
      this.update();
    }
  }

  private update(): void {
    if (!this.shadowRoot) return;
    const node = this.node;
    const paragraphs =
      this.typedParagraphs.length > 0
        ? this.typedParagraphs
        : node?.body ?? [];
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

          .body p.typing::after {
            content: '▌';
            margin-left: 0.2rem;
            animation: blink 1.2s steps(2, start) infinite;
            opacity: 0.85;
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

          @keyframes blink {
            0%,
            49% {
              opacity: 1;
            }

            50%,
            100% {
              opacity: 0;
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
                ${paragraphs.map(
                  (paragraph, index) => html`
                    <p class=${this.isTyping && index === this.activeParagraphIndex ? 'typing' : ''}>
                      ${paragraph}
                    </p>
                  `,
                )}
              </div>
            `
          : html`<p>Awaiting the first lines of your chronicle...</p>`}
      `,
      this.shadowRoot,
    );

    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        const container = this.shadowRoot?.querySelector('.body');
        if (container instanceof HTMLElement) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  }

  private startTypewriter(): void {
    this.stopTyping();
    const node = this.node;
    if (!node || node.body.length === 0) {
      this.typedParagraphs = node?.body ?? [];
      this.update();
      return;
    }

    this.typedParagraphs = node.body.map(() => '');
    this.activeParagraphIndex = 0;
    this.isTyping = true;
    this.update();
    this.queueNextCharacter();
  }

  private queueNextCharacter(): void {
    if (!this.isTyping) return;
    const node = this.node;
    if (!node) {
      this.completeTyping();
      return;
    }

    const paragraph = node.body[this.activeParagraphIndex];
    if (paragraph === undefined) {
      this.completeTyping();
      return;
    }

    const currentLength = this.typedParagraphs[this.activeParagraphIndex]?.length ?? 0;
    if (currentLength < paragraph.length) {
      const nextLength = currentLength + 1;
      this.typedParagraphs[this.activeParagraphIndex] = paragraph.slice(0, nextLength);
      this.update();
      const lastChar = paragraph.charAt(nextLength - 1);
      const delay = lastChar.trim().length === 0 ? 28 : 48;
      this.typingTimeout = setTimeout(() => this.queueNextCharacter(), delay);
    } else {
      this.activeParagraphIndex += 1;
      if (this.activeParagraphIndex >= node.body.length) {
        this.completeTyping();
      } else {
        this.typingTimeout = setTimeout(() => this.queueNextCharacter(), 320);
      }
    }
  }

  private completeTyping(): void {
    const node = this.node;
    this.stopTyping();
    if (node) {
      this.typedParagraphs = [...node.body];
    } else {
      this.typedParagraphs = [];
    }
    this.update();
  }

  private stopTyping(): void {
    if (this.typingTimeout !== null) {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = null;
    }
    this.isTyping = false;
  }
}

customElements.define('dd-story-panel', DDStoryPanel);
