import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ThemeController } from '../styles/theme-controller';
import { ensureIconSprite } from '../icons/register-icons';

const styles = css`
  :host {
    display: inline-block;
    font-family: var(--font-ui);
  }
  button {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-md);
    border: var(--border-gold);
    background: linear-gradient(180deg, color-mix(in oklab, var(--bg), #ffffff 8%), var(--bg));
    box-shadow: var(--shadow-low), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    color: var(--color-primary-contrast);
    position: relative;
    transition: transform 120ms ease, box-shadow 200ms ease;
  }
  button::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    pointer-events: none;
  }
  button:focus-visible {
    outline: 2px solid var(--color-info);
    outline-offset: 2px;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  :host([variant='primary']) button {
    --bg: var(--color-primary);
  }
  :host([variant='ghost']) button {
    --bg: rgba(14, 15, 19, 0.6);
    border: var(--border-hairline);
  }
  :host([variant='danger']) button {
    --bg: var(--color-danger);
  }
  :host([variant='subtle']) button {
    --bg: rgba(32, 35, 43, 0.8);
    border: var(--border-hairline);
  }
  :host([size='sm']) button {
    padding: var(--space-xs) var(--space-md);
    font-size: 0.85rem;
  }
  :host([size='lg']) button {
    padding: var(--space-md) var(--space-xl);
    font-size: 1.05rem;
  }
  svg {
    width: 1.1em;
    height: 1.1em;
  }
`;

export class DdButton extends LitElement {
  static styles = styles;

  @property({ reflect: true }) variant: 'primary' | 'ghost' | 'danger' | 'subtle' = 'primary';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true, type: Boolean }) disabled = false;
  @property() icon?: string;
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  protected createRenderRoot() {
    const root = super.createRenderRoot() as ShadowRoot;
    ThemeController.applyToShadow(root);
    return root;
  }

  connectedCallback(): void {
    super.connectedCallback();
    ensureIconSprite();
    this.setAttribute('role', 'button');
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }
  }

  private onClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  render() {
    return html`
      <button
        part="button"
        ?disabled=${this.disabled}
        type=${this.type}
        aria-disabled=${this.disabled}
        @click=${this.onClick}
      >
        ${this.icon ? html`<svg aria-hidden="true"><use href="#icon-${this.icon}"></use></svg>` : null}
        <slot></slot>
      </button>
    `;
  }
}

if (!customElements.get('dd-button')) {
  customElements.define('dd-button', DdButton);
}
