import { World } from '../game/world';
import { Soundscape } from '../game/soundscape';
import { WorldComponent } from './world-component';

export class CombatHud extends WorldComponent {
  connectedCallback(): void {
    if (!this.isConnected) return;
    if (!this.hasChildNodes()) {
      this.innerHTML = `
        <div class="unit hero">
          <div>
            <strong class="name"></strong>
            <div class="stats"></div>
          </div>
          <span class="portrait"></span>
        </div>
        <div class="bar hero-bar"><span></span></div>
        <div class="unit enemy">
          <div>
            <strong class="enemy-name"></strong>
            <div class="enemy-stats"></div>
          </div>
          <span class="enemy-portrait"></span>
        </div>
        <div class="bar enemy-bar"><span></span></div>
        <div class="actions">
          <button data-action="attack">Attack</button>
          <button data-action="defend">Defend</button>
          <button data-action="use-item">Use Item</button>
          <button data-action="flee">Flee</button>
        </div>
        <div class="log"></div>
      `;
    }
    this.classList.add('combat-hud');
    this.querySelectorAll('button').forEach((button) =>
      button.addEventListener('click', () => this.handleAction(button.getAttribute('data-action') ?? '')),
    );
    super.connectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const { combat } = this.state;
    if (!combat.active) {
      this.classList.remove('active');
      return;
    }
    this.classList.add('active');
    const heroName = this.querySelector('.name');
    const heroStats = this.querySelector('.stats');
    const heroPortrait = this.querySelector('.portrait');
    const heroBar = this.querySelector('.hero-bar span') as HTMLElement | null;
    const enemyName = this.querySelector('.enemy-name');
    const enemyStats = this.querySelector('.enemy-stats');
    const enemyPortrait = this.querySelector('.enemy-portrait');
    const enemyBar = this.querySelector('.enemy-bar span') as HTMLElement | null;
    const logContainer = this.querySelector('.log');
    if (!heroName || !heroStats || !heroPortrait || !heroBar || !enemyName || !enemyStats || !enemyPortrait || !enemyBar || !logContainer) return;

    heroName.textContent = combat.hero.name;
    heroStats.textContent = `HP ${combat.hero.hp.current} / ${combat.hero.hp.max} · AC ${combat.hero.ac}`;
    heroPortrait.textContent = combat.hero.portrait;
    const heroPercent = Math.max(0, Math.min(100, Math.round((combat.hero.hp.current / combat.hero.hp.max) * 100)));
    heroBar.style.width = `${heroPercent}%`;

    enemyName.textContent = combat.enemy.name;
    enemyStats.textContent = `HP ${combat.enemy.hp.current} / ${combat.enemy.hp.max} · AC ${combat.enemy.ac}`;
    enemyPortrait.textContent = combat.enemy.portrait;
    const enemyPercent = Math.max(0, Math.min(100, Math.round((combat.enemy.hp.current / combat.enemy.hp.max) * 100)));
    enemyBar.style.width = `${enemyPercent}%`;

    logContainer.innerHTML = combat.log
      .slice(-6)
      .map((entry) => `<div>${entry}</div>`)
      .join('');
  }

  private handleAction(action: string) {
    switch (action) {
      case 'attack':
        Soundscape.playCue('combat');
        World.heroAttack();
        break;
      case 'defend':
        World.heroDefend();
        break;
      case 'use-item':
        World.heroUseItem();
        break;
      case 'flee':
        World.heroFlee();
        break;
      default:
        break;
    }
  }
}

customElements.define('dd-combat-hud', CombatHud);
