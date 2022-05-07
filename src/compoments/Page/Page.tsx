import React, { PropsWithChildren } from 'react';
import './Page.scss';

interface Props {
  title: string
}

const Page: React.FC<PropsWithChildren<Props>> = ({ children, title }) => (
  <div className="Page">
    <h1 className="Page__title">
      {title}
    </h1>
    <div className="Page__items">
      {children}
    </div>
  </div>
);

export default Page;
