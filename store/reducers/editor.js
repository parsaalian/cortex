/* eslint no-param-reassign: off */
import _ from 'lodash';
import produce from 'immer';
import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';
import initialState from '../initialState';
import { TYPE_CHAR, REMOVE_CHAR } from '../constants/actions/editor';
import insertChar from './utils';
import sizing from '~/packages/damastes';

const maxSize = 559;

// typing reducers
const typeCharReducer = handleAction(
  TYPE_CHAR,
  (state, action) =>
    produce(state, (draft) => {
      const { cursor } = draft;
      const page = draft.pages[cursor[0]];
      const line = page.lineGroups[cursor[1]];
      const word = line.wordGroups[cursor[2]];
      const content = action.payload.char.key;
      const inserted = insertChar(
        draft.pages[cursor[0]].lineGroups[cursor[1]].wordGroups[cursor[2]].characters,
        cursor[3],
        content,
      );
      const size = sizing(inserted);

      if (line.size[1] + (size.width - word.size[1]) <= maxSize) {
        word.characters = inserted;
        line.size[0] = _.max([line.size[0], size.height]);
        line.size[1] += size.width - word.size[1];
        word.size[0] = _.max([word.size[0], size.height]);
        word.size[1] = size.width;
        cursor[3] += 1;
      }

      return draft;
    }),
  initialState.document,
);

const removeCharReducer = handleAction(REMOVE_CHAR, (state, action) => {}, initialState.document);

function typingReducer(state = initialState.document, action) {
  switch (action.type) {
    case TYPE_CHAR:
      return typeCharReducer(state, action);
    case REMOVE_CHAR:
      return removeCharReducer(state, action);
    default:
      return state;
  }
}

// styling reducer
function stylingReducer(state = initialState.format, action) {
  return state;
}

export default combineReducers({
  document: typingReducer,
  format: stylingReducer,
});
