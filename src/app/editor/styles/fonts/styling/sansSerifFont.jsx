import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function SansSerifFont({ children }) {
  return (
    <Style display="inline" styleName="sans-serif-font">
      {children}
    </Style>
  );
}
