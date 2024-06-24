import React, { CSSProperties, PropsWithChildren } from 'react';
import './Page.scss';

interface Props {
  title: string
  style?: CSSProperties
}

const Page: React.FC<PropsWithChildren<Props>> = ({ children, title, ...props }) => (
  <div className="Page" {...props}>
    <h1 className="Page__title">
      {title}
    </h1>
    <div className="Page__items">
      {children}
    </div>
  </div>
);

export default Page;
