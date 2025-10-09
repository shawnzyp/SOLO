# Ember Archives UI Kit

This package delivers a Dungeons & Dragons inspired interface system optimised for a solo RPG experience. Drop the folder into any static web server or open `index.html` directly to explore the full component gallery.

## Getting Started

1. Copy the entire `dd-ui/` directory into your project.
2. Open `index.html` in a modern desktop or mobile browser to preview the kit.
3. Reference the CSS and JS assets in your vanilla JS project as needed. All code is framework-free and requires no build tooling.

## Contents

- `tokens.json` – source-of-truth design tokens.
- `tokens.css` – generated CSS custom properties.
- `theme.css` – global typography, surfaces, and utility rules.
- `motion.css` – animation keyframes with reduced-motion safeguards.
- `components/` – HTML snippets, scoped CSS, and enhancement scripts for each UI element.
- `icons.svg`, `svg/`, `png/` – iconography in sprite, vector, and bitmap placeholder formats.
- `backgrounds/` – scene placeholders for parallax, hero, and tile usage (replace with production artwork).
- `audio/` – textual stubs describing audio cues (supply real audio during integration).
- `audio.json` – metadata mapping for the audio helper.
- `index.html` – demo hub showcasing the complete kit.

## Usage Notes

- **Themes**: Toggle between Dark, Parchment, and High Contrast via `data-theme` attributes on the `<html>` element. Tokens provide additional values for fine-grained theming.
- **Components**: Each component is self-contained. Copy the HTML, include the paired CSS/JS files, and adjust copy or data attributes.
- **Icons**: Use `<svg><use href="icons.svg#icon-id"></use></svg>` to embed from the sprite. Export PNGs by rendering the vector files; placeholders are provided due to binary file restrictions.
- **Backgrounds & Audio**: The included files are descriptive placeholders to honour the “no binary files” requirement. Replace them with your own optimised assets in production.
- **Accessibility**: All interactive controls expose ARIA metadata, support keyboard navigation, and maintain WCAG AA/AAA contrast targets. Modals trap focus, toasts announce via live regions, and command palette honours <kbd>⌘/Ctrl + K</kbd>.

## Customisation Tips

- Extend tokens by editing `tokens.json` and regenerating `tokens.css` to maintain parity.
- Add new component variants by following the scoped CSS pattern; avoid global collisions by namespacing with the component prefix.
- Integrate real audio by replacing the placeholder files while keeping filenames consistent for the audio helper.
- Swap background imagery by exporting layered assets that match the naming convention (`*-tile`, `*-hero`, `*-parallax-fg`, `*-parallax-bg`).

## Licensing

All code and vector assets in this package are provided under the MIT License. Replace placeholder imagery and audio with properly licensed production assets before shipping.
