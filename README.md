# SolarSystem

Not to scale!

## Deployment

The site is hosted on Cloudflare Workers using
[Static Assets](https://developers.cloudflare.com/workers/static-assets/).
Configuration lives in `wrangler.toml`.

Deploys are fully automated via GitHub Actions
(`.github/workflows/deploy.yml`): every push to `master` triggers a Docker
build of the static assets and then publishes them to Cloudflare using
[`cloudflare/wrangler-action`](https://github.com/cloudflare/wrangler-action).

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN` — a Workers-scoped API token
- `CLOUDFLARE_ACCOUNT_ID` — the target Cloudflare account ID

## Building locally

The project still uses Angular 4 / Webpack 2, which don't install cleanly on
modern Node. The build therefore runs inside a Docker container that pins to
Node 9. To produce a local `dist/`:

```bash
docker build -t rjmarques/solar-system . --output type=tar,dest=dist.tar --target release
tar -xf dist.tar
```

`dist/` is intentionally not committed — CI rebuilds it on every deploy and it
is the only source of truth for production artifacts.
