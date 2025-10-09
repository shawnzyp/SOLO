# Dragon's Ledger UI Kit

Dragon's Ledger is a framework-free Dungeons & Dragons inspired UI design kit ready for drop-in use within vanilla JavaScript projects. Open `index.html` locally to explore the full component showcase, theme switcher, audio cues, and responsive layouts.

## Getting Started

1. Copy the entire `dd-ui` folder into your project.
2. Open `index.html` in any modern browser to review the showcase and design references.
3. Include `tokens.css`, `theme.css`, and `motion.css` in your project entry point. Components ship with their own scoped CSS/JS files—import only what you use for optimal weight.
4. Synth audio helpers are optional; remove `components/audio.js` if your experience does not require sound.

## Theming

* Global tokens are defined in `tokens.json` and exported as CSS variables in `tokens.css`.
* `theme.css` sets light, dark, and high-contrast variants. Switch themes by toggling `data-theme` on `<html>`.
* Motion rules live in `motion.css` with automatic reductions when `prefers-reduced-motion` is enabled.

## Components

Components live in `components/` as HTML, CSS, and minimal JavaScript. Each snippet is accessible-first with ARIA roles, keyboard navigation, and fallbacks. Combine them to compose dashboards, in-game HUDs, and menu flows.

## Assets

* Icons: SVG sprites (`icons.svg`) and individual files (`svg/`). Generate PNGs as needed from the source vectors.
* Backgrounds: Procedural gradient recipes defined in `backgrounds/presets.json`. The demo applies them at runtime to hero, panel, and parallax layers without image downloads.
* Audio: Short cues are synthesized on demand by `components/audio.js` using the parameter map in `audio/audio.json`.

All assets were generated exclusively for this kit and are released under the MIT License unless noted.

## Accessibility

* Color contrast meets WCAG AA/AAA targets for text and controls.
* Components support keyboard navigation, `focus-visible` styling, and ARIA live regions for dynamic updates.
* Modals include focus traps with escape-to-close support. Toasts and achievements announce updates via polite live regions.
* Audio helper (`components/audio.js`) respects mute toggles and system reduced audio preferences.

## Performance Notes

* Demo scripts defer background swaps and audio synthesis until you interact with controls.
* CSS and JS are modular; import only what you need to stay within payload targets.
* Gradient-based textures keep the kit free of binary assets while preserving a high-fidelity presentation.

## Licensing

All code, SVGs, procedural background definitions, and synthesized audio recipes were created specifically for this package and are released under the MIT License. No third-party dependencies are required at runtime.
