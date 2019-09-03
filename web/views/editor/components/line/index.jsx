/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React from 'react';
import Word from '../word';
import StyledLine from './styled';

export default function Line({ line }) {
  return (
    <StyledLine>
      {line.map((word, i) => (
        <React.Fragment key={i}>
          <Word word={word} />
          &nbsp;
        </React.Fragment>
      ))}
    </StyledLine>
  );
}
