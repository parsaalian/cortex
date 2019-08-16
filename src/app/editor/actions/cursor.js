import { MOVE_CURSOR } from '../constants';

export default function moveCursor(direction) {
  return {
    type: MOVE_CURSOR,
    direction,
  };
}
