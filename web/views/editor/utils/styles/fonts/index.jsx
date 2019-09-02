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
  'normal-font': NormalFont,
  'roman-font': RomanFont,
  'sans-serif-font': SansSerifFont,
  'mono-font': MonoFont,
  italic: Italic,
  'small-capitals': SmallCapitals,
  uppercase: Uppercase,
  bold: Bold,
  light: Light,
};

const sizingElements = {
  ...BuiltInSizes,
  'arbitrary-size': ArbitrarySize,
};

export default { ...sizingElements, ...stylingElements };
