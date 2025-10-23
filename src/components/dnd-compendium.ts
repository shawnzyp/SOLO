import { html, render } from 'lit-html';
import {
  fetchSrdCompendiumDetail,
  type SrdCompendiumCategory,
  type SrdCompendiumDetail,
  type SrdCompendiumEntrySummary,
  type SrdEquipmentDetail,
  type SrdFeatDetail,
  type SrdMagicItemDetail,
  type SrdRuleDetail,
  type SrdRuleSectionDetail,
  type SrdSpellDetail,
} from '../systems/dnd5e';

interface CompendiumCategorySummary {
  id: SrdCompendiumCategory;
  label: string;
  entries: SrdCompendiumEntrySummary[];
}

interface CompendiumData {
  loading: boolean;
  error: string | null;
  categories: CompendiumCategorySummary[];
}

interface SubsectionState {
  open: boolean;
  loading: boolean;
  error: string | null;
  detail: SrdRuleSectionDetail | null;
  abortController: AbortController | null;
}

const CATEGORY_ICONS: Partial<Record<SrdCompendiumCategory, string>> = {
  rules: '📜',
  'rule-sections': '📖',
  feats: '🎯',
  equipment: '🛡️',
  'magic-items': '✨',
  spells: '🔮',
};

export class DDDndCompendium extends HTMLElement {
  private loading = false;
  private error: string | null = null;
  private categories: CompendiumCategorySummary[] = [];
  private selectedCategory: SrdCompendiumCategory | null = null;
  private selectedEntry: string | null = null;
  private detail: SrdCompendiumDetail | null = null;
  private detailLoading = false;
  private detailError: string | null = null;
  private filter = '';
  private detailAbortController: AbortController | null = null;
  private pendingDetailKey: string | null = null;
  private subsectionStates = new Map<string, SubsectionState>();

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(payload: CompendiumData) {
    this.loading = payload.loading;
    this.error = payload.error ?? null;
    this.categories = payload.categories;

    const currentCategory = this.categories.find((entry) => entry.id === this.selectedCategory);
    if (!currentCategory || currentCategory.entries.length === 0) {
      const fallback = this.categories.find((entry) => entry.entries.length > 0) ?? null;
      this.selectedCategory = fallback ? fallback.id : null;
      this.selectedEntry = fallback?.entries[0]?.index ?? null;
      this.detail = null;
      this.resetSubsectionStates();
    } else {
      const hasSelectedEntry = currentCategory.entries.some((entry) => entry.index === this.selectedEntry);
      if (!hasSelectedEntry) {
        this.selectedEntry = currentCategory.entries[0]?.index ?? null;
        this.detail = null;
        this.resetSubsectionStates();
      }
    }

    if (this.selectedCategory && this.selectedEntry) {
      const detailKey = `${this.selectedCategory}/${this.selectedEntry}`;
      if (!this.detail || this.detail.id !== detailKey) {
        void this.loadDetail(this.selectedCategory, this.selectedEntry);
      }
    } else {
      this.detail = null;
      this.resetSubsectionStates();
    }

    this.update();
  }

  disconnectedCallback(): void {
    if (this.detailAbortController) {
      this.detailAbortController.abort();
      this.detailAbortController = null;
    }
    this.resetSubsectionStates();
  }

  private get totalEntries(): number {
    return this.categories.reduce((sum, category) => sum + category.entries.length, 0);
  }

  private getSelectedCategory(): CompendiumCategorySummary | null {
    if (!this.selectedCategory) return null;
    return this.categories.find((entry) => entry.id === this.selectedCategory) ?? null;
  }

  private async loadDetail(category: SrdCompendiumCategory, entryIndex: string): Promise<void> {
    if (this.detailAbortController) {
      this.detailAbortController.abort();
    }

    const controller = new AbortController();
    this.detailAbortController = controller;
    const requestKey = `${category}/${entryIndex}`;
    this.pendingDetailKey = requestKey;
    this.detailLoading = true;
    this.detailError = null;
    this.detail = null;
    this.resetSubsectionStates();
    this.update();

    try {
      const detail = await fetchSrdCompendiumDetail(category, entryIndex, controller.signal);
      if (controller.signal.aborted || this.pendingDetailKey !== requestKey) {
        return;
      }
      this.detail = detail;
      if (detail.type === 'rule') {
        this.prepareSubsections(detail);
      } else {
        this.resetSubsectionStates();
      }
      this.detailLoading = false;
    } catch (error) {
      if (controller.signal.aborted || this.pendingDetailKey !== requestKey) {
        return;
      }
      this.detailLoading = false;
      this.detailError =
        error instanceof Error && error.message
          ? error.message
          : 'Unable to load reference entry.';
    } finally {
      if (this.detailAbortController === controller) {
        this.detailAbortController = null;
      }
      this.update();
    }
  }

  private handleCategorySelect(categoryId: SrdCompendiumCategory): void {
    if (this.selectedCategory === categoryId) return;
    this.selectedCategory = categoryId;
    const category = this.getSelectedCategory();
    this.selectedEntry = category?.entries[0]?.index ?? null;
    this.filter = '';
    this.detail = null;
    this.detailError = null;
    this.resetSubsectionStates();
    if (this.selectedCategory && this.selectedEntry) {
      void this.loadDetail(this.selectedCategory, this.selectedEntry);
    } else {
      this.update();
    }
  }

  private handleEntrySelect(entryIndex: string): void {
    if (!this.selectedCategory || this.selectedEntry === entryIndex) {
      return;
    }
    this.selectedEntry = entryIndex;
    this.detail = null;
    this.detailError = null;
    this.resetSubsectionStates();
    void this.loadDetail(this.selectedCategory, entryIndex);
  }

  private handleFilterInput(event: Event): void {
    const input = event.currentTarget as HTMLInputElement | null;
    this.filter = (input?.value ?? '').toLowerCase();
    this.update();
  }

  private filterEntries(entries: SrdCompendiumEntrySummary[]): SrdCompendiumEntrySummary[] {
    if (!this.filter) return entries;
    return entries.filter((entry) => entry.name.toLowerCase().includes(this.filter));
  }

  private resetSubsectionStates(): void {
    for (const state of this.subsectionStates.values()) {
      state.abortController?.abort();
    }
    this.subsectionStates.clear();
  }

  private prepareSubsections(detail: SrdRuleDetail): void {
    const indices = new Set(detail.subsections?.map((entry) => entry.index) ?? []);
    for (const [index, state] of this.subsectionStates.entries()) {
      if (!indices.has(index)) {
        state.abortController?.abort();
        this.subsectionStates.delete(index);
      }
    }

    detail.subsections?.forEach((entry) => {
      if (!this.subsectionStates.has(entry.index)) {
        this.subsectionStates.set(entry.index, {
          open: false,
          loading: false,
          error: null,
          detail: null,
          abortController: null,
        });
      }
    });
  }

  private async loadSubsectionDetail(index: string): Promise<void> {
    const current = this.subsectionStates.get(index);
    if (!current || current.loading) {
      return;
    }

    current.abortController?.abort();
    const controller = new AbortController();
    const nextState: SubsectionState = {
      ...current,
      loading: true,
      error: null,
      abortController: controller,
    };
    this.subsectionStates.set(index, nextState);
    this.update();

    try {
      const detail = await fetchSrdCompendiumDetail('rule-sections', index, controller.signal);
      if (controller.signal.aborted) {
        return;
      }
      if (detail.type !== 'rule-section') {
        throw new Error('Unexpected subsection type.');
      }
      const latest = this.subsectionStates.get(index);
      if (!latest) return;
      this.subsectionStates.set(index, {
        ...latest,
        loading: false,
        error: null,
        detail,
        abortController: null,
      });
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }
      const latest = this.subsectionStates.get(index);
      if (!latest) return;
      this.subsectionStates.set(index, {
        ...latest,
        loading: false,
        error:
          error instanceof Error && error.message
            ? error.message
            : 'Unable to load subsection details.',
        abortController: null,
      });
    } finally {
      this.update();
    }
  }

  private handleSubsectionToggle(index: string, event: Event): void {
    const element = event.currentTarget as HTMLDetailsElement | null;
    if (!element) return;

    const open = element.open;
    const state = this.subsectionStates.get(index);
    if (!state) {
      return;
    }

    if (!open && state.abortController) {
      state.abortController.abort();
    }

    this.subsectionStates.set(index, {
      ...state,
      open,
      loading: open ? state.loading : false,
      abortController: open ? state.abortController : null,
    });

    if (open && (!state.detail || state.error)) {
      void this.loadSubsectionDetail(index);
    } else {
      this.update();
    }
  }

  private renderRuleSubsection(index: string, name: string): unknown {
    let state = this.subsectionStates.get(index);
    if (!state) {
      const initialState: SubsectionState = {
        open: false,
        loading: false,
        error: null,
        detail: null,
        abortController: null,
      };
      this.subsectionStates.set(index, initialState);
      state = initialState;
    }

    return html`<li>
      <details
        class="subsection-panel"
        ?open=${state.open}
        @toggle=${(event: Event) => this.handleSubsectionToggle(index, event)}
      >
        <summary>
          <span class="summary-label">${name}</span>
          <span class="subsection-indicator">${state.open ? '▲' : '▼'}</span>
        </summary>
        <div class="subsection-content">
          ${state.loading
            ? html`<p class="loading">Loading subsection…</p>`
            : state.error
            ? html`<p class="error">${state.error}</p>`
            : state.detail
            ? this.renderParagraphs(state.detail.description)
            : html`<p class="placeholder">Open to view subsection details.</p>`}
        </div>
      </details>
    </li>`;
  }

  private renderDetail(detail: SrdCompendiumDetail): unknown {
    switch (detail.type) {
      case 'spell':
        return this.renderSpellDetail(detail);
      case 'equipment':
        return this.renderEquipmentDetail(detail);
      case 'magic-item':
        return this.renderMagicItemDetail(detail);
      case 'feat':
        return this.renderFeatDetail(detail);
      case 'rule':
        return this.renderRuleDetail(detail);
      case 'rule-section':
        return this.renderRuleSectionDetail(detail);
      default:
        return html`<p>No details available.</p>`;
    }
  }

  private renderMetaRow(label: string, value: unknown): unknown {
    if (!value && value !== 0) return null;
    return html`<div class="meta-row"><span class="meta-label">${label}</span><span class="meta-value">${value}</span></div>`;
  }

  private renderParagraphs(text?: string): unknown {
    if (!text) {
      return html`<p class="empty">No narrative information available for this entry.</p>`;
    }
    const blocks = text.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
    return blocks.map((block) => {
      if (/^-\s+/m.test(block)) {
        const items = block
          .split(/\n/)
          .map((line) => line.trim())
          .filter((line) => line.startsWith('- '))
          .map((line) => line.replace(/^-\s*/, ''));
        if (items.length > 0 && items.length === block.split(/\n/).length) {
          return html`<ul>${items.map((item) => html`<li>${item}</li>`)}</ul>`;
        }
      }
      const lines = block.split(/\n/);
      return html`<p>${lines.map((line, index) => (index === 0 ? line : [html`<br />`, line]))}</p>`;
    });
  }

  private renderSpellDetail(detail: SrdSpellDetail): unknown {
    const levelLabel = detail.level === 0 ? 'Cantrip' : `Level ${detail.level}`;
    return html`
      <header>
        <h3>${detail.name}</h3>
        <p class="subtitle">${levelLabel} · ${detail.school}</p>
      </header>
      <div class="meta">
        ${this.renderMetaRow('Casting Time', detail.castingTime)}
        ${this.renderMetaRow('Range', detail.range)}
        ${this.renderMetaRow('Duration', detail.duration)}
        ${this.renderMetaRow('Components', detail.components.join(', '))}
        ${this.renderMetaRow('Ritual', detail.ritual ? 'Yes' : 'No')}
        ${this.renderMetaRow('Concentration', detail.concentration ? 'Yes' : 'No')}
        ${detail.classes.length > 0
          ? this.renderMetaRow('Classes', detail.classes.join(', '))
          : null}
      </div>
      <div class="detail-body">
        ${this.renderParagraphs(detail.description)}
        ${detail.higherLevel ? html`<h4>At Higher Levels</h4>${this.renderParagraphs(detail.higherLevel)}` : null}
      </div>
    `;
  }

  private renderEquipmentDetail(detail: SrdEquipmentDetail): unknown {
    return html`
      <header>
        <h3>${detail.name}</h3>
        <p class="subtitle">${detail.category}</p>
      </header>
      <div class="meta">
        ${this.renderMetaRow('Weapon Category', detail.weaponCategory)}
        ${this.renderMetaRow('Armor Category', detail.armorCategory)}
        ${this.renderMetaRow('Cost', detail.cost)}
        ${this.renderMetaRow('Weight', detail.weight ? `${detail.weight} lb.` : undefined)}
        ${this.renderMetaRow('Damage', detail.damage)}
        ${this.renderMetaRow('Two-Handed Damage', detail.twoHandedDamage)}
        ${this.renderMetaRow('Armor Class', detail.armorClass)}
        ${detail.strengthRequirement
          ? this.renderMetaRow('Strength Requirement', detail.strengthRequirement)
          : null}
        ${detail.stealthDisadvantage !== undefined
          ? this.renderMetaRow('Stealth Disadvantage', detail.stealthDisadvantage ? 'Yes' : 'No')
          : null}
        ${detail.properties && detail.properties.length > 0
          ? this.renderMetaRow('Properties', detail.properties.join(', '))
          : null}
      </div>
      <div class="detail-body">${this.renderParagraphs(detail.description)}</div>
    `;
  }

  private renderMagicItemDetail(detail: SrdMagicItemDetail): unknown {
    return html`
      <header>
        <h3>${detail.name}</h3>
        <p class="subtitle">${detail.category}${detail.rarity ? ` · ${detail.rarity}` : ''}</p>
      </header>
      <div class="meta">
        ${detail.requiresAttunement !== undefined && detail.requiresAttunement !== null
          ? this.renderMetaRow(
              'Requires Attunement',
              typeof detail.requiresAttunement === 'string'
                ? detail.requiresAttunement
                : detail.requiresAttunement
                ? 'Yes'
                : 'No',
            )
          : null}
      </div>
      <div class="detail-body">${this.renderParagraphs(detail.description)}</div>
    `;
  }

  private renderFeatDetail(detail: SrdFeatDetail): unknown {
    return html`
      <header>
        <h3>${detail.name}</h3>
        <p class="subtitle">Feat</p>
      </header>
      <div class="detail-body">${this.renderParagraphs(detail.description)}</div>
    `;
  }

  private renderRuleDetail(detail: SrdRuleDetail): unknown {
    this.prepareSubsections(detail);
    return html`
      <header>
        <h3>${detail.name}</h3>
        <p class="subtitle">Core Rule Reference</p>
      </header>
      <div class="detail-body">${this.renderParagraphs(detail.description)}</div>
      ${detail.subsections && detail.subsections.length > 0
        ? html`<div class="subsections">
            <h4>Subsections</h4>
            <ul>
              ${detail.subsections.map((entry) => this.renderRuleSubsection(entry.index, entry.name))}
            </ul>
          </div>`
        : null}
    `;
  }

  private renderRuleSectionDetail(detail: SrdRuleSectionDetail): unknown {
    return html`
      <header>
        <h3>${detail.name}</h3>
        <p class="subtitle">Rule Section</p>
      </header>
      <div class="detail-body">${this.renderParagraphs(detail.description)}</div>
    `;
  }

  private update(): void {
    if (!this.shadowRoot) return;
    render(this.template(), this.shadowRoot);
  }

  private template(): unknown {
    const selectedCategory = this.getSelectedCategory();
    const entries = selectedCategory ? this.filterEntries(selectedCategory.entries) : [];
    const selectedKey = this.selectedCategory && this.selectedEntry ? `${this.selectedCategory}/${this.selectedEntry}` : null;

    return html`
      <style>
        :host {
          display: block;
          border: 1px solid rgba(255, 210, 164, 0.2);
          border-radius: 18px;
          padding: 1.1rem 1.2rem;
          background: rgba(24, 18, 36, 0.85);
          color: inherit;
          font-size: 0.95rem;
          backdrop-filter: blur(6px);
        }

        h3 {
          margin: 0;
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
        }

        h4 {
          margin: 1rem 0 0.5rem;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          gap: 1rem;
        }

        .status {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .status strong {
          color: #f0b35a;
        }

        .compendium-body {
          display: grid;
          grid-template-columns: 160px 220px minmax(0, 1fr);
          gap: 0.9rem;
        }

        .category-list {
          display: grid;
          gap: 0.4rem;
        }

        .category-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.45rem 0.6rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 210, 164, 0.18);
          background: rgba(16, 12, 24, 0.65);
          color: inherit;
          cursor: pointer;
          font: inherit;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .category-button[selected] {
          border-color: rgba(240, 179, 90, 0.65);
          background: rgba(240, 179, 90, 0.12);
        }

        .category-button span {
          font-size: 0.85rem;
        }

        .category-button .count {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.65);
        }

        .entry-panel {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .search-box input {
          width: 100%;
          padding: 0.4rem 0.6rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 210, 164, 0.2);
          background: rgba(16, 12, 24, 0.75);
          color: inherit;
          font: inherit;
        }

        .entry-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.35rem;
          max-height: 240px;
          overflow-y: auto;
        }

        .entry-button {
          width: 100%;
          text-align: left;
          border: 1px solid transparent;
          border-radius: 8px;
          background: rgba(32, 24, 44, 0.65);
          color: inherit;
          padding: 0.4rem 0.5rem;
          cursor: pointer;
          font: inherit;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .entry-button[selected] {
          border-color: rgba(137, 227, 185, 0.6);
          background: rgba(137, 227, 185, 0.14);
        }

        .entry-button:hover {
          border-color: rgba(137, 227, 185, 0.4);
        }

        .detail-panel {
          border: 1px solid rgba(255, 210, 164, 0.18);
          border-radius: 12px;
          padding: 0.75rem 0.85rem;
          background: rgba(16, 12, 24, 0.6);
          min-height: 280px;
          max-height: 420px;
          overflow-y: auto;
        }

        .subtitle {
          margin: 0.35rem 0 0;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .meta {
          display: grid;
          gap: 0.35rem;
          margin: 0.75rem 0;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 0.2rem;
        }

        .meta-label {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.6);
        }

        .meta-value {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .detail-body {
          display: grid;
          gap: 0.6rem;
          font-size: 0.9rem;
          line-height: 1.45;
        }

        .detail-body ul {
          margin: 0;
          padding-left: 1.1rem;
        }

        .detail-body li {
          margin-bottom: 0.35rem;
        }

        .empty {
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }

        .error {
          color: #f27d72;
          font-size: 0.85rem;
        }

        .loading,
        .placeholder {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .subsections ul {
          padding-left: 1rem;
        }

        .subsections li {
          margin-bottom: 0.25rem;
        }

        .subsection-panel {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 0.45rem 0.6rem;
          background: rgba(32, 24, 44, 0.4);
        }

        .subsection-panel summary {
          cursor: pointer;
          font-weight: 600;
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .subsection-panel summary::-webkit-details-marker,
        .subsection-panel summary::marker {
          display: none;
        }

        .summary-label {
          flex: 1;
        }

        .subsection-indicator {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.65);
        }

        .subsection-panel[open] {
          background: rgba(137, 227, 185, 0.08);
          border-color: rgba(137, 227, 185, 0.35);
        }

        .subsection-content {
          margin-top: 0.5rem;
          display: grid;
          gap: 0.45rem;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .compendium-body {
            grid-template-columns: minmax(0, 1fr);
            grid-auto-flow: row;
          }

          .category-list {
            grid-template-columns: minmax(0, 1fr);
            gap: 0.6rem;
          }

          .category-button,
          .entry-button {
            width: 100%;
            padding: 0.9rem 0.85rem;
          }

          .entry-panel {
            gap: 0.75rem;
          }

          .entry-list {
            max-height: none;
            overflow-y: visible;
            gap: 0.55rem;
          }

          .detail-panel {
            min-height: 0;
            max-height: none;
          }
        }
      </style>
      <div class="header">
        <h2>D&D 5e SRD Reference</h2>
        <div class="status">
          ${this.loading
            ? html`Loading…`
            : html`<span><strong>${this.totalEntries}</strong> entries synchronized</span>`}
        </div>
      </div>
      ${this.error
        ? html`<p class="error">${this.error}</p>`
        : this.categories.length === 0
        ? html`<p class="placeholder">No SRD reference data available.</p>`
        : html`
            <div class="compendium-body">
              <div class="category-list">
                ${this.categories.map(
                  (category) => html`
                    <button
                      class="category-button"
                      ?selected=${category.id === this.selectedCategory}
                      @click=${() => this.handleCategorySelect(category.id)}
                    >
                      <span>
                        ${CATEGORY_ICONS[category.id] ?? '📚'} ${category.label}
                      </span>
                      <span class="count">${category.entries.length}</span>
                    </button>
                  `,
                )}
              </div>
              <div class="entry-panel">
                <div class="search-box">
                  <input
                    type="search"
                    placeholder="Filter entries"
                    .value=${this.filter}
                    @input=${(event: Event) => this.handleFilterInput(event)}
                    ?disabled=${!selectedCategory}
                  />
                </div>
                <ul class="entry-list">
                  ${selectedCategory
                    ? entries.length > 0
                      ? entries.map(
                          (entry) => html`
                            <li>
                              <button
                                class="entry-button"
                                ?selected=${selectedKey === `${selectedCategory.id}/${entry.index}`}
                                @click=${() => this.handleEntrySelect(entry.index)}
                              >
                                ${entry.name}
                              </button>
                            </li>
                          `,
                        )
                      : html`<li class="placeholder">No entries match your filter.</li>`
                    : html`<li class="placeholder">Select a category to browse entries.</li>`}
                </ul>
              </div>
              <div class="detail-panel">
                ${this.detailLoading
                  ? html`<p class="loading">Loading detailed reference…</p>`
                  : this.detailError
                  ? html`<p class="error">${this.detailError}</p>`
                  : this.detail
                  ? this.renderDetail(this.detail)
                  : html`<p class="placeholder">Choose an entry to view its rules text.</p>`}
              </div>
            </div>
          `}
    `;
  }
}

customElements.define('dd-dnd-compendium', DDDndCompendium);
