import { html, render } from 'lit-html';
import { SKILLS } from '../systems/types';
import type {
  Hero,
  DowntimeTask,
  DowntimeFocus,
  DowntimeRisk,
  DowntimeTaskEventType,
  DowntimeTaskEventDetail,
} from '../systems/types';

interface DowntimePlannerState {
  hero: Hero | null;
}

interface DowntimeSuggestion {
  id: string;
  title: string;
  focus: DowntimeFocus;
  days: number;
  risk: DowntimeRisk;
  notes: string;
  reason: string;
}

interface StoredPlannerState {
  tasks: DowntimeTask[];
}

const STORAGE_KEY = 'dd-downtime-planner-state';
const FOCUS_OPTIONS: DowntimeFocus[] = ['Training', 'Crafting', 'Research', 'Social', 'Exploration'];
const RISK_LABELS: Record<DowntimeRisk, string> = {
  low: 'Low Risk',
  moderate: 'Measured Risk',
  high: 'High Stakes',
};

function generateId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `planner-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clampProgress(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function parseNumber(value: unknown, fallback = 0): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

export class DDDowntimePlanner extends HTMLElement {
  private hero: Hero | null = null;
  private tasks: DowntimeTask[] = [];
  private focusFilter: DowntimeFocus | 'all' = 'all';
  private draft: { title: string; focus: DowntimeFocus; days: number; risk: DowntimeRisk; notes: string } = {
    title: '',
    focus: 'Training',
    days: 5,
    risk: 'moderate',
    notes: '',
  };
  private storageDisabled = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.restore();
    this.update();
  }

  set data(payload: DowntimePlannerState) {
    this.hero = payload.hero ?? null;
    this.update();
  }

  private restore(): void {
    const storage = this.getStorage();
    if (!storage) return;
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<StoredPlannerState>;
      const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
      this.tasks = tasks.map((task) => ({
        id: typeof task?.id === 'string' ? task.id : generateId(),
        title: typeof task?.title === 'string' ? task.title : 'Downtime Task',
        focus: FOCUS_OPTIONS.includes(task?.focus as DowntimeFocus)
          ? (task?.focus as DowntimeFocus)
          : 'Training',
        days: parseNumber(task?.days, 5),
        risk: ['low', 'moderate', 'high'].includes(String(task?.risk))
          ? (task?.risk as DowntimeRisk)
          : 'moderate',
        notes: typeof task?.notes === 'string' ? task.notes : undefined,
        progress: clampProgress(parseNumber(task?.progress, 0)),
        completed: Boolean(task?.completed),
        createdAt: parseNumber(task?.createdAt, Date.now()),
        updatedAt: parseNumber(task?.updatedAt, Date.now()),
      }));
    } catch (error) {
      console.warn('Failed to restore downtime planner state', error);
      if (error instanceof DOMException) {
        this.storageDisabled = true;
      }
    }
  }

  private persist(): void {
    const storage = this.getStorage();
    if (!storage) return;
    const payload: StoredPlannerState = { tasks: this.tasks };
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('Failed to persist downtime planner state', error);
      if (error instanceof DOMException) {
        this.storageDisabled = true;
      }
    }
  }

  private getStorage(): Storage | null {
    if (this.storageDisabled || typeof window === 'undefined') {
      return null;
    }
    try {
      return window.localStorage;
    } catch (error) {
      console.warn('Downtime planner storage is unavailable', error);
      if (error instanceof DOMException) {
        this.storageDisabled = true;
      }
      return null;
    }
    return null;
  }

  private dispatchTaskEvent(
    type: DowntimeTaskEventType,
    task: DowntimeTask,
    previousProgress?: number,
    previouslyCompleted?: boolean,
  ): void {
    const detail: DowntimeTaskEventDetail = {
      type,
      task: { ...task },
    };
    if (typeof previousProgress === 'number') {
      detail.previousProgress = previousProgress;
    }
    if (typeof previouslyCompleted === 'boolean') {
      detail.previouslyCompleted = previouslyCompleted;
    }
    this.dispatchEvent(
      new CustomEvent<DowntimeTaskEventDetail>(`downtime-task-${type}`, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private setFocusFilter(focus: DowntimeFocus | 'all'): void {
    this.focusFilter = focus;
    this.update();
  }

  private updateDraft(field: keyof typeof this.draft, value: string | number): void {
    if (field === 'days') {
      const numeric = Math.max(1, Math.round(Number(value) || 1));
      this.draft.days = numeric;
    } else if (field === 'focus') {
      this.draft.focus = (value as DowntimeFocus) ?? 'Training';
    } else if (field === 'risk') {
      this.draft.risk = (value as DowntimeRisk) ?? 'moderate';
    } else if (field === 'title') {
      this.draft.title = String(value);
    } else if (field === 'notes') {
      this.draft.notes = String(value);
    }
    this.update();
  }

  private resetDraft(): void {
    this.draft = {
      title: '',
      focus: 'Training',
      days: 5,
      risk: 'moderate',
      notes: '',
    };
  }

  private handleAddTask(event: Event): void {
    event.preventDefault();
    const title = this.draft.title.trim();
    if (!title) {
      this.update();
      return;
    }
    const task: DowntimeTask = {
      id: generateId(),
      title,
      focus: this.draft.focus,
      days: Math.max(1, this.draft.days),
      risk: this.draft.risk,
      notes: this.draft.notes.trim() || undefined,
      progress: 0,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.tasks = [task, ...this.tasks];
    this.resetDraft();
    this.persist();
    this.dispatchTaskEvent('created', task, 0, false);
    this.update();
  }

  private adoptSuggestion(suggestion: DowntimeSuggestion): void {
    const exists = this.tasks.some((task) => task.title === suggestion.title);
    if (exists) {
      this.focusFilter = suggestion.focus;
      this.update();
      return;
    }
    const task: DowntimeTask = {
      id: generateId(),
      title: suggestion.title,
      focus: suggestion.focus,
      days: suggestion.days,
      risk: suggestion.risk,
      notes: suggestion.notes,
      progress: 0,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.tasks = [task, ...this.tasks];
    this.focusFilter = suggestion.focus;
    this.persist();
    this.dispatchTaskEvent('created', task, 0, false);
    this.update();
  }

  private toggleTaskCompletion(taskId: string): void {
    const existing = this.tasks.find((task) => task.id === taskId);
    if (!existing) return;
    const completed = !existing.completed;
    const updated: DowntimeTask = {
      ...existing,
      completed,
      progress: completed ? 100 : clampProgress(existing.progress),
      updatedAt: Date.now(),
    };
    this.tasks = this.tasks.map((task) => (task.id === taskId ? updated : task));
    this.persist();
    this.dispatchTaskEvent(
      completed ? 'completed' : 'progressed',
      updated,
      existing.progress,
      existing.completed,
    );
    this.update();
  }

  private updateProgress(taskId: string, progress: number): void {
    const previous = this.tasks.find((task) => task.id === taskId);
    if (!previous) return;
    const normalized = clampProgress(progress);
    let updated: DowntimeTask | null = null;
    this.tasks = this.tasks.map((task) => {
      if (task.id !== taskId) return task;
      const completed = normalized >= 100 ? true : task.completed;
      updated = {
        ...task,
        progress: normalized,
        completed,
        updatedAt: Date.now(),
      };
      return updated;
    });
    if (!updated) return;
    this.persist();
    if (normalized === previous.progress && previous.completed === updated.completed) {
      this.update();
      return;
    }
    const eventType: DowntimeTaskEventType =
      !previous.completed && updated.completed ? 'completed' : 'progressed';
    this.dispatchTaskEvent(eventType, updated, previous.progress, previous.completed);
    this.update();
  }

  private adjustProgress(taskId: string, delta: number): void {
    const task = this.tasks.find((entry) => entry.id === taskId);
    if (!task) return;
    this.updateProgress(taskId, clampProgress(task.progress + delta));
  }

  private editNotes(taskId: string): void {
    if (typeof window === 'undefined') return;
    const task = this.tasks.find((entry) => entry.id === taskId);
    if (!task) return;
    const next = window.prompt('Update notes for this plan', task.notes ?? '');
    if (next === null) return;
    this.tasks = this.tasks.map((entry) =>
      entry.id === taskId
        ? {
            ...entry,
            notes: next.trim() || undefined,
            updatedAt: Date.now(),
          }
        : entry,
    );
    this.persist();
    this.update();
  }

  private removeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.persist();
    this.update();
  }

  private get suggestions(): DowntimeSuggestion[] {
    const hero = this.hero;
    const suggestions: DowntimeSuggestion[] = [];
    if (!hero) {
      suggestions.push(
        {
          id: 'scout-verdyn',
          title: 'Scout the Verdyn Outskirts',
          focus: 'Exploration',
          days: 3,
          risk: 'moderate',
          notes: 'Survey patrol routes and note any unusual activity beyond the walls.',
          reason: 'Ideal prelude before you formally begin your legend.',
        },
        {
          id: 'craft-supplies',
          title: 'Craft Riftworthy Supplies',
          focus: 'Crafting',
          days: 2,
          risk: 'low',
          notes: 'Reinforce gear, mend cloaks, and brew a small supply of travel tonics.',
          reason: 'Be prepared with sturdy equipment when the story begins in earnest.',
        },
      );
      return suggestions;
    }

    const attributes = hero.attributes ?? {};
    const skills = hero.skills ?? {};
    const topAbility = Object.entries(attributes)
      .map(([ability, score]) => ({ ability, score: Number(score ?? 10) }))
      .sort((a, b) => b.score - a.score)[0];
    const topSkillEntry = Object.entries(skills)
      .map(([id, value]) => ({ id, value: Number(value ?? 0) }))
      .sort((a, b) => b.value - a.value)[0];
    const topSkill = SKILLS.find((skill) => skill.id === topSkillEntry?.id);
    const level = Math.max(1, Number(hero.level ?? 1));
    const proficiencyBonus = Math.floor((level - 1) / 4) + 2;

    if (topSkill) {
      suggestions.push({
        id: `train-${topSkill.id}`,
        title: `Masterclass: ${topSkill.label}`,
        focus: 'Training',
        days: 5,
        risk: 'moderate',
        notes: `Intensive regimen tailored to elevate your ${topSkill.label.toLowerCase()} prowess. Expect fatigue and breakthroughs alike.`,
        reason: `You already lead with ${topSkill.label}; another ${proficiencyBonus} proficiency die could set you apart.`,
      });
    }

    if (topAbility) {
      const abilityName = topAbility.ability.replace(/^[a-z]/, (char) => char.toUpperCase());
      suggestions.push({
        id: `refine-${topAbility.ability}`,
        title: `Refine ${abilityName} Discipline`,
        focus: 'Research',
        days: 4,
        risk: 'low',
        notes: `Meditate, spar, and journal about how your ${abilityName.toLowerCase()} defines your approach to the Ember Rift.`,
        reason: `Your highest aptitude is ${abilityName}; explore advanced techniques to leverage it even further.`,
      });
    }

    const backgroundName = hero.background?.name ?? 'Trusted Allies';
    suggestions.push({
      id: 'faction-outreach',
      title: `Outreach: ${backgroundName}`,
      focus: 'Social',
      days: 2,
      risk: 'low',
      notes: `Reconnect with contacts tied to your ${backgroundName.toLowerCase()} past to uncover favors and rumors.`,
      reason: 'Your background allies can open doors otherwise barred to strangers.',
    });

    suggestions.push({
      id: 'rift-cartography',
      title: 'Rift Cartography Sprint',
      focus: 'Exploration',
      days: 3,
      risk: 'high',
      notes: 'Chart unstable ley-lines surrounding the Ember Rift. Requires nerve and precise measurements.',
      reason: 'Accurate maps could save your life during the Archon Pyrel confrontation.',
    });

    return suggestions;
  }

  private formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  }

  private estimateRemainingDays(task: DowntimeTask): number {
    const remaining = task.days * (1 - task.progress / 100);
    return Math.max(0, Math.ceil(remaining));
  }

  private renderTask(task: DowntimeTask): unknown {
    const remainingDays = this.estimateRemainingDays(task);
    return html`
      <li class=${task.completed ? 'completed' : ''}>
        <header>
          <div>
            <strong>${task.title}</strong>
            <span class="meta">${task.focus} · ${RISK_LABELS[task.risk]}</span>
          </div>
          <div class="dates">
            <span>Created ${this.formatDate(task.createdAt)}</span>
            ${task.updatedAt !== task.createdAt
              ? html`<span>Updated ${this.formatDate(task.updatedAt)}</span>`
              : null}
          </div>
        </header>
        <div class="progress">
          <label>
            Progress
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              .value=${task.progress}
              @input=${(event: Event) =>
                this.updateProgress(task.id, Number((event.currentTarget as HTMLInputElement).value))}
            />
          </label>
          <div class="progress-details">
            <span>${task.progress}%</span>
            ${!task.completed
              ? html`<span>${remainingDays} day${remainingDays === 1 ? '' : 's'} remaining</span>`
              : html`<span>Ready to deploy</span>`}
          </div>
          <div class="progress-controls">
            <button type="button" @click=${() => this.adjustProgress(task.id, -10)}>-10%</button>
            <button type="button" @click=${() => this.adjustProgress(task.id, 10)}>+10%</button>
          </div>
        </div>
        ${task.notes
          ? html`<p class="notes">${task.notes}</p>`
          : html`<p class="notes muted">Add notes to capture insights.</p>`}
        <footer>
          <button type="button" @click=${() => this.toggleTaskCompletion(task.id)}>
            ${task.completed ? 'Reopen Plan' : 'Mark Complete'}
          </button>
          <button type="button" class="secondary" @click=${() => this.editNotes(task.id)}>
            Edit Notes
          </button>
          <button type="button" class="danger" @click=${() => this.removeTask(task.id)}>
            Remove
          </button>
        </footer>
      </li>
    `;
  }

  private renderTaskList(): unknown {
    if (this.tasks.length === 0) {
      return html`<p class="empty">Plan downtime goals to enrich your lone adventurer's journey.</p>`;
    }
    const filtered = this.tasks.filter(
      (task) => this.focusFilter === 'all' || task.focus === this.focusFilter,
    );
    if (filtered.length === 0) {
      return html`<p class="empty">No tasks yet for this focus. Forge one above or adopt a suggestion.</p>`;
    }
    return html`<ul class="tasks">${filtered.map((task) => this.renderTask(task))}</ul>`;
  }

  private renderSuggestions(): unknown {
    const suggestions = this.suggestions;
    if (suggestions.length === 0) return null;
    return html`
      <section class="suggestions">
        <header>
          <h3>Curated Suggestions</h3>
          <p>Inspired by your hero's strengths and the escalating threat at the Ember Rift.</p>
        </header>
        <ul>
          ${suggestions.map(
            (suggestion) => html`
              <li>
                <div class="summary">
                  <strong>${suggestion.title}</strong>
                  <span class="meta">${suggestion.focus} · ${RISK_LABELS[suggestion.risk]}</span>
                  <span class="reason">${suggestion.reason}</span>
                </div>
                <p>${suggestion.notes}</p>
                <button type="button" @click=${() => this.adoptSuggestion(suggestion)}>
                  Add to Planner (${suggestion.days} day${suggestion.days === 1 ? '' : 's'})
                </button>
              </li>
            `,
          )}
        </ul>
      </section>
    `;
  }

  private update(): void {
    if (!this.shadowRoot) return;
    const activeTasks = this.tasks.filter((task) => !task.completed);
    const completedTasks = this.tasks.filter((task) => task.completed);
    const plannedDays = activeTasks.reduce((sum, task) => sum + task.days, 0);
    const remainingDays = activeTasks.reduce((sum, task) => sum + this.estimateRemainingDays(task), 0);
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            border-radius: 16px;
            background: rgba(18, 14, 28, 0.82);
            padding: 1.25rem;
            color: inherit;
            box-shadow: 0 14px 32px rgba(0, 0, 0, 0.35);
          }

          h2 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
            letter-spacing: 0.06em;
          }

          .subtitle {
            margin: 0.25rem 0 1.2rem;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
          }

          .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          .metric {
            background: rgba(32, 24, 44, 0.75);
            border: 1px solid rgba(255, 210, 164, 0.15);
            border-radius: 12px;
            padding: 0.75rem;
            display: grid;
            gap: 0.35rem;
          }

          .metric .label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.65);
          }

          .metric .value {
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
          }

          form {
            display: grid;
            gap: 0.75rem;
            margin-bottom: 1.25rem;
          }

          form .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 0.75rem;
          }

          label {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            font-size: 0.85rem;
          }

          input,
          select,
          textarea {
            border-radius: 10px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(12, 9, 20, 0.85);
            color: inherit;
            padding: 0.6rem 0.75rem;
            font-family: inherit;
          }

          textarea {
            min-height: 80px;
            resize: vertical;
          }

          form button {
            justify-self: start;
            border-radius: 10px;
            border: 1px solid rgba(240, 179, 90, 0.45);
            background: linear-gradient(90deg, rgba(240, 179, 90, 0.9), rgba(242, 125, 114, 0.9));
            color: #1b0f22;
            font-family: 'Cinzel', serif;
            letter-spacing: 0.04em;
            padding: 0.65rem 1.2rem;
            cursor: pointer;
          }

          .filters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .filters button {
            border-radius: 999px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(255, 255, 255, 0.06);
            color: inherit;
            padding: 0.45rem 0.75rem;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            cursor: pointer;
          }

          .filters button.active {
            background: rgba(240, 179, 90, 0.25);
            border-color: rgba(240, 179, 90, 0.45);
          }

          .tasks {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 1rem;
          }

          .tasks li {
            border: 1px solid rgba(255, 210, 164, 0.15);
            border-radius: 14px;
            background: rgba(32, 24, 44, 0.78);
            padding: 0.9rem 1rem;
            display: grid;
            gap: 0.65rem;
          }

          .tasks li.completed {
            border-color: rgba(123, 231, 165, 0.35);
            background: rgba(123, 231, 165, 0.1);
          }

          .tasks header {
            display: flex;
            justify-content: space-between;
            gap: 0.75rem;
            align-items: baseline;
          }

          .tasks header strong {
            font-size: 1rem;
          }

          .tasks .meta {
            display: inline-flex;
            gap: 0.45rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: rgba(255, 255, 255, 0.7);
          }

          .tasks .dates {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.55);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .progress {
            display: grid;
            gap: 0.5rem;
          }

          .progress label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: rgba(255, 255, 255, 0.65);
          }

          .progress input[type='range'] {
            width: 100%;
          }

          .progress-details {
            display: flex;
            justify-content: space-between;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.7);
          }

          .progress-controls {
            display: flex;
            gap: 0.5rem;
          }

          .progress-controls button {
            border-radius: 8px;
            border: 1px solid rgba(255, 210, 164, 0.25);
            background: rgba(255, 255, 255, 0.08);
            color: inherit;
            padding: 0.35rem 0.6rem;
            font-size: 0.75rem;
            cursor: pointer;
          }

          .notes {
            margin: 0;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.85);
            background: rgba(255, 255, 255, 0.06);
            padding: 0.65rem;
            border-radius: 10px;
          }

          .notes.muted {
            color: rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.03);
            font-style: italic;
          }

          footer {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          footer button {
            border-radius: 10px;
            border: 1px solid rgba(240, 179, 90, 0.35);
            background: rgba(240, 179, 90, 0.22);
            color: inherit;
            padding: 0.5rem 0.9rem;
            font-size: 0.8rem;
            letter-spacing: 0.04em;
            cursor: pointer;
          }

          footer button.secondary {
            background: rgba(106, 192, 255, 0.18);
            border-color: rgba(106, 192, 255, 0.35);
          }

          footer button.danger {
            background: rgba(242, 125, 114, 0.16);
            border-color: rgba(242, 125, 114, 0.38);
          }

          .empty {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.65);
            margin: 0;
          }

          .suggestions {
            margin-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 1.25rem;
            display: grid;
            gap: 0.75rem;
          }

          .suggestions header h3 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            letter-spacing: 0.05em;
          }

          .suggestions header p {
            margin: 0.25rem 0 0;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .suggestions ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.75rem;
          }

          .suggestions li {
            border: 1px solid rgba(255, 210, 164, 0.12);
            background: rgba(20, 16, 32, 0.8);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            display: grid;
            gap: 0.4rem;
          }

          .suggestions .summary {
            display: grid;
            gap: 0.35rem;
          }

          .suggestions .reason {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .suggestions button {
            justify-self: start;
            border-radius: 10px;
            border: 1px solid rgba(240, 179, 90, 0.4);
            background: rgba(240, 179, 90, 0.18);
            color: inherit;
            padding: 0.45rem 0.75rem;
            font-size: 0.8rem;
            cursor: pointer;
          }

          button:disabled {
            opacity: 0.55;
            cursor: not-allowed;
          }
        </style>
        <h2>Downtime Planner</h2>
        <p class="subtitle">
          Map the quiet hours between adventures, ensuring every respite sharpens your edge.
        </p>
        <div class="metrics">
          <div class="metric">
            <span class="label">Active Plans</span>
            <span class="value">${activeTasks.length}</span>
          </div>
          <div class="metric">
            <span class="label">Completed</span>
            <span class="value">${completedTasks.length}</span>
          </div>
          <div class="metric">
            <span class="label">Planned Days</span>
            <span class="value">${plannedDays}</span>
          </div>
          <div class="metric">
            <span class="label">Days Remaining</span>
            <span class="value">${remainingDays}</span>
          </div>
        </div>
        <form @submit=${(event: Event) => this.handleAddTask(event)}>
          <div class="grid">
            <label>
              Plan Title
              <input
                name="title"
                placeholder="Secure additional Ember Shards"
                .value=${this.draft.title}
                @input=${(event: Event) =>
                  this.updateDraft('title', (event.currentTarget as HTMLInputElement).value)}
              />
            </label>
            <label>
              Focus
              <select
                name="focus"
                .value=${this.draft.focus}
                @change=${(event: Event) =>
                  this.updateDraft('focus', (event.currentTarget as HTMLSelectElement).value)}
              >
                ${FOCUS_OPTIONS.map((focus) => html`<option value=${focus}>${focus}</option>`)}
              </select>
            </label>
            <label>
              Time Investment (days)
              <input
                type="number"
                min="1"
                .value=${this.draft.days}
                @input=${(event: Event) =>
                  this.updateDraft('days', Number((event.currentTarget as HTMLInputElement).value))}
              />
            </label>
            <label>
              Risk Appetite
              <select
                name="risk"
                .value=${this.draft.risk}
                @change=${(event: Event) =>
                  this.updateDraft('risk', (event.currentTarget as HTMLSelectElement).value)}
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
          <label>
            Notes &amp; Intentions
            <textarea
              name="notes"
              placeholder="Define the allies, facilities, or lore you will leverage."
              .value=${this.draft.notes}
              @input=${(event: Event) =>
                this.updateDraft('notes', (event.currentTarget as HTMLTextAreaElement).value)}
            ></textarea>
          </label>
          <button type="submit" ?disabled=${this.draft.title.trim().length === 0}>
            Add Downtime Plan
          </button>
        </form>
        <div class="filters">
          <button
            type="button"
            class=${this.focusFilter === 'all' ? 'active' : ''}
            @click=${() => this.setFocusFilter('all')}
          >
            All (${this.tasks.length})
          </button>
          ${FOCUS_OPTIONS.map((focus) => {
            const count = this.tasks.filter((task) => task.focus === focus).length;
            return html`
              <button
                type="button"
                class=${this.focusFilter === focus ? 'active' : ''}
                @click=${() => this.setFocusFilter(focus)}
              >
                ${focus} (${count})
              </button>
            `;
          })}
        </div>
        ${this.renderTaskList()}
        ${this.renderSuggestions()}
      `,
      this.shadowRoot,
    );
  }
}

customElements.define('dd-downtime-planner', DDDowntimePlanner);
