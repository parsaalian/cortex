// @flow
import produce from 'immer';
import { insertChar, insertSpace, insertEnter } from './gapBuffer';
import { left, right } from './cursor';
import type { DocumentType, KeyboardEventType } from '~/redux/types/editor';
import initialState from '~/redux/stores/editor/initialState';
import { KEYBOARD_EVENT } from '~/redux/actions/editor';
import typing, {
  INSERT_CHAR,
  INSERT_SPACE,
  INSERT_ENTER,
  REMOVE_CHAR,
  MOVE_CURSOR,
} from '~/redux/utils/editor/typing';

function insertCharReducer(
  state: DocumentType,
  action: { type: string, payload: string },
): DocumentType {
  return produce(state, (draft: DocumentType): DocumentType => {
    const char = action.payload;
    insertChar(char, draft);
    return draft;
  });
}

function insertSpaceReducer(state: DocumentType): DocumentType {
  return produce(state, (draft: DocumentType): DocumentType => {
    insertSpace(draft);
    return draft;
  });
}

function insertEnterReducer(state: DocumentType): DocumentType {
  return produce(state, (draft: DocumentType): DocumentType => {
    insertEnter(draft);
    return draft;
  });
}

function removeCharReducer(state: DocumentType): DocumentType {
  return state;
}

function moveCursorReducer(
  state: DocumentType,
  action: { type: string, payload: string },
): DocumentType {
  return produce(state, (draft: DocumentType): DocumentType => {
    switch (action.payload) {
      case 'ArrowLeft':
        left(draft);
        break;
      case 'ArrowRight':
        right(draft);
        break;
      default:
    }
    return draft;
  });
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
      return insertSpaceReducer(state);
    }
    if (typingAction.type === INSERT_ENTER) {
      return insertEnterReducer(state);
    }
    if (typingAction.type === REMOVE_CHAR) {
      return removeCharReducer(state);
    }
    if (typingAction.type === MOVE_CURSOR) {
      return moveCursorReducer(state, typingAction);
    }
    return state;
  }
  return state;
}
