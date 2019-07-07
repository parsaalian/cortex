import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function DoubleSpacing({ children }) {
  return (
    <Style display="block" styleName="double-spacing">
      {children}
    </Style>
  );
}
