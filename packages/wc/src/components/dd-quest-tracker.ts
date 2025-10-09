import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ThemeController } from '../styles/theme-controller';

export interface QuestItem {
  id: string;
  title: string;
  status: 'active' | 'complete' | 'failed';
  summary?: string;
}

const styles = css`
  :host {
    display: block;
    background: rgba(20, 22, 28, 0.85);
    border: var(--border-gold);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    font-family: var(--font-ui);
  }
  h3 {
    margin: 0 0 var(--space-md);
    font-family: var(--font-display);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-sm);
  }
  li {
    border-radius: var(--radius-md);
    padding: var(--space-md);
    background: rgba(14, 15, 19, 0.7);
    border: var(--border-hairline);
  }
  .status {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    background: rgba(200, 162, 74, 0.15);
    border: 1px solid rgba(200, 162, 74, 0.4);
  }
  .status[data-status='complete'] {
    background: rgba(75, 163, 109, 0.15);
    border-color: rgba(75, 163, 109, 0.4);
  }
  .status[data-status='failed'] {
    background: rgba(194, 69, 69, 0.2);
    border-color: rgba(194, 69, 69, 0.4);
  }
`;

export class DdQuestTracker extends LitElement {
  static override styles = styles;

  @property({ type: Array }) quests: QuestItem[] = [];

  protected createRenderRoot() {
    const root = super.createRenderRoot() as ShadowRoot;
    ThemeController.applyToShadow(root);
    return root;
  }

  render() {
    return html`
      <h3>Quest Log</h3>
      <ul>
        ${this.quests.map(
          (quest) => html`
            <li>
              <div class="header">
                <span>${quest.title}</span>
                <span class="status" data-status=${quest.status}>${quest.status}</span>
              </div>
              ${quest.summary ? html`<p>${quest.summary}</p>` : null}
            </li>
          `
        )}
      </ul>
    `;
  }
}

if (!customElements.get('dd-quest-tracker')) {
  customElements.define('dd-quest-tracker', DdQuestTracker);
}
