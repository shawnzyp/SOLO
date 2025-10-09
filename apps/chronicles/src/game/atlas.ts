import type { RegionState } from './types';

export interface RegionDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  row: number;
  col: number;
}

const DEFINITIONS: RegionDefinition[] = [
  {
    id: 'emberfall',
    name: 'Emberfall',
    description: 'Capital of the Circle of Embers where intrigue glows like banked coals.',
    icon: '🏰',
    row: 2,
    col: 1,
  },
  {
    id: 'emberfallSanctum',
    name: 'Circle Sanctum',
    description: 'A sanctified amphitheater channeling the shard\'s radiance.',
    icon: '🔥',
    row: 1,
    col: 2,
  },
  {
    id: 'duskfenEdge',
    name: 'Duskfen Approaches',
    description: 'Fog-wreathed wilds where the Circle keeps watchful wardstones.',
    icon: '🌲',
    row: 2,
    col: 2,
  },
  {
    id: 'duskfenClearing',
    name: 'Mire Ambush Site',
    description: 'A clearing where the Black Guild ambushes lone travelers.',
    icon: '⚔️',
    row: 2,
    col: 3,
  },
  {
    id: 'stoneCircle',
    name: 'Starbound Circle',
    description: 'Ancient menhirs hum with power drawn from the starlit shard.',
    icon: '🌀',
    row: 1,
    col: 3,
  },
  {
    id: 'shatteredGrove',
    name: 'Shattered Grove',
    description: 'Where the shard\'s failure scars the forest with twilight rifts.',
    icon: '☠️',
    row: 3,
    col: 3,
  },
];

export function createInitialRegions(saved?: Partial<RegionState>[]): RegionState[] {
  return DEFINITIONS.map((definition) => {
    const stored = saved?.find((entry) => entry.id === definition.id);
    return {
      ...definition,
      status: stored?.status ?? (definition.id === 'emberfall' ? 'visited' : 'locked'),
      discoveredAt: stored?.discoveredAt,
    } satisfies RegionState;
  });
}

export function getRegionDefinition(id: string): RegionDefinition | undefined {
  return DEFINITIONS.find((definition) => definition.id === id);
}
