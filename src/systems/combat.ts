import { rollD20, rollFromNotation } from './dice';
import type { CombatEncounter } from './types';
import type { Hero } from './types';
import { SafeEventTarget } from './event-target';

export type CombatAction = 'attack' | 'defend' | 'use-item' | 'flee';

export interface CombatLogEntry {
  id: string;
  text: string;
  tone: 'info' | 'success' | 'danger';
}

interface CombatState {
  heroHP: number;
  heroMaxHP: number;
  enemyHP: number;
  enemyMaxHP: number;
  heroTurn: boolean;
  status: 'ongoing' | 'victory' | 'defeat' | 'fled';
  defending: boolean;
  logs: CombatLogEntry[];
}

export interface CombatSnapshot extends CombatState {
  potionAvailable: boolean;
  heroAttackBonus: number;
  enemyArmorClass: number;
  fleeDifficulty: number;
  heroDamageRange: { min: number; max: number };
}

export class CombatSession implements EventTarget {
  private readonly events = new SafeEventTarget();
  private hero: Hero;

  private encounter: CombatEncounter;

  private state: CombatState;

  private potionUsed = false;

  constructor(hero: Hero, encounter: CombatEncounter) {
    this.hero = hero;
    this.encounter = structuredClone(encounter);
    this.state = {
      heroHP: hero.currentHP,
      heroMaxHP: hero.maxHP,
      enemyHP: encounter.enemy.currentHP,
      enemyMaxHP: encounter.enemy.maxHP,
      heroTurn: true,
      status: 'ongoing',
      defending: false,
      logs: [
        {
          id: `intro-${Date.now()}`,
          text: encounter.description,
          tone: 'info',
        },
      ],
    };
  }

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.events.addEventListener(type, listener, options);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ): void {
    this.events.removeEventListener(type, listener, options);
  }

  dispatchEvent(event: Event): boolean {
    return this.events.dispatchEvent(event);
  }

  get snapshot(): CombatSnapshot {
    return {
      ...this.state,
      logs: [...this.state.logs],
      potionAvailable: this.state.status === 'ongoing' && !this.potionUsed,
      heroAttackBonus: this.getHeroAttackModifier(),
      enemyArmorClass: this.encounter.enemy.armorClass,
      fleeDifficulty: this.getFleeDifficulty(),
      heroDamageRange: this.getHeroDamageRange(),
    };
  }

  perform(action: CombatAction): CombatSnapshot {
    if (this.state.status !== 'ongoing') {
      return this.snapshot;
    }

    switch (action) {
      case 'attack':
        this.performAttack();
        break;
      case 'defend':
        this.performDefend();
        break;
      case 'use-item':
        this.performUseItem();
        break;
      case 'flee':
        this.performFlee();
        break;
      default:
        break;
    }

    if (this.state.status === 'ongoing' && !this.state.heroTurn) {
      this.enemyTurn();
    }

    this.emitUpdate();
    return this.snapshot;
  }

  private performAttack(): void {
    const attackModifier = this.getHeroAttackModifier();
    const attackRoll = rollD20(attackModifier);
    const enemyAC = this.encounter.enemy.armorClass;

    if (attackRoll.isCriticalSuccess || attackRoll.total >= enemyAC) {
      const damage = this.getHeroDamage();
      this.state.enemyHP = Math.max(0, this.state.enemyHP - damage);
      this.pushLog(`You strike for ${damage} damage.`, 'success');
      if (this.state.enemyHP <= 0) {
        this.state.status = 'victory';
        this.pushLog(`${this.encounter.enemy.name} is defeated!`, 'success');
      }
    } else if (attackRoll.isCriticalFailure) {
      this.pushLog('Critical miss! You stumble and expose your guard.', 'danger');
    } else {
      this.pushLog('Your attack glances harmlessly off the enemy.', 'info');
    }

    this.state.heroTurn = false;
  }

  private performDefend(): void {
    this.state.defending = true;
    this.pushLog('You raise your defenses, bracing for impact.', 'info');
    this.state.heroTurn = false;
  }

  private performUseItem(): void {
    if (this.potionUsed) {
      this.pushLog('You have no more potions to use this encounter.', 'danger');
      return;
    }
    this.potionUsed = true;
    const heal = 6 + Math.floor((this.hero.attributes.constitution - 10) / 2);
    this.state.heroHP = Math.min(this.state.heroMaxHP, this.state.heroHP + heal);
    this.pushLog(`You quaff a potion and recover ${heal} HP.`, 'success');
    this.state.heroTurn = false;
  }

  private performFlee(): void {
    const escapeRoll = rollD20(this.getHeroMobilityModifier());
    if (escapeRoll.total >= 12 || escapeRoll.isCriticalSuccess) {
      this.state.status = 'fled';
      this.pushLog('You slip away into the shadows.', 'info');
    } else {
      this.pushLog('You fail to escape!', 'danger');
      this.state.heroTurn = false;
    }
  }

  private enemyTurn(): void {
    if (this.state.status !== 'ongoing') {
      return;
    }

    const attackRoll = rollD20(this.encounter.enemy.attackBonus);
    if (attackRoll.isCriticalSuccess || attackRoll.total >= this.getHeroArmorClass()) {
      let damage = rollFromNotation(this.encounter.enemy.damage);
      if (attackRoll.isCriticalSuccess) {
        damage += rollFromNotation(this.encounter.enemy.damage);
      }
      if (this.state.defending) {
        damage = Math.floor(damage / 2);
        this.pushLog('Your guard absorbs part of the blow.', 'info');
      }
      this.state.heroHP = Math.max(0, this.state.heroHP - damage);
      this.pushLog(`The ${this.encounter.enemy.name} hits you for ${damage} damage.`, 'danger');
      if (this.state.heroHP <= 0) {
        this.state.status = 'defeat';
        this.pushLog('You fall unconscious as darkness closes in...', 'danger');
      }
    } else if (attackRoll.isCriticalFailure) {
      this.pushLog(`${this.encounter.enemy.name} fumbles and loses footing.`, 'success');
    } else {
      this.pushLog(`${this.encounter.enemy.name} misses you.`, 'info');
    }

    this.state.defending = false;
    if (this.state.status === 'ongoing') {
      this.state.heroTurn = true;
    }
  }

  private getHeroAttackModifier(): number {
    const primaryAbility = this.hero.heroClass.id === 'rift-mage' ? 'intelligence' : 'strength';
    const finesse = this.hero.heroClass.id === 'blade-dancer';
    if (finesse) {
      return Math.floor((this.hero.attributes.dexterity - 10) / 2) + 2;
    }
    return Math.floor((this.hero.attributes[primaryAbility] - 10) / 2) + 2;
  }

  private getHeroDamage(): number {
    const base = this.hero.heroClass.id === 'rift-mage' ? 8 : 6;
    const modifier = this.hero.heroClass.id === 'blade-dancer'
      ? Math.floor((this.hero.attributes.dexterity - 10) / 2)
      : Math.floor((this.hero.attributes.strength - 10) / 2);
    return Math.max(1, Math.floor(Math.random() * base) + 1 + modifier);
  }

  private getHeroArmorClass(): number {
    return this.hero.armorClass + (this.state.defending ? 2 : 0);
  }

  private getHeroMobilityModifier(): number {
    return Math.floor((this.hero.attributes.dexterity - 10) / 2);
  }

  private getHeroDamageRange(): { min: number; max: number } {
    const base = this.hero.heroClass.id === 'rift-mage' ? 8 : 6;
    const modifier =
      this.hero.heroClass.id === 'blade-dancer'
        ? Math.floor((this.hero.attributes.dexterity - 10) / 2)
        : Math.floor((this.hero.attributes.strength - 10) / 2);
    const min = Math.max(1, 1 + modifier);
    const max = Math.max(1, base + modifier);
    return { min, max };
  }

  private getFleeDifficulty(): number {
    return 12;
  }

  private pushLog(text: string, tone: CombatLogEntry['tone']): void {
    this.state.logs = [
      ...this.state.logs,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        text,
        tone,
      },
    ].slice(-8);
  }

  private emitUpdate(): void {
    this.dispatchEvent(new CustomEvent('update', { detail: this.snapshot }));
  }
}
