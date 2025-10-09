import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { DdElement } from './base';

const styles = css`
  :host {
    display: inline-block;
  }
  button {
    --bg: var(--color-primary);
    --fg: var(--color-primary-contrast);
    align-items: center;
    background: linear-gradient(180deg, color-mix(in oklab, var(--bg), #ffffff 6%), var(--bg));
    border: var(--border-gold);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-low), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    color: var(--fg);
    cursor: pointer;
    display: inline-flex;
    font-family: var(--font-ui);
    font-size: 0.95rem;
    font-weight: 600;
    gap: var(--space-sm);
    justify-content: center;
    min-height: 40px;
    padding: 0 var(--space-lg);
    text-transform: uppercase;
    transition: transform 120ms ease, box-shadow 120ms ease;
  }
  button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  button:active {
    transform: translateY(1px) scale(0.99);
  }
  button[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  :host([variant='ghost']) button {
    background: transparent;
    border: var(--border-hairline);
    color: var(--color-text);
  }
  :host([variant='danger']) button {
    --bg: var(--color-danger);
  }
  :host([variant='subtle']) button {
    --bg: color-mix(in oklab, var(--color-bg), var(--color-surface-1) 60%);
    border: var(--border-hairline);
    color: var(--color-text);
  }
  :host([size='sm']) button {
    font-size: 0.85rem;
    min-height: 32px;
    padding: 0 var(--space-md);
  }
  :host([size='lg']) button {
    font-size: 1.05rem;
    min-height: 48px;
    padding: 0 var(--space-xl);
  }
  .icon {
    display: inline-flex;
  }
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
    button:active {
      transform: none;
    }
  }
`;

export class DdButton extends DdElement {
  static styles = [styles];

  @property({ reflect: true }) variant: 'primary' | 'ghost' | 'danger' | 'subtle' = 'primary';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) icon?: string;
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`
      <button
        part="button"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        ${this.icon
          ? html`<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#icon-${this.icon}"></use></svg></span>`
          : null}
        <slot></slot>
      </button>
    `;
  }

  private handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-button': DdButton;
  }
}
