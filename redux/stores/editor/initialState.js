import _ from 'lodash';
import sizes, { NORMAL } from '~/redux/constants/editor';
import { GAP } from '~/redux/reducers/editor/gapBuffer';

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
    size: 'a4',
    gapSize: 128,
    gapLeft: 0,
    gapRight: 127,
    paging: [[{ start: 0, height: 0, spaceLeft: sizes.a4, words: 0 }]],
    content: _.times(128, _.constant(GAP)),
  },
};
