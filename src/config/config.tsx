import ConfigNotFoundError from "./error";

const configUrl = '/config/config.json';
const isDevMode = process.env['NODE_ENV'] === 'development';

export type ShortcutGroups = { [name: string]: Shortcut[] }

export interface Shortcut {
  iconUrl?: string;
  title: string;
  description?: string;
  url: string;
}

export interface Config {
  title: string;
  background?: {
    url: string | string[];
    blur?: string;
    opacity?: string;
  }
  groups?: ShortcutGroups
}

export const getConfigUrl = () => {
  const { host, protocol } = window.location;
  return `${protocol}//${host}${configUrl}`;
};

export const extrapolateUrl = (val: string) => val.replaceAll('{hostname}', window.location.hostname)

const isContentTypeValid = (rsp: Response) => {
  const header = rsp.headers.get('Content-Type');
  if (!header) {
    return false;
  }

  const [contentType] = header?.split(';');
  return contentType === 'application/json';
};

export const fetchConfig = () => (
  fetch(configUrl).then(rsp => {
    switch (rsp.status) {
      case 404:
        return Promise.reject(new ConfigNotFoundError());
      case 200:
        // webpack-dev-server always returns index page and 200 OK
        if (isDevMode && !isContentTypeValid(rsp)) {
          return Promise.reject(new ConfigNotFoundError());
        }

        return rsp.json();
      default:
        return Promise.reject(`Bad response: ${rsp.status} ${rsp.statusText}`);
    }
  })
);

const getWallpaperUrl = (url?: string | string[]) => {
  if (!url) return;
  if (Array.isArray(url)) {
    const item = url[Math.floor(Math.random() * url.length)];
    return `url(${item})`;
  }

  return `url(${url})`;
}

export const getBackgroundStyles = (cfg?: Config): React.CSSProperties | undefined => {
  if (!cfg) {
    return;
  }

  try {
    const { background } = cfg;
    if (!background?.url) {
      return;
    }

    return {
      backgroundImage: getWallpaperUrl(background?.url),
      filter: background?.blur ? `blur(${background.blur})` : 'none',
      opacity: background?.opacity ?? '1',
    };
  } catch (err) {
    console.error('Failed to process background styles from config:', err);
    return;
  }
};
