import PropTypes from 'prop-types';

import withProps from 'global/views/withProps';

import NormalFont from './styling/normalFont';
import RomanFont from './styling/romanFont';
import SansSerifFont from './styling/sansSerifFont';
import MonoFont from './styling/monoFont';
import Italic from './styling/italic';
import SmallCapitals from './styling/smallCapitals';
import Uppercase from './styling/uppercase';
import Bold from './styling/bold';
import Light from './styling/light';

import BuiltInSizes from './sizing/builtInSizes';
import ArbitrarySize from './sizing/arbitrarySize';

const stylingElements = {
  'normal-font': withProps(NormalFont),
  'roman-font': withProps(RomanFont),
  'sans-serif-font': withProps(SansSerifFont),
  'mono-font': withProps(MonoFont),
  italic: withProps(Italic),
  'small-capitals': withProps(SmallCapitals),
  uppercase: withProps(Uppercase),
  bold: withProps(Bold),
  light: withProps(Light),
};

const sizingElements = {
  ...BuiltInSizes,
  'arbitrary-size': withProps(
    ArbitrarySize,
    { attributes: PropTypes.Object },
    { attributes: { lineHeight: 1 } },
  ),
};

export default { ...sizingElements, ...stylingElements };
