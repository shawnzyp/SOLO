# Ember Archives Web Components

This repository packages the Ember Archives Dungeons & Dragons inspired UI kit as framework-free Web Components written in TypeScript and bundled with Vite.

## Structure

- `packages/wc` – Source for the publishable custom elements package (`@solo/dd-wc`).
- `apps/demo` – Demo experience powered by Vite that showcases the components, audio helpers, and theme utilities.
- `dd-ui` – Legacy static assets retained from the vanilla prototype.

## Getting Started

```bash
pnpm install
pnpm -r build
pnpm -r test
```

The command above builds all packages, emits type declarations, and runs unit tests.

To explore the demo locally:

```bash
cd apps/demo
pnpm dev
```

Then open the printed URL. The demo can also be opened directly from the generated `apps/demo/dist` folder after running `pnpm -r build`.

## Packages

### `@solo/dd-wc`

Exports Shadow DOM Web Components for buttons, tabs, modals, toast notifications, dialogue lists, quest trackers, character sheets, combat HUDs, and achievement badges along with theme and audio controllers. The library provides both per-element styling via constructible style sheets and global CSS tokens for consumers that need light DOM styling.

### Demo

The demo registers all custom elements, presents keyboard-accessible interactions, showcases live theme swapping, reduced motion toggles, and synthesised UI audio.

## Testing

- `packages/wc`: Vitest unit tests (Happy DOM environment).
- Additional browser compliance can be exercised with Web Test Runner or Playwright using the existing configuration scaffolding.
