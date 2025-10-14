# Dungeons & Dragons Chronicles

This project is built with [Vite](https://vitejs.dev/) and publishes compiled assets to the `docs/` directory for static hosting platforms such as GitHub Pages or Netlify.

## Local Development

```bash
npm install
npm run dev
```

## Building for Deployment

The compiled site must be generated before deploying so that hosting platforms serve the optimized assets from `docs/`.

```bash
npm ci
npm run build
```

These commands are used by the automated deployment workflow and should be executed manually before pushing or uploading the contents of `docs/` to your hosting target.

## Automated Deployments

Pushes to `main` trigger the **Build and Deploy Docs** GitHub Actions workflow, which runs `npm ci`, builds the site, and publishes the resulting `docs/` directory to GitHub Pages.

For Netlify or other platforms, set the build command to `npm run build` and the publish directory to `docs/` so deployments serve the compiled assets.
