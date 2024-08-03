# SolarSystem

Not to scale!

# Build steps

The build runs in a docker container for compatibility reasons (old dependencies). The artefacts are commited to GH for simplicity.

```bash
docker build -t rjmarques/solar-system . --output type=tar,dest=dist.tar --target release

tar -xf dist.tar
```