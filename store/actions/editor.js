// @flow
import { createAction } from 'redux-actions';
import { MOVE_CURSOR, CHANGE_STYLE, KEYBOARD_EVENT } from '../constants/actions/editor';

// cursor action creators
export const moveCursor = createAction(MOVE_CURSOR);

// styling action creators
export const changeStyle = createAction(CHANGE_STYLE);

// keyboard action creators
// TODO: change event type to keyboard event
export const keyboardEvent = createAction(KEYBOARD_EVENT, (event: string): {
  key: string,
  code: number,
} => ({
  key: event.key,
  code: event.keyCode,
}));
