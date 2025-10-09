export class DdTab extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'active'];
  }

  get label(): string {
    return this.getAttribute('label') ?? '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  get active(): boolean {
    return this.hasAttribute('active');
  }

  set active(value: boolean) {
    this.toggleAttribute('active', value);
  }

  attributeChangedCallback(): void {
    this.dispatchEvent(new CustomEvent('dd-tab-change', { bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-tab': DdTab;
  }
}
