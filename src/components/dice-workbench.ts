import { html, render } from 'lit-html';

type DiceMode = 'normal' | 'advantage' | 'disadvantage';

interface RollBreakdown {
  id: string;
  dice: number[];
  secondary?: number[];
  modifier: number;
  total: number;
  critical?: 'success' | 'failure';
  label?: string;
  timestamp: number;
  notation: string;
  mode: DiceMode;
}

interface DiceFavorite {
  id: string;
  name: string;
  notation: string;
  modifier: number;
  mode: DiceMode;
}

interface StoredWorkbenchState {
  favorites: DiceFavorite[];
  history: RollBreakdown[];
}

const STORAGE_KEY = 'dd-dice-workbench-state';

function parseNotation(
  notation: string,
): { count: number; faces: number; modifier: number } {
  const trimmed = notation.trim();
  const match = /(\d*)d(\d+)([+-]\d+)?/i.exec(trimmed);
  if (!match) {
    throw new Error('Please use dice notation like 1d20 or 2d6+3.');
  }
  const [, countRaw, facesRaw, modifierRaw] = match;
  const count = countRaw && countRaw.length > 0 ? Math.max(1, parseInt(countRaw, 10)) : 1;
  const faces = Math.max(2, parseInt(facesRaw, 10));
  const modifier = modifierRaw ? parseInt(modifierRaw, 10) : 0;
  return { count, faces, modifier };
}

function rollDice(count: number, faces: number): number[] {
  return Array.from({ length: count }, () => Math.floor(Math.random() * faces) + 1);
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clampHistory(history: RollBreakdown[]): RollBreakdown[] {
  const limit = 16;
  if (history.length <= limit) return history;
  return history.slice(history.length - limit);
}

export class DDDiceWorkbench extends HTMLElement {
  private notation = '1d20';
  private modifier = 0;
  private rollCount = 1;
  private mode: DiceMode = 'normal';
  private history: RollBreakdown[] = [];
  private favorites: DiceFavorite[] = [];
  private favoriteName = '';
  private error: string | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.restoreState();
    this.update();
  }

  private restoreState(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<StoredWorkbenchState>;
      const favorites = Array.isArray(parsed.favorites) ? parsed.favorites : [];
      this.favorites = favorites
        .map((favorite) => ({
          id: typeof favorite?.id === 'string' ? favorite.id : generateId(),
          name: typeof favorite?.name === 'string' ? favorite.name : 'Favorite Roll',
          notation: typeof favorite?.notation === 'string' ? favorite.notation : '1d20',
          modifier: typeof favorite?.modifier === 'number' ? favorite.modifier : 0,
          mode:
            favorite?.mode === 'advantage' || favorite?.mode === 'disadvantage'
              ? favorite.mode
              : 'normal',
        }))
        .filter((favorite) => favorite.name.trim().length > 0 && favorite.notation.trim().length > 0);
      const history = Array.isArray(parsed.history) ? parsed.history : [];
      this.history = history.map((entry) => ({
        id: typeof entry?.id === 'string' ? entry.id : generateId(),
        dice: Array.isArray(entry?.dice)
          ? (entry?.dice as unknown[]).map((value) => {
              const numeric = Number(value);
              return Number.isFinite(numeric) ? numeric : 0;
            })
          : [],
        secondary: Array.isArray(entry?.secondary)
          ? (entry?.secondary as unknown[]).map((value) => {
              const numeric = Number(value);
              return Number.isFinite(numeric) ? numeric : 0;
            })
          : undefined,
        modifier: typeof entry?.modifier === 'number' ? entry.modifier : 0,
        total: typeof entry?.total === 'number' ? entry.total : 0,
        critical:
          entry?.critical === 'success' || entry?.critical === 'failure' ? entry.critical : undefined,
        label: typeof entry?.label === 'string' ? entry.label : undefined,
        timestamp:
          typeof entry?.timestamp === 'number' ? entry.timestamp : Date.now() - Math.random() * 1000,
        notation: typeof entry?.notation === 'string' ? entry.notation : '1d20',
        mode:
          entry?.mode === 'advantage' || entry?.mode === 'disadvantage' ? entry.mode : 'normal',
      }));
    } catch (error) {
      console.warn('Failed to restore dice workbench state', error);
    }
  }

  private persistState(): void {
    if (typeof localStorage === 'undefined') return;
    const payload: StoredWorkbenchState = {
      favorites: this.favorites,
      history: clampHistory(this.history),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('Failed to persist dice workbench state', error);
    }
  }

  private setNotation(value: string): void {
    this.notation = value;
    this.update();
  }

  private setModifier(value: number): void {
    this.modifier = Number.isFinite(value) ? value : 0;
    this.update();
  }

  private setRollCount(value: number): void {
    this.rollCount = Math.max(1, Math.floor(value));
    this.update();
  }

  private setMode(mode: DiceMode): void {
    this.mode = mode;
    this.update();
  }

  private setFavoriteName(value: string): void {
    this.favoriteName = value;
    this.update();
  }

  private handleRoll(event: Event): void {
    event.preventDefault();
    this.executeRoll(this.notation, this.modifier, this.mode, this.rollCount);
  }

  private resolveSingleRoll(
    count: number,
    faces: number,
    modifier: number,
    mode: DiceMode,
  ): { dice: number[]; secondary?: number[]; total: number; modifier: number; critical?: 'success' | 'failure' } {
    const rollOnce = () => {
      const dice = rollDice(count, faces);
      const subtotal = dice.reduce((sum, value) => sum + value, 0);
      return { dice, subtotal };
    };

    const determineCritical = (dice: number[]): RollBreakdown['critical'] => {
      if (count !== 1 || faces !== 20) return undefined;
      if (dice[0] === 20) return 'success';
      if (dice[0] === 1) return 'failure';
      return undefined;
    };

    if (mode === 'normal') {
      const primary = rollOnce();
      return {
        dice: primary.dice,
        total: primary.subtotal + modifier,
        modifier,
        critical: determineCritical(primary.dice),
      };
    }

    const first = rollOnce();
    const second = rollOnce();
    let chosen = first;
    let other = second;

    if (mode === 'advantage') {
      if (second.subtotal > first.subtotal) {
        chosen = second;
        other = first;
      }
    } else if (mode === 'disadvantage') {
      if (second.subtotal < first.subtotal) {
        chosen = second;
        other = first;
      }
    }

    return {
      dice: chosen.dice,
      secondary: other.dice,
      total: chosen.subtotal + modifier,
      modifier,
      critical: determineCritical(chosen.dice),
    };
  }

  private executeRoll(
    notation: string,
    bonus: number,
    mode: DiceMode,
    repeat: number,
    label?: string,
  ): void {
    this.error = null;
    try {
      const parsed = parseNotation(notation);
      const historyEntries: RollBreakdown[] = [];
      const baseTimestamp = Date.now();
      for (let index = 0; index < repeat; index += 1) {
        const entry = this.resolveSingleRoll(parsed.count, parsed.faces, parsed.modifier + bonus, mode);
        historyEntries.push({
          id: generateId(),
          dice: entry.dice,
          secondary: entry.secondary,
          modifier: entry.modifier,
          total: entry.total,
          critical: entry.critical,
          label,
          timestamp: baseTimestamp + index,
          notation,
          mode,
        });
      }
      this.history = clampHistory([...this.history, ...historyEntries]);
      this.persistState();
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Unable to roll dice.';
    }
    this.update();
  }

  private removeFavorite(id: string): void {
    this.favorites = this.favorites.filter((favorite) => favorite.id !== id);
    this.persistState();
    this.update();
  }

  private saveFavorite(event: Event): void {
    event.preventDefault();
    const name = this.favoriteName.trim();
    if (!name) {
      this.error = 'Name your favorite roll to save it.';
      this.update();
      return;
    }
    try {
      parseNotation(this.notation);
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Invalid dice notation.';
      this.update();
      return;
    }
    const favorite: DiceFavorite = {
      id: generateId(),
      name,
      notation: this.notation.trim(),
      modifier: this.modifier,
      mode: this.mode,
    };
    this.favorites = [...this.favorites, favorite];
    this.favoriteName = '';
    this.persistState();
    this.update();
  }

  private quickRollFavorite(favorite: DiceFavorite): void {
    this.executeRoll(favorite.notation, favorite.modifier, favorite.mode, 1, favorite.name);
  }

  private clearHistory(): void {
    if (this.history.length === 0) return;
    this.history = [];
    this.persistState();
    this.update();
  }

  private describeRoll(entry: RollBreakdown): string {
    const diceDescription = `${entry.notation}${entry.mode === 'normal' ? '' : ` (${entry.mode})`}`;
    if (entry.modifier === 0) {
      return diceDescription;
    }
    const sign = entry.modifier > 0 ? '+' : '-';
    return `${diceDescription} ${sign} ${Math.abs(entry.modifier)}`;
  }

  private formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }

  private renderHistory(): unknown {
    if (this.history.length === 0) {
      return html`<p class="empty">No rolls yet. Forge your fate!</p>`;
    }
    const reversed = [...this.history].reverse();
    return html`
      <ul class="history-list">
        ${reversed.map(
          (entry) => html`
            <li>
              <header>
                <div>
                  <strong>${entry.label ?? this.describeRoll(entry)}</strong>
                  <span class="timestamp">${this.formatTimestamp(entry.timestamp)}</span>
                </div>
                <span class="total ${entry.critical ?? ''}">${entry.total}</span>
              </header>
              <div class="details">
                <span class="dice">${entry.dice.join(', ')}</span>
                ${entry.modifier !== 0
                  ? html`<span class="modifier">${entry.modifier >= 0 ? '+' : ''}${
                      entry.modifier
                    }</span>`
                  : null}
                ${entry.mode !== 'normal' ? html`<span class="mode">${entry.mode}</span>` : null}
              </div>
            </li>
          `,
        )}
      </ul>
    `;
  }

  private renderFavorites(): unknown {
    if (this.favorites.length === 0) {
      return html`<p class="empty">Save frequently used rolls to access them in a tap.</p>`;
    }
    return html`
      <ul class="favorites">
        ${this.favorites.map(
          (favorite) => html`
            <li>
              <button
                type="button"
                class="favorite-roll"
                @click=${() => this.quickRollFavorite(favorite)}
              >
                <span class="name">${favorite.name}</span>
                <span class="notation">${favorite.notation}</span>
                ${favorite.modifier !== 0
                  ? html`<span class="bonus">${favorite.modifier >= 0 ? '+' : ''}${
                      favorite.modifier
                    }</span>`
                  : null}
                ${favorite.mode !== 'normal'
                  ? html`<span class="mode">${favorite.mode}</span>`
                  : null}
              </button>
              <button type="button" class="remove" @click=${() => this.removeFavorite(favorite.id)}>
                ✕
              </button>
            </li>
          `,
        )}
      </ul>
    `;
  }

  private update(): void {
    if (!this.shadowRoot) return;
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            border-radius: 16px;
            background: rgba(24, 18, 36, 0.8);
            padding: 1.25rem;
            color: inherit;
            box-shadow: 0 18px 34px rgba(0, 0, 0, 0.35);
          }

          h2 {
            margin: 0 0 0.75rem;
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
            letter-spacing: 0.06em;
          }

          .subtitle {
            margin: 0 0 1rem;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.72);
          }

          form.roll {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
            align-items: end;
            margin-bottom: 1rem;
          }

          label {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            font-size: 0.85rem;
          }

          input,
          select {
            border-radius: 10px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(12, 10, 22, 0.85);
            color: inherit;
            padding: 0.65rem 0.75rem;
          }

          .actions {
            display: flex;
            gap: 0.5rem;
          }

          button {
            border-radius: 10px;
            border: 1px solid rgba(240, 179, 90, 0.45);
            background: linear-gradient(90deg, rgba(240, 179, 90, 0.9), rgba(242, 125, 114, 0.9));
            color: #1b0f22;
            font-family: 'Cinzel', serif;
            font-size: 0.9rem;
            letter-spacing: 0.04em;
            cursor: pointer;
            padding: 0.6rem 0.9rem;
            transition: transform 120ms ease;
          }

          button:hover {
            transform: translateY(-1px);
          }

          button.secondary {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 210, 164, 0.18);
            color: inherit;
            font-family: inherit;
            letter-spacing: 0.02em;
          }

          button[disabled] {
            opacity: 0.55;
            cursor: not-allowed;
            transform: none;
          }

          button.secondary[disabled] {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 210, 164, 0.1);
          }

          .error {
            background: rgba(242, 125, 114, 0.18);
            border: 1px solid rgba(242, 125, 114, 0.4);
            border-radius: 12px;
            padding: 0.65rem 0.85rem;
            font-size: 0.85rem;
            margin-bottom: 0.75rem;
          }

          .history {
            margin-top: 1.25rem;
          }

          .history header,
          .favorites header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.5rem;
          }

          .history-list,
          .favorites {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.65rem;
          }

          .history-list li,
          .favorites li {
            background: rgba(32, 24, 44, 0.85);
            border: 1px solid rgba(255, 210, 164, 0.12);
            border-radius: 14px;
            padding: 0.75rem 0.85rem;
          }

          .history-list li header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.9rem;
          }

          .history-list li header strong {
            font-weight: 600;
          }

          .history-list .timestamp {
            display: inline-block;
            margin-left: 0.45rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.6);
          }

          .history-list .total {
            font-family: 'Cinzel', serif;
            font-size: 1.15rem;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            background: rgba(240, 179, 90, 0.18);
            border: 1px solid rgba(240, 179, 90, 0.45);
          }

          .history-list .total.success {
            background: rgba(123, 231, 165, 0.18);
            border-color: rgba(123, 231, 165, 0.45);
          }

          .history-list .total.failure {
            background: rgba(242, 125, 114, 0.18);
            border-color: rgba(242, 125, 114, 0.45);
          }

          .history-list .details {
            display: flex;
            gap: 0.65rem;
            flex-wrap: wrap;
            margin-top: 0.4rem;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.75);
          }

          .history-list .details .secondary {
            background: rgba(106, 192, 255, 0.18);
            border-radius: 999px;
            padding: 0.1rem 0.45rem;
            font-size: 0.75rem;
            letter-spacing: 0.06em;
          }

          .history-list .mode {
            text-transform: capitalize;
            background: rgba(106, 192, 255, 0.16);
            padding: 0.1rem 0.5rem;
            border-radius: 999px;
          }

          .favorites li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
          }

          .favorite-roll {
            flex: 1;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, max-content));
            gap: 0.35rem;
            align-items: center;
            justify-content: start;
            background: rgba(240, 179, 90, 0.1);
            border: 1px solid rgba(240, 179, 90, 0.35);
            color: inherit;
          }

          .favorite-roll .name {
            font-weight: 600;
          }

          .favorite-roll .notation,
          .favorite-roll .bonus,
          .favorite-roll .mode {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: rgba(255, 255, 255, 0.75);
          }

          .favorite-roll .mode {
            background: rgba(106, 192, 255, 0.18);
            padding: 0.1rem 0.45rem;
            border-radius: 999px;
          }

          .favorites .remove {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background: rgba(242, 125, 114, 0.15);
            border: 1px solid rgba(242, 125, 114, 0.4);
            color: rgba(242, 125, 114, 0.95);
            font-size: 0.85rem;
            display: grid;
            place-items: center;
          }

          .favorites header button,
          .history header button {
            font-size: 0.75rem;
            padding: 0.45rem 0.7rem;
          }

          .empty {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.65);
          }
        </style>
        <h2>Dice Workbench</h2>
        <p class="subtitle">
          Craft intricate rolls, store your go-to tests, and keep an audit of fate's whims.
        </p>
        ${this.error ? html`<div class="error">${this.error}</div>` : null}
        <form class="roll" @submit=${(event: Event) => this.handleRoll(event)}>
          <label>
            Notation
            <input
              name="notation"
              .value=${this.notation}
              @input=${(event: Event) =>
                this.setNotation((event.currentTarget as HTMLInputElement).value)}
              placeholder="2d6+1"
            />
          </label>
          <label>
            Bonus
            <input
              type="number"
              name="bonus"
              .value=${this.modifier}
              @input=${(event: Event) =>
                this.setModifier(Number((event.currentTarget as HTMLInputElement).value))}
            />
          </label>
          <label>
            Times
            <input
              type="number"
              min="1"
              name="count"
              .value=${this.rollCount}
              @input=${(event: Event) =>
                this.setRollCount(Number((event.currentTarget as HTMLInputElement).value))}
            />
          </label>
          <label>
            Mode
            <select
              name="mode"
              .value=${this.mode}
              @change=${(event: Event) =>
                this.setMode((event.currentTarget as HTMLSelectElement).value as DiceMode)}
            >
              <option value="normal">Normal</option>
              <option value="advantage">Advantage</option>
              <option value="disadvantage">Disadvantage</option>
            </select>
          </label>
          <div class="actions">
            <button type="submit">Roll</button>
            <button
              type="button"
              class="secondary"
              ?disabled=${this.history.length === 0}
              @click=${() => this.clearHistory()}
            >
              Clear Log
            </button>
          </div>
        </form>
        <form class="roll" @submit=${(event: Event) => this.saveFavorite(event)}>
          <label>
            Favorite name
            <input
              name="favorite"
              placeholder="Sneak attack"
              .value=${this.favoriteName}
              @input=${(event: Event) =>
                this.setFavoriteName((event.currentTarget as HTMLInputElement).value)}
            />
          </label>
          <div class="actions">
            <button type="submit">Save Favorite</button>
          </div>
        </form>
        <section class="favorites">
          <header>
            <h3>Quick Favorites</h3>
            <button
              type="button"
              class="secondary"
              ?disabled=${this.favorites.length === 0}
              @click=${() => {
                if (this.favorites.length === 0) return;
                this.favorites = [];
                this.persistState();
                this.update();
              }}
            >
              Clear Favorites
            </button>
          </header>
          ${this.renderFavorites()}
        </section>
        <section class="history">
          <header>
            <h3>Roll History</h3>
          </header>
          ${this.renderHistory()}
        </section>
      `,
      this.shadowRoot,
    );
  }
}

customElements.define('dd-dice-workbench', DDDiceWorkbench);
