package config

import (
	"errors"
	"flag"
	"fmt"
	"os"

	docker "github.com/docker/docker/client"
)

type Config struct {
	DockerSocketPath string
	MenuFile         string
	ListenAddr       string
}

// UseDocker returns whether Docker integration should be used instead of entries config file.
func (cfg Config) UseDocker() bool {
	return cfg.MenuFile == ""
}

func (cfg Config) DockerClient() (*docker.Client, error) {
	if _, err := os.Stat(cfg.DockerSocketPath); err != nil {
		if errors.Is(err, os.ErrNotExist); err != nil {
			return nil, fmt.Errorf("socket file doesn't exist: %w", err)
		}

		return nil, fmt.Errorf("socket file not accessible: %w", err)
	}

	return docker.NewClientWithOpts(
		docker.WithAPIVersionNegotiation(),
		docker.WithTLSClientConfigFromEnv(),
		docker.WithHost("unix://"+cfg.DockerSocketPath))
}

func ConfigFromFlags() Config {
	cfg := Config{
		DockerSocketPath: "/var/run/docker.sock",
		ListenAddr:       ":8080",
	}

	bindEnvVar("LISTEN_ADDR", &cfg.ListenAddr)
	bindEnvVar("DOCKER_SOCK", &cfg.DockerSocketPath)
	bindEnvVar("ENTRIES_FILE", &cfg.MenuFile)

	flag.StringVar(&cfg.ListenAddr, "listen", cfg.ListenAddr, "HTTP listen address")
	flag.StringVar(&cfg.DockerSocketPath, "docker-sock", cfg.DockerSocketPath, "Docker socket path (DOCKER_SOCK) to pull menu from container labels.")
	flag.StringVar(&cfg.MenuFile, "menu-file", cfg.MenuFile, "Manual menu file path")
	flag.Parse()

	return cfg
}

func bindEnvVar(name string, dst *string) {
	v, ok := os.LookupEnv(name)
	if ok {
		*dst = v
	}
}
