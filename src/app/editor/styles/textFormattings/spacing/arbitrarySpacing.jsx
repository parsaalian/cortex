import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function ArbitrarySpacing({ children, attributes }) {
  return (
    <Style display="block" styleObj={{ lineHeight: attributes.lineHeight }}>
      {children}
    </Style>
  );
}
