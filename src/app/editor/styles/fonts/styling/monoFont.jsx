import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function MonoFont({ children }) {
  return (
    <Style display="inline" styleName="mono-font">
      {children}
    </Style>
  );
}
