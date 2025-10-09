# Dragon's Ledger Web Components

A native web component library for the Dragon's Ledger UI kit. Components ship as ESM modules built with Lit and expose a loader that registers all custom elements with shared theming, icons, and optional helpers.

## Getting Started

```bash
pnpm add @solo/dd-wc
```

```ts
import '@solo/dd-wc/register-all';
import '@solo/dd-wc/dd-ui.css';
```

The loader automatically registers:

- `<dd-button>`
- `<dd-tabs>` with `<dd-tab>` panels
- `<dd-modal>`
- `<dd-toast>` helper with `DdToast.show()`
- `<dd-dialogue-list>`
- `<dd-quest-tracker>`
- `<dd-character-sheet>`
- `<dd-combat-hud>`
- `<dd-achievement-badge>`

Use the exported types to strongly type data objects (`QuestItem`, `CharacterSheetData`, `CombatHudState`, etc.).

## Theming

`ThemeController` injects the shared design tokens and global rules via `adoptedStyleSheets` when available. You can apply it manually to additional roots:

```ts
import { ThemeController, tokensCss, globalStyles } from '@solo/dd-wc';

const theme = new ThemeController(tokensCss, globalStyles);
theme.applyToRoot(shadowRoot);
```

A prebuilt stylesheet (`@solo/dd-wc/dd-ui.css`) is also published for light DOM styling.

## Demo

A sample app lives in `apps/demo` (Vite). Run it locally with:

```bash
pnpm install
pnpm --filter dd-ui-demo dev
```

The demo showcases theme switching, modal focus trapping, toast notifications, dialogue hotkeys, and the combat HUD layout.
