import { LitElement, css, html } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { ThemeController } from '../styles/theme-controller';

export class DdTab extends HTMLElement {
  static get observedAttributes() {
    return ['selected'];
  }

  constructor() {
    super();
    this.setAttribute('role', 'tab');
    this.tabIndex = -1;
    this.addEventListener('click', () => this.activate());
    this.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        this.activate();
      }
    });
  }

  connectedCallback(): void {
    if (!this.id) {
      const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      this.id = `dd-tab-${id}`;
    }
    this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    if (name === 'selected') {
      this.setAttribute('aria-selected', value !== null ? 'true' : 'false');
    }
  }

  get selected(): boolean {
    return this.hasAttribute('selected');
  }

  set selected(value: boolean) {
    if (value) {
      this.setAttribute('selected', '');
    } else {
      this.removeAttribute('selected');
    }
  }

  activate(): void {
    this.dispatchEvent(new CustomEvent('dd-tab-activate', { detail: { id: this.id }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('dd-tab')) {
  customElements.define('dd-tab', DdTab);
}

const tablistStyles = css`
  :host {
    display: block;
  }
  .tablist {
    display: inline-flex;
    gap: var(--space-xs);
    background: rgba(20, 22, 28, 0.8);
    border: var(--border-gold);
    border-radius: var(--radius-md);
    padding: var(--space-xs);
  }
`;

export class DdTabs extends LitElement {
  static styles = tablistStyles;

  @property({ reflect: true }) value?: string;
  @state() private focusIndex = 0;
  @queryAssignedElements({ slot: 'tabs' }) private tabNodes!: DdTab[];

  protected createRenderRoot() {
    const root = super.createRenderRoot() as ShadowRoot;
    ThemeController.applyToShadow(root);
    return root;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dd-tab-activate', this.onActivate as EventListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('dd-tab-activate', this.onActivate as EventListener);
  }

  firstUpdated(): void {
    this.updateSelectedFromValue();
  }

  private onActivate(event: CustomEvent<{ id: string }>): void {
    event.stopPropagation();
    this.value = event.detail.id;
    this.updateSelectedFromValue();
  }

  private updateSelectedFromValue(): void {
    const tabs = this.tabNodes || [];
    if (!tabs.length) return;
    const match = this.value ? tabs.find((tab) => tab.id === this.value) : tabs[0];
    tabs.forEach((tab, index) => {
      const selected = tab === match;
      tab.selected = selected;
      tab.tabIndex = selected ? 0 : -1;
      if (selected) {
        this.focusIndex = index;
      }
    });
    if (match) {
      this.value = match.id;
      this.dispatchEvent(new CustomEvent('dd-tab-change', { detail: { value: match.id }, bubbles: true, composed: true }));
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    const tabs = this.tabNodes || [];
    if (!tabs.length) return;
    const key = event.key;
    const lastIndex = tabs.length - 1;
    let nextIndex = this.focusIndex;
    if (key === 'ArrowRight') {
      nextIndex = (this.focusIndex + 1) % tabs.length;
    } else if (key === 'ArrowLeft') {
      nextIndex = (this.focusIndex - 1 + tabs.length) % tabs.length;
    } else if (key === 'Home') {
      nextIndex = 0;
    } else if (key === 'End') {
      nextIndex = lastIndex;
    } else if (key === 'Enter' || key === ' ') {
      tabs[this.focusIndex]?.activate();
      event.preventDefault();
      return;
    } else {
      return;
    }
    event.preventDefault();
    this.focusIndex = nextIndex;
    tabs.forEach((tab, index) => (tab.tabIndex = index === nextIndex ? 0 : -1));
    tabs[nextIndex]?.focus();
  }

  private onSlotChange(): void {
    this.updateSelectedFromValue();
  }

  render() {
    return html`
      <div role="tablist" class="tablist" @keydown=${this.onKeyDown}>
        <slot name="tabs" @slotchange=${this.onSlotChange}></slot>
      </div>
      <slot></slot>
    `;
  }
}

if (!customElements.get('dd-tabs')) {
  customElements.define('dd-tabs', DdTabs);
}
