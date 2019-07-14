import SingleSpacing from './spacing/singleSpacing';
import OneHalfSpacing from './spacing/oneHalfSpacing';
import DoubleSpacing from './spacing/doubleSpacing';
import ArbitrarySpacing from './spacing/arbitrarySpacing';
import NBSP from './spacing/nbsp';
import HFill from './spacing/hfill';

const spacingElements = {
  nbsp: NBSP,
  hfill: HFill,
  'single-spacing': SingleSpacing,
  'one-half-spacing': OneHalfSpacing,
  'double-spacing': DoubleSpacing,
  'arbitrary-spacing': ArbitrarySpacing,
};

export default { ...spacingElements };
