import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { DdElement } from './base';

const styles = css`
  :host {
    display: none;
  }
  :host([open]) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1000;
  }
  .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(8, 9, 12, 0.74);
    display: grid;
    place-items: center;
  }
  .dialog {
    background: var(--color-surface-2);
    border: var(--border-gold);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-high);
    max-width: min(640px, 90vw);
    max-height: 90vh;
    overflow: auto;
    padding: var(--space-xl);
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
    font-family: var(--font-display);
    font-size: 1.25rem;
  }
  .close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
  }
`;

export class DdModal extends DdElement {
  static styles = [styles];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ reflect: true }) title = '';
  private returnFocus: HTMLElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.onKeydown);
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this.returnFocus = (document.activeElement as HTMLElement) ?? null;
        this.focusFirst();
        this.dispatchEvent(new CustomEvent('dd-opened'));
      } else {
        this.dispatchEvent(new CustomEvent('dd-closed'));
        this.returnFocus?.focus({ preventScroll: true });
      }
    }
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (!this.open) return;
    if (event.key === 'Escape') {
      this.close();
      event.stopPropagation();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusables = this.getFocusable();
    if (!focusables.length) return;
    const currentIndex = focusables.indexOf(document.activeElement as HTMLElement);
    let nextIndex = currentIndex;
    if (event.shiftKey) {
      nextIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex === focusables.length - 1 ? 0 : currentIndex + 1;
    }
    focusables[nextIndex]?.focus();
    event.preventDefault();
  };

  private focusFirst() {
    const focusables = this.getFocusable();
    if (focusables.length) {
      focusables[0].focus({ preventScroll: true });
    }
  }

  private getFocusable(): HTMLElement[] {
    const root = this.renderRoot.querySelector('.dialog');
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter((el) => !el.hasAttribute('disabled'));
  }

  close() {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(new CustomEvent('dd-request-close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="backdrop" role="presentation" @click=${this.close}>
        <div class="dialog" role="dialog" aria-modal="true" aria-label=${this.title} @click=${(e: Event) => e.stopPropagation()}>
          <header>
            <span>${this.title}</span>
            <button class="close" @click=${this.close} aria-label="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-close"></use></svg>
            </button>
          </header>
          <section>
            <slot></slot>
          </section>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-modal': DdModal;
  }
}
