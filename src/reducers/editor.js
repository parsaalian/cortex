import _ from 'lodash';
import { createReducer } from 'redux-act';
import initialState from '../store/initialState';
import { moveCursor, changeStyle, typeChar, removeChar } from '../actions/editor';
import { LEFT, RIGHT, UP, DOWN } from '../constants/editor';

// cursor reducers
export const cursorReducer = createReducer(
  {
    [moveCursor]: (state, payload) => {
      const { direction } = payload;
      if (!_.includes([LEFT, RIGHT, UP, DOWN], direction)) {
        return state;
      }
      return state;
    },
  },
  initialState,
);

// style reducers
export const styleReducer = createReducer(
  {
    [changeStyle]: (state, payload) => {
      const { style } = payload;
      return state;
    },
  },
  initialState,
);

// typing reducers
export const typingReducer = createReducer(
  {
    [typeChar]: (state, payload) => {
      const { char } = payload;
      return state;
    },

    [removeChar]: (state) => {
      return state;
    },
  },
  initialState,
);
