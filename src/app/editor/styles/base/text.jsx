import React from 'react';

import Style from '../../style';

// eslint-disable-next-line react/prop-types
export default function Text({ children }) {
  return <Style display="inline">{children}</Style>;
}
