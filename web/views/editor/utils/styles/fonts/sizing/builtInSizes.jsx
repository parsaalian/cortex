/* eslint react/prop-types: off */
import _ from 'lodash';
import React from 'react';
import withStyles from 'react-jss';

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

const sizes = {
  tiny: {
    std10: 5,
    std11: 6,
    std12: 6,
    ams10: 6,
    ams11: 7,
    ams12: 8,
    slide: 13.82,
  },
  script: {
    std10: 7,
    std11: 8,
    std12: 8,
    ams10: 7,
    ams11: 8,
    ams12: 9,
    slide: 16.59,
  },
  footnote: {
    std10: 8,
    std11: 9,
    std12: 10,
    ams10: 8,
    ams11: 9,
    ams12: 10,
    slide: 16.59,
  },
  small: {
    std10: 9,
    std11: 10,
    std12: 10.95,
    ams10: 9,
    ams11: 10,
    ams12: 10.95,
    slide: 16.59,
  },
  normal: {
    std10: 10,
    std11: 10.95,
    std12: 12,
    ams10: 10,
    ams11: 10,
    ams12: 10.59,
    slide: 19.907,
  },
  large1: {
    std10: 12,
    std11: 12,
    std12: 14.4,
    ams10: 10.95,
    ams11: 12,
    ams12: 14.4,
    slide: 23.89,
  },
  large2: {
    std10: 14.4,
    std11: 14.4,
    std12: 17.28,
    ams10: 12,
    ams11: 14.4,
    ams12: 17.28,
    slide: 28.66,
  },
  large3: {
    std10: 17.28,
    std11: 17.28,
    std12: 20.74,
    ams10: 14.4,
    ams11: 17.28,
    ams12: 20.74,
    slide: 34.4,
  },
  huge1: {
    std10: 20.74,
    std11: 20.74,
    std12: 24.88,
    ams10: 17.28,
    ams11: 20.74,
    ams12: 24.88,
    slide: 41.28,
  },
  huge2: {
    std10: 24.88,
    std11: 24.88,
    std12: 24.88,
    ams10: 20.74,
    ams11: 24.88,
    ams12: 24.88,
    slide: 41.28,
  },
};

export default _.reduce(
  builtInSizesNames,
  (result, value) => {
    function Element({ children, classes }) {
      return (
        <Style variation="inline" styles={classes[`size${value}`]}>
          {children}
        </Style>
      );
    }
    Element.displayName = `${value}Size`;
    // eslint-disable-next-line no-param-reassign
    result[`size-${value.toLowerCase()}`] = withStyles({
      [`size${value}`]: {
        display: 'inline',
        fontSize: Math.round(sizes[value.toLowerCase()].std11 * 1.33333 * 100) / 100,
      },
    })(Element);
    return result;
  },
  {},
);
