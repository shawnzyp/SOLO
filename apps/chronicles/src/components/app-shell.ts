import { Soundscape } from '../game/soundscape';
import { getNode } from '../game/story-data';
import type { AmbienceKey } from '../game/soundscape';
import { WorldComponent } from './world-component';

const backgroundMap: Record<string, string> = {
  tavern: 'linear-gradient(135deg, rgba(46, 30, 25, 0.8), rgba(24, 14, 34, 0.9))',
  forest: 'linear-gradient(135deg, rgba(10, 38, 32, 0.82), rgba(21, 15, 35, 0.92))',
  ruins: 'linear-gradient(135deg, rgba(48, 32, 48, 0.85), rgba(12, 12, 22, 0.9))',
  gloom: 'linear-gradient(135deg, rgba(25, 22, 40, 0.88), rgba(12, 10, 20, 0.9))',
};

export class AppShell extends WorldComponent {
  private lastAmbience: AmbienceKey | null = null;

  connectedCallback(): void {
    if (!this.isConnected) return;
    if (!this.hasChildNodes()) {
      this.innerHTML = `
        <section class="dd-panel story-panel">
          <dd-story-panel></dd-story-panel>
        </section>
        <section class="dd-panel dialogue-panel">
          <dd-dialogue-list></dd-dialogue-list>
        </section>
        <section class="dd-panel character-sheet">
          <dd-character-sheet></dd-character-sheet>
        </section>
        <section class="dd-panel quest-tracker">
          <dd-quest-tracker></dd-quest-tracker>
        </section>
        <dd-combat-hud></dd-combat-hud>
        <dd-toast-container></dd-toast-container>
      `;
    }
    this.addEventListener(
      'pointerdown',
      () => {
        Soundscape.unlock();
        if (this.lastAmbience) {
          Soundscape.playAmbience(this.lastAmbience);
        }
      },
      { once: true },
    );
    super.connectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const node = getNode(this.state.currentNodeId);
    if (node) {
      const background = backgroundMap[node.background] ?? 'rgba(20,18,30,0.85)';
      (this.querySelector('.story-panel') as HTMLElement | null)?.style.setProperty(
        'background',
        background,
      );
      if (node.ambiance !== this.lastAmbience) {
        this.lastAmbience = node.ambiance;
        Soundscape.playAmbience(node.ambiance);
      }
    }
  }
}

customElements.define('dd-app', AppShell);
