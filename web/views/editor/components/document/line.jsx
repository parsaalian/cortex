/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import _ from 'lodash';
import React from 'react';
import { StyledLine } from './styled';
import { SPC } from '~/redux/reducers/editor/gapBuffer';

export default function Line({ line }) {
  return <StyledLine>{_.join(_.map(line, (char) => (char === SPC ? ' ' : char)), '')}</StyledLine>;
}
