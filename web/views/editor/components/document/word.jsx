/* eslint {react/prop-types: off} */
import _ from 'lodash';
import React from 'react';
import { StyledCursor } from './styled';

export default function Word({ word }) {
  return (
    <>
      {_.map(word, (char, i) => {
        if (char === 'cursor') {
          return <StyledCursor />;
        }
        return <React.Fragment key={i}>{char}</React.Fragment>;
      })}
    </>
  );
}
