# Dungeons & Dragons: Chronicles of the Lone Adventurer

A single-player digital tabletop experience that fuses narrative storytelling, tactical combat, and world simulation. The web app is built with TypeScript, Vite, and native Web Components to deliver an immersive D&D-inspired adventure.

## Features

- **Dynamic Narrative Engine** — Branching story nodes with skill checks, faction consequences, quest updates, and achievements tracked through the in-game journal.
- **Turn-based Combat** — Lightweight d20 combat system with initiative-style turns, critical hits, defensive stances, consumables, and combat logs.
- **Rich Character Sheet** — Live-updating attributes, skills, health, inventory, faction reputation, and badge progress.
- **Atlas & Journal** — Interactive map of discovered regions plus a timeline feed of major choices and rolls.
- **Quest Tracker & Achievements** — Color-coded quest states, faction tags, and a badge grid celebrating milestone unlocks.
- **Ambient Audio & Toasts** — Minimalist synthesised ambience, dice-roll stingers, and celebratory cues powered by the Web Audio API.
- **Auto-Save Persistence** — Progress, map discoveries, and achievements store to localStorage so you can pause and resume.
- **Modular Story Data** — Author new adventures by extending `story-data.ts` and the supporting codex.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to play. The Chronicle auto-saves locally—use the control bar to restart whenever you want a fresh run.

To produce a static build:

```bash
npm run build
```

The compiled assets output to `dist/`.

## Project Structure

```
apps/chronicles/
  index.html          # App entry point
  src/
    main.ts           # Registers Web Components
    components/       # UI building blocks (story, dialogue, map, sheet, quests, achievements, combat, toasts)
    game/             # Narrative data, world state, atlas, achievements, dice, audio controller
    styles/           # Global theme styling
```

## Authoring Tips

- Story nodes live in `story-data.ts`. Each node defines narrative text, choices, optional encounters, and entry hooks for quest or faction changes.
- Extend `codex.ts` with new items, then reference them by `itemId` in story rewards.
- Game state utilities (`world.ts`) handle dice rolls, combat resolution, quest progression, and notifications.
- All UI pieces are Web Components; add new panels by defining a component and registering it in `main.ts`.

Enjoy forging your own chronicle as the Lone Adventurer!
