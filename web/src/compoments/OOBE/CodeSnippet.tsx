import React, { CSSProperties } from 'react';
import './CodeSnippet.css';

interface Props {
  value?: string
  style?: CSSProperties
}

const CodeSnippet: React.FC<Props> = ({ value, ...props }) => (
  <pre
    className='CodeSnippet'
    {...props}
  >
    {value}
  </pre>
)

export default CodeSnippet;
