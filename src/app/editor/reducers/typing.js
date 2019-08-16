// @flow
import { TYPE_CHAR, REMOVE_CHAR } from '../constants';
import type { StateType } from '../types/state';
import initialState from './initialState';

function typeChar(state: StateType, char: string): StateType {
  return state;
}

function removeChar(state: StateType): StateType {
  return state;
}

function typing(
  state: StateType = initialState,
  action: {
    type: string,
    char: ?string,
  },
): StateType {
  switch (action.type) {
    case TYPE_CHAR:
      if (action.char) {
        return typeChar(state, action.char);
      }
      return state;
    case REMOVE_CHAR:
      return removeChar(state);
    default:
      return state;
  }
}

export default typing;
