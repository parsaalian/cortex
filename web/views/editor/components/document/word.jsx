/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React from 'react';
import { StyledCursor } from './styled';

export default function Word({ word }) {
  return (
    <>
      {word.map((char, i) => {
        if (char === 'cursor') {
          return <StyledCursor />;
        }
        return <React.Fragment key={i}>{char}</React.Fragment>;
      })}
    </>
  );
}
