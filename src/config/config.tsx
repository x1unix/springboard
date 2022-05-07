const configUrl = '/config/config.json';

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

export const extrapolateUrl = (val: string) => val.replaceAll('{hostname}', window.location.hostname)

export const fetchConfig = () => (
  fetch(configUrl).then(rsp => {
    switch (rsp.status) {
      case 404:
        return Promise.reject('Config not found. Please create a new config file at "config/config.json"');
      case 200:
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
