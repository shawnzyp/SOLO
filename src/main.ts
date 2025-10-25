import './styles/global.css';

function renderUnsupportedBrowserMessage(): void {
  if (typeof document === 'undefined') return;

  if (document.body.querySelector('.unsupported-browser-notice')) {
    return;
  }

  const container = document.createElement('div');
  container.className = 'unsupported-browser-notice';
  container.innerHTML = `
    <style>
      .unsupported-browser-notice {
        max-width: 520px;
        margin: 4rem auto;
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: linear-gradient(180deg, #1f172e, #120c1c);
        color: #f7f2ea;
        font-family: 'Lora', 'Georgia', serif;
        text-align: center;
        box-shadow: 0 18px 34px rgba(0, 0, 0, 0.45);
      }

      .unsupported-browser-notice h1 {
        margin: 0 0 0.75rem;
        font-family: 'Cinzel', 'Times New Roman', serif;
        font-size: 1.6rem;
        letter-spacing: 0.08em;
      }

      .unsupported-browser-notice p {
        margin: 0.5rem 0;
        line-height: 1.6;
        color: rgba(247, 242, 234, 0.85);
      }
    </style>
    <h1>Browser Not Supported</h1>
    <p>
      This adventure requires a modern browser with support for Web Components and the Shadow DOM.
      Please update your browser or try launching the application in the latest version of
      Chrome, Edge, Firefox, or Safari.
    </p>
  `;

  const rootElement = document.querySelector('dd-root');
  if (rootElement) {
    rootElement.replaceWith(container);
  } else {
    document.body.appendChild(container);
  }
}

const supportsCustomElements =
  typeof window !== 'undefined' &&
  'customElements' in window &&
  typeof window.customElements.define === 'function';

const supportsShadowDom =
  typeof HTMLElement !== 'undefined' &&
  typeof HTMLElement.prototype.attachShadow === 'function';

if (supportsCustomElements && supportsShadowDom) {
  void import('./components/root');
} else {
  renderUnsupportedBrowserMessage();
}
