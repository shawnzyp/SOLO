import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { DdElement } from './base';

const styles = css`
  :host {
    position: fixed;
    inset-inline: auto var(--space-xl);
    inset-block-end: var(--space-xl);
    z-index: 1100;
  }
  .toast {
    background: color-mix(in oklab, var(--color-surface-2), #ffffff 6%);
    border: var(--border-gold);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-mid);
    color: var(--color-text);
    display: flex;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-lg);
    min-width: 240px;
    align-items: center;
  }
  .toast[data-variant='success'] {
    border-color: var(--color-success);
  }
  .toast[data-variant='danger'] {
    border-color: var(--color-danger);
  }
`;

export interface ToastOptions {
  message: string;
  variant?: 'info' | 'success' | 'danger';
  duration?: number;
}

const containerId = 'dd-toast-container';

export class DdToast extends DdElement {
  static styles = [styles];

  @property({ reflect: true }) variant: 'info' | 'success' | 'danger' = 'info';
  @property() message = '';
  @property({ type: Number }) duration = 4000;
  @state() private open = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
  }

  show(options: ToastOptions) {
    this.variant = options.variant ?? 'info';
    this.message = options.message;
    this.duration = options.duration ?? 4000;
    this.open = true;
    this.requestUpdate();
    if (this.duration > 0) {
      window.setTimeout(() => this.hide(), this.duration);
    }
  }

  hide() {
    this.open = false;
    this.message = '';
  }

  render() {
    if (!this.open) return html``;
    return html`
      <div class="toast" data-variant=${this.variant} role="alert">
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-warning"></use></svg>
        <span>${this.message}</span>
      </div>
    `;
  }

  static async show(options: ToastOptions): Promise<DdToast> {
    const container = DdToast.ensureContainer();
    let toast = container.querySelector<DdToast>('dd-toast');
    if (!toast) {
      toast = document.createElement('dd-toast');
      container.appendChild(toast);
    }
    toast.show(options);
    return toast;
  }

  private static ensureContainer(): HTMLElement {
    let host = document.getElementById(containerId);
    if (!host) {
      host = document.createElement('div');
      host.id = containerId;
      host.style.position = 'fixed';
      host.style.insetBlockEnd = 'var(--space-xl)';
      host.style.insetInlineEnd = 'var(--space-xl)';
      host.style.zIndex = '1100';
      document.body.appendChild(host);
    }
    return host;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-toast': DdToast;
  }
}
