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
  direction: string,
};

// style types
export type ChangeStyleType = {
  style: StyleType,
};

// typing types
export type TypeCharType = {
  char: string,
};
