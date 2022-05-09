# Configuration

Configuration file should be in JSON format and accessible at path `/config/config.json`.

## Root structure

| Key | Type | Description |
| --- | ---- | ----------- |
| `title` | `string` | Dashboard title |
| `background` | `object` | Background URL and styles (optional) |
| `groups` | `object` | Key-value pair of category name and items |

### Background configuration

| Key | Type | Description |
| --- | ---- | ----------- |
| `url` | `string | string[]` | Background image URL or array of URLs. Image will be selected randomly. |
| `style` | `object` | Custom CSS styles for background. CSS property name should be in camelCase. |

### Categories and items configuration

Items are grouped into categories in dictionary object.

Object key is category name and value is array of items.

**Item object properties:**

| Key | Type | Description |
| --- | ---- | ----------- |
| `iconUrl` | `string` | Item icon URL |
| `title` | `string` | Item title |
| `description` | `string` | Item description |
| `url` | `string` | Link URL |
