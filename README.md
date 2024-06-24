# Springboard

[![Docker Hub](https://img.shields.io/docker/pulls/x1unix/springboard.svg)](https://hub.docker.com/r/x1unix/springboard)
[![Docker Hub](https://img.shields.io/docker/v/x1unix/springboard.svg?sort=semver)](https://hub.docker.com/r/x1unix/springboard)
[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

Simple and configurable services dashboard for server and IoT infrastructure.

![preview](docs/screenshot.png)

## Usage

### Docker

Project provides a simple HTTP server based on [static-file-server](https://hub.docker.com/r/halverneus/static-file-server/) Docker image.

Just create a new config from [example](config/config.example.json) and mount it as `/var/www/config/config.json`.

```yaml
services:
  dashboard:
    image: x1unix/springboard # or ghcr.io/x1unix/springboard/springboard:latest
    volumes:
      ./config:/var/www/config
    ports:
      - '8080:8080'
```

### Standalone

This project can be easily served as a directory via any other HTTP server.

* Grab the latest release from [here](https://github.com/x1unix/springboard/releases/latest).
* Copy and edit default config file (see [docs](docs/config.md)).
* Serve the folder contents using your favorite web server (e.g. Nginx).
