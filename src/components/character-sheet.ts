import { html, render } from 'lit-html';
import type { Hero, FactionStanding, Achievement, InventoryItem } from '../systems/types';
import { SKILLS } from '../systems/types';

interface CharacterSheetData {
  hero: Hero | null;
  factions?: FactionStanding[];
  achievements?: Achievement[];
}

export class DDCharacterSheet extends HTMLElement {
  private hero: Hero | null = null;
  private factions: FactionStanding[] = [];
  private achievements: Achievement[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(payload: CharacterSheetData) {
    this.hero = payload.hero;
    this.factions = payload.factions ?? [];
    this.achievements = payload.achievements ?? [];
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    const hero = this.hero;
    const factions = this.factions;
    const achievements = this.achievements;
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(16, 12, 24, 0.75);
            border-radius: 20px;
            padding: 1.25rem;
            color: inherit;
            backdrop-filter: blur(8px);
            max-height: 90vh;
            overflow-y: auto;
          }

          h2 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.35rem;
            letter-spacing: 0.05em;
          }

          .identity {
            display: flex;
            gap: 1rem;
            align-items: center;
            margin-bottom: 1rem;
          }

          .portrait {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border: 2px solid rgba(240, 179, 90, 0.65);
            background-size: cover;
            background-position: center;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .stat-card {
            background: rgba(32, 24, 44, 0.85);
            border: 1px solid rgba(255, 210, 164, 0.15);
            border-radius: 12px;
            padding: 0.5rem;
            text-align: center;
          }

          .stat-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            color: var(--dd-muted);
            letter-spacing: 0.05em;
          }

          .stat-value {
            font-size: 1.2rem;
            font-weight: 700;
          }

          .hp-bar,
          .ac {
            margin-bottom: 1rem;
          }

          .hp-track {
            height: 12px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 999px;
            overflow: hidden;
          }

          .hp-fill {
            height: 100%;
            background: linear-gradient(90deg, #f27d72, #f0b35a);
          }

          .skills,
          .inventory,
          .factions,
          .achievements {
            margin-bottom: 1.5rem;
          }

          .section-title {
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          li {
            display: flex;
            justify-content: space-between;
            padding: 0.35rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 0.9rem;
          }

          .inventory li {
            align-items: flex-start;
            gap: 0.75rem;
          }

          .inventory .item-details {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            flex: 1;
          }

          .inventory .item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 0.5rem;
          }

          .inventory .item-type {
            font-size: 0.75rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
          }

          .inventory .item-description {
            margin: 0;
            color: rgba(255, 255, 255, 0.85);
            font-size: 0.85rem;
            line-height: 1.4;
          }

          .inventory .item-bonus,
          .inventory .item-charges {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: rgba(240, 179, 90, 0.85);
          }

          .inventory .item-charges {
            color: rgba(255, 255, 255, 0.65);
          }

          .inventory .use-button {
            align-self: center;
            background: rgba(240, 179, 90, 0.2);
            border: 1px solid rgba(240, 179, 90, 0.6);
            border-radius: 999px;
            color: inherit;
            padding: 0.25rem 0.85rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            cursor: pointer;
            transition: background 150ms ease, transform 150ms ease;
          }

          .inventory .use-button:hover:not([disabled]) {
            background: rgba(240, 179, 90, 0.35);
            transform: translateY(-1px);
          }

          .inventory .use-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .faction-bar {
            width: 100%;
            height: 6px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.08);
            overflow: hidden;
            margin-top: 0.35rem;
          }

          .faction-fill {
            height: 100%;
            background: linear-gradient(90deg, #6ac0ff, #f0b35a);
          }

          .achievements ul {
            display: grid;
            gap: 0.65rem;
          }

          .achievements li {
            flex-direction: column;
            align-items: flex-start;
            border-bottom: none;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.75rem;
            border-radius: 12px;
          }

          .achievements time {
            font-size: 0.75rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.65);
          }
        </style>
        ${hero
          ? html`
              <div class="identity">
                <div
                  class="portrait"
                  style="background-image: url('${
                    hero.portrait || 'https://api.dicebear.com/7.x/adventurer/svg?seed=dd-hero'
                  }');"
                ></div>
                <div>
                  <h2>${hero.name}</h2>
                  <p>${hero.race} ${hero.heroClass.name} · Level ${hero.level}</p>
                  <p>${hero.background.name}</p>
                </div>
              </div>
              <div class="hp-bar">
                <div class="section-title">Vitality</div>
                <div>${hero.currentHP} / ${hero.maxHP} HP · AC ${hero.armorClass}</div>
                <div class="hp-track">
                  <div class="hp-fill" style="width: ${(hero.currentHP / hero.maxHP) * 100}%"></div>
                </div>
              </div>
              <div class="stats-grid">
                ${Object.entries(hero.attributes).map(
                  ([key, value]) => html`
                    <div class="stat-card">
                      <div class="stat-label">${key}</div>
                      <div class="stat-value">${value}</div>
                    </div>
                  `,
                )}
              </div>
              <section class="skills">
                <div class="section-title">Skills</div>
                <ul>
                  ${SKILLS.map((skill) => {
                    const value = hero.skills[skill.id] ?? 0;
                    return html`
                      <li>
                        <span>${skill.label}</span>
                        <strong>${value >= 0 ? '+' : ''}${value}</strong>
                      </li>
                    `;
                  })}
                </ul>
              </section>
              <section class="inventory">
                <div class="section-title">Inventory</div>
                <ul>
                  ${hero.inventory.length > 0
                    ? hero.inventory.map(
                        (item) => html`
                          <li>
                            <div class="item-details">
                              <div class="item-header">
                                <strong>${item.name}</strong>
                                <span class="item-type">
                                  ${(item.type.charAt(0).toUpperCase() + item.type.slice(1)).replace(/-/g, ' ')}
                                </span>
                              </div>
                              <p class="item-description">${item.description}</p>
                              ${item.bonus
                                ? html`<div class="item-bonus">
                                    Bonus:
                                    ${item.bonus.ability
                                      ? html`${item.bonus.ability
                                            .charAt(0)
                                            .toUpperCase()}${item.bonus.ability.slice(1)} +${item.bonus.value}`
                                      : html`+${item.bonus.value}`}
                                  </div>`
                                : null}
                              ${typeof item.charges === 'number'
                                ? html`<div class="item-charges">
                                    Charges: ${Math.max(0, item.charges)}
                                    ${typeof item.maxCharges === 'number'
                                      ? html`<span> / ${item.maxCharges}</span>`
                                      : null}
                                  </div>`
                                : null}
                            </div>
                            ${item.type === 'consumable'
                              ? html`<button
                                  type="button"
                                  class="use-button"
                                  ?disabled=${typeof item.charges === 'number' && item.charges <= 0}
                                  @click=${() => this.handleUseItem(item)}
                                >
                                  Use
                                </button>`
                              : null}
                          </li>
                        `,
                      )
                    : html`<li><span>Empty pack</span><span></span></li>`}
                </ul>
                <p>Gold: ${hero.gold}</p>
              </section>
              <section class="factions">
                <div class="section-title">Factions</div>
                <ul>
                  ${factions.length > 0
                    ? factions.map(
                        (faction) => html`
                          <li title=${faction.description}>
                            <div>
                              <strong>${faction.name}</strong>
                          <div class="faction-bar">
                            <div
                              class="faction-fill"
                              style="width: ${this.factionWidth(faction.value)}%"
                            ></div>
                          </div>
                        </div>
                        <span>${faction.value}</span>
                          </li>
                        `,
                      )
                    : html`<li><span>Unknown allegiances</span><span></span></li>`}
                </ul>
              </section>
              <section class="achievements">
                <div class="section-title">Achievements</div>
                <ul>
                  ${achievements.length > 0
                    ? achievements.map(
                        (achievement) => html`
                          <li>
                            <div><strong>${achievement.title}</strong></div>
                            <div>${achievement.description}</div>
                            <time>${new Date(achievement.unlockedAt).toLocaleString()}</time>
                          </li>
                        `,
                      )
                    : html`<li>
                        <div><strong>No achievements unlocked yet.</strong></div>
                        <div>Forge your legend to earn renown.</div>
                      </li>`}
                </ul>
              </section>
            `
          : html`<p>Create your hero to reveal their legend.</p>`}
      `,
      this.shadowRoot,
    );
  }

  private factionWidth(value: number): number {
    const min = -10;
    const max = 10;
    const clamped = Math.max(min, Math.min(max, value));
    return ((clamped - min) / (max - min)) * 100;
  }

  private handleUseItem(item: InventoryItem): void {
    if (!item) return;
    this.dispatchEvent(
      new CustomEvent('inventory-use', {
        detail: { itemId: item.id },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define('dd-character-sheet', DDCharacterSheet);
