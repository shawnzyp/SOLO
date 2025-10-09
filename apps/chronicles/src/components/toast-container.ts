import { Soundscape } from '../game/soundscape';
import { WorldComponent } from './world-component';

export class ToastContainer extends WorldComponent {
  private lastToastIds = new Set<string>();

  connectedCallback(): void {
    if (!this.isConnected) return;
    this.classList.add('toast-container');
    super.connectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const { toasts } = this.state;
    const unseen = toasts.filter((toast) => !this.lastToastIds.has(toast.id));
    unseen.forEach((toast) => {
      const cue = toast.tone ?? (toast.type === 'success' ? 'success' : toast.type === 'failure' ? 'failure' : 'notify');
      Soundscape.playCue(cue);
    });
    this.lastToastIds = new Set(toasts.map((toast) => toast.id));
    this.innerHTML = toasts
      .map(
        (toast) => `
        <div class="toast ${toast.type}">
          <span class="icon">${toast.icon ?? (toast.type === 'success' ? '✨' : toast.type === 'failure' ? '☠️' : '🎲')}</span>
          <div>
            <div><strong>${toast.title}</strong></div>
            <div>${toast.body}</div>
          </div>
        </div>
      `,
      )
      .join('');
  }
}

customElements.define('dd-toast-container', ToastContainer);
