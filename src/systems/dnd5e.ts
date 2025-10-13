import type { Ability, HeroBackgroundOption, HeroClassOption } from './types';
import type { HeroRaceOption } from '../data/races';

export type SrdCompendiumCategory =
  | 'spells'
  | 'equipment'
  | 'magic-items'
  | 'feats'
  | 'rules'
  | 'rule-sections';

export interface SrdCompendiumEntrySummary {
  id: string;
  index: string;
  name: string;
  category: SrdCompendiumCategory;
}

export interface SrdSpellDetail {
  type: 'spell';
  id: string;
  name: string;
  level: number;
  school: string;
  classes: string[];
  castingTime: string;
  range: string;
  duration: string;
  components: string[];
  ritual: boolean;
  concentration: boolean;
  description: string;
  higherLevel?: string;
}

export interface SrdEquipmentDetail {
  type: 'equipment';
  id: string;
  name: string;
  category: string;
  weaponCategory?: string;
  armorCategory?: string;
  cost?: string;
  weight?: number;
  damage?: string;
  twoHandedDamage?: string;
  armorClass?: string;
  strengthRequirement?: number | null;
  stealthDisadvantage?: boolean;
  properties?: string[];
  description: string;
}

export interface SrdMagicItemDetail {
  type: 'magic-item';
  id: string;
  name: string;
  category: string;
  rarity?: string;
  requiresAttunement?: string | boolean | null;
  description: string;
}

export interface SrdFeatDetail {
  type: 'feat';
  id: string;
  name: string;
  description: string;
}

export interface SrdRuleDetail {
  type: 'rule';
  id: string;
  name: string;
  description: string;
  subsections?: Array<{ name: string; index: string }>;
}

export interface SrdRuleSectionDetail {
  type: 'rule-section';
  id: string;
  name: string;
  description: string;
}

export type SrdCompendiumDetail =
  | SrdSpellDetail
  | SrdEquipmentDetail
  | SrdMagicItemDetail
  | SrdFeatDetail
  | SrdRuleDetail
  | SrdRuleSectionDetail;

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

type ApiSpellDetail = {
  index: string;
  name: string;
  level: number;
  school: ApiReference;
  classes?: ApiReference[];
  casting_time: string;
  range: string;
  duration: string;
  components?: string[];
  ritual?: boolean;
  concentration?: boolean;
  desc?: string[] | null;
  higher_level?: string[] | null;
};

type ApiEquipmentDetail = {
  index: string;
  name: string;
  equipment_category: ApiReference;
  weapon_category?: string | null;
  armor_category?: string | null;
  cost?: { quantity: number; unit: string } | null;
  weight?: number | null;
  damage?: {
    damage_dice: string;
    damage_type?: ApiReference | null;
  } | null;
  two_handed_damage?: {
    damage_dice: string;
    damage_type?: ApiReference | null;
  } | null;
  armor_class?: {
    base: number;
    dex_bonus?: boolean;
    max_bonus?: number | null;
  } | null;
  str_minimum?: number | null;
  stealth_disadvantage?: boolean | null;
  properties?: ApiReference[] | null;
  desc?: string[] | null;
  special?: string[] | null;
};

type ApiMagicItemDetail = {
  index: string;
  name: string;
  equipment_category?: ApiReference | null;
  rarity?: { name: string } | null;
  desc?: string[] | null;
  variant?: boolean | null;
  variants?: ApiReference[] | null;
  requires_attunement?: string | boolean | null;
};

type ApiFeatDetail = {
  index: string;
  name: string;
  desc?: string[] | null;
};

type ApiRuleDetail = {
  index: string;
  name: string;
  desc?: string | string[] | null;
  subsections?: Array<{ name: string; index: string }> | null;
};

type ApiRuleSectionDetail = {
  index: string;
  name: string;
  desc?: string | string[] | null;
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

const COMPENDIUM_ENDPOINTS: Record<SrdCompendiumCategory, string> = {
  spells: 'spells',
  equipment: 'equipment',
  'magic-items': 'magic-items',
  feats: 'feats',
  rules: 'rules',
  'rule-sections': 'rule-sections',
};

function abilityFromReference(reference?: ApiReference | null): Ability | undefined {
  if (!reference) return undefined;
  return ABILITY_MAP[reference.name.toUpperCase()];
}

function joinText(paragraphs?: string[] | string | null): string {
  if (!paragraphs) return '';
  if (Array.isArray(paragraphs)) {
    return paragraphs.filter(Boolean).join('\n\n');
  }
  return paragraphs;
}

function formatCost(cost?: { quantity: number; unit: string } | null): string | undefined {
  if (!cost) return undefined;
  return `${cost.quantity} ${cost.unit}`;
}

function mapIndexEntry(
  category: SrdCompendiumCategory,
  entry: { index: string; name: string },
): SrdCompendiumEntrySummary {
  return {
    id: `${category}/${entry.index}`,
    index: entry.index,
    name: entry.name,
    category,
  };
}

function mapSpell(detail: ApiSpellDetail): SrdSpellDetail {
  return {
    type: 'spell',
    id: `spells/${detail.index}`,
    name: detail.name,
    level: detail.level,
    school: detail.school?.name ?? 'Unknown',
    classes: detail.classes?.map((entry) => entry.name) ?? [],
    castingTime: detail.casting_time,
    range: detail.range,
    duration: detail.duration,
    components: detail.components ?? [],
    ritual: Boolean(detail.ritual),
    concentration: Boolean(detail.concentration),
    description: joinText(detail.desc),
    higherLevel: joinText(detail.higher_level) || undefined,
  };
}

function mapEquipment(detail: ApiEquipmentDetail): SrdEquipmentDetail {
  const damage = detail.damage
    ? `${detail.damage.damage_dice} ${detail.damage.damage_type?.name ?? ''}`.trim()
    : undefined;
  const twoHandedDamage = detail.two_handed_damage
    ? `${detail.two_handed_damage.damage_dice} ${detail.two_handed_damage.damage_type?.name ?? ''}`.trim()
    : undefined;
  const armorClass = detail.armor_class
    ? `AC ${detail.armor_class.base}${
        detail.armor_class.dex_bonus
          ? detail.armor_class.max_bonus
            ? ` + DEX (max ${detail.armor_class.max_bonus})`
            : ' + DEX'
          : ''
      }`
    : undefined;
  const descriptionParts: string[] = [];
  const baseDescription = joinText(detail.desc);
  if (baseDescription) {
    descriptionParts.push(baseDescription);
  }
  const specials = joinText(detail.special);
  if (specials) {
    descriptionParts.push(specials);
  }

  return {
    type: 'equipment',
    id: `equipment/${detail.index}`,
    name: detail.name,
    category: detail.equipment_category?.name ?? 'Equipment',
    weaponCategory: detail.weapon_category ?? undefined,
    armorCategory: detail.armor_category ?? undefined,
    cost: formatCost(detail.cost),
    weight: detail.weight ?? undefined,
    damage,
    twoHandedDamage,
    armorClass,
    strengthRequirement: detail.str_minimum ?? null,
    stealthDisadvantage: detail.stealth_disadvantage ?? undefined,
    properties: detail.properties?.map((entry) => entry.name) ?? undefined,
    description: descriptionParts.filter(Boolean).join('\n\n'),
  };
}

function mapMagicItem(detail: ApiMagicItemDetail): SrdMagicItemDetail {
  return {
    type: 'magic-item',
    id: `magic-items/${detail.index}`,
    name: detail.name,
    category: detail.equipment_category?.name ?? 'Magic Item',
    rarity: detail.rarity?.name,
    requiresAttunement: detail.requires_attunement ?? undefined,
    description: joinText(detail.desc),
  };
}

function mapFeat(detail: ApiFeatDetail): SrdFeatDetail {
  return {
    type: 'feat',
    id: `feats/${detail.index}`,
    name: detail.name,
    description: joinText(detail.desc),
  };
}

function mapRule(detail: ApiRuleDetail): SrdRuleDetail {
  return {
    type: 'rule',
    id: `rules/${detail.index}`,
    name: detail.name,
    description: joinText(detail.desc),
    subsections: detail.subsections?.map((entry) => ({ name: entry.name, index: entry.index })),
  };
}

function mapRuleSection(detail: ApiRuleSectionDetail): SrdRuleSectionDetail {
  return {
    type: 'rule-section',
    id: `rule-sections/${detail.index}`,
    name: detail.name,
    description: joinText(detail.desc),
  };
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

  const loadouts =
    startingItems.length > 0
      ? [
          {
            id: `srd-${detail.index}-standard-kit`,
            name: `${detail.name} Standard Kit`,
            summary: 'Equipment recommended for new adventurers of this class.',
            defaultSelected: true,
            items: startingItems,
          },
        ]
      : [];

  return {
    id: `srd-${detail.index}`,
    name: detail.name,
    description: descriptionParts.filter(Boolean).join(' '),
    bonuses,
    startingItems,
    loadouts,
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

const indexCache = new Map<SrdCompendiumCategory, SrdCompendiumEntrySummary[]>();
const indexInflight = new Map<SrdCompendiumCategory, Promise<SrdCompendiumEntrySummary[]>>();
const detailCache = new Map<string, SrdCompendiumDetail>();
const detailInflight = new Map<string, Promise<SrdCompendiumDetail>>();

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

export async function fetchSrdCompendiumIndex(
  category: SrdCompendiumCategory,
  signal?: AbortSignal,
): Promise<SrdCompendiumEntrySummary[]> {
  const cached = indexCache.get(category);
  if (cached) {
    return cached;
  }
  const inflight = indexInflight.get(category);
  if (inflight) {
    return inflight;
  }
  const request = (async () => {
    const results = await fetchList(COMPENDIUM_ENDPOINTS[category], signal);
    const mapped = results.map((entry) => mapIndexEntry(category, entry));
    indexCache.set(category, mapped);
    return mapped;
  })();
  indexInflight.set(category, request);
  try {
    return await request;
  } finally {
    indexInflight.delete(category);
  }
}

async function fetchCompendiumDetail(
  category: SrdCompendiumCategory,
  index: string,
  signal?: AbortSignal,
): Promise<SrdCompendiumDetail> {
  const cacheKey = `${category}/${index}`;
  const cached = detailCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  const inflight = detailInflight.get(cacheKey);
  if (inflight) {
    return inflight;
  }

  const request = (async () => {
    switch (category) {
      case 'spells':
        return mapSpell(await fetchDetail<ApiSpellDetail>('spells', index, signal));
      case 'equipment':
        return mapEquipment(await fetchDetail<ApiEquipmentDetail>('equipment', index, signal));
      case 'magic-items':
        return mapMagicItem(await fetchDetail<ApiMagicItemDetail>('magic-items', index, signal));
      case 'feats':
        return mapFeat(await fetchDetail<ApiFeatDetail>('feats', index, signal));
      case 'rules':
        return mapRule(await fetchDetail<ApiRuleDetail>('rules', index, signal));
      case 'rule-sections':
        return mapRuleSection(await fetchDetail<ApiRuleSectionDetail>('rule-sections', index, signal));
      default:
        throw new Error(`Unsupported compendium category: ${category}`);
    }
  })();

  detailInflight.set(cacheKey, request);
  try {
    const detail = await request;
    detailCache.set(cacheKey, detail);
    return detail;
  } finally {
    detailInflight.delete(cacheKey);
  }
}

export async function fetchSrdCompendiumDetail(
  category: SrdCompendiumCategory,
  index: string,
  signal?: AbortSignal,
): Promise<SrdCompendiumDetail> {
  return fetchCompendiumDetail(category, index, signal);
}
