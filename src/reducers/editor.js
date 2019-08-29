import { createReducer } from 'redux-act';
import type { StateType } from '../types/state';
import type { MoveCursorType, ChangeStyleType, TypeCharType } from '../types/editor';
import { moveCursor, changeStyle, typeChar, removeChar } from '../actions/editor';

// cursor reducers
export const cursorReducer = createReducer({
  [moveCursor]: (state, payload) => {
    const { direction } = payload;
    return state;
  },
});

// style reducers
export const styleReducer = createReducer({
  [changeStyle]: (state, payload) => {
    const { style } = payload;
    return state;
  },
});

// typing reducers
export const typingReducer = createReducer({
  [typeChar]: (state, payload) => {
    const { char } = payload;
    return state;
  },

  [removeChar]: (state) => {
    return state;
  },
});
