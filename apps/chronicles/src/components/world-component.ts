import { World } from '../game/world';
import type { WorldStateSnapshot } from '../game/types';

export abstract class WorldComponent extends HTMLElement {
  protected state: WorldStateSnapshot | null = null;
  private unsubscribe: (() => void) | null = null;

  connectedCallback(): void {
    this.unsubscribe = World.subscribe((state) => {
      this.state = state;
      this.render();
    });
  }

  disconnectedCallback(): void {
    this.unsubscribe?.();
    this.unsubscribe = null;
  }

  protected abstract render(): void;
}
