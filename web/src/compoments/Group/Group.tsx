import React, { ReactNode } from 'react';
import clsx from 'clsx';
import './Group.scss';

interface Props {
  title: string
  children?: ReactNode[] | ReactNode
  vertical?: boolean
}

const Group: React.FC<Props> = ({ title, children, vertical }) => (
  <div className={clsx('Group', { 'Group--horizontal': vertical })}>
    <span className="Group__title">
      {title}
    </span>
    <ul className="Group__items">
      {Array.isArray(children) ? children?.map((ch, i) => (
        <li className="Group__item" key={i}>{ch}</li>
      )) : (
        <li className="Group__item">
          {children}
        </li>
      )}
    </ul>
  </div>
);

export default Group;
