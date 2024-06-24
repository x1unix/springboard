package main

import (
	"context"
	"log"
	"os"
	"os/signal"

	"github.com/x1unix/springboard/internal/config"
)

func main() {
	if err := run(); err != nil {
		log.Fatalln("Error: ", err)
	}
}

func run() error {
	ctx, cancelFn := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancelFn()

	cfg := config.ConfigFromFlags()

}
