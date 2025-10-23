import { rollD20, rollFromNotation } from './dice';
import type { Ability, CombatEncounter, Hero, InventoryItem } from './types';
import { SafeEventTarget } from './event-target';
import { clone } from './clone';

export type CombatAction = 'attack' | 'defend' | 'use-item' | 'flee';

export interface CombatConsumableSnapshot {
  id: string;
  name: string;
  description: string;
  remaining: number;
  max: number;
}

export interface CombatDamageSummary {
  min: number;
  max: number;
  notation: string;
}

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
  heroArmorClass: number;
  heroAttackBonus: number;
  enemyArmorClass: number;
  fleeDifficulty: number;
  heroDamageRange: CombatDamageSummary;
  heroWeaponName: string;
  consumables: CombatConsumableSnapshot[];
}

interface DamageProfile {
  diceCount: number;
  diceSize: number;
  modifier: number;
}

interface WeaponProfile {
  key: string;
  item: InventoryItem | null;
  damage: DamageProfile;
  ability: Ability;
  magicBonus: number;
  label: string;
}

interface ArmorProfile {
  baseArmorClass: number;
  shieldBonus: number;
}

interface ConsumableState {
  key: string;
  item: InventoryItem;
  index: number;
  remaining: number;
  max: number;
  healing?: DamageProfile;
}

export class CombatSession implements EventTarget {
  private readonly events = new SafeEventTarget();
  private hero: Hero;

  private encounter: CombatEncounter;

  private state: CombatState;

  private weapon: WeaponProfile;

  private armor: ArmorProfile;

  private consumables: Map<string, ConsumableState>;

  private proficiencyBonus: number;

  constructor(hero: Hero, encounter: CombatEncounter) {
    this.hero = clone(hero);
    this.encounter = clone(encounter);
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
    this.proficiencyBonus = this.computeProficiency(hero.level ?? 1);
    this.weapon = this.createDefaultWeaponProfile();
    this.armor = { baseArmorClass: this.computeHeroBaseArmor(), shieldBonus: 0 };
    this.consumables = new Map();
    this.analyzeHeroGear();
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
      heroArmorClass: this.getHeroArmorClass(),
      heroAttackBonus: this.getHeroAttackModifier(),
      enemyArmorClass: this.encounter.enemy.armorClass,
      fleeDifficulty: this.getFleeDifficulty(),
      heroDamageRange: this.getHeroDamageRange(),
      heroWeaponName: this.weapon.item?.name ?? this.weapon.label,
      consumables: this.getConsumableSnapshot(),
    };
  }

  perform(action: CombatAction, itemId?: string): CombatSnapshot {
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
        this.performUseItem(itemId);
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

  private performUseItem(itemId?: string): void {
    const available = Array.from(this.consumables.values()).filter((entry) => entry.remaining > 0);
    if (available.length === 0) {
      this.pushLog('You have no consumables ready to use.', 'danger');
      return;
    }

    const consumable = itemId
      ? this.consumables.get(itemId) ?? null
      : available[0];

    if (!consumable || consumable.remaining <= 0) {
      this.pushLog('That item is exhausted.', 'danger');
      return;
    }

    const healAmount = this.resolveConsumableHealing(consumable);
    if (healAmount > 0) {
      this.state.heroHP = Math.min(this.state.heroMaxHP, this.state.heroHP + healAmount);
      this.pushLog(
        `You use ${consumable.item.name} and recover ${healAmount} HP. (${consumable.remaining - 1}/${consumable.max} charges remain)`,
        'success',
      );
    } else {
      this.pushLog(`You use ${consumable.item.name}, but it has no effect.`, 'info');
    }

    consumable.remaining = Math.max(0, consumable.remaining - 1);
    const updatedItem: InventoryItem = {
      ...consumable.item,
      charges: consumable.remaining,
      maxCharges: consumable.max,
    };
    consumable.item = updatedItem;
    this.hero.inventory[consumable.index] = updatedItem;

    if (consumable.remaining === 0) {
      this.pushLog(`${consumable.item.name} is fully expended.`, 'info');
    }

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
    const abilityModifier = this.getAbilityModifier(this.weapon.ability);
    return abilityModifier + this.proficiencyBonus + this.weapon.magicBonus;
  }

  private getHeroDamage(): number {
    const damageProfile = this.getWeaponDamageProfile();
    const notation = this.formatDamageNotation(damageProfile);
    const damage = rollFromNotation(notation);
    return Math.max(1, damage);
  }

  private getHeroArmorClass(): number {
    const defendingBonus = this.state.defending ? 2 : 0;
    return this.armor.baseArmorClass + this.armor.shieldBonus + defendingBonus;
  }

  private getHeroMobilityModifier(): number {
    return this.getAbilityModifier('dexterity');
  }

  private getHeroDamageRange(): CombatDamageSummary {
    const damageProfile = this.getWeaponDamageProfile();
    const min = Math.max(1, damageProfile.diceCount + damageProfile.modifier);
    const max = Math.max(1, damageProfile.diceCount * damageProfile.diceSize + damageProfile.modifier);
    return {
      min,
      max,
      notation: this.formatDamageNotation(damageProfile),
    };
  }

  private getWeaponDamageProfile(): DamageProfile {
    return {
      diceCount: this.weapon.damage.diceCount,
      diceSize: this.weapon.damage.diceSize,
      modifier: this.weapon.damage.modifier + this.getAbilityModifier(this.weapon.ability) + this.weapon.magicBonus,
    };
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
    this.hero.currentHP = this.state.heroHP;
    this.dispatchEvent(new CustomEvent('update', { detail: this.snapshot }));
  }

  private analyzeHeroGear(): void {
    const updatedInventory: InventoryItem[] = [];
    const consumables = new Map<string, ConsumableState>();
    let bestWeapon: WeaponProfile | null = null;
    let baseArmor = Math.max(this.computeHeroBaseArmor(), this.hero.armorClass ?? 0);
    let shieldBonus = 0;

    this.hero.inventory.forEach((item, index) => {
      const key = `${item.id}-${index}`;
      const copy: InventoryItem = { ...item };

      if (item.type === 'weapon') {
        const weaponProfile = this.buildWeaponProfile(copy, key);
        if (!bestWeapon || this.compareWeapons(weaponProfile, bestWeapon) > 0) {
          bestWeapon = weaponProfile;
        }
      }

      if (item.type === 'armor') {
        const armorClass = this.extractArmorClass(copy);
        if (armorClass !== null) {
          baseArmor = Math.max(baseArmor, armorClass);
        } else {
          baseArmor = Math.max(baseArmor, this.computeHeroBaseArmor() + 2);
        }
        if (this.isShield(copy)) {
          shieldBonus = Math.max(shieldBonus, 2);
        }
      }

      if (item.type === 'consumable') {
        const consumableState = this.buildConsumableState(copy, key, index);
        consumables.set(consumableState.key, consumableState);
        copy.charges = consumableState.remaining;
        copy.maxCharges = consumableState.max;
      }

      updatedInventory.push(copy);
    });

    this.hero.inventory = updatedInventory;
    this.consumables = consumables;
    this.weapon = bestWeapon ?? this.createDefaultWeaponProfile();
    this.armor = { baseArmorClass: baseArmor, shieldBonus };
    this.hero.armorClass = baseArmor + shieldBonus;
  }

  private computeHeroBaseArmor(): number {
    return 10 + this.getAbilityModifier('dexterity');
  }

  private createDefaultWeaponProfile(): WeaponProfile {
    const defaultDamage = this.getClassDefaultDamage();
    return {
      key: 'default-weapon',
      item: null,
      damage: defaultDamage,
      ability: this.getDefaultAttackAbility(),
      magicBonus: 0,
      label: 'Unarmed Strike',
    };
  }

  private getClassDefaultDamage(): DamageProfile {
    if (this.hero.heroClass.id === 'rift-mage') {
      return { diceCount: 1, diceSize: 8, modifier: 0 };
    }
    if (this.hero.heroClass.id === 'blade-dancer') {
      return { diceCount: 1, diceSize: 6, modifier: 0 };
    }
    return { diceCount: 1, diceSize: 6, modifier: 0 };
  }

  private getDefaultAttackAbility(): Ability {
    if (this.hero.heroClass.id === 'rift-mage') {
      return 'intelligence';
    }
    if (this.hero.heroClass.id === 'blade-dancer') {
      return 'dexterity';
    }
    return 'strength';
  }

  private buildWeaponProfile(item: InventoryItem, key: string): WeaponProfile {
    const ability = this.inferWeaponAbility(item);
    const damage =
      this.extractDamageProfileFromText(`${item.name} ${item.description}`) ?? this.getClassDefaultDamage();
    const magicBonus =
      item.bonus && (!item.bonus.ability || item.bonus.ability === ability) ? item.bonus.value ?? 0 : 0;
    return {
      key,
      item,
      damage,
      ability,
      magicBonus,
      label: item.name,
    };
  }

  private compareWeapons(candidate: WeaponProfile, current: WeaponProfile): number {
    const candidateAverage = this.computeWeaponAverageDamage(candidate);
    const currentAverage = this.computeWeaponAverageDamage(current);
    if (candidateAverage === currentAverage) {
      return candidate.magicBonus - current.magicBonus;
    }
    return candidateAverage - currentAverage;
  }

  private computeWeaponAverageDamage(profile: WeaponProfile): number {
    const abilityModifier = this.getAbilityModifier(profile.ability);
    const averageDie = profile.damage.diceCount * (profile.damage.diceSize + 1) / 2;
    return averageDie + profile.damage.modifier + abilityModifier + profile.magicBonus;
  }

  private buildConsumableState(item: InventoryItem, key: string, index: number): ConsumableState {
    const { remaining, max } = this.extractCharges(item);
    return {
      key,
      item,
      index,
      remaining,
      max,
      healing: this.extractHealingProfile(item),
    };
  }

  private extractCharges(item: InventoryItem): { remaining: number; max: number } {
    if (typeof item.charges === 'number') {
      const maxValue = typeof item.maxCharges === 'number' ? item.maxCharges : Math.max(item.charges, 1);
      return { remaining: item.charges, max: maxValue };
    }

    const text = `${item.name} ${item.description}`;
    const ratioMatch = text.match(/(\d+)\s*\/\s*(\d+)\s*(?:charges|uses|doses|applications)?/i);
    if (ratioMatch) {
      const remaining = parseInt(ratioMatch[1], 10);
      const max = parseInt(ratioMatch[2], 10);
      return { remaining, max };
    }

    const chargeMatch = text.match(/(\d+)\s*(?:charges|uses|doses|applications|sips|swigs|vials|bolts|shots)/i);
    if (chargeMatch) {
      const value = parseInt(chargeMatch[1], 10);
      return { remaining: value, max: value };
    }

    const parenMatch = text.match(/\((\d+)\)/);
    if (parenMatch) {
      const value = parseInt(parenMatch[1], 10);
      return { remaining: value, max: value };
    }

    const xMatch = text.match(/x\s*(\d+)/i);
    if (xMatch) {
      const value = parseInt(xMatch[1], 10);
      return { remaining: value, max: value };
    }

    return { remaining: 1, max: 1 };
  }

  private extractHealingProfile(item: InventoryItem): DamageProfile | undefined {
    const text = `${item.name} ${item.description}`;
    if (!/(heal|restore|replenish|recover|mend)/i.test(text)) {
      return undefined;
    }
    const match = this.extractDamageProfileFromText(text);
    return match ?? undefined;
  }

  private extractDamageProfileFromText(text: string | undefined): DamageProfile | null {
    if (!text) return null;
    const match = text.match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);
    if (!match) return null;
    const diceCount = parseInt(match[1], 10);
    const diceSize = parseInt(match[2], 10);
    const modifier = match[4] ? parseInt(match[4], 10) * (match[3] === '-' ? -1 : 1) : 0;
    return { diceCount, diceSize, modifier };
  }

  private extractArmorClass(item: InventoryItem): number | null {
    const text = `${item.name} ${item.description}`;
    const exactMatch = text.match(/AC\s*(\d+)/i);
    if (exactMatch) {
      return parseInt(exactMatch[1], 10);
    }
    const bonusMatch = text.match(/\+(\d+)\s*AC/i);
    if (bonusMatch) {
      const bonus = parseInt(bonusMatch[1], 10);
      return this.computeHeroBaseArmor() + bonus;
    }
    return null;
  }

  private isShield(item: InventoryItem): boolean {
    const text = `${item.id} ${item.name} ${item.description}`.toLowerCase();
    return text.includes('shield');
  }

  private inferWeaponAbility(item: InventoryItem): Ability {
    if (item.bonus?.ability) {
      return item.bonus.ability;
    }
    const text = `${item.id} ${item.name} ${item.description}`.toLowerCase();
    if (/(bow|dagger|knife|rapier|sabre|blade|finesse|throw)/.test(text)) {
      return 'dexterity';
    }
    if (/(focus|staff|wand|orb|grimoire|spell|arcane)/.test(text)) {
      return 'intelligence';
    }
    if (this.hero.heroClass.id === 'rift-mage') {
      return 'intelligence';
    }
    if (this.hero.heroClass.id === 'blade-dancer') {
      return 'dexterity';
    }
    return 'strength';
  }

  private computeProficiency(level: number): number {
    if (level >= 17) return 6;
    if (level >= 13) return 5;
    if (level >= 9) return 4;
    if (level >= 5) return 3;
    return 2;
  }

  private getAbilityModifier(ability: Ability): number {
    const score = this.hero.attributes[ability] ?? 10;
    return Math.floor((score - 10) / 2);
  }

  private formatDamageNotation(profile: DamageProfile): string {
    const modifier = profile.modifier;
    const base = `${profile.diceCount}d${profile.diceSize}`;
    if (modifier === 0) {
      return base;
    }
    const sign = modifier > 0 ? '+' : '-';
    return `${base}${sign}${Math.abs(modifier)}`;
  }

  private getConsumableSnapshot(): CombatConsumableSnapshot[] {
    return Array.from(this.consumables.values()).map((entry) => ({
      id: entry.key,
      name: entry.item.name,
      description: entry.item.description,
      remaining: entry.remaining,
      max: entry.max,
    }));
  }

  private resolveConsumableHealing(consumable: ConsumableState): number {
    if (consumable.healing) {
      const notation = this.formatDamageNotation({
        diceCount: consumable.healing.diceCount,
        diceSize: consumable.healing.diceSize,
        modifier: consumable.healing.modifier + this.getAbilityModifier('constitution'),
      });
      return Math.max(1, rollFromNotation(notation));
    }
    return Math.max(1, 6 + this.getAbilityModifier('constitution'));
  }

  getHeroOutcome(): Hero {
    const hero = clone(this.hero);
    hero.currentHP = this.state.heroHP;
    hero.inventory = hero.inventory.map((item, index) => {
      const key = `${item.id}-${index}`;
      const consumable = this.consumables.get(key);
      if (consumable) {
        return { ...item, charges: consumable.remaining, maxCharges: consumable.max };
      }
      return item;
    });
    return hero;
  }
}
