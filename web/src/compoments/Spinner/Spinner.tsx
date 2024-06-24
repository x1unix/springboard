import clsx from 'clsx';
import React from 'react';
import './Spinner.css';

interface Props {
  hidden?: boolean
  centered?: boolean
  transparent?: boolean
}

const Spinner: React.FC<Props> = ({ hidden, centered, transparent, ...props }) => (
  hidden ? null : (
    <div className={clsx('Spinner', { 'Spinner--center': centered, 'Spinner--transparent': transparent })} {...props}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
      <div className="bar4"></div>
      <div className="bar5"></div>
      <div className="bar6"></div>
      <div className="bar7"></div>
      <div className="bar8"></div>
      <div className="bar9"></div>
      <div className="bar10"></div>
      <div className="bar11"></div>
      <div className="bar12"></div>
    </div>
  )
);

export default Spinner;
