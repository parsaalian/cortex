import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function Bold({ children, attributes }) {
  return (
    <Style
      type="inline"
      style={{ fontSize: `${attributes.size * 1.333333}px` }}
    >
      {children}
    </Style>
  );
}
