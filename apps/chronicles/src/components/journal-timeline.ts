import { WorldComponent } from './world-component';

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export class JournalTimeline extends WorldComponent {
  connectedCallback(): void {
    if (!this.isConnected) return;
    if (!this.hasChildNodes()) {
      this.innerHTML = `
        <h2>Chronicle</h2>
        <ol class="timeline"></ol>
      `;
    }
    super.connectedCallback();
  }

  protected render(): void {
    if (!this.state) return;
    const list = this.querySelector('.timeline');
    if (!list) return;

    list.innerHTML = this.state.journal
      .slice(0, 8)
      .map(
        (entry) => `
          <li>
            <span class="time">${formatTime(entry.timestamp)}</span>
            <span class="event">${entry.text}</span>
          </li>
        `,
      )
      .join('');
  }
}

customElements.define('dd-journal-timeline', JournalTimeline);
