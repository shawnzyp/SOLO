import { html, render } from 'lit-html';
import type { Hero } from '../systems/types';
import { SKILLS } from '../systems/types';

export class DDCharacterSheet extends HTMLElement {
  private hero: Hero | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(hero: Hero | null) {
    this.hero = hero;
    this.update();
  }

  private update(): void {
    if (!this.shadowRoot) return;
    const hero = this.hero;
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
          .factions {
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
        </style>
        ${hero
          ? html`
              <div class="identity">
                <div
                  class="portrait"
                  style="background-image: url('${hero.portrait ||
                    'https://avatars.dicebear.com/api/adventurer/dd-hero.svg'}');"
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
                  ${SKILLS.map(
                    (skill) => html`
                      <li>
                        <span>${skill.label}</span>
                        <strong>${hero.skills[skill.id] >= 0 ? '+' : ''}${hero.skills[skill.id]}</strong>
                      </li>
                    `,
                  )}
                </ul>
              </section>
              <section class="inventory">
                <div class="section-title">Inventory</div>
                <ul>
                  ${hero.inventory.length > 0
                    ? hero.inventory.map(
                        (item) => html`
                          <li>
                            <span>${item.name}</span>
                            <span>${item.type}</span>
                          </li>
                        `,
                      )
                    : html`<li><span>Empty pack</span><span></span></li>`}
                </ul>
              </section>
            `
          : html`<p>Create your hero to reveal their legend.</p>`}
      `,
      this.shadowRoot,
    );
  }
}

customElements.define('dd-character-sheet', DDCharacterSheet);
