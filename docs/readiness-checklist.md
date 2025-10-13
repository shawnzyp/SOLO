# Readiness Checklist: Arcane Storyteller Oracle Workflow

Use this checklist to curate and validate the offline oracle experience before shipping a build. The steps focus on data-only customization so teams without access to an external LLM endpoint can still craft rich improvisational beats.

## 1. Configure Blueprint Data
- [ ] Review the `src/data/oracle-blueprints.ts` library and duplicate an existing blueprint as a starting point.
- [ ] Update `titleTemplates`, `summaryTemplates`, and `paragraphTemplates` to reflect the campaign tone.
- [ ] Populate `classHooks` and `backgroundHooks` to give each hero archetype a bespoke paragraph or summary tag.
- [ ] Ensure every blueprint defines a `safeReturnNode` that leads back to a canonical story node such as `tavern-common-room`.

## 2. Author Oracle Choices
- [ ] Provide at least three `choices` per blueprint, mixing descriptive beats with optional skill challenges.
- [ ] When defining a skill challenge, include balanced `successTemplates` and `failureTemplates` so both outcomes add flavor to the journal.
- [ ] Verify that at least one choice sets `ensureReturn: true` or an explicit `toNode` to prevent dead ends.

## 3. Test Offline Generation
- [ ] Launch the app without setting any `VITE_ARCANE_STORYTELLER_*` environment variables.
- [ ] In the Arcane Storyteller panel, try multiple prompts for each hero class and background combination.
- [ ] Confirm that every generated scene adds a journal entry, appears on the node map, and offers a path back to authored content.

## 4. Validate Persistence Hygiene
- [ ] Refresh the browser after generating a few oracle scenes and confirm the session restores without console errors.
- [ ] Inspect `localStorage` for the `dd-chronicles-world` key to ensure generated nodes serialize cleanly with `origin` metadata.

## 5. Optional: Wire a Remote Endpoint
- [ ] If an external LLM endpoint is available, set `VITE_ARCANE_STORYTELLER_URL` (and optional `KEY` / `MODEL`) in your environment.
- [ ] Trigger a few remote improvisations and watch the status badge report "Remote oracle replied".
- [ ] Fallback to offline mode by temporarily clearing the endpoint variable and verifying the panel reports "Offline oracle spun this tale.".

Completing this checklist keeps the offline oracle ready for content updates and ensures generated scenes remain safe for playtest saves.
