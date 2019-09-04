/* eslint no-param-reassign: off */
import _ from 'lodash';
import produce from 'immer';
import { handleAction } from 'redux-actions';
import insertChar from '../utils';
import initialState from '~/store/initialState';
import { TYPE_CHAR } from '~/store/constants/actions/editor';
import sizing from '~/packages/damastes';
import typing from '~/packages/cadmus';

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
      const content = action.payload.event.key;

      if (content === ' ') {
        line.wordGroups.push({
          type: 'NORMAL',
          characters: '',
          size: [0, 0],
        });
      } else {
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
      }

      return draft;
    }),
  initialState.document,
);

/* const removeCharReducer = handleAction(REMOVE_CHAR, (state, action) => {},
initialState.document); */

export default function typingReducer(state = initialState.document, action) {
  let typingAction;
  if (action.type === TYPE_CHAR) {
    typingAction = typing(action.payload.event);
  }
  switch (action.type) {
    case TYPE_CHAR:
      console.log(typingAction);
      console.log(action);
      return typeCharReducer(state, action);
    default:
      return state;
  }
}
