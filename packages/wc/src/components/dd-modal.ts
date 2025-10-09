import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ThemeController } from '../styles/theme-controller';
import { ensureIconSprite } from '../icons/register-icons';

const styles = css`
  :host {
    display: contents;
  }
  dialog {
    padding: 0;
    border: none;
    border-radius: var(--radius-lg);
    background: linear-gradient(160deg, rgba(20, 22, 28, 0.95), rgba(14, 15, 19, 0.98));
    color: var(--color-text);
    box-shadow: var(--shadow-high);
    width: min(32rem, 90vw);
  }
  header {
    padding: var(--space-lg) var(--space-xl) var(--space-md);
    border-bottom: var(--border-hairline);
    font-family: var(--font-display);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-md);
  }
  main {
    padding: var(--space-lg) var(--space-xl);
  }
  footer {
    padding: var(--space-md) var(--space-xl) var(--space-lg);
    border-top: var(--border-hairline);
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
  }
  .backdrop {
    position: fixed;
    inset: 0;
    backdrop-filter: blur(8px);
    background: rgba(10, 12, 16, 0.65);
  }
  button.close {
    all: unset;
    cursor: pointer;
    color: var(--color-muted);
  }
  button.close:focus-visible {
    outline: 2px solid var(--color-info);
    outline-offset: 2px;
  }
`;

export class DdModal extends LitElement {
  static override styles = styles;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) title = '';
  @state() private lastFocused?: HTMLElement;
  @state() private focusables: HTMLElement[] = [];

  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeModal();
      return;
    }
    if (event.key !== 'Tab' || this.focusables.length < 2) {
      return;
    }
    const first = this.focusables[0];
    const last = this.focusables[this.focusables.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  protected createRenderRoot() {
    const root = super.createRenderRoot() as ShadowRoot;
    ThemeController.applyToShadow(root);
    return root;
  }

  connectedCallback(): void {
    super.connectedCallback();
    ensureIconSprite();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this.lastFocused = (document.activeElement as HTMLElement) ?? undefined;
        this.show();
      } else {
        this.close();
      }
      this.setAttribute('aria-hidden', this.open ? 'false' : 'true');
    }
  }

  private show(): void {
    const dialog = this.shadowRoot?.querySelector('dialog');
    if (dialog && !dialog.open) {
      dialog.showModal();
      this.setAttribute('aria-hidden', 'false');
      this.trapFocus();
    }
  }

  private close(): void {
    const dialog = this.shadowRoot?.querySelector('dialog');
    if (dialog && dialog.open) {
      dialog.close();
      this.setAttribute('aria-hidden', 'true');
    }
    if (dialog) {
      dialog.removeEventListener('keydown', this.onKeyDown);
    }
    this.focusables = [];
    if (this.lastFocused) {
      this.lastFocused.focus();
      this.lastFocused = undefined;
    }
  }

  private onCancel(event: Event): void {
    event.preventDefault();
    this.closeModal();
  }

  private closeModal(): void {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(new CustomEvent('dd-modal-close', { bubbles: true, composed: true }));
  }

  private trapFocus(): void {
    const dialog = this.shadowRoot?.querySelector('dialog');
    if (!dialog) return;
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    this.focusables = Array.from(focusables);
    dialog.removeEventListener('keydown', this.onKeyDown);
    dialog.addEventListener('keydown', this.onKeyDown);
    this.focusables[0]?.focus();
  }

  render() {
    return html`
      ${this.open ? html`<div class="backdrop" aria-hidden="true"></div>` : null}
      <dialog @cancel=${this.onCancel} aria-modal="true" aria-labelledby="dialog-title">
        <header>
          <span id="dialog-title">${this.title}</span>
          <button class="close" @click=${this.closeModal} aria-label="Close dialog">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </dialog>
    `;
  }
}

if (!customElements.get('dd-modal')) {
  customElements.define('dd-modal', DdModal);
}
