/* eslint {no-param-reassign: off, no-unused-vars: off} */
import _ from 'lodash';
import produce from 'immer';
import { handleAction } from 'redux-actions';
import insertChar from '../utils';
import initialState from '~/store/initialState';
import { KEYBOARD_EVENT } from '~/store/constants/actions/editor';
import sizing from '~/packages/damastes';
import typing from '~/packages/cadmus';
import { INSERT_CHAR, INSERT_SPACE, INSERT_ENTER, REMOVE_CHAR } from '~/packages/cadmus/constants';

const maxSize = 559;

// typing reducers
const typeCharReducer = handleAction(
  INSERT_CHAR,
  (state, action) =>
    produce(state, (draft) => {
      const { cursor } = draft;
      const page = draft.pages[cursor[0]];
      const line = page.lineGroups[cursor[1]];
      const word = line.wordGroups[cursor[2]];
      const content = action.payload;

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
      } else if (_.isUndefined(page.lineGroups[cursor[1] + 1])) {
        const initialLine = initialState.document.pages[0].lineGroups[0];
        page.lineGroups.push(initialLine);
        cursor[1] += 1;
        cursor[2] = 0;
        if (size.width > maxSize) {
          const newLine = page.lineGroups[cursor[1]];
          const newWord = newLine.wordGroups[cursor[2]];
          newWord.characters = content;
          cursor[3] = content.length;
        }
      }

      /* else if (_.isUndefined(page.lineGroups[cursor[1] + 1])) {
        word.characters = inserted;
        const savedWord = _.last(line.wordGroups);
        line.wordGroups = _.dropRight(line.wordGroups);
        const initialLine = initialState.document.pages[0].lineGroups[0];
        page.lineGroups.push(initialLine);
        cursor[1] += 1;
        cursor[2] = 0;
        cursor[3] = inserted.length;
      } */

      return draft;
    }),
  initialState.document,
);

const insertSpaceReducer = handleAction(
  INSERT_SPACE,
  (state, action) => state,
  initialState.document,
);

const insertEnterReducer = handleAction(
  INSERT_ENTER,
  (state, action) => state,
  initialState.document,
);

const removeCharReducer = handleAction(
  REMOVE_CHAR,
  (state, action) => state,
  initialState.document,
);

export default function keyboardReducer(state = initialState.document, action) {
  let typingAction;
  if (action.type === KEYBOARD_EVENT) {
    typingAction = typing(action.payload);
  }
  switch (action.type) {
    case KEYBOARD_EVENT:
      switch (typingAction.type) {
        case INSERT_CHAR:
          return typeCharReducer(state, typingAction);
        case INSERT_SPACE:
          return insertSpaceReducer(state, typingAction);
        case INSERT_ENTER:
          return insertEnterReducer(state, typingAction);
        case REMOVE_CHAR:
          return removeCharReducer(state, typingAction);
        default:
          return state;
      }
    default:
      return state;
  }
}
