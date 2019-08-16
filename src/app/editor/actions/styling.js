import { CHANGE_STYLE } from '../constants';

export default function changeStyle(style) {
  return {
    type: CHANGE_STYLE,
    style,
  };
}
