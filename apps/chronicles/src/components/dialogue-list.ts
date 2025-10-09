import { World } from '../game/world';
import { getNode } from '../game/story-data';
import type { StoryChoice } from '../game/types';
import { Soundscape } from '../game/soundscape';
import { WorldComponent } from './world-component';

export class DialogueList extends WorldComponent {
  private keyHandler = (event: KeyboardEvent) => {
    if (!this.state) return;
    const node = getNode(this.state.currentNodeId);
    if (!node?.choices) return;
    const index = parseInt(event.key, 10);
    if (Number.isNaN(index) || index < 1 || index > node.choices.length) return;
    const choice = node.choices[index - 1];
    if (!this.isChoiceAvailable(choice)) return;
    this.triggerChoice(choice);
  };

  connectedCallback(): void {
    if (!this.isConnected) return;
    super.connectedCallback();
    window.addEventListener('keydown', this.keyHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('keydown', this.keyHandler);
    super.disconnectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const node = getNode(this.state.currentNodeId);
    if (!node?.choices) {
      this.innerHTML = '<div class="dialogue-option disabled"><span class="label">No choices available.</span></div>';
      return;
    }
    this.innerHTML = node.choices
      .map((choice, index) => this.renderChoice(choice, index))
      .join('');
    this.querySelectorAll('.dialogue-option').forEach((element) => {
      element.addEventListener('click', () => {
        const choiceId = element.getAttribute('data-choice-id');
        const choice = node.choices?.find((entry) => entry.id === choiceId);
        if (choice && this.isChoiceAvailable(choice)) {
          this.triggerChoice(choice);
        }
      });
    });
  }

  private renderChoice(choice: StoryChoice, index: number): string {
    const available = this.isChoiceAvailable(choice);
    const hotkey = index + 1;
    const skillMeta = choice.skillCheck
      ? `<span><strong>${(choice.skillCheck.skill ?? choice.skillCheck.ability).toUpperCase()}</strong> DC ${choice.skillCheck.dc}</span>`
      : '';
    const hint = choice.hint ? `<span>${choice.hint}</span>` : '';
    return `
      <div class="dialogue-option${available ? '' : ' disabled'}" data-choice-id="${choice.id}">
        <div class="label">[${hotkey}] ${choice.label}</div>
        <div class="meta">${skillMeta}${skillMeta && hint ? ' · ' : ''}${hint}</div>
      </div>
    `;
  }

  private isChoiceAvailable(choice: StoryChoice): boolean {
    if (!this.state) return false;
    if (!choice.condition) return true;
    return choice.condition(this.state);
  }

  private triggerChoice(choice: StoryChoice) {
    Soundscape.playCue('notify');
    World.choose(choice.id);
  }
}

customElements.define('dd-dialogue-list', DialogueList);
