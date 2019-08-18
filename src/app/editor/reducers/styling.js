// @flow
import _ from 'lodash';
import { CHANGE_STYLE } from '../constants';
import type { StateType } from '../types/state';
import type { StyleType } from '../types/style';
import initialState from './initialState';

function changeStyle(state: StateType, style: StyleType): StateType {
  return _.merge({}, state, style);
}

function typing(
  state: StateType = initialState,
  action: {
    type: string,
    style: StyleType,
  },
): StateType {
  switch (action.type) {
    case CHANGE_STYLE:
      return changeStyle(state, action.style);
    default:
      return state;
  }
}

export default typing;
