// @flow
import { createAction } from 'redux-act';

// cursor actions
export const moveCursor = createAction(
  'Move cursor towards given direction (left, right,up, down)',
  (direction: string): { direction: string } => ({ direction }),
);
