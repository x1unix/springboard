import React, { PropsWithChildren } from 'react';

interface Props {
  visible?: boolean
}

const Conditional: React.FC<PropsWithChildren<Props>> = ({ visible, children }) => (
  visible ? <>{children}</> : null
);

export default Conditional;
