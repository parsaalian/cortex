// @flow
import { createAction } from 'redux-actions';
import { MOVE_CURSOR, CHANGE_STYLE, TYPE_CHAR } from '../constants/actions/editor';

// cursor action creators
export const moveCursor = createAction(MOVE_CURSOR);

// styling action creators
export const changeStyle = createAction(CHANGE_STYLE);

// typing action creators
// TODO: change event type to keyboard event
export const typeChar = createAction(TYPE_CHAR, (event: string): { event: string } => ({ event }));
