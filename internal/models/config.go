package models

import "encoding/json"

type Config struct {
	Title      string `json:"title,omitempty"`
	Groups     Menu   `json:"groups,omitempty"`
	Background struct {
		URL   string          `json:"url,omitempty"`
		Style json.RawMessage `json:"style,omitempty"`
	}
}

