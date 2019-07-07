import React from 'react';

import Style from '../style';

// eslint-disable-next-line react/prop-types
export default function Paragraph({ children }) {
  return <Style display="block">{children}</Style>;
}
