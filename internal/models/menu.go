package models

type MenuEntry struct {
	IconURL     string `json:"iconUrl,omitempty"`
	Title       string `json:"title,omitempty"`
	Description string `json:"description,omitempty"`
	URL         string `json:"url,omitempty"`
}

type Menu map[string][]MenuEntry
