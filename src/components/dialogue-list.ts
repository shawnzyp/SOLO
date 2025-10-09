import { html, render } from 'lit-html';
import type { StoryChoice } from '../systems/types';

interface DialogueTemplateChoice extends StoryChoice {
  disabled?: boolean;
}

export class DDDialogueList extends HTMLElement {
  private choices: DialogueTemplateChoice[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  connectedCallback(): void {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  set data(choices: DialogueTemplateChoice[]) {
    this.choices = choices;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    render(
      html`
        <style>
          :host {
            display: block;
            margin-top: 1.5rem;
          }

          ul {
            list-style: none;
            display: grid;
            gap: 0.75rem;
            padding: 0;
            margin: 0;
          }

          button {
            width: 100%;
            text-align: left;
            padding: 0.9rem 1.25rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.25);
            background: rgba(25, 18, 35, 0.8);
            color: inherit;
            font-size: 1rem;
            letter-spacing: 0.01em;
            cursor: pointer;
            transition: transform 150ms ease, box-shadow 200ms ease, border 150ms ease;
            position: relative;
            overflow: hidden;
          }

          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
            border-color: rgba(240, 179, 90, 0.8);
          }

          button:active {
            transform: scale(0.99);
          }

          button[disabled] {
            opacity: 0.6;
            cursor: not-allowed;
            filter: grayscale(50%);
          }

          .hotkey {
            font-family: 'Cinzel', serif;
            font-size: 0.85rem;
            margin-right: 0.75rem;
            color: var(--dd-accent-strong);
          }

          .description {
            margin-top: 0.25rem;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }
        </style>
        <ul>
          ${this.choices.map((choice, index) => {
            const hotkey = String(index + 1);
            return html`
              <li>
                <button
                  ?disabled=${choice.disabled}
                  @click=${() => this.select(choice)}
                  data-choice-id=${choice.id}
                >
                  <span class="hotkey">[${hotkey}]</span>
                  <span class="text">${choice.text}</span>
                  ${choice.description
                    ? html`<div class="description">${choice.description}</div>`
                    : null}
                </button>
              </li>
            `;
          })}
        </ul>
      `,
      this.shadowRoot,
    );
  }

  private select(choice: DialogueTemplateChoice): void {
    if (choice.disabled) return;
    this.dispatchEvent(
      new CustomEvent('choice-selected', {
        detail: { choice },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (event.defaultPrevented) return;
    const keyIndex = Number.parseInt(event.key, 10) - 1;
    if (Number.isNaN(keyIndex)) return;
    const targetChoice = this.choices[keyIndex];
    if (targetChoice) {
      event.preventDefault();
      this.select(targetChoice);
    }
  }
}

customElements.define('dd-dialogue-list', DDDialogueList);
