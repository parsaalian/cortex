import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function SingleSpacing({ children }) {
  return (
    <Style display="block" styleName="single-spacing">
      {children}
    </Style>
  );
}
