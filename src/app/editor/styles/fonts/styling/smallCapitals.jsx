import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function SmallCapitals({ children }) {
  return (
    <Style display="inline" styleName="small-capitals">
      {children}
    </Style>
  );
}
