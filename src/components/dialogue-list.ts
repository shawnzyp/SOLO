import { html, render } from 'lit-html';
import type { StoryChoice } from '../systems/types';

interface DialogueTemplateChoice extends StoryChoice {
  disabled?: boolean;
  skillCheckMeta?: {
    modifier: number;
    successChance: number;
    successPercent: number;
    accessibilityLabel: string;
  };
}

export class DDDialogueList extends HTMLElement {
  private choices: DialogueTemplateChoice[] = [];
  private quickActionsLocked = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  connectedCallback(): void {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  set data(choices: DialogueTemplateChoice[]) {
    this.choices = choices;
    this.update();
  }

  set locked(value: boolean) {
    this.quickActionsLocked = value;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    render(
      html`
        <style>
          :host {
            display: block;
            margin-top: 1.5rem;
          }

          ul {
            list-style: none;
            display: grid;
            gap: 0.75rem;
            padding: 0;
            margin: 0;
          }

          button {
            width: 100%;
            text-align: left;
            padding: 0.9rem 1.25rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.25);
            background: rgba(25, 18, 35, 0.8);
            color: inherit;
            font-size: 1rem;
            letter-spacing: 0.01em;
            cursor: pointer;
            transition: transform 150ms ease, box-shadow 200ms ease, border 150ms ease;
            position: relative;
            overflow: hidden;
          }

          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
            border-color: rgba(240, 179, 90, 0.8);
          }

          button:active {
            transform: scale(0.99);
          }

          button[disabled] {
            opacity: 0.6;
            cursor: not-allowed;
            filter: grayscale(50%);
            border-color: rgba(255, 210, 164, 0.12);
          }

          .lock-banner {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.22);
            background: rgba(12, 8, 20, 0.8);
            color: rgba(255, 255, 255, 0.72);
            font-size: 0.85rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .lock-banner span {
            font-family: 'Cinzel', serif;
            color: rgba(240, 179, 90, 0.9);
            letter-spacing: 0.08em;
          }

          .hotkey {
            font-family: 'Cinzel', serif;
            font-size: 0.85rem;
            margin-right: 0.75rem;
            color: var(--dd-accent-strong);
          }

          .description {
            margin-top: 0.25rem;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }

          .meta,
          .locked {
            margin-top: 0.4rem;
            font-size: 0.75rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .meta {
            color: rgba(255, 255, 255, 0.65);
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .locked {
            color: rgba(255, 180, 180, 0.85);
          }

          .check-summary {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
          }

          .check-odds {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.1rem 0.4rem;
            border-radius: 999px;
            font-weight: 600;
            letter-spacing: 0.02em;
            background: rgba(255, 255, 255, 0.12);
            color: rgba(255, 255, 255, 0.85);
          }

          .check-odds.high {
            background: rgba(46, 204, 113, 0.18);
            color: #a7f3c7;
          }

          .check-odds.medium {
            background: rgba(241, 196, 15, 0.2);
            color: #fbe39a;
          }

          .check-odds.low {
            background: rgba(231, 76, 60, 0.22);
            color: #f5b1a7;
          }

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
            white-space: nowrap;
          }
        </style>
        ${this.quickActionsLocked
          ? html`<div class="lock-banner" role="status">
              <span aria-hidden="true">⌛</span>
              Await the Dungeon Master’s narration…
            </div>`
          : null}
        <ul>
          ${this.choices.map((choice, index) => {
            const hotkey = String(index + 1);
            const oddsTone =
              choice.skillCheckMeta && typeof choice.skillCheckMeta.successChance === 'number'
                ? this.describeOddsTone(choice.skillCheckMeta.successChance)
                : null;
            const oddsClass = ['check-odds', oddsTone].filter(Boolean).join(' ');
            const modifierLabel =
              choice.skillCheckMeta && typeof choice.skillCheckMeta.modifier === 'number'
                ? `${choice.skillCheckMeta.modifier >= 0 ? '+' : ''}${choice.skillCheckMeta.modifier}`
                : null;
            const abilityLabel = choice.skillCheck
              ? this.toTitle(choice.skillCheck.ability)
              : null;
            const skillLabel =
              choice.skillCheck && choice.skillCheck.skill
                ? this.toTitle(choice.skillCheck.skill)
                : null;
            const checkLabel = abilityLabel
              ? skillLabel
                ? `${abilityLabel} (${skillLabel})`
                : abilityLabel
              : null;
            return html`
              <li>
                <button
                  ?disabled=${choice.disabled || this.quickActionsLocked}
                  @click=${() => this.select(choice)}
                  data-choice-id=${choice.id}
                >
                  <span class="hotkey">[${hotkey}]</span>
                  <span class="text">${choice.text}</span>
                  ${choice.description
                    ? html`<div class="description">${choice.description}</div>`
                    : null}
                  ${choice.skillCheck
                    ? html`<div class="meta">
                        <span class="check-summary">
                          ${checkLabel ?? 'Skill'} Check · DC
                          ${choice.skillCheck.difficultyClass}
                          ${choice.skillCheck.flavor ? html`· ${choice.skillCheck.flavor}` : null}
                        </span>
                        ${choice.skillCheckMeta
                          ? html`<span
                              class=${oddsClass}
                              aria-label=${choice.skillCheckMeta.accessibilityLabel}
                              title=${modifierLabel ? `Modifier ${modifierLabel}` : ''}
                            >
                              ${choice.skillCheckMeta.successPercent}%
                              <span class="sr-only">${choice.skillCheckMeta.accessibilityLabel}</span>
                            </span>`
                          : null}
                      </div>`
                    : null}
                  ${choice.disabled
                    ? html`<div class="locked">${this.describeRequirements(choice)}</div>`
                    : null}
                </button>
              </li>
            `;
          })}
        </ul>
      `,
      this.shadowRoot,
    );
  }

  private describeRequirements(choice: DialogueTemplateChoice): string {
    if (!choice.requirements || choice.requirements.length === 0) {
      return 'Unavailable right now.';
    }
    const segments = choice.requirements.map((requirement) => {
      const operator = this.describeOperator(requirement.operator);
      switch (requirement.type) {
        case 'faction':
          return `Reputation with ${this.toTitle(requirement.id)} ${operator} ${requirement.value}`;
        case 'quest':
          return `Quest “${this.toTitle(requirement.id)}” ${String(requirement.value).toUpperCase()}`;
        case 'attribute':
          return `${requirement.id.toUpperCase()} ${operator} ${requirement.value}`;
        case 'item':
          return `Requires ${this.toTitle(requirement.id)}`;
        case 'skill':
          return `${this.toTitle(requirement.id)} ${operator} ${requirement.value}`;
        default:
          return 'Unavailable';
      }
    });
    return segments.join(' · ');
  }

  private describeOddsTone(chance: number): 'high' | 'medium' | 'low' {
    if (chance >= 0.7) {
      return 'high';
    }
    if (chance >= 0.4) {
      return 'medium';
    }
    return 'low';
  }

  private describeOperator(operator?: NonNullable<DialogueTemplateChoice['requirements']>[number]['operator']): string {
    switch (operator) {
      case 'gt':
        return '>';
      case 'gte':
      case undefined:
        return '≥';
      case 'lt':
        return '<';
      case 'lte':
        return '≤';
      case 'eq':
        return '=';
      default:
        return '≥';
    }
  }

  private toTitle(value: string): string {
    return value
      .split(/[-_]/)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }

  private select(choice: DialogueTemplateChoice): void {
    if (choice.disabled || this.quickActionsLocked) return;
    this.dispatchEvent(
      new CustomEvent('choice-selected', {
        detail: { choice },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (this.quickActionsLocked) return;
    if (event.defaultPrevented) return;
    const keyIndex = Number.parseInt(event.key, 10) - 1;
    if (Number.isNaN(keyIndex)) return;
    const targetChoice = this.choices[keyIndex];
    if (targetChoice) {
      event.preventDefault();
      this.select(targetChoice);
    }
  }
}

customElements.define('dd-dialogue-list', DDDialogueList);
