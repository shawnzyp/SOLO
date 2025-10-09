import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ThemeController } from '../styles/theme-controller';
import { ensureIconSprite } from '../icons/register-icons';

const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-lg);
    background: linear-gradient(135deg, rgba(200, 162, 74, 0.25), rgba(20, 22, 28, 0.95));
    border-radius: var(--radius-lg);
    border: var(--border-gold);
    font-family: var(--font-ui);
    color: var(--color-text);
    box-shadow: var(--shadow-mid);
  }
  .icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200, 162, 74, 0.6), rgba(20, 22, 28, 0.9));
    display: grid;
    place-items: center;
  }
  .text {
    display: grid;
    gap: 0.25rem;
  }
  .title {
    font-family: var(--font-display);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

export class DdAchievementBadge extends LitElement {
  static styles = styles;

  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: String }) icon = 'trophy';

  protected createRenderRoot() {
    const root = super.createRenderRoot() as ShadowRoot;
    ThemeController.applyToShadow(root);
    return root;
  }

  connectedCallback(): void {
    super.connectedCallback();
    ensureIconSprite();
  }

  render() {
    return html`
      <span class="icon" aria-hidden="true">
        <svg width="28" height="28"><use href="#icon-${this.icon}"></use></svg>
      </span>
      <span class="text">
        <span class="title">${this.title}</span>
        <span>${this.description}</span>
      </span>
    `;
  }
}

if (!customElements.get('dd-achievement-badge')) {
  customElements.define('dd-achievement-badge', DdAchievementBadge);
}
