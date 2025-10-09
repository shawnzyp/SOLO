import { getNode } from '../game/story-data';
import type { RegionState } from '../game/types';
import { WorldComponent } from './world-component';

function statusLabel(status: RegionState['status']): string {
  switch (status) {
    case 'visited':
      return 'Explored';
    case 'available':
      return 'Discovered';
    default:
      return 'Unknown';
  }
}

export class AtlasMap extends WorldComponent {
  private selectedRegionId: string | null = null;

  connectedCallback(): void {
    if (!this.isConnected) return;
    if (!this.hasChildNodes()) {
      this.innerHTML = `
        <h2>Atlas</h2>
        <div class="map-grid"></div>
        <div class="region-detail"></div>
      `;
    }
    super.connectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const mapGrid = this.querySelector('.map-grid');
    const detailEl = this.querySelector('.region-detail');
    if (!mapGrid || !detailEl) return;

    const currentNode = getNode(this.state.currentNodeId);
    if (!this.selectedRegionId) {
      const currentRegionId = currentNode?.region ?? null;
      const firstAvailable = this.state.map.find((region) => region.status !== 'locked');
      this.selectedRegionId = currentRegionId ?? firstAvailable?.id ?? this.state.map[0]?.id ?? null;
    }

    mapGrid.innerHTML = this.state.map
      .map((region) => {
        const isSelected = region.id === this.selectedRegionId;
        const isActive = region.id === currentNode?.region;
        return `
          <button
            class="region ${region.status}${isSelected ? ' selected' : ''}${isActive ? ' active' : ''}"
            data-region-id="${region.id}"
            style="grid-row:${region.row};grid-column:${region.col};"
            aria-label="${region.name}"
          >
            <span class="icon">${region.icon}</span>
            <span class="name">${region.name}</span>
            <span class="status">${statusLabel(region.status)}</span>
          </button>
        `;
      })
      .join('');

    mapGrid.querySelectorAll<HTMLButtonElement>('.region').forEach((element) => {
      element.addEventListener('click', () => {
        this.selectedRegionId = element.getAttribute('data-region-id');
        this.render();
      });
    });

    const selectedRegion = this.state.map.find((region) => region.id === this.selectedRegionId) ?? this.state.map[0];
    if (!selectedRegion) {
      detailEl.innerHTML = '';
      return;
    }
    const visitedText =
      selectedRegion.status === 'visited' && selectedRegion.discoveredAt
        ? `Visited ${new Date(selectedRegion.discoveredAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })}`
        : selectedRegion.status === 'available'
        ? 'Awaiting exploration'
        : 'Uncharted';

    detailEl.innerHTML = `
      <div class="detail-header">
        <span class="icon">${selectedRegion.icon}</span>
        <div>
          <strong>${selectedRegion.name}</strong>
          <div>${statusLabel(selectedRegion.status)} · ${visitedText}</div>
        </div>
      </div>
      <p>${selectedRegion.description}</p>
    `;
  }
}

customElements.define('dd-atlas-map', AtlasMap);
