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

```bash
docker run --detach \
    --name swift-conductor-ui \
    --publish 5000:5000 \
    --env "WF_SERVER=http://localhost:8080" \
    swift-conductor:ui 
```

## Using `docker-compose`

Alternatively you can build run using `docker-compose`

### Build

```bash
cd docker
docker-compose build
```

### Run

```bash
cd docker
docker-compose up --detach 
```

            