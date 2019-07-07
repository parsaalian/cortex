import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function Uppercase({ children }) {
  return (
    <Style display="inline" styleName="uppercase">
      {children}
    </Style>
  );
}
