import { html, render } from 'lit-html';
import type { Ability, Hero } from '../systems/types';
import { SKILLS } from '../systems/types';

type AttackMode = 'normal' | 'advantage' | 'disadvantage';

const ABILITY_LABELS: Record<Ability, string> = {
  strength: 'Strength',
  dexterity: 'Dexterity',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Wisdom',
  charisma: 'Charisma',
};

interface CombatPlannerData {
  hero: Hero | null;
}

interface AttackProbabilityResult {
  hit: number;
  crit: number;
  fumble: number;
}

interface SkillProbabilitySummary {
  id: string;
  label: string;
  ability: Ability;
  modifier: number;
  chance: number;
}

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function roundToPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export class DDCombatPlanner extends HTMLElement {
  private hero: Hero | null = null;
  private selectedAbility: Ability = 'strength';
  private includeProficiency = true;
  private bonus = 0;
  private targetArmorClass = 15;
  private attackMode: AttackMode = 'normal';
  private skillDc = 15;
  private skillMode: AttackMode = 'normal';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.update();
  }

  set data(payload: CombatPlannerData) {
    const previousHeroName = this.hero?.name ?? null;
    this.hero = payload.hero ?? null;
    if (this.hero && (!previousHeroName || previousHeroName !== this.hero.name)) {
      const entries = Object.entries(this.hero.attributes ?? {}) as Array<[Ability, number]>;
      const sorted = entries.sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0));
      if (sorted[0]) {
        this.selectedAbility = sorted[0][0];
      }
      this.includeProficiency = true;
      this.bonus = 0;
      this.targetArmorClass = 15;
      this.skillDc = 15;
      this.attackMode = 'normal';
      this.skillMode = 'normal';
    }
    this.update();
  }

  private setSelectedAbility(ability: Ability): void {
    this.selectedAbility = ability;
    this.update();
  }

  private setIncludeProficiency(include: boolean): void {
    this.includeProficiency = include;
    this.update();
  }

  private setBonus(value: number): void {
    this.bonus = Number.isFinite(value) ? Math.round(value) : 0;
    this.update();
  }

  private setTargetArmorClass(value: number): void {
    this.targetArmorClass = clampNumber(Math.round(value), 5, 30);
    this.update();
  }

  private setAttackMode(mode: AttackMode): void {
    this.attackMode = mode;
    this.update();
  }

  private setSkillDc(value: number): void {
    this.skillDc = clampNumber(Math.round(value), 5, 35);
    this.update();
  }

  private setSkillMode(mode: AttackMode): void {
    this.skillMode = mode;
    this.update();
  }

  private getAbilityModifier(ability: Ability): number {
    const score = this.hero?.attributes?.[ability] ?? 10;
    return Math.floor((Number(score) - 10) / 2);
  }

  private getProficiencyBonus(): number {
    const level = Math.max(1, Number(this.hero?.level ?? 1));
    return Math.floor((level - 1) / 4) + 2;
  }

  private getAttackModifier(): number {
    const abilityModifier = this.getAbilityModifier(this.selectedAbility);
    const proficiency = this.includeProficiency ? this.getProficiencyBonus() : 0;
    return abilityModifier + proficiency + this.bonus;
  }

  private computeAttackProbability(modifier: number, armorClass: number, mode: AttackMode): AttackProbabilityResult {
    const ac = clampNumber(Math.round(armorClass), 5, 35);
    let hit = 0;
    let crit = 0;
    let fumble = 0;
    let total = 0;

    const evaluate = (roll: number) => {
      total += 1;
      if (roll === 20) {
        crit += 1;
        hit += 1;
        return;
      }
      if (roll === 1) {
        fumble += 1;
        return;
      }
      if (roll + modifier >= ac) {
        hit += 1;
      }
    };

    if (mode === 'normal') {
      for (let roll = 1; roll <= 20; roll += 1) {
        evaluate(roll);
      }
    } else {
      for (let first = 1; first <= 20; first += 1) {
        for (let second = 1; second <= 20; second += 1) {
          const selected = mode === 'advantage' ? Math.max(first, second) : Math.min(first, second);
          evaluate(selected);
        }
      }
      total = mode === 'normal' ? total : 400;
    }

    return {
      hit: hit / total,
      crit: crit / total,
      fumble: fumble / total,
    };
  }

  private computeSkillProbability(modifier: number, difficultyClass: number, mode: AttackMode): number {
    const dc = clampNumber(Math.round(difficultyClass), 1, 40);
    let success = 0;
    let total = 0;
    const evaluate = (roll: number) => {
      total += 1;
      if (roll + modifier >= dc) {
        success += 1;
      }
    };

    if (mode === 'normal') {
      for (let roll = 1; roll <= 20; roll += 1) {
        evaluate(roll);
      }
    } else {
      for (let first = 1; first <= 20; first += 1) {
        for (let second = 1; second <= 20; second += 1) {
          const selected = mode === 'advantage' ? Math.max(first, second) : Math.min(first, second);
          evaluate(selected);
        }
      }
      total = mode === 'normal' ? total : 400;
    }

    return success / total;
  }

  private buildSkillSummaries(): SkillProbabilitySummary[] {
    const hero = this.hero;
    return SKILLS.map((skill) => {
      const stored = hero?.skills?.[skill.id];
      const baseModifier = Number.isFinite(stored as number)
        ? Number(stored)
        : this.getAbilityModifier(skill.ability);
      const chance = this.computeSkillProbability(baseModifier, this.skillDc, this.skillMode);
      return {
        id: skill.id,
        label: skill.label,
        ability: skill.ability,
        modifier: baseModifier,
        chance,
      };
    }).sort((a, b) => b.chance - a.chance);
  }

  private computeHeroReadiness(): { label: string; value: string; emphasis: 'steady' | 'caution' | 'danger' }[] {
    const hero = this.hero;
    if (!hero) {
      return [
        { label: 'Armor Class', value: '—', emphasis: 'caution' },
        { label: 'Current Vitality', value: '—', emphasis: 'caution' },
        { label: 'Gold Reserve', value: '—', emphasis: 'caution' },
      ];
    }
    const hpRatio = hero.currentHP / hero.maxHP;
    const hpLabel = `${hero.currentHP} / ${hero.maxHP}`;
    let hpEmphasis: 'steady' | 'caution' | 'danger' = 'steady';
    if (hpRatio < 0.35) {
      hpEmphasis = 'danger';
    } else if (hpRatio < 0.65) {
      hpEmphasis = 'caution';
    }
    return [
      { label: 'Armor Class', value: String(hero.armorClass), emphasis: 'steady' },
      { label: 'Current Vitality', value: hpLabel, emphasis: hpEmphasis },
      { label: 'Gold Reserve', value: `${hero.gold} gp`, emphasis: hero.gold >= 50 ? 'steady' : 'caution' },
    ];
  }

  private formatRollNeeded(modifier: number, armorClass: number): string {
    const target = armorClass - modifier;
    if (target <= 2) {
      return 'Hits on 2+';
    }
    if (target > 20) {
      return 'Needs a natural 20';
    }
    return `Hits on ${Math.ceil(target)}+`;
  }

  private render(): void {
    if (!this.shadowRoot) return;
    const hero = this.hero;
    const attackModifier = this.getAttackModifier();
    const attackOutcome = this.computeAttackProbability(attackModifier, this.targetArmorClass, this.attackMode);
    const skillSummaries = this.buildSkillSummaries();
    const bestSkills = skillSummaries.slice(0, 3);
    const readiness = this.computeHeroReadiness();
    const abilityModifier = this.getAbilityModifier(this.selectedAbility);
    render(
      html`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            border-radius: 16px;
            background: rgba(16, 12, 28, 0.78);
            padding: 1.25rem;
            color: inherit;
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
          }

          h2 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
            letter-spacing: 0.06em;
          }

          .subtitle {
            margin: 0.3rem 0 1rem;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
          }

          .section {
            border: 1px solid rgba(255, 210, 164, 0.15);
            border-radius: 14px;
            padding: 1rem;
            margin-bottom: 1rem;
            background: rgba(28, 20, 44, 0.85);
            display: grid;
            gap: 0.75rem;
          }

          .section header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
          }

          .section header h3 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            letter-spacing: 0.05em;
          }

          form.controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.75rem;
            align-items: end;
          }

          label {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            font-size: 0.8rem;
          }

          input,
          select {
            border-radius: 10px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(12, 9, 22, 0.85);
            color: inherit;
            padding: 0.6rem 0.75rem;
            font-family: inherit;
          }

          .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
          }

          .metric {
            border-radius: 12px;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.06);
            display: grid;
            gap: 0.3rem;
          }

          .metric .label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: rgba(255, 255, 255, 0.7);
          }

          .metric .value {
            font-family: 'Cinzel', serif;
            font-size: 1.15rem;
          }

          .metric .hint {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .skill-table-scroll {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            max-width: 100%;
            min-width: 100%;
          }

          .skill-table {
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.12);
          }

          table {
            width: 100%;
            min-width: 520px;
            border-collapse: collapse;
            background: rgba(8, 6, 18, 0.85);
            border-radius: 12px;
          }

          th,
          td {
            padding: 0.55rem 0.75rem;
            text-align: left;
            font-size: 0.8rem;
          }

          @media (max-width: 640px) {
            :host {
              padding: 1rem;
            }

            .section {
              padding: 0.75rem;
            }

            th,
            td {
              padding: 0.5rem 0.6rem;
              font-size: 0.75rem;
            }

            th {
              font-size: 0.7rem;
            }
          }

          th {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: rgba(255, 255, 255, 0.7);
            background: rgba(255, 255, 255, 0.05);
          }

          tbody tr:nth-child(even) {
            background: rgba(255, 255, 255, 0.04);
          }

          tbody tr.highlight {
            background: rgba(240, 179, 90, 0.18);
          }

          .readiness {
            display: grid;
            gap: 0.5rem;
          }

          .readiness-item {
            border-radius: 10px;
            padding: 0.6rem 0.75rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .readiness-item.steady {
            background: rgba(123, 231, 165, 0.16);
            border: 1px solid rgba(123, 231, 165, 0.3);
          }

          .readiness-item.caution {
            background: rgba(240, 179, 90, 0.16);
            border: 1px solid rgba(240, 179, 90, 0.3);
          }

          .readiness-item.danger {
            background: rgba(242, 125, 114, 0.16);
            border: 1px solid rgba(242, 125, 114, 0.3);
          }

          .placeholder {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.68);
            margin: 0;
          }
        </style>
        <h2>Combat Planner</h2>
        <p class="subtitle">Simulate strikes and skill gambits to stay a step ahead of the Ember Rift.</p>
        ${hero
          ? html`
              <section class="section">
                <header>
                  <h3>Attack Studio</h3>
                  <span>Fine-tune your next decisive blow.</span>
                </header>
                <form class="controls" @submit=${(event: Event) => event.preventDefault()}>
                  <label>
                    Ability Focus
                    <select
                      .value=${this.selectedAbility}
                      @change=${(event: Event) =>
                        this.setSelectedAbility((event.currentTarget as HTMLSelectElement).value as Ability)}
                    >
                      ${(Object.keys(ABILITY_LABELS) as Ability[]).map(
                        (ability) => html`<option value=${ability}>${ABILITY_LABELS[ability]}</option>`,
                      )}
                    </select>
                  </label>
                  <label>
                    Proficiency Bonus
                    <select
                      .value=${this.includeProficiency ? 'yes' : 'no'}
                      @change=${(event: Event) =>
                        this.setIncludeProficiency((event.currentTarget as HTMLSelectElement).value === 'yes')}
                    >
                      <option value="yes">Include (${this.getProficiencyBonus() >= 0 ? `+${this.getProficiencyBonus()}` : this.getProficiencyBonus()})</option>
                      <option value="no">Exclude</option>
                    </select>
                  </label>
                  <label>
                    Magic / Gear Bonus
                    <input
                      type="number"
                      .value=${this.bonus}
                      @input=${(event: Event) =>
                        this.setBonus(Number((event.currentTarget as HTMLInputElement).value))}
                    />
                  </label>
                  <label>
                    Target Armor Class
                    <input
                      type="number"
                      min="5"
                      max="30"
                      .value=${this.targetArmorClass}
                      @input=${(event: Event) =>
                        this.setTargetArmorClass(Number((event.currentTarget as HTMLInputElement).value))}
                    />
                  </label>
                  <label>
                    Advantage State
                    <select
                      .value=${this.attackMode}
                      @change=${(event: Event) =>
                        this.setAttackMode((event.currentTarget as HTMLSelectElement).value as AttackMode)}
                    >
                      <option value="normal">Normal</option>
                      <option value="advantage">Advantage</option>
                      <option value="disadvantage">Disadvantage</option>
                    </select>
                  </label>
                </form>
                <div class="metrics">
                  <div class="metric">
                    <span class="label">Total Attack Bonus</span>
                    <span class="value">${attackModifier >= 0 ? `+${attackModifier}` : attackModifier}</span>
                    <span class="hint">${ABILITY_LABELS[this.selectedAbility]} modifier ${
                      abilityModifier >= 0 ? `+${abilityModifier}` : abilityModifier
                    }</span>
                  </div>
                  <div class="metric">
                    <span class="label">Hit Chance</span>
                    <span class="value">${roundToPercent(attackOutcome.hit)}</span>
                    <span class="hint">${this.formatRollNeeded(attackModifier, this.targetArmorClass)}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Critical Chance</span>
                    <span class="value">${roundToPercent(attackOutcome.crit)}</span>
                    <span class="hint">Natural 20 still triumphs.</span>
                  </div>
                  <div class="metric">
                    <span class="label">Fumble Risk</span>
                    <span class="value">${roundToPercent(attackOutcome.fumble)}</span>
                    <span class="hint">Natural 1 woes.</span>
                  </div>
                </div>
              </section>
              <section class="section">
                <header>
                  <h3>Skill Check Insights</h3>
                  <span>Gauge your odds before rolling in the spotlight.</span>
                </header>
                <form class="controls" @submit=${(event: Event) => event.preventDefault()}>
                  <label>
                    Difficulty Class
                    <input
                      type="number"
                      min="5"
                      max="35"
                      .value=${this.skillDc}
                      @input=${(event: Event) =>
                        this.setSkillDc(Number((event.currentTarget as HTMLInputElement).value))}
                    />
                  </label>
                  <label>
                    Advantage State
                    <select
                      .value=${this.skillMode}
                      @change=${(event: Event) =>
                        this.setSkillMode((event.currentTarget as HTMLSelectElement).value as AttackMode)}
                    >
                      <option value="normal">Normal</option>
                      <option value="advantage">Advantage</option>
                      <option value="disadvantage">Disadvantage</option>
                    </select>
                  </label>
                </form>
                <div class="skill-table-scroll">
                  <div class="skill-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Skill</th>
                          <th>Ability</th>
                          <th>Modifier</th>
                          <th>Success</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${skillSummaries.map((entry, index) => html`
                          <tr class=${index < 3 ? 'highlight' : ''}>
                            <td>${entry.label}</td>
                            <td>${ABILITY_LABELS[entry.ability]}</td>
                            <td>${entry.modifier >= 0 ? `+${entry.modifier}` : entry.modifier}</td>
                            <td>${roundToPercent(entry.chance)}</td>
                          </tr>
                        `)}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p class="subtitle">
                  Highest odds: ${bestSkills
                    .map((entry) => `${entry.label} (${roundToPercent(entry.chance)})`)
                    .join(', ')}.
                </p>
              </section>
              <section class="section">
                <header>
                  <h3>Readiness Snapshot</h3>
                  <span>Keep tabs on survival essentials.</span>
                </header>
                <div class="readiness">
                  ${readiness.map(
                    (entry) => html`
                      <div class="readiness-item ${entry.emphasis}">
                        <span>${entry.label}</span>
                        <strong>${entry.value}</strong>
                      </div>
                    `,
                  )}
                </div>
              </section>
            `
          : html`<p class="placeholder">Forge your hero to unlock tactical forecasts.</p>`}
      `,
      this.shadowRoot,
    );
  }

  private update(): void {
    this.render();
  }
}

customElements.define('dd-combat-planner', DDCombatPlanner);
