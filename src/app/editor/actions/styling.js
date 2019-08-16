// @flow
import { CHANGE_STYLE } from '../constants';
import type { StyleType } from '../types/style';
import type { ChangeStyleActionType } from '../types/actions';

export default function changeStyle(style: StyleType): ChangeStyleActionType {
  return {
    type: CHANGE_STYLE,
    style,
  };
}
