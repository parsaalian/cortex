/* eslint no-param-reassign: off */
import _ from 'lodash';
import produce from 'immer';
import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';
import initialState from '../initialState';
import { TYPE_CHAR, REMOVE_CHAR } from '../constants/actions/editor';
import sizing from '~/packages/damastes';

// typing reducers
const typeCharReducer = handleAction(
  TYPE_CHAR,
  (state, action) =>
    produce(state, (draft) => {
      const { cursor } = draft;
      const content = action.payload.char.key;
      const size = sizing(content);
      draft.pages[cursor[0]].lineGroups[cursor[1]].wordGroups[cursor[2]].characters.splice(
        cursor[3],
        0,
        {
          content,
        },
      );
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
