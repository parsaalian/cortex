// @flow
import _ from 'lodash';
import { NORMAL } from '~/redux/constants/editor';

const GAP = 'GAP';

export default {
  format: {
    direction: 'ltr',
    text: {
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      script: null,
      case: null,
    },
    paragraph: {
      style: NORMAL,
    },
  },
  document: {
    gapSize: 128,
    gapLeft: 0,
    gapRight: 127,
    paging: [[{ start: 0 }]],
    content: _.times(128, _.constant(GAP)),
  },
};
