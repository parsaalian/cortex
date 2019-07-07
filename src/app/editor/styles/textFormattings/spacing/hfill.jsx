import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function HFill({ children }) {
  return (
    <>
      <Style display="inline" styleObj={{ float: 'right' }}>
        {children}
      </Style>
      <br />
      <br />
    </>
  );
}
