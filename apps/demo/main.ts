import '@solo/dd-wc/register-all';
import '@solo/dd-wc/dd-ui.css';
import './styles.css';

import { DdToast, DdDialogueList, DdQuestTracker, DdCharacterSheet, DdCombatHud } from '@solo/dd-wc';

const themeToggle = document.querySelector<HTMLSelectElement>('#theme');
const reducedMotionToggle = document.querySelector<HTMLInputElement>('#reduced-motion');
const toastButton = document.querySelector<HTMLButtonElement>('#trigger-toast');
const achievementButton = document.querySelector<HTMLButtonElement>('#trigger-achievement');
const modal = document.querySelector('dd-modal');

if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    document.documentElement.dataset.theme = themeToggle.value;
  });
}

if (reducedMotionToggle) {
  reducedMotionToggle.addEventListener('change', () => {
    document.documentElement.dataset.reducedMotion = reducedMotionToggle.checked ? 'true' : 'false';
  });
}

toastButton?.addEventListener('click', () => {
  DdToast.show({ message: 'Quest updated!', variant: 'success' });
});

achievementButton?.addEventListener('click', () => {
  const badge = document.querySelector('dd-achievement-badge');
  if (badge) {
    badge.setAttribute('open', 'true');
  }
});

const modalButton = document.querySelector<HTMLButtonElement>('#open-modal');
modalButton?.addEventListener('click', () => {
  modal?.setAttribute('open', '');
});

modal?.addEventListener('dd-request-close', () => {
  modal.removeAttribute('open');
});

const dialogue = document.querySelector<DdDialogueList>('dd-dialogue-list');
dialogue?.addEventListener('dd-select', (event: Event) => {
  const detail = (event as CustomEvent).detail.option;
  DdToast.show({ message: `Selected: ${detail.label}`, variant: 'info' });
});

if (dialogue) {
  dialogue.options = [
    { id: '1', label: 'Ask about the relic', hotkey: '1', description: 'Probe the merchant for hidden lore.' },
    { id: '2', label: 'Demand payment', hotkey: '2', description: 'Leverage your deeds for coin.' },
    { id: '3', label: 'Leave quietly', hotkey: '3', description: 'End the exchange without drawing attention.' }
  ];
}

const questTracker = document.querySelector<DdQuestTracker>('dd-quest-tracker');
if (questTracker) {
  questTracker.quests = [
    { id: '1', title: 'Trail of Embers', status: 'active', summary: 'Scout the emberwatch tower.' },
    { id: '2', title: 'Shattered Sigil', status: 'completed', summary: 'Recover the sigil shards.' },
    { id: '3', title: 'Echoing Steps', status: 'failed', summary: 'Prevent the cult ritual.' }
  ];
}

const characterSheet = document.querySelector<DdCharacterSheet>('dd-character-sheet');
if (characterSheet) {
  characterSheet.data = {
    stats: [
      { id: 'str', label: 'Strength', value: 16 },
      { id: 'dex', label: 'Dexterity', value: 14 },
      { id: 'int', label: 'Intelligence', value: 12 }
    ],
    skills: [
      { id: 'ath', label: 'Athletics', rank: '+7' },
      { id: 'arc', label: 'Arcana', rank: '+5' }
    ],
    inventory: [
      { id: 'sword', name: 'Longsword', quantity: 1 },
      { id: 'potion', name: 'Healing Potion', quantity: 3 }
    ],
    factions: [{ id: 'crown', name: 'Crownwatch', standing: 'Allied' }],
    conditions: [{ id: 'bless', label: 'Blessed', description: '+1d4 to attacks.' }]
  };
}

const combatHud = document.querySelector<DdCombatHud>('dd-combat-hud');
if (combatHud) {
  combatHud.state = {
    playerName: 'Aria Nightwind',
    playerHealth: 32,
    playerHealthMax: 40,
    actions: [
      { id: 'slash', label: 'Slash', icon: 'sword' },
      { id: 'guard', label: 'Guard', icon: 'shield' },
      { id: 'potion', label: 'Drink Potion', icon: 'play', cooldown: 2 }
    ],
    turnOrder: [
      { id: 'player', label: 'Aria', active: true },
      { id: 'enemy', label: 'Ash Wraith' }
    ]
  };
}
