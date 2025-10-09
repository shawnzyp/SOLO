import type { InventoryItem } from './types';

export const ITEMS: Record<string, InventoryItem> = {
  longsword: {
    id: 'longsword',
    name: 'Ancestral Longsword',
    description: 'A blade engraved with Draconic runes. Deals 1d8+3 slashing damage.',
    quantity: 1,
    type: 'weapon',
    bonus: '+1 to attack rolls while wielded',
  },
  healingPotion: {
    id: 'healingPotion',
    name: "Potion of Wayfarer's Vitality",
    description: 'Consume to restore 2d4 + 2 hit points.',
    quantity: 2,
    type: 'consumable',
  },
  emberSigil: {
    id: 'emberSigil',
    name: 'Ember Sigil',
    description: 'A sigil bestowed by the Circle of Embers. Unlocks diplomatic options.',
    quantity: 0,
    type: 'artifact',
  },
};

export function cloneItem(itemId: string): InventoryItem | undefined {
  const base = ITEMS[itemId];
  if (!base) return undefined;
  return { ...base, quantity: 1 };
}
