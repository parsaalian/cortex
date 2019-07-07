import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function Italic({ children }) {
  return (
    <Style display="inline" styleName="italic">
      {children}
    </Style>
  );
}
