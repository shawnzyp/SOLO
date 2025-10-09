import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ThemeController } from '../styles/theme-controller';

export interface DialogueOption {
  id: string;
  label: string;
  hint?: string;
  hotkey?: string;
}

const styles = css`
  :host {
    display: block;
    background: rgba(20, 22, 28, 0.85);
    border-radius: var(--radius-lg);
    border: var(--border-gold);
    padding: var(--space-lg);
    font-family: var(--font-ui);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-sm);
  }
  button {
    all: unset;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--radius-md);
    background: rgba(14, 15, 19, 0.7);
    border: var(--border-hairline);
    transition: background 160ms ease;
  }
  button:hover,
  button:focus-visible {
    background: rgba(179, 58, 58, 0.35);
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  .hotkey {
    font-family: var(--font-mono);
    color: var(--color-muted);
  }
`;

export class DdDialogueList extends LitElement {
  static styles = styles;

  @property({ type: Array }) options: DialogueOption[] = [];
  @state() private focusedIndex = 0;

  protected createRenderRoot() {
    const root = super.createRenderRoot() as ShadowRoot;
    ThemeController.applyToShadow(root);
    return root;
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('keydown', this.onKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.onKeyDown);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (document.activeElement && !this.contains(document.activeElement)) return;
    const number = parseInt(event.key, 10);
    if (!Number.isNaN(number) && number > 0 && number <= this.options.length) {
      const index = number - 1;
      this.chooseOption(index);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusedIndex = (this.focusedIndex + 1) % this.options.length;
      this.focusButton();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusedIndex = (this.focusedIndex - 1 + this.options.length) % this.options.length;
      this.focusButton();
    }
  };

  private focusButton(): void {
    const buttons = this.shadowRoot?.querySelectorAll('button');
    const target = buttons?.[this.focusedIndex];
    target?.focus();
  }

  private chooseOption(index: number): void {
    const option = this.options[index];
    if (!option) return;
    this.dispatchEvent(
      new CustomEvent('dd-dialogue-select', {
        detail: { option },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <ul role="listbox">
        ${this.options.map(
          (option, index) => html`
            <li>
              <button
                type="button"
                role="option"
                @click=${() => this.chooseOption(index)}
                @focus=${() => (this.focusedIndex = index)}
              >
                <span>${option.label}</span>
                <span class="hotkey">${option.hotkey ?? index + 1}</span>
              </button>
            </li>
          `
        )}
      </ul>
    `;
  }
}

if (!customElements.get('dd-dialogue-list')) {
  customElements.define('dd-dialogue-list', DdDialogueList);
}
