import { WorldComponent } from './world-component';

function formatModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export class CharacterSheet extends WorldComponent {
  connectedCallback(): void {
    if (!this.isConnected) return;
    if (!this.hasChildNodes()) {
      this.innerHTML = `
        <h2>Character</h2>
        <div class="summary"></div>
        <div class="hp"></div>
        <div class="attributes"></div>
        <div class="skills"></div>
        <div class="factions"></div>
        <div class="inventory"></div>
        <div class="achievement-list"></div>
      `;
    }
    super.connectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const { character, achievements } = this.state;
    const summaryEl = this.querySelector('.summary') as HTMLElement | null;
    const hpEl = this.querySelector('.hp') as HTMLElement | null;
    const attributesEl = this.querySelector('.attributes') as HTMLElement | null;
    const skillsEl = this.querySelector('.skills') as HTMLElement | null;
    const factionsEl = this.querySelector('.factions') as HTMLElement | null;
    const inventoryEl = this.querySelector('.inventory') as HTMLElement | null;
    const achievementEl = this.querySelector('.achievement-list') as HTMLElement | null;
    if (!summaryEl || !hpEl || !attributesEl || !skillsEl || !factionsEl || !inventoryEl || !achievementEl) return;

    summaryEl.innerHTML = `
      <div><strong>${character.name}</strong><br/>${character.race} ${character.class}</div>
      <div><span>Background</span><br/>${character.background}</div>
      <div><span>Level</span><br/>${character.level}</div>
      <div><span>Experience</span><br/>${character.experience}</div>
    `;

    const hpPercent = Math.max(0, Math.min(100, Math.round((character.hp.current / character.hp.max) * 100)));
    hpEl.innerHTML = `
      <div>HP ${character.hp.current} / ${character.hp.max} · AC ${character.ac}</div>
      <div class="hp-bar"><span style="width:${hpPercent}%"></span></div>
    `;

    const attributes = Object.entries(character.attributes)
      .map(
        ([key, value]) => `
        <div class="attribute">
          <span class="name">${key.slice(0, 3).toUpperCase()}</span>
          <span class="score">${value}</span>
          <span class="mod">${formatModifier(value)}</span>
        </div>
      `,
      )
      .join('');
    attributesEl.innerHTML = attributes;

    const skills = Object.entries(character.skills)
      .map(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1');
        return `<span><span>${label}</span><span>${value >= 0 ? '+' : ''}${value}</span></span>`;
      })
      .join('');
    skillsEl.innerHTML = skills;

    const factions = Object.entries(character.factions)
      .map(([name, value]) => `<span>${name}: <strong>${value >= 0 ? '+' : ''}${value}</strong></span>`)
      .join(' · ');
    factionsEl.innerHTML = `<h3>Factions</h3><div>${factions}</div>`;

    const inventory = character.inventory
      .map(
        (item) => `
        <div>
          <strong>${item.name}</strong> x${item.quantity}<br/>
          <span>${item.description}${item.bonus ? ` · ${item.bonus}` : ''}</span>
        </div>
      `,
      )
      .join('');
    inventoryEl.innerHTML = `<h3>Inventory</h3><div>${inventory}</div>`;

    const unlocked = achievements.filter((entry) => entry.unlockedAt).map((entry) => `<li>${entry.icon} ${entry.name}</li>`);
    achievementEl.innerHTML = `<h3>Badges</h3><ul>${unlocked.join('') || '<li>No new badges yet.</li>'}</ul>`;
  }
}

customElements.define('dd-character-sheet', CharacterSheet);
