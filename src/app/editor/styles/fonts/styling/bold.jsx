import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function Bold({ children }) {
  return (
    <Style display="inline" styleName="bold">
      {children}
    </Style>
  );
}
