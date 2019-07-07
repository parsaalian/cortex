import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function RomanFont({ children }) {
  return (
    <Style display="inline" styleName="roman-font">
      {children}
    </Style>
  );
}
