/* eslint no-param-reassign: off */
import _ from 'lodash';
import produce from 'immer';
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
      if (typeof char === 'string') {
        return produce(state, (draft) => {
          draft.document.pages[0].lineGroups[0].wordGroups[0].characters.push({ content: char });
          draft.document.cursor[3] += 1;
        });
      }
      return state;
    },

    [removeChar]: (state) => state,
  },
  initialState,
);
