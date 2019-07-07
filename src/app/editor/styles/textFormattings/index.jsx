import PropTypes from 'prop-types';

import withProps from 'global/views/withProps';

import SingleSpacing from './spacing/singleSpacing';
import OneHalfSpacing from './spacing/oneHalfSpacing';
import DoubleSpacing from './spacing/doubleSpacing';
import ArbitrarySpacing from './spacing/arbitrarySpacing';
import NBSP from './spacing/nbsp';
import HFill from './spacing/hfill';

const spacingElements = {
  nbsp: withProps(NBSP),
  hfill: withProps(HFill),
  'single-spacing': withProps(SingleSpacing),
  'one-half-spacing': withProps(OneHalfSpacing),
  'double-spacing': withProps(DoubleSpacing),
  'arbitrary-spacing': withProps(
    ArbitrarySpacing,
    { attributes: PropTypes.Object },
    { attributes: { lineHeight: 1 } },
  ),
};

export default { ...spacingElements };
