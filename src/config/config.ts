import { CSSProperties } from "react";
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
    style?: CSSProperties;
  }
  groups?: ShortcutGroups
  style?: CSSProperties;
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
