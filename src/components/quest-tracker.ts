import { html, render } from 'lit-html';
import type { Quest, QuestObjective, QuestStatus } from '../systems/types';

export class DDQuestTracker extends HTMLElement {
  private quests: Quest[] = [];
  private filterText = '';
  private sortMode: 'status' | 'recent' | 'progress' = 'status';
  private activeStatuses: Set<QuestStatus> = new Set(['active', 'completed', 'failed']);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(quests: Quest[]) {
    this.quests = quests;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    const filtered = this.getFilteredQuests();
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 16px;
            padding: 1rem;
            background: rgba(18, 14, 28, 0.8);
            backdrop-filter: blur(6px);
          }

          h3 {
            margin: 0 0 0.75rem;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            letter-spacing: 0.04em;
          }

          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            flex-wrap: wrap;
          }

          .header span {
            font-size: 0.8rem;
            letter-spacing: 0.05em;
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
          }

          .toolbar {
            display: grid;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
          }

          @media (min-width: 520px) {
            .toolbar {
              grid-template-columns: minmax(0, 1fr) auto;
              align-items: center;
            }
          }

          .status-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
          }

          .status-toggle {
            appearance: none;
            background: rgba(32, 24, 44, 0.65);
            color: inherit;
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 999px;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            padding: 0.2rem 0.65rem;
            cursor: pointer;
            transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          }

          .status-toggle[selected] {
            border-color: rgba(240, 179, 90, 0.5);
            background: rgba(240, 179, 90, 0.16);
            transform: translateY(-1px);
          }

          .filter-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
          }

          .filter-controls input[type='search'] {
            flex: 1 1 180px;
            min-width: 0;
            padding: 0.35rem 0.6rem;
            border-radius: 8px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(16, 12, 24, 0.75);
            color: inherit;
            font: inherit;
          }

          .filter-controls select {
            appearance: none;
            border-radius: 8px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(16, 12, 24, 0.75);
            color: inherit;
            font: inherit;
            padding: 0.35rem 0.6rem;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.5rem;
          }

          li {
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 0.9rem;
            background: rgba(30, 22, 40, 0.85);
            display: grid;
            gap: 0.6rem;
          }

          .status {
            display: inline-flex;
            align-items: center;
            padding: 0.15rem 0.5rem;
            border-radius: 999px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.35rem;
          }

          .status.active {
            background: rgba(90, 140, 255, 0.2);
            color: #87c0ff;
          }

          .status.completed {
            background: rgba(137, 227, 185, 0.18);
            color: var(--dd-success);
          }

          .status.failed {
            background: rgba(242, 125, 114, 0.18);
            color: var(--dd-danger);
          }

          .faction-tag {
            display: inline-block;
            margin-left: 0.5rem;
            padding: 0.15rem 0.5rem;
            border-radius: 999px;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: rgba(240, 179, 90, 0.18);
            color: rgba(240, 179, 90, 0.9);
          }

          p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }

          .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            font-size: 0.72rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            background: rgba(240, 179, 90, 0.14);
            color: rgba(240, 179, 90, 0.92);
            border: 1px solid rgba(240, 179, 90, 0.24);
          }

          .badge.level {
            background: rgba(137, 227, 185, 0.14);
            color: rgba(137, 227, 185, 0.92);
            border-color: rgba(137, 227, 185, 0.24);
          }

          .badge.updated {
            background: rgba(106, 192, 255, 0.12);
            color: rgba(179, 226, 255, 0.92);
            border-color: rgba(106, 192, 255, 0.2);
          }

          .progress {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
          }

          .progress-track {
            flex: 1;
            height: 6px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.08);
            overflow: hidden;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #f27d72, #f0b35a);
            transition: width 200ms ease;
          }

          .objectives {
            display: grid;
            gap: 0.4rem;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .objectives li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.82rem;
            color: rgba(255, 255, 255, 0.85);
          }

          .objectives li::before {
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 1px solid rgba(240, 179, 90, 0.6);
            background: rgba(240, 179, 90, 0.2);
            box-shadow: 0 0 6px rgba(240, 179, 90, 0.35);
          }

          .objective-text {
            flex: 1;
          }

          .objectives li.completed {
            color: var(--dd-success);
          }

          .objectives li.completed::before {
            background: var(--dd-success);
            border-color: rgba(137, 227, 185, 0.9);
            box-shadow: 0 0 6px rgba(137, 227, 185, 0.45);
          }

          .objective-optional {
            margin-left: auto;
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.55);
          }

          .empty {
            font-size: 0.85rem;
            color: var(--dd-muted);
            text-align: center;
            padding: 1.25rem 0.5rem;
          }
        </style>
        <div class="header">
          <h3>Quest Journal</h3>
          <span>${filtered.length} of ${this.quests.length} quests shown</span>
        </div>
        <div class="toolbar">
          <div class="status-filters" role="group" aria-label="Filter quests by status">
            ${['active', 'completed', 'failed'].map((status) => html`
              <button
                type="button"
                class="status-toggle"
                ?selected=${this.activeStatuses.has(status as QuestStatus)}
                @click=${() => this.toggleStatus(status as QuestStatus)}
              >
                ${status}
              </button>
            `)}
          </div>
          <div class="filter-controls">
            <input
              type="search"
              placeholder="Search quests"
              .value=${this.filterText}
              @input=${(event: Event) => this.handleFilterInput(event)}
              aria-label="Search quests"
            />
            <select
              .value=${this.sortMode}
              @change=${(event: Event) => this.handleSortChange(event)}
              aria-label="Sort quests"
            >
              <option value="status">Sort by status</option>
              <option value="recent">Recently updated</option>
              <option value="progress">Highest progress</option>
            </select>
          </div>
        </div>
        <ul>
          ${filtered.length > 0
            ? filtered.map((quest) => {
                const objectives = this.normalizeObjectives(quest);
                const progress = this.calculateProgress(quest, objectives);
                const progressLabel = `${Math.round(progress * 100)}%`;
                const updatedLabel = quest.updatedAt
                  ? `Updated ${this.formatRelativeTime(quest.updatedAt)}`
                  : null;
                return html`
                  <li>
                    <div class="meta">
                      <span class="status ${quest.status}">${quest.status}</span>
                      ${quest.faction
                        ? html`<span class="faction-tag">${quest.faction}</span>`
                        : null}
                      ${quest.location
                        ? html`<span class="badge">${quest.location}</span>`
                        : null}
                      ${typeof quest.recommendedLevel === 'number'
                        ? html`<span class="badge level">Level ${quest.recommendedLevel}</span>`
                        : null}
                      ${updatedLabel
                        ? html`<span class="badge updated">${updatedLabel}</span>`
                        : null}
                    </div>
                    <div><strong>${quest.title}</strong></div>
                    <p>${quest.summary}</p>
                    <div class="progress" aria-label="Quest progress">
                      <div class="progress-track">
                        <div class="progress-fill" style="width: ${progress * 100}%"></div>
                      </div>
                      <span>${progressLabel}</span>
                    </div>
                    ${objectives.length > 0
                      ? html`<ul class="objectives">
                          ${objectives.map(
                            (objective) => html`
                              <li class=${objective.completed ? 'completed' : ''}>
                                <span class="objective-text">${objective.description}</span>
                                ${objective.optional
                                  ? html`<span class="objective-optional">Optional</span>`
                                  : null}
                              </li>
                            `,
                          )}
                        </ul>`
                      : null}
                    ${quest.reward ? html`<p>Reward: ${quest.reward}</p>` : null}
                  </li>
                `;
              })
            : html`<li class="empty">No quests match your current filters.</li>`}
        </ul>
      `,
      this.shadowRoot,
    );
  }

  private getFilteredQuests(): Quest[] {
    const query = this.filterText.trim().toLowerCase();
    const matchesStatus = (quest: Quest) => this.activeStatuses.has(quest.status);
    const matchesQuery = (quest: Quest) => {
      if (!query) return true;
      const haystack = [
        quest.title,
        quest.summary,
        quest.faction ?? '',
        quest.location ?? '',
        quest.reward ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    };

    const filtered = this.quests.filter((quest) => matchesStatus(quest) && matchesQuery(quest));
    return this.sortQuests(filtered);
  }

  private sortQuests(quests: Quest[]): Quest[] {
    const statusRank: Record<QuestStatus, number> = {
      active: 0,
      completed: 1,
      failed: 2,
    };

    const byStatus = (a: Quest, b: Quest) => {
      if (statusRank[a.status] !== statusRank[b.status]) {
        return statusRank[a.status] - statusRank[b.status];
      }
      return a.title.localeCompare(b.title);
    };

    const byRecent = (a: Quest, b: Quest) => {
      const aTime = a.updatedAt ?? 0;
      const bTime = b.updatedAt ?? 0;
      if (aTime !== bTime) {
        return bTime - aTime;
      }
      return byStatus(a, b);
    };

    const byProgress = (a: Quest, b: Quest) => {
      const aObjectives = this.normalizeObjectives(a);
      const bObjectives = this.normalizeObjectives(b);
      const aProgress = this.calculateProgress(a, aObjectives);
      const bProgress = this.calculateProgress(b, bObjectives);
      if (aProgress !== bProgress) {
        return bProgress - aProgress;
      }
      return byRecent(a, b);
    };

    const sorter =
      this.sortMode === 'status' ? byStatus : this.sortMode === 'recent' ? byRecent : byProgress;
    return [...quests].sort(sorter);
  }

  private handleFilterInput(event: Event): void {
    const input = event.currentTarget as HTMLInputElement | null;
    this.filterText = input?.value ?? '';
    this.update();
  }

  private handleSortChange(event: Event): void {
    const select = event.currentTarget as HTMLSelectElement | null;
    const value = (select?.value ?? 'status') as typeof this.sortMode;
    if (this.sortMode === value) return;
    this.sortMode = value;
    this.update();
  }

  private toggleStatus(status: QuestStatus): void {
    const next = new Set(this.activeStatuses);
    if (next.has(status)) {
      next.delete(status);
    } else {
      next.add(status);
    }
    if (next.size === 0) {
      next.add(status);
    }
    this.activeStatuses = next;
    this.update();
  }

  private normalizeObjectives(quest: Quest): QuestObjective[] {
    const objectives = quest.objectives ?? [];
    return objectives.map((objective) => ({
      ...objective,
      completed: quest.status === 'completed' ? true : Boolean(objective.completed),
    }));
  }

  private calculateProgress(quest: Quest, objectives: QuestObjective[]): number {
    if (quest.status === 'completed') {
      return 1;
    }
    const objectiveProgress = this.objectiveProgress(objectives);
    const questProgress = typeof quest.progress === 'number' ? quest.progress : 0;
    return Math.max(0, Math.min(1, Math.max(objectiveProgress, questProgress)));
  }

  private objectiveProgress(objectives: QuestObjective[]): number {
    if (objectives.length === 0) {
      return 0;
    }
    const primaryObjectives = objectives.filter((objective) => !objective.optional);
    const relevant = primaryObjectives.length > 0 ? primaryObjectives : objectives;
    if (relevant.length === 0) {
      return 0;
    }
    const completed = relevant.filter((objective) => objective.completed).length;
    return completed / relevant.length;
  }

  private formatRelativeTime(timestamp: number): string {
    const now = Date.now();
    const delta = Math.max(0, now - timestamp);
    const minute = 60_000;
    const hour = 60 * minute;
    const day = 24 * hour;
    if (delta < minute) {
      return 'moments ago';
    }
    if (delta < hour) {
      const minutes = Math.round(delta / minute);
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }
    if (delta < day) {
      const hours = Math.round(delta / hour);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
    const days = Math.round(delta / day);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
}

customElements.define('dd-quest-tracker', DDQuestTracker);
