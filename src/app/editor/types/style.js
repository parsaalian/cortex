// @flow
export type StyleType = {
  format?: {
    direction?: string,
    text?: {
      bold?: boolean,
      italic?: boolean,
      underline?: boolean,
      strikethrough?: boolean,
      script?: ?string,
      case?: ?string,
    },
    paragraph?: {
      style?: string,
    },
  },
};
