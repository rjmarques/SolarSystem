# SolarSystem

Not to scale!

# Build steps

The build runs in a docker container for compatibility reasons (old dependencies). The artefacts are commited to GH for simplicity.

```bash
docker build -t rjmarques/solar-system . --output type=tar,dest=dist.tar --target release

tar -xf dist.tar
```

# Deploying to Cloudflare Workers

The site is hosted on Cloudflare Workers using [Static Assets](https://developers.cloudflare.com/workers/static-assets/).
Configuration lives in `wrangler.toml`.

Deploys are automated via GitHub Actions (`.github/workflows/deploy.yml`):
every push to `master` triggers a Docker build of the static assets and then
publishes them to Cloudflare using [`cloudflare/wrangler-action`](https://github.com/cloudflare/wrangler-action).

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN` — a Workers-scoped API token
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID