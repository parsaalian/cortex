// @flow
import { createAction } from 'redux-act';
import type { StyleType } from '../types/editor';

// cursor actions
export const moveCursor = createAction(
  'Move cursor towards given direction (left, right,up, down)',
  (direction: string): { direction: string } => ({ direction }),
);

// styling actions
export const changeStyle = createAction('Change the style on select in panel', (style: StyleType): {
  style: StyleType,
} => ({ style }));

// typing actions
export const typeChar = createAction('Type a character in cursor location', (char: string): {
  char: string,
} => ({ char }));

export const removeChar = createAction('Removes a character from cursor location');
