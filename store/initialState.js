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
            wordGroups: [
              {
                type: NORMAL,
                characters: [],
              },
            ],
            size: {
              width: 0,
              height: 0,
            },
          },
        ],
        footnotes: [],
        size: {
          width: 0,
          height: 0,
        },
      },
    ],
    headings: [],
    footnotes: [],
    images: [],
    tables: [],
  },
};
