import { html, render } from 'lit-html';
import type { ToastMessage } from '../systems/world';

export class DDToastStack extends HTMLElement {
  private toasts: ToastMessage[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(toasts: ToastMessage[]) {
    this.toasts = toasts;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    render(
      html`
        <style>
          :host {
            position: fixed;
            top: 1.5rem;
            right: 1.5rem;
            display: grid;
            gap: 0.75rem;
            z-index: 1000;
          }

          .toast {
            min-width: 220px;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(22, 18, 32, 0.92);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
            animation: slide-in 250ms ease;
          }

          .toast.success {
            border-color: rgba(137, 227, 185, 0.6);
          }

          .toast.danger {
            border-color: rgba(242, 125, 114, 0.65);
          }

          .toast.info {
            border-color: rgba(106, 192, 255, 0.6);
          }

          h4 {
            margin: 0 0 0.25rem;
            font-size: 0.95rem;
            font-family: 'Cinzel', serif;
          }

          p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }

          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateX(12px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        </style>
        ${this.toasts.map(
          (toast) => html`
            <div class="toast ${toast.tone}">
              <h4>${toast.title}</h4>
              <p>${toast.body}</p>
            </div>
          `,
        )}
      `,
      this.shadowRoot,
    );
  }
}

customElements.define('dd-toast-stack', DDToastStack);
