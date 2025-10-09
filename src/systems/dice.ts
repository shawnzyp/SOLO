export interface RollResult {
  roll: number;
  modifier: number;
  total: number;
  isCriticalSuccess: boolean;
  isCriticalFailure: boolean;
}

export function rollD20(modifier = 0): RollResult {
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + modifier;
  return {
    roll,
    modifier,
    total,
    isCriticalSuccess: roll === 20,
    isCriticalFailure: roll === 1,
  };
}

export function rollFromNotation(notation: string): number {
  const match = /(\d*)d(\d+)([+-]\d+)?/i.exec(notation.trim());
  if (!match) {
    throw new Error(`Invalid dice notation: ${notation}`);
  }
  const [, countRaw, facesRaw, modifierRaw] = match;
  const count = countRaw ? parseInt(countRaw, 10) : 1;
  const faces = parseInt(facesRaw, 10);
  const modifier = modifierRaw ? parseInt(modifierRaw, 10) : 0;
  let total = 0;
  for (let i = 0; i < count; i += 1) {
    total += Math.floor(Math.random() * faces) + 1;
  }
  return total + modifier;
}
