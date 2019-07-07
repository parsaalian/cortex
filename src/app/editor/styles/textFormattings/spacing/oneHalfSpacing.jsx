import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function OneHalfSpacing({ children }) {
  return (
    <Style display="block" styleName="one-half-spacing">
      {children}
    </Style>
  );
}
