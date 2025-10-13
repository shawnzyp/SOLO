import { html, render } from 'lit-html';
import type { StoryNodeOrigin } from '../systems/types';

export interface ArcaneStorytellerPanelState {
  busy: boolean;
  status: string;
  error: string | null;
  origin: StoryNodeOrigin | null;
  requestId: string | null;
}

const DEFAULT_STATE: ArcaneStorytellerPanelState = {
  busy: false,
  status: 'Summon the oracle to weave fresh scenes.',
  error: null,
  origin: null,
  requestId: null,
};

interface ArcaneImproviseDetail {
  prompt: string;
  requestId: string;
}

interface ArcaneCancelDetail {
  requestId: string;
}

export class DDArcaneStoryteller extends HTMLElement {
  private state: ArcaneStorytellerPanelState = { ...DEFAULT_STATE };
  private prompt = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(value: ArcaneStorytellerPanelState | null) {
    this.state = value ? { ...DEFAULT_STATE, ...value } : { ...DEFAULT_STATE };
    this.requestRender();
  }

  get data(): ArcaneStorytellerPanelState {
    return this.state;
  }

  connectedCallback(): void {
    this.requestRender();
  }

  disconnectedCallback(): void {
    if (this.shadowRoot) {
      render(html``, this.shadowRoot);
    }
  }

  private requestRender(): void {
    if (!this.shadowRoot) return;
    const { busy, status, error, origin } = this.state;
    const statusTone = error ? 'danger' : busy ? 'info' : origin === 'oracle-llm' ? 'success' : origin ? 'warning' : 'muted';
    const statusLabel = error
      ? 'Conjuration failed'
      : busy
        ? 'Conjuring...'
        : origin === 'oracle-llm'
          ? 'Remote oracle replied'
          : origin === 'oracle-blueprint'
            ? 'Offline oracle replied'
            : 'Idle';

    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1rem 1.25rem 1.25rem;
            background: linear-gradient(180deg, rgba(22, 18, 40, 0.9), rgba(12, 10, 24, 0.94));
            box-shadow: 0 18px 34px rgba(0, 0, 0, 0.35);
          }

          h2 {
            margin: 0 0 0.5rem;
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
            letter-spacing: 0.08em;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          h2 span {
            font-size: 0.9rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: rgba(189, 207, 255, 0.6);
          }

          form {
            display: grid;
            gap: 0.75rem;
          }

          textarea {
            min-height: 90px;
            resize: vertical;
            padding: 0.75rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(10, 8, 22, 0.8);
            color: inherit;
            font: inherit;
            transition: border-color 180ms ease;
          }

          textarea:focus {
            outline: none;
            border-color: rgba(129, 205, 255, 0.75);
            box-shadow: 0 0 0 1px rgba(129, 205, 255, 0.25);
          }

          textarea[disabled] {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .actions {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          button {
            border: none;
            border-radius: 999px;
            padding: 0.5rem 1.1rem;
            font: inherit;
            cursor: pointer;
            transition: transform 120ms ease, box-shadow 120ms ease;
          }

          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .summon {
            background: linear-gradient(90deg, rgba(152, 112, 255, 0.85), rgba(64, 188, 255, 0.85));
            color: #120b1c;
            box-shadow: 0 10px 22px rgba(100, 160, 255, 0.35);
          }

          .summon:not(:disabled):hover {
            transform: translateY(-1px);
            box-shadow: 0 12px 24px rgba(100, 160, 255, 0.45);
          }

          .cancel {
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.12);
          }

          .status {
            border-radius: 12px;
            padding: 0.65rem 0.75rem;
            font-size: 0.85rem;
            display: grid;
            gap: 0.25rem;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }

          .status.muted {
            color: rgba(220, 220, 255, 0.7);
          }

          .status.info {
            color: rgba(130, 200, 255, 0.95);
            border-color: rgba(130, 200, 255, 0.35);
            background: rgba(34, 64, 110, 0.35);
          }

          .status.success {
            color: rgba(173, 255, 211, 0.95);
            border-color: rgba(150, 255, 198, 0.4);
            background: rgba(22, 64, 38, 0.4);
          }

          .status.warning {
            color: rgba(255, 221, 173, 0.95);
            border-color: rgba(255, 198, 143, 0.38);
            background: rgba(64, 50, 24, 0.45);
          }

          .status.danger {
            color: rgba(255, 190, 190, 0.96);
            border-color: rgba(255, 120, 120, 0.45);
            background: rgba(64, 24, 24, 0.45);
          }

          .status small {
            display: block;
            color: rgba(255, 255, 255, 0.65);
          }

          .status strong {
            display: block;
            font-size: 0.8rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .prompt-hint {
            font-size: 0.75rem;
            color: rgba(200, 200, 255, 0.6);
          }
        </style>
        <h2>
          Arcane Storyteller
          <span>Oracle</span>
        </h2>
        <form @submit=${(event: Event) => this.handleSubmit(event)}>
          <label>
            <span class="prompt-hint">Describe the spark you wish the oracle to follow.</span>
            <textarea
              .value=${this.prompt}
              ?disabled=${busy}
              placeholder="Confront the echo left by Archon Pyrel..."
              @input=${(event: Event) => this.handleInput(event)}
            ></textarea>
          </label>
          <div class="actions">
            <button
              type="submit"
              class="summon"
              ?disabled=${busy || this.prompt.trim().length === 0}
            >
              ${busy ? 'Summoning...' : 'Summon Scene'}
            </button>
            <button
              type="button"
              class="cancel"
              ?disabled=${!busy}
              @click=${() => this.handleCancel()}
            >
              Cancel
            </button>
          </div>
          <div class="status ${statusTone}">
            <strong>${statusLabel}</strong>
            <span>${error ?? status}</span>
          </div>
        </form>
      `,
      this.shadowRoot,
    );
  }

  private handleInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement | null;
    if (!target) return;
    this.prompt = target.value;
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    if (this.state.busy) return;
    const trimmed = this.prompt.trim();
    if (!trimmed) return;
    const requestId = `arcane-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    this.dispatchEvent(
      new CustomEvent<ArcaneImproviseDetail>('arcane-improvise', {
        detail: { prompt: trimmed, requestId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleCancel(): void {
    if (!this.state.busy || !this.state.requestId) return;
    this.dispatchEvent(
      new CustomEvent<ArcaneCancelDetail>('arcane-cancel', {
        detail: { requestId: this.state.requestId },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define('dd-arcane-storyteller', DDArcaneStoryteller);
