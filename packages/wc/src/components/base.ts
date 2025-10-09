import { LitElement } from 'lit';
import { ThemeController } from '../styles/theme-controller';
import { tokensCss } from '../styles/tokens-css';
import { globalStyles } from '../styles/theme';
import { ensureSprite } from '../icons/register-sprite';

const theme = new ThemeController(tokensCss, globalStyles);

export class DdElement extends LitElement {
  constructor() {
    super();
    this.addEventListener('focusin', () => ensureSprite());
  }

  protected createRenderRoot(): ShadowRoot {
    const root = super.createRenderRoot() as ShadowRoot;
    theme.applyToRoot(root);
    ensureSprite(document);
    return root;
  }
}
