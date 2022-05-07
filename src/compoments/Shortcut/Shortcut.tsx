import React from 'react';
import './Shortcut.scss';

const fallbackImage = '/img/logo96.png';

interface Props {
  title: string
  subTitle?: string
  href: string;
  iconUrl?: string
}

const Shortcut: React.FC<Props> = ({ title, subTitle, href, iconUrl }) => (
  <a
    className="Shortcut"
    href={href}
    target="_blank"
    rel="noreferrer"
    title={subTitle ?? title}
  >
    <span className="Shortcut__frame">
      <img
        className="Shortcut__icon"
        src={iconUrl ?? fallbackImage}
        alt={title}
      />
    </span>
    <span className="Shortcut__info">
      <b className="Shortcut__title">
        <span>{title}</span>
      </b>
      <p className="Shortcut__subTitle">
        <span>{subTitle}</span>
      </p>
    </span>
  </a>
);

export default Shortcut;
