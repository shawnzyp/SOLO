import { Soundscape } from '../game/soundscape';
import { STORY_NODES } from '../game/story-data';
import { World } from '../game/world';
import { WorldComponent } from './world-component';

export class ControlBar extends WorldComponent {
  private muteButton: HTMLButtonElement | null = null;
  private restartButton: HTMLButtonElement | null = null;
  private readonly onMute = () => this.toggleMute();
  private readonly onRestart = () => this.restart();

  connectedCallback(): void {
    if (!this.isConnected) return;
    if (!this.hasChildNodes()) {
      this.innerHTML = `
        <div class="control-bar">
          <div class="control-meta"></div>
          <div class="control-actions">
            <button data-action="restart">Restart Adventure</button>
            <button data-action="mute">Mute Audio</button>
          </div>
        </div>
      `;
    }
    super.connectedCallback();
    this.muteButton = this.querySelector('button[data-action="mute"]');
    this.restartButton = this.querySelector('button[data-action="restart"]');
    this.muteButton?.addEventListener('click', this.onMute);
    this.restartButton?.addEventListener('click', this.onRestart);
  }

  disconnectedCallback(): void {
    this.muteButton?.removeEventListener('click', this.onMute);
    this.restartButton?.removeEventListener('click', this.onRestart);
    this.muteButton = null;
    this.restartButton = null;
    super.disconnectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const meta = this.querySelector('.control-meta');
    if (!meta) return;

    const visited = this.state.visitedNodes.length;
    const total = STORY_NODES.length;
    const activeQuests = this.state.quests.filter((quest) => quest.status === 'active').length;
    const isMuted = Soundscape.isMuted();

    meta.innerHTML = `
      <div><strong>Visited Nodes:</strong> ${visited} / ${total}</div>
      <div><strong>Active Quests:</strong> ${activeQuests}</div>
      <div><strong>Auto-save:</strong> Enabled</div>
    `;

    if (this.muteButton) {
      this.muteButton.textContent = isMuted ? 'Unmute Audio' : 'Mute Audio';
    }
  }

  private toggleMute() {
    const next = !Soundscape.isMuted();
    Soundscape.setMuted(next);
    this.render();
  }

  private restart() {
    World.reset();
  }
}

customElements.define('dd-control-bar', ControlBar);
