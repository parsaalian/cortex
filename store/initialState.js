// @flow
import { NORMAL } from './constants/editor';

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
    cursor: [0, 0, 0, 0],
    pages: [
      {
        lineGroups: [
          {
            type: NORMAL,
            level: 0,
            spaces: 0,
            wordGroups: [
              {
                type: NORMAL,
                characters: '',
                size: [0, 0],
              },
            ],
            size: [0, 0],
          },
        ],
        footnotes: [],
        size: [0, 0],
      },
    ],
    headings: [],
    footnotes: [],
    images: [],
    tables: [],
  },
};
