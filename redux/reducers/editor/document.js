/* eslint no-param-reassign: off */
import produce from 'immer';
import { grow, adjust } from './gapBuffer';
import initialState from '~/redux/stores/editor/initialState';
import { KEYBOARD_EVENT } from '~/redux/actions/editor';
import typing, {
  INSERT_CHAR,
  INSERT_SPACE,
  INSERT_ENTER,
  REMOVE_CHAR,
} from '~/redux/utils/editor/typing';

function insertCharReducer(state, action) {
  return produce(state, (draft) => {
    const char = action.payload;
    adjust(char, draft);
    draft.gapLeft += 1;
    draft.gapSize -= 1;
    if (draft.gapSize === 0) {
      grow(draft.gapLeft, draft);
    }
    return draft;
  });
}

function insertSpaceReducer(state, action) {
  return state;
}

function insertEnterReducer(state, action) {
  return state;
}

function removeCharReducer(state, action) {
  return state;
}

export default function documentReducer(state = initialState.document, action) {
  let typingAction;
  if (action.type === KEYBOARD_EVENT) {
    typingAction = typing(action.payload);
  }
  switch (action.type) {
    case KEYBOARD_EVENT:
      switch (typingAction.type) {
        case INSERT_CHAR:
          return insertCharReducer(state, typingAction);
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
