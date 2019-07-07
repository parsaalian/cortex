import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function NormalFont({ children }) {
  return (
    <Style display="inline" styleName="normal-font">
      {children}
    </Style>
  );
}
