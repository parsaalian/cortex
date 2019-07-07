import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function Light({ children }) {
  return (
    <Style display="inline" styleName="light">
      {children}
    </Style>
  );
}
