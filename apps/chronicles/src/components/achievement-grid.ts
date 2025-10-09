import { WorldComponent } from './world-component';

function formatUnlocked(timestamp: number | undefined): string {
  if (!timestamp) return 'Locked';
  return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export class AchievementGrid extends WorldComponent {
  connectedCallback(): void {
    if (!this.isConnected) return;
    if (!this.hasChildNodes()) {
      this.innerHTML = `
        <h2>Achievements</h2>
        <div class="achievement-summary"></div>
        <div class="achievements"></div>
      `;
    }
    super.connectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const summaryEl = this.querySelector('.achievement-summary');
    const container = this.querySelector('.achievements');
    if (!summaryEl || !container) return;

    const unlocked = this.state.achievements.filter((achievement) => achievement.unlockedAt).length;
    summaryEl.innerHTML = `
      <span><strong>${unlocked}</strong> of ${this.state.achievements.length} unlocked</span>
      <span>Milestones echo through the Chronicle.</span>
    `;

    container.innerHTML = this.state.achievements
      .map((achievement) => {
        const unlockedAt = Boolean(achievement.unlockedAt);
        return `
          <div class="achievement ${unlockedAt ? 'unlocked' : 'locked'}">
            <span class="icon">${achievement.icon}</span>
            <div class="content">
              <div class="title">${achievement.name}</div>
              <div class="description">${achievement.description}</div>
            </div>
            <span class="status">${formatUnlocked(achievement.unlockedAt)}</span>
          </div>
        `;
      })
      .join('');
  }
}

customElements.define('dd-achievement-grid', AchievementGrid);
