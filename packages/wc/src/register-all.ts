import { ThemeController } from './styles/theme-controller';
import { tokensCss } from './styles/tokens-css';
import { globalStyles } from './styles/theme';
import { ensureSprite } from './icons/register-sprite';
import { DdButton } from './components/dd-button';
import { DdTabs } from './components/dd-tabs';
import { DdTab } from './components/dd-tab';
import { DdModal } from './components/dd-modal';
import { DdToast } from './components/dd-toast';
import { DdDialogueList } from './components/dd-dialogue-list';
import { DdQuestTracker } from './components/dd-quest-tracker';
import { DdCharacterSheet } from './components/dd-character-sheet';
import { DdCombatHud } from './components/dd-combat-hud';
import { DdAchievementBadge } from './components/dd-achievement-badge';

const theme = new ThemeController(tokensCss, globalStyles);
theme.applyToRoot(document);
ensureSprite(document);

const registry: Array<[string, CustomElementConstructor]> = [
  ['dd-button', DdButton],
  ['dd-tabs', DdTabs],
  ['dd-tab', DdTab],
  ['dd-modal', DdModal],
  ['dd-toast', DdToast],
  ['dd-dialogue-list', DdDialogueList],
  ['dd-quest-tracker', DdQuestTracker],
  ['dd-character-sheet', DdCharacterSheet],
  ['dd-combat-hud', DdCombatHud],
  ['dd-achievement-badge', DdAchievementBadge]
];

for (const [tag, ctor] of registry) {
  if (!customElements.get(tag)) {
    customElements.define(tag, ctor);
  }
}

export * from './index';
