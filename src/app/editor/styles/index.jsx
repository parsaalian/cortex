import Text from './base/text';
import Paragraph from './base/paragraph';

import textFormattings from './textFormattings';
import fonts from './fonts';

const baseStyles = {
  content: Text,
  paragraph: Paragraph,
};

export default {
  ...baseStyles,
  ...textFormattings,
  ...fonts,
};
