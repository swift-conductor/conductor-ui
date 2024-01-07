# Swift Conductor UI Docker Image

## Build

```bash
docker build \
    --file docker/Dockerfile \
    --build-arg WF_SERVER="http://localhost:8080" \
    --tag swift-conductor:ui \
    .
```

## Run

Make sure you have the Swift Conductor server running on http://localhost:8080.

```bash
docker run --detach \
    --name swift-conductor-ui \
    --publish 5000:5000 \
    swift-conductor:ui 
```

## Using `docker-compose`

Alternatively you can build run using `docker-compose`

### Build

```bash
docker-compose --file docker/docker-compose.yaml build
```

### Run

Make sure you have the Swift Conductor server running on http://localhost:8080.

```bash
docker-compose --file docker/docker-compose.yaml up --detach
```
           