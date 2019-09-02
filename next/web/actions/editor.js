// @flow
import { createAction } from 'redux-act';
import type { StyleType, MoveCursorType, ChangeStyleType, TypeCharType } from '../types/editor';

// cursor actions
export const moveCursor = createAction<Array<string>, MoveCursorType, null>(
  'Move cursor towards given direction (left, right, up, down)',
  (
    direction: string,
  ): {
    direction: string,
  } => ({ direction }),
);

// styling actions
export const changeStyle = createAction<Array<StyleType>, ChangeStyleType, null>(
  'Change the style on select in panel',
  (
    style: StyleType,
  ): {
    style: StyleType,
  } => ({ style }),
);

// typing actions
export const typeChar = createAction<Array<string>, TypeCharType, null>(
  'Type a character in cursor location',
  (
    char: string,
  ): {
    char: string,
  } => ({ char }),
);

export const removeChar = createAction<null, null, null>(
  'Removes a character from cursor location',
);
