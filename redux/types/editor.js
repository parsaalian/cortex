// @flow
export type DocumentType = {
  gapSize: number,
  gapLeft: number,
  gapRight: number,
  paging: Array<
    Array<{
      start: number,
      end: number,
      height: number,
    }>,
  >,
  content: Array<
    | string
    | {
        char: string,
        side: number,
        height: number,
        page: number,
        line: number,
      },
  >,
};

export type StyleType = {
  format?: ?{
    direction?: ?string,
    text?: {
      bold?: ?boolean,
      italic?: ?boolean,
      underline?: ?boolean,
      strikethrough?: ?boolean,
      script?: ?string,
      case?: ?string,
    },
    paragraph?: ?{
      style?: ?string,
    },
  },
};

// cursor types
export type MoveCursorType = {
  type: string,
  payload: string,
};

// style types
export type ChangeStyleType = {
  type: string,
  payload: StyleType,
};

// typing types
export type KeyboardEventType = {
  type: string,
  payload: {
    key: string,
    code: number,
  },
};
