/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React from 'react';
import Line from './line';
import { StyledPage } from './styled';

export default function Page({ page, size }) {
  return (
    <StyledPage size={size}>
      {page.map((line, i) => (
        <Line key={i} line={line} />
      ))}
    </StyledPage>
  );
}
