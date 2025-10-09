import { WorldComponent } from './world-component';

function statusColor(status: 'active' | 'completed' | 'failed'): string {
  switch (status) {
    case 'completed':
      return 'completed';
    case 'failed':
      return 'failed';
    default:
      return '';
  }
}

export class QuestTracker extends WorldComponent {
  connectedCallback(): void {
    if (!this.isConnected) return;
    if (!this.hasChildNodes()) {
      this.innerHTML = `<h2>Quests</h2><div class="quests"></div>`;
    }
    super.connectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const container = this.querySelector('.quests') as HTMLElement | null;
    if (!container) return;
    container.innerHTML = this.state.quests
      .map(
        (quest) => `
        <div class="quest ${statusColor(quest.status)}">
          <div class="title">${quest.title}</div>
          <div class="details">${quest.description}</div>
          <div class="details">${quest.progress ?? ''}</div>
          <div class="tags">${quest.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
        </div>
      `,
      )
      .join('');
  }
}

customElements.define('dd-quest-tracker', QuestTracker);
