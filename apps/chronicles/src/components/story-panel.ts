import { getNode } from '../game/story-data';
import { WorldComponent } from './world-component';

export class StoryPanel extends WorldComponent {
  private lastNodeId: string | null = null;
  private typingHandle: number | null = null;

  connectedCallback(): void {
    if (!this.isConnected) return;
    if (!this.hasChildNodes()) {
      this.innerHTML = `
        <div class="location-banner">
          <span class="location"></span>
          <span class="ambience"></span>
        </div>
        <div>
          <h2 class="scene-title"></h2>
          <div class="scene-text"></div>
        </div>
      `;
    }
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    if (this.typingHandle) {
      window.clearTimeout(this.typingHandle);
    }
    super.disconnectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const node = getNode(this.state.currentNodeId);
    if (!node) return;
    if (node.id === this.lastNodeId) return;
    this.lastNodeId = node.id;
    const locationEl = this.querySelector('.location') as HTMLElement | null;
    const ambienceEl = this.querySelector('.ambience') as HTMLElement | null;
    const titleEl = this.querySelector('.scene-title') as HTMLElement | null;
    const textContainer = this.querySelector('.scene-text') as HTMLElement | null;
    if (!locationEl || !ambienceEl || !titleEl || !textContainer) return;

    locationEl.textContent = node.location;
    ambienceEl.textContent = node.ambiance.toUpperCase();
    titleEl.textContent = node.title;

    textContainer.innerHTML = '';
    if (this.typingHandle) {
      window.clearTimeout(this.typingHandle);
      this.typingHandle = null;
    }

    const paragraphs = node.narrative;
    let paragraphIndex = 0;

    const revealParagraph = () => {
      if (!textContainer || paragraphIndex >= paragraphs.length) {
        return;
      }
      const p = document.createElement('p');
      textContainer.appendChild(p);
      const content = paragraphs[paragraphIndex];
      let charIndex = 0;
      const step = () => {
        p.textContent = content.slice(0, charIndex);
        charIndex += 1;
        if (charIndex <= content.length) {
          this.typingHandle = window.setTimeout(step, 18);
        } else {
          paragraphIndex += 1;
          this.typingHandle = window.setTimeout(revealParagraph, 160);
        }
      };
      step();
    };

    revealParagraph();
  }
}

customElements.define('dd-story-panel', StoryPanel);
