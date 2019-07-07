import _ from 'lodash';
import React from 'react';

import withProps from 'global/views/withProps';

import Style from '../../style';

const builtInSizesNames = [
  'Tiny',
  'Script',
  'Footnote',
  'Small',
  'Normal',
  'Large1',
  'Large2',
  'Large3',
  'Huge1',
  'Huge2',
];

export default _.reduce(
  builtInSizesNames,
  (result, value) => {
    // eslint-disable-next-line react/prop-types
    function Element({ children }) {
      return (
        <Style
          variation="inline"
          styleName={`size-std11${value.toLowerCase()}`}
        >
          {children}
        </Style>
      );
    }
    Element.displayName = `${value}Size`;
    // eslint-disable-next-line no-param-reassign
    result[`size-${value.toLowerCase()}`] = withProps(Element);
    return result;
  },
  {},
);
