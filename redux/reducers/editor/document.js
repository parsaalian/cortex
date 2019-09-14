// @flow
import produce from 'immer';
import { grow, adjust } from './gapBuffer';
import type { DocumentType, KeyboardEventType } from '~/redux/types/editor';
import initialState from '~/redux/stores/editor/initialState';
import { KEYBOARD_EVENT } from '~/redux/actions/editor';
import typing, {
  INSERT_CHAR,
  INSERT_SPACE,
  INSERT_ENTER,
  REMOVE_CHAR,
} from '~/redux/utils/editor/typing';

function insertCharReducer(
  state: DocumentType,
  action: { type: string, payload: string },
): DocumentType {
  return produce(state, (draft: DocumentType): DocumentType => {
    const char = action.payload;
    Object.assign(draft, adjust(char, draft));
    draft.gapLeft += 1;
    draft.gapSize -= 1;
    if (draft.gapSize === 0) {
      Object.assign(draft, grow(draft.gapLeft, draft));
    }
    return draft;
  });
}

function insertSpaceReducer(state: DocumentType, action: { type: string }): DocumentType {
  return state;
}

function insertEnterReducer(state: DocumentType, action: { type: string }): DocumentType {
  return state;
}

function removeCharReducer(state: DocumentType, action: { type: string }): DocumentType {
  return state;
}

export default function documentReducer(
  state: DocumentType = initialState.document,
  action: KeyboardEventType,
): DocumentType {
  if (action.type === KEYBOARD_EVENT) {
    const typingAction = typing(action.payload);
    if (typingAction.type === INSERT_CHAR) {
      return insertCharReducer(state, typingAction);
    }
    if (typingAction.type === INSERT_SPACE) {
      return insertSpaceReducer(state, typingAction);
    }
    if (typingAction.type === INSERT_ENTER) {
      return insertEnterReducer(state, typingAction);
    }
    if (typingAction.type === REMOVE_CHAR) {
      return removeCharReducer(state, typingAction);
    }
    return state;
  }
  return state;
}
