import React from 'react';
import { Config } from '../../config/config';
import './Background.css';

type BackgroundConfig = Config['background'];

interface Props {
  config?: BackgroundConfig
}

const isObject = (val: any) => val?.__proto__ === Object.prototype;

const getWallpaperUrl = (url?: string | string[]) => {
  if (!url) return;
  if (Array.isArray(url)) {
    const item = url[Math.floor(Math.random() * url.length)];
    return `url(${item})`;
  }

  return `url(${url})`;
}

export const getBackgroundStyles = (cfg?: BackgroundConfig): React.CSSProperties | undefined => {
  if (!cfg) {
    return;
  }

  try {
    if (!cfg?.url) {
      return;
    }

    const { url, blur, opacity, style } = cfg;
    const css = {
      backgroundImage: getWallpaperUrl(url),
      filter: blur ? `blur(${blur})` : 'none',
      opacity: opacity ?? '1',
    };

    return style && isObject(style) ? { ...css, ...style } : css;
  } catch (err) {
    console.error('Failed to process background styles from config:', err);
    return;
  }
};

const Background: React.FC<Props> = ({ config }) => {
  return (
    <div
      className="Background"
      style={getBackgroundStyles(config)}
    />
  );
};

export default Background;
