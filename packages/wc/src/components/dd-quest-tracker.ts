import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { DdElement } from './base';

export interface QuestItem {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'failed';
  summary?: string;
}

const styles = css`
  :host {
    display: block;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-sm);
  }
  li {
    background: color-mix(in oklab, var(--color-surface-1), #ffffff 3%);
    border: var(--border-hairline);
    border-radius: var(--radius-md);
    padding: var(--space-md) var(--space-lg);
  }
  .title {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-weight: 600;
  }
  .badge {
    border-radius: var(--radius-sm);
    padding: 0 var(--space-sm);
    font-size: 0.75rem;
    text-transform: uppercase;
  }
  .badge[data-status='active'] {
    background: color-mix(in oklab, var(--color-accent), #ffffff 10%);
    color: var(--color-bg);
  }
  .badge[data-status='completed'] {
    background: color-mix(in oklab, var(--color-success), #ffffff 16%);
    color: var(--color-bg);
  }
  .badge[data-status='failed'] {
    background: color-mix(in oklab, var(--color-danger), #ffffff 16%);
    color: var(--color-bg);
  }
`;

export class DdQuestTracker extends DdElement {
  static styles = [styles];

  @property({ type: Array }) quests: QuestItem[] = [];

  render() {
    return html`
      <ul>
        ${this.quests.map(
          (quest) => html`
            <li>
              <div class="title">
                <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-quest"></use></svg>
                <span>${quest.title}</span>
                <span class="badge" data-status=${quest.status}>${quest.status}</span>
              </div>
              ${quest.summary ? html`<p>${quest.summary}</p>` : null}
            </li>
          `
        )}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-quest-tracker': DdQuestTracker;
  }
}
