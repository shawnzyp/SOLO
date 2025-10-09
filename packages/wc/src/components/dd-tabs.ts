import { html, css } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { DdElement } from './base';
import type { DdTab } from './dd-tab';

const styles = css`
  :host {
    display: block;
  }
  .tablist {
    border-bottom: var(--border-hairline);
    display: flex;
    gap: var(--space-xs);
  }
  .tab-button {
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: inherit;
    cursor: pointer;
    font: inherit;
    padding: var(--space-sm) var(--space-lg);
    transition: border-color 160ms ease, color 160ms ease, background 160ms ease;
  }
  .tab-button[aria-selected='true'] {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
  .tab-button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  ::slotted(dd-tab) {
    display: block;
    padding: var(--space-lg) 0;
  }
  ::slotted(dd-tab[hidden]) {
    display: none;
  }
`;

export class DdTabs extends DdElement {
  static styles = [styles];

  @property({ reflect: true }) value: string | null = null;
  @queryAssignedElements({ selector: 'dd-tab' }) private tabs!: DdTab[];

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.onKeydown);
  }

  protected render() {
    const tabs = this.tabs ?? [];
    this.syncTabs();
    return html`
      <div role="tablist" class="tablist">
        ${repeat(
          tabs,
          (tab) => tab.id,
          (tab, index) => html`
            <button
              class="tab-button"
              role="tab"
              aria-selected=${tab.id === this.value}
              tabindex=${tab.id === this.value ? 0 : -1}
              id=${`${tab.id}-tab`}
              @click=${() => this.activateTab(tab)}
              data-index=${index}
            >
              ${tab.label || tab.getAttribute('label') || `Tab ${index + 1}`}
            </button>
          `
        )}
      </div>
      <slot @slotchange=${this.onSlotChange}></slot>
    `;
  }

  private onSlotChange = () => {
    this.requestUpdate();
  };

  private syncTabs() {
    const tabs = this.tabs ?? [];
    if (!tabs.length) return;
    if (!this.value || !tabs.some((tab) => tab.id === this.value)) {
      this.value = tabs[0].id || null;
    }
    for (const tab of tabs) {
      const active = tab.id === this.value;
      tab.active = active;
      tab.hidden = !active;
      tab.setAttribute('role', 'tabpanel');
      tab.setAttribute('tabindex', active ? '0' : '-1');
      tab.setAttribute('aria-labelledby', `${tab.id}-tab`);
    }
  }

  private activateTab(tab: DdTab) {
    const previous = this.value;
    this.value = tab.id || null;
    this.syncTabs();
    if (previous !== this.value) {
      this.dispatchEvent(new CustomEvent('dd-change', { detail: { value: this.value } }));
    }
  }

  private onKeydown = (event: KeyboardEvent) => {
    const tabs = this.tabs ?? [];
    if (!tabs.length) return;
    const currentIndex = Math.max(0, tabs.findIndex((tab) => tab.id === this.value));
    let nextIndex = currentIndex;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    this.activateTab(nextTab);
    const buttons = this.renderRoot.querySelectorAll<HTMLButtonElement>('.tab-button');
    buttons[nextIndex]?.focus();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-tabs': DdTabs;
  }
}
