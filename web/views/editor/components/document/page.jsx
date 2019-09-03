/* eslint react/prop-types: off */
import _ from 'lodash';
import React from 'react';
import Line from './line';
import { StyledPage } from './styled';

export default function Page({ page, size }) {
  return (
    <StyledPage size={size}>
      {_.map(page, (line, i) => (
        <Line key={i} line={line} />
      ))}
    </StyledPage>
  );
}
