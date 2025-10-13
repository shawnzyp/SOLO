import type { Ability, AbilityGenerationMethod } from './types';

export const ABILITY_ORDER: Ability[] = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

export const STANDARD_ARRAY: number[] = [15, 14, 13, 12, 10, 8];

export const POINT_BUY_MIN = 8;
export const POINT_BUY_MAX = 15;
export const POINT_BUY_BUDGET = 27;

const POINT_BUY_COST: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

export interface AbilityAssignmentState {
  assignments: Record<Ability, number>;
  pool: number[];
  remainingPoints: number;
}

function autoAssign(values: number[], abilities: Ability[]): Record<Ability, number> {
  const sorted = [...values].sort((a, b) => b - a);
  const assignments: Record<Ability, number> = {} as Record<Ability, number>;
  abilities.forEach((ability, index) => {
    assignments[ability] = sorted[index] ?? sorted[sorted.length - 1] ?? POINT_BUY_MIN;
  });
  return assignments;
}

export function roll4d6DropLowest(random: () => number = Math.random): number {
  const rolls = Array.from({ length: 4 }, () => Math.floor(random() * 6) + 1).sort((a, b) => a - b);
  return rolls.slice(1).reduce((total, value) => total + value, 0);
}

export function generateRolledArray(random: () => number = Math.random): number[] {
  return Array.from({ length: 6 }, () => roll4d6DropLowest(random)).sort((a, b) => b - a);
}

export function totalPointBuyCost(assignments: Record<Ability, number>): number {
  return ABILITY_ORDER.reduce((total, ability) => {
    const score = assignments[ability];
    return total + (POINT_BUY_COST[score] ?? 0);
  }, 0);
}

export function calculatePointBuyRemaining(assignments: Record<Ability, number>): number {
  return Math.max(0, POINT_BUY_BUDGET - totalPointBuyCost(assignments));
}

export function createAbilityAssignments(
  method: AbilityGenerationMethod,
  abilities: Ability[] = ABILITY_ORDER,
  random: () => number = Math.random,
): AbilityAssignmentState {
  if (method === 'point-buy') {
    const assignments = abilities.reduce((acc, ability) => {
      acc[ability] = POINT_BUY_MIN;
      return acc;
    }, {} as Record<Ability, number>);
    return {
      assignments,
      pool: [],
      remainingPoints: calculatePointBuyRemaining(assignments),
    };
  }

  const pool = method === 'standard-array' ? [...STANDARD_ARRAY] : generateRolledArray(random);
  const assignments = autoAssign(pool, abilities);
  return {
    assignments,
    pool,
    remainingPoints: 0,
  };
}

function buildPoolCounts(pool: number[]): Map<number, number> {
  return pool.reduce((counts, value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1);
    return counts;
  }, new Map<number, number>());
}

export function assignAbilityFromPool(
  pool: number[],
  assignments: Record<Ability, number>,
  ability: Ability,
  value: number,
): Record<Ability, number> {
  if (pool.length === 0) {
    return assignments;
  }

  const counts = buildPoolCounts(pool);
  const nextAssignments: Record<Ability, number> = { ...assignments, [ability]: value };
  const usage = new Map<number, number>();
  ABILITY_ORDER.forEach((entry) => {
    const score = nextAssignments[entry];
    if (typeof score !== 'number') {
      return;
    }
    usage.set(score, (usage.get(score) ?? 0) + 1);
  });

  for (const [score, used] of usage) {
    if ((counts.get(score) ?? 0) < used) {
      return assignments;
    }
  }

  return nextAssignments;
}

export function adjustPointBuy(
  assignments: Record<Ability, number>,
  ability: Ability,
  delta: number,
): AbilityAssignmentState {
  const currentScore = assignments[ability];
  if (typeof currentScore !== 'number') {
    return {
      assignments,
      pool: [],
      remainingPoints: calculatePointBuyRemaining(assignments),
    };
  }

  const nextScore = Math.max(POINT_BUY_MIN, Math.min(POINT_BUY_MAX, currentScore + delta));
  if (nextScore === currentScore) {
    return {
      assignments,
      pool: [],
      remainingPoints: calculatePointBuyRemaining(assignments),
    };
  }

  const currentCost = POINT_BUY_COST[currentScore] ?? 0;
  const nextCost = POINT_BUY_COST[nextScore] ?? 0;
  const currentRemaining = calculatePointBuyRemaining(assignments);
  if (nextCost - currentCost > currentRemaining) {
    return {
      assignments,
      pool: [],
      remainingPoints: currentRemaining,
    };
  }

  const nextAssignments = { ...assignments, [ability]: nextScore };
  return {
    assignments: nextAssignments,
    pool: [],
    remainingPoints: calculatePointBuyRemaining(nextAssignments),
  };
}

export function clampAssignmentsToPool(
  assignments: Record<Ability, number>,
  pool: number[],
): Record<Ability, number> {
  if (pool.length === 0) {
    return assignments;
  }

  const counts = buildPoolCounts(pool);
  const used = new Map<number, number>();
  const nextAssignments: Record<Ability, number> = { ...assignments };

  ABILITY_ORDER.forEach((ability) => {
    const score = nextAssignments[ability];
    if (typeof score !== 'number') {
      return;
    }
    const usage = used.get(score) ?? 0;
    const available = counts.get(score) ?? 0;
    if (usage >= available) {
      nextAssignments[ability] = pool[0] ?? POINT_BUY_MIN;
    }
    used.set(score, usage + 1);
  });

  return nextAssignments;
}
