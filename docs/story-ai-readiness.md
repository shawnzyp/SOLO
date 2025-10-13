# Arcane Storyteller readiness checklist

The Arcane Storyteller UI and client wiring are in place, but a few operational tasks remain before designers can rely on the AI beat generator during playtests. Use this checklist to finish the rollout.

## 1. Provision an LLM bridge that returns the expected JSON payload

The front-end sends `POST` requests to `VITE_STORY_AI_ENDPOINT` with a chat-style payload and expects either a `content` string containing JSON or a `data` object shaped like the `RemoteStoryPayload` interface. 【F:src/systems/generative.ts†L87-L164】【F:src/systems/generative.ts†L253-L344】 To make this work in production you still need to expose an HTTPS endpoint (serverless function, small Node service, etc.) that:

- Accepts the request schema produced in `requestRemoteStory`.
- Calls your chosen model (OpenAI, Azure, local inference) and prompts it to reply with the documented JSON fields (`title`, `summary`, `body`, optional `background`, `choices`, etc.).
- Returns `{ content: '<json string>' }` or `{ data: { ... } }` so the client parser can succeed.
- Sets CORS headers to allow the browser app to reach it directly, or alternatively lives on the same origin as the game client.

### Suggested bridge outline

```ts
// example Express handler
app.post('/api/story', async (req, res) => {
  const completion = await openai.chat.completions.create({
    model: process.env.MODEL,
    response_format: { type: 'json_object' },
    messages: req.body.messages,
    temperature: req.body.temperature ?? 0.9,
  });

  const content = completion.choices[0]?.message?.content;
  res.json({ content, model: completion.model });
});
```

The built-in fallback oracle will keep functioning while you get the bridge online, but without the bridge every "Summon Story Beat" call will use the procedural backup logic. 【F:src/systems/generative.ts†L166-L217】

## 2. Configure runtime environment variables

Add a `.env` (or `.env.local`) file at the project root with the model and endpoint you provisioned. Vite only exposes variables prefixed with `VITE_`, so follow this format:

```bash
VITE_STORY_AI_ENDPOINT="https://your-domain.example/api/story"
VITE_STORY_AI_API_KEY="<optional token to forward to your bridge>"
VITE_STORY_AI_MODEL="gpt-4o-mini"
```

- `VITE_STORY_AI_ENDPOINT` is required for remote generation; without it the UI will continue to report that the built-in oracle is active. 【F:src/components/root.ts†L772-L815】
- `VITE_STORY_AI_API_KEY` is optional and simply forwards the value as a Bearer token header if your bridge needs authentication. 【F:src/systems/generative.ts†L288-L314】
- `VITE_STORY_AI_MODEL` defaults to `gpt-4o-mini`, but you can override it to match the deployed model name expected by your bridge. 【F:src/systems/generative.ts†L69-L72】

Remember to restart `npm run dev` after changing environment variables.

## 3. Verify the end-to-end flow

Once the bridge and env vars are in place:

1. Create a hero and enter the story so `World.improviseNarrative` can capture a full context payload. 【F:src/systems/world.ts†L210-L244】
2. Open the Arcane Storyteller panel, enter a prompt, and click **Summon Story Beat**.
3. Confirm that the toast message reports the correct origin/model, and that returning choices in the generated node route the story as expected. 【F:src/components/root.ts†L1320-L1351】【F:src/systems/world.ts†L228-L247】
4. Reload the page to ensure persistence falls back to the last authored node instead of leaving the player stranded on ephemeral content. 【F:src/systems/world.ts†L551-L579】

## 4. Curate the built-in oracle for offline play

You can continue rolling out the Arcane Storyteller without provisioning an API. The fallback generator now assembles beats from blueprint tables that live entirely in the client, tailoring prose and skill challenges to the current hero and location.

- Extend the `ORACLE_BLUEPRINTS` data with campaign-specific `titleTemplates`, `openings`, `skillChallenges`, and reward hooks. 【F:src/data/story-oracle.ts†L1-L214】
- The selector favors blueprints matching the hero class, background, or node tags before falling back to the wandering muse defaults. 【F:src/systems/generative.ts†L214-L306】
- Palettes, motifs, and local choice text are merged into the UI without any network request, so you can tune tone purely through data updates. 【F:src/data/story-oracle.ts†L17-L214】【F:src/systems/generative.ts†L308-L420】
- Test the offline path by omitting `VITE_STORY_AI_ENDPOINT`; the storyteller will surface these oracle-driven beats, complete with return routes and skill checks. 【F:src/systems/generative.ts†L100-L119】【F:src/systems/generative.ts†L338-L420】

## 5. Optional polish before wider testing

- Surface the abort/cancel affordance in the UI if you expect slow models. The plumbing (`aiAbortController`) already exists; wiring a "Cancel Summon" button to `this.aiAbortController?.abort()` would finish the UX. 【F:src/components/root.ts†L210-L259】
- Log remote failures centrally (Sentry, console batching) so narrative designers can spot prompt/response issues quickly.
- Extend the fallback story tables with campaign-specific hooks or ensure module data includes custom returns so improvised beats route back into authored content cleanly. 【F:src/systems/generative.ts†L102-L155】

Completing the checklist above will make the Arcane Storyteller feature production-ready for your team.
