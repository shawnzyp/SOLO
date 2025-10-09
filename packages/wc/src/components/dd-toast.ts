import { ThemeController } from '../styles/theme-controller';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
  timeout: number;
}

export interface ToastOptions {
  variant?: ToastVariant;
  timeout?: number;
}

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: fixed;
      inset-inline-end: var(--space-xl);
      inset-block-end: var(--space-xl);
      display: grid;
      gap: var(--space-sm);
      z-index: 9999;
      pointer-events: none;
      font-family: var(--font-ui);
    }
    .toast {
      min-width: 16rem;
      background: rgba(20, 22, 28, 0.95);
      border-radius: var(--radius-md);
      border: var(--border-hairline);
      padding: var(--space-md) var(--space-lg);
      box-shadow: var(--shadow-mid);
      color: var(--color-text);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
      pointer-events: auto;
    }
    .toast[data-variant='success'] { border-color: var(--color-success); }
    .toast[data-variant='warning'] { border-color: var(--color-warning); }
    .toast[data-variant='danger'] { border-color: var(--color-danger); }
    button {
      all: unset;
      cursor: pointer;
      color: var(--color-muted);
    }
    button:focus-visible {
      outline: 2px solid var(--color-info);
      outline-offset: 2px;
    }
  </style>
  <div class="region" role="region" aria-live="polite"></div>
`;

export class DdToast extends HTMLElement {
  static #instance?: DdToast;
  static get instance(): DdToast {
    if (!this.#instance) {
      const element = document.createElement('dd-toast');
      document.body.appendChild(element);
    }
    return this.#instance!;
  }

  static show(message: string, options: ToastOptions = {}): void {
    this.instance.enqueue(message, options);
  }

  #messages: ToastMessage[] = [];
  #root: ShadowRoot;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'open' });
    this.#root.appendChild(template.content.cloneNode(true));
    ThemeController.applyToShadow(this.#root);
  }

  connectedCallback(): void {
    DdToast.#instance = this;
  }

  disconnectedCallback(): void {
    if (DdToast.#instance === this) {
      DdToast.#instance = undefined;
    }
  }

  enqueue(message: string, options: ToastOptions): void {
    const toast: ToastMessage = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `toast-${Math.random()}`,
      message,
      variant: options.variant ?? 'info',
      timeout: options.timeout ?? 4000,
    };
    this.#messages = [...this.#messages, toast];
    this.render();
  }

  private dismiss(id: string): void {
    this.#messages = this.#messages.filter((toast) => toast.id !== id);
    this.render();
  }

  private render(): void {
    const region = this.#root.querySelector('.region');
    if (!region) return;
    region.innerHTML = '';
    this.#messages.forEach((toast) => {
      const node = document.createElement('div');
      node.className = 'toast';
      node.dataset.variant = toast.variant;
      node.setAttribute('role', 'status');
      node.textContent = toast.message;
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', 'Dismiss');
      button.textContent = '×';
      button.addEventListener('click', () => this.dismiss(toast.id));
      node.appendChild(button);
      region.appendChild(node);
      if (toast.timeout > 0) {
        setTimeout(() => this.dismiss(toast.id), toast.timeout);
      }
    });
  }
}

if (!customElements.get('dd-toast')) {
  customElements.define('dd-toast', DdToast);
}
