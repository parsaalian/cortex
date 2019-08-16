// @flow
import { TYPE_CHAR, REMOVE_CHAR } from '../constants';
import type { TypeCharActionType, RemoveCharActionType } from '../types/actions';

export function typeChar(char: string): TypeCharActionType {
  return {
    type: TYPE_CHAR,
    char,
  };
}

export function removeChar(): RemoveCharActionType {
  return {
    type: REMOVE_CHAR,
  };
}
