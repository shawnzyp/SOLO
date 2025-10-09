import { describe, expect, it, beforeEach } from 'vitest';
import { DdCombatHud, type CombatHudState } from '../dd-combat-hud';

const tag = 'dd-combat-hud';

function defineHud() {
  if (!customElements.get(tag)) {
    customElements.define(tag, DdCombatHud);
  }
}

describe('<dd-combat-hud>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('dispatches dd-action and typed events when an action is selected', async () => {
    defineHud();
    const hud = document.createElement(tag) as DdCombatHud;
    const state: CombatHudState = {
      playerName: 'Test',
      playerHealth: 10,
      playerHealthMax: 10,
      actions: [
        { id: 'attack', label: 'Attack', icon: 'sword' },
        { id: 'guard', label: 'Guard', icon: 'shield', cooldown: 1 }
      ],
      turnOrder: []
    };
    hud.state = state;
    document.body.appendChild(hud);
    await hud.updateComplete;

    const events: string[] = [];
    hud.addEventListener('dd-action', () => events.push('dd-action'));
    hud.addEventListener('dd-attack', () => events.push('dd-attack'));

    const action = hud.shadowRoot?.querySelector('[data-action-id="attack"]') as HTMLElement;
    action?.click();

    expect(events).toEqual(['dd-action', 'dd-attack']);

    const disabledAction = hud.shadowRoot?.querySelector('[data-action-id="guard"]') as HTMLElement;
    disabledAction?.click();
    expect(events).toEqual(['dd-action', 'dd-attack']);
  });
});
