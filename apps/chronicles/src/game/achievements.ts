import type { AchievementState } from './types';

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const DEFINITIONS: AchievementDefinition[] = [
  {
    id: 'emberfallEnvoy',
    name: 'Envoy of Emberfall',
    description: 'Embrace the Circle\'s mission and depart the city without hesitation.',
    icon: '🕯️',
  },
  {
    id: 'chartedDuskfen',
    name: 'Cartographer of the Duskfen',
    description: 'Unlock the secret paths threading through the haunted mire.',
    icon: '🧭',
  },
  {
    id: 'loneDuelist',
    name: 'Lone Duelist',
    description: 'Win your first duel without a companion at your side.',
    icon: '⚔️',
  },
  {
    id: 'mistWalker',
    name: 'Mist Walker',
    description: 'Slip unseen past an ambush within the Duskfen.',
    icon: '🌫️',
  },
  {
    id: 'guardianOfLight',
    name: 'Guardian of Light',
    description: 'Sanctify the shard with the Circle of Embers.',
    icon: '🔥',
  },
  {
    id: 'ascendantSoloist',
    name: 'Ascendant Soloist',
    description: 'Channel the shard\'s power alone and survive the surge.',
    icon: '🌟',
  },
  {
    id: 'secondWind',
    name: 'Second Wind',
    description: 'Rally from the brink by drinking a potion in a desperate battle.',
    icon: '🧪',
  },
];

export function getAchievementDefinition(id: string): AchievementDefinition | undefined {
  return DEFINITIONS.find((definition) => definition.id === id);
}

export function createInitialAchievements(saved?: Partial<AchievementState>[]): AchievementState[] {
  return DEFINITIONS.map((definition) => {
    const stored = saved?.find((entry) => entry.id === definition.id);
    return {
      ...definition,
      unlockedAt: stored?.unlockedAt,
    };
  });
}
