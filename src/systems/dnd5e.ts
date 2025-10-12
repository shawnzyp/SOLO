import type { Ability, HeroBackgroundOption, HeroClassOption } from './types';
import type { HeroRaceOption } from '../data/races';

type ApiListResult = {
  results: Array<{ index: string; name: string; url: string }>;
};

type ApiReference = { index: string; name: string };

type ApiAbilityBonus = { ability_score: ApiReference; bonus: number };

type ApiClassDetail = {
  index: string;
  name: string;
  hit_die: number;
  desc?: string[] | null;
  saving_throws?: ApiReference[];
  starting_equipment?: Array<{ equipment: ApiReference & { url?: string }; quantity: number; equipment_category?: ApiReference }>;
  spellcasting?: { spellcasting_ability: ApiReference } | null;
};

type ApiRaceDetail = {
  index: string;
  name: string;
  speed: number;
  ability_bonuses?: ApiAbilityBonus[];
  age?: string | null;
  alignment?: string | null;
  size_description?: string | null;
  language_desc?: string | null;
  traits?: ApiReference[];
};

type ApiBackgroundDetail = {
  index: string;
  name: string;
  desc?: string[] | null;
  feature?: { name: string; desc?: string[] | null } | null;
};

const API_BASE = 'https://www.dnd5eapi.co/api/2014';

const ABILITY_MAP: Record<string, Ability> = {
  STR: 'strength',
  DEX: 'dexterity',
  CON: 'constitution',
  INT: 'intelligence',
  WIS: 'wisdom',
  CHA: 'charisma',
};

const EQUIPMENT_TYPE_GUESS: Array<{ match: RegExp; type: HeroClassOption['startingItems'][number]['type'] }> = [
  { match: /armor|shield/i, type: 'armor' },
  { match: /weapon|bow|blade|sword|axe|mace|staff/i, type: 'weapon' },
  { match: /potion|elixir/i, type: 'consumable' },
];

function abilityFromReference(reference?: ApiReference | null): Ability | undefined {
  if (!reference) return undefined;
  return ABILITY_MAP[reference.name.toUpperCase()];
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

async function fetchList(endpoint: string, signal?: AbortSignal): Promise<ApiListResult['results']> {
  const url = `${API_BASE}/${endpoint}`;
  const list = await fetchJson<ApiListResult>(url, signal);
  return list.results ?? [];
}

async function fetchDetail<T>(endpoint: string, index: string, signal?: AbortSignal): Promise<T> {
  const url = `${API_BASE}/${endpoint}/${index}`;
  return fetchJson<T>(url, signal);
}

function guessItemType(label: string): HeroClassOption['startingItems'][number]['type'] {
  for (const { match, type } of EQUIPMENT_TYPE_GUESS) {
    if (match.test(label)) {
      return type;
    }
  }
  return 'trinket';
}

function mapClass(detail: ApiClassDetail): HeroClassOption {
  const bonuses: Partial<Record<Ability, number>> = {};
  detail.saving_throws?.forEach((entry, index) => {
    const ability = abilityFromReference(entry);
    if (!ability) return;
    bonuses[ability] = index === 0 ? 2 : 1;
  });

  const spellcastingAbility = abilityFromReference(detail.spellcasting?.spellcasting_ability);
  if (spellcastingAbility && !bonuses[spellcastingAbility]) {
    bonuses[spellcastingAbility] = 1;
  }

  const descriptionParts: string[] = [];
  if (detail.desc && detail.desc.length > 0) {
    descriptionParts.push(detail.desc.join(' '));
  }
  descriptionParts.push(`Hit Die: d${detail.hit_die}`);
  if (spellcastingAbility) {
    descriptionParts.push(`Primary spellcasting ability: ${spellcastingAbility.toUpperCase()}`);
  }

  const startingItems = (detail.starting_equipment ?? []).slice(0, 3).map((entry, index) => {
    const name = entry.equipment?.name ?? 'Equipment';
    const type = guessItemType(entry.equipment?.name ?? entry.equipment_category?.name ?? '');
    return {
      id: `${detail.index}-equipment-${index}`,
      name,
      description: `Starting equipment from the ${detail.name} class. Quantity: ${entry.quantity}.`,
      type,
    };
  });

  return {
    id: `srd-${detail.index}`,
    name: detail.name,
    description: descriptionParts.filter(Boolean).join(' '),
    bonuses,
    startingItems,
  };
}

function mapRace(detail: ApiRaceDetail): HeroRaceOption {
  const bonuses: HeroRaceOption['bonuses'] = {};
  detail.ability_bonuses?.forEach((bonus) => {
    const ability = abilityFromReference(bonus.ability_score);
    if (!ability) return;
    bonuses[ability] = (bonuses[ability] ?? 0) + bonus.bonus;
  });

  const descriptionParts: string[] = [];
  if (detail.alignment) descriptionParts.push(detail.alignment);
  if (detail.age) descriptionParts.push(detail.age);
  if (detail.size_description) descriptionParts.push(detail.size_description);
  if (detail.language_desc) descriptionParts.push(detail.language_desc);
  if (detail.traits && detail.traits.length > 0) {
    descriptionParts.push(`Traits: ${detail.traits.map((trait) => trait.name).join(', ')}`);
  }
  descriptionParts.push(`Base walking speed: ${detail.speed} ft.`);

  return {
    id: `srd-${detail.index}`,
    name: detail.name,
    description: descriptionParts.filter(Boolean).join(' '),
    bonuses,
  };
}

function mapBackground(detail: ApiBackgroundDetail): HeroBackgroundOption {
  const description = detail.desc?.join(' ') ?? 'Background option from the D&D 5e SRD.';
  const feature = detail.feature?.desc?.join(' ') ?? 'Feature description available in the D&D 5e SRD.';
  return {
    id: `srd-${detail.index}`,
    name: detail.name,
    description,
    feature,
  };
}

let cachedContent: SrdHeroContent | null = null;
let inflightRequest: Promise<SrdHeroContent> | null = null;

export interface SrdHeroContent {
  races: HeroRaceOption[];
  classes: HeroClassOption[];
  backgrounds: HeroBackgroundOption[];
}

async function loadContent(signal?: AbortSignal): Promise<SrdHeroContent> {
  const [classList, raceList, backgroundList] = await Promise.all([
    fetchList('classes', signal),
    fetchList('races', signal),
    fetchList('backgrounds', signal),
  ]);

  const [classDetails, raceDetails, backgroundDetails] = await Promise.all([
    Promise.all(classList.map((entry) => fetchDetail<ApiClassDetail>('classes', entry.index, signal))),
    Promise.all(raceList.map((entry) => fetchDetail<ApiRaceDetail>('races', entry.index, signal))),
    Promise.all(backgroundList.map((entry) => fetchDetail<ApiBackgroundDetail>('backgrounds', entry.index, signal))),
  ]);

  return {
    classes: classDetails.map(mapClass),
    races: raceDetails.map(mapRace),
    backgrounds: backgroundDetails.map(mapBackground),
  };
}

export async function fetchSrdHeroOptions(signal?: AbortSignal): Promise<SrdHeroContent> {
  if (cachedContent) {
    return cachedContent;
  }
  if (!inflightRequest) {
    inflightRequest = loadContent(signal);
  }
  try {
    cachedContent = await inflightRequest;
    return cachedContent;
  } finally {
    inflightRequest = null;
  }
}
