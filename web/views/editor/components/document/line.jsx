/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import _ from 'lodash';
import React from 'react';
// import Word from './word';
import { StyledLine } from './styled';

export default function Line({ line }) {
  return <StyledLine>{_.join(line, '')}</StyledLine>;
}
