import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { DdElement } from './base';

const styles = css`
  :host {
    display: inline-block;
  }
  .badge {
    align-items: center;
    background: radial-gradient(circle at top, color-mix(in oklab, var(--color-accent), #ffffff 22%), var(--color-surface-2));
    border: var(--border-gold);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-mid);
    color: var(--color-primary-contrast);
    display: inline-flex;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-lg);
    transform-origin: center;
    animation: pop 360ms ease;
  }
  .badge[hidden] {
    display: none;
  }
  .content {
    display: grid;
    gap: 2px;
  }
  .title {
    font-family: var(--font-display);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  @keyframes pop {
    0% {
      transform: scale(0.92);
      opacity: 0;
    }
    60% {
      transform: scale(1.05);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }
`;

export class DdAchievementBadge extends DdElement {
  static styles = [styles];

  @property() title = 'Achievement';
  @property() description = '';
  @property() icon: string | null = null;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Number }) duration = 4000;
  @state() private visible = false;

  updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      this.visible = this.open;
      if (this.open && this.duration > 0) {
        window.setTimeout(() => {
          this.open = false;
          this.visible = false;
        }, this.duration);
      }
    }
  }

  render() {
    if (!this.visible) return html``;
    return html`
      <div class="badge" role="status" aria-live="polite">
        ${this.icon ? html`<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-${this.icon}"></use></svg>` : null}
        <div class="content">
          <span class="title">${this.title}</span>
          ${this.description ? html`<small>${this.description}</small>` : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-achievement-badge': DdAchievementBadge;
  }
}
