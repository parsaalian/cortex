// @flow
import { createAction } from 'redux-actions';
import {
  MOVE_CURSOR,
  CHANGE_STYLE,
  TYPE_CHAR,
  REMOVE_CHAR,
} from '~/store/constants/actions/editor';

// cursor action creators
export const moveCursor = createAction(MOVE_CURSOR);

// styling action creators
export const changeStyle = createAction(CHANGE_STYLE);

// typing action creators
export const typeChar = createAction(TYPE_CHAR);
export const removeChar = createAction(REMOVE_CHAR);
