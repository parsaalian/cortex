// @flow
export type StyleType = {
  +format?: ?{
    +direction?: ?string,
    +text?: {
      +bold?: ?boolean,
      +italic?: ?boolean,
      +underline?: ?boolean,
      +strikethrough?: ?boolean,
      +script?: ?string,
      +case?: ?string,
    },
    +paragraph?: ?{
      +style?: ?string,
    },
  },
};

// cursor types
export type MoveCursorType = {
  type: string,
  payload: {
    direction: string,
  },
};

// style types
export type ChangeStyleType = {
  type: string,
  payload: {
    style: StyleType,
  },
};

// typing types
export type KeyboadEventType = {
  type: string,
  payload: {
    key: string,
    code: number,
  },
};
