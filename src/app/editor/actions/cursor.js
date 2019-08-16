// @flow
import { MOVE_CURSOR } from '../constants';
import type { MoveCursorActionType } from '../types/actions';

export default function moveCursor(direction: string): MoveCursorActionType {
  return {
    type: MOVE_CURSOR,
    direction,
  };
}
