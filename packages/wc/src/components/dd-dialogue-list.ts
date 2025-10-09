import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { DdElement } from './base';

export interface DialogueOption {
  id: string;
  label: string;
  description?: string;
  hotkey?: string;
}

const styles = css`
  :host {
    display: block;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-sm);
  }
  button {
    align-items: center;
    background: color-mix(in oklab, var(--color-surface-1), #ffffff 4%);
    border: var(--border-hairline);
    border-radius: var(--radius-md);
    color: inherit;
    cursor: pointer;
    display: flex;
    gap: var(--space-md);
    justify-content: space-between;
    padding: var(--space-md) var(--space-lg);
    text-align: left;
    width: 100%;
  }
  button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  .label {
    font-weight: 600;
  }
  .hint {
    font-family: var(--font-mono);
    opacity: 0.7;
  }
  .description {
    margin: var(--space-xs) 0 0;
    color: var(--color-muted);
    font-size: 0.85rem;
  }
`;

export class DdDialogueList extends DdElement {
  static styles = [styles];

  @property({ type: Array }) options: DialogueOption[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.onKeydown);
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (!this.options?.length) return;
    if (/^[1-9]$/.test(event.key)) {
      const index = Number(event.key) - 1;
      const option = this.options[index];
      if (option) {
        this.select(option);
        event.preventDefault();
      }
    }
  };

  private select(option: DialogueOption) {
    this.dispatchEvent(
      new CustomEvent('dd-select', {
        detail: { option },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <ul>
        ${this.options.map(
          (option, index) => html`
            <li>
              <button type="button" @click=${() => this.select(option)}>
                <span class="label">${option.label}</span>
                <span class="hint">${option.hotkey ?? index + 1}</span>
              </button>
              ${option.description ? html`<p class="description">${option.description}</p>` : null}
            </li>
          `
        )}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-dialogue-list': DdDialogueList;
  }
}
