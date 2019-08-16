import { TYPE_CHAR, REMOVE_CHAR } from '../constants';

export function typeChar(char) {
  return {
    type: TYPE_CHAR,
    char,
  };
}

export function removeChar() {
  return {
    type: REMOVE_CHAR,
  };
}
