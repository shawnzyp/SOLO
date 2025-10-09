export interface DiceResult {
  total: number;
  roll: number;
  modifier: number;
  critical: 'success' | 'failure' | 'none';
}

export function rollD20(modifier = 0): DiceResult {
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + modifier;
  let critical: DiceResult['critical'] = 'none';
  if (roll === 20) {
    critical = 'success';
  } else if (roll === 1) {
    critical = 'failure';
  }
  return { roll, total, modifier, critical };
}

export function rollDamage(damage: string): number {
  const match = damage.match(/(\d+)d(\d+)([+\-]\d+)?/i);
  if (!match) {
    return 0;
  }
  const [, diceCountRaw, diceFacesRaw, modifierRaw] = match;
  const diceCount = Number(diceCountRaw);
  const diceFaces = Number(diceFacesRaw);
  const modifier = modifierRaw ? Number(modifierRaw) : 0;
  let total = 0;
  for (let i = 0; i < diceCount; i += 1) {
    total += Math.floor(Math.random() * diceFaces) + 1;
  }
  return total + modifier;
}
