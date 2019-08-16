// @flow
import type { StyleType } from './style';
/*
 * cursor action types;
 */
export type MoveCursorActionType = {
  type: string,
  direction: string,
};

// all cursor actions
export type CursorActionType = MoveCursorActionType;

/*
 * style action types;
 */
export type ChangeStyleActionType = {
  type: string,
  style: StyleType,
};

// all style actions
export type StyleActionType = ChangeStyleActionType;

/*
 * typing action types;
 */
export type TypeCharActionType = {
  type: string,
  char: string,
};

export type RemoveCharActionType = {
  type: string,
};

// all typing actions
export type TypeActionType = TypeCharActionType | RemoveCharActionType;

// all action types
export type ActionType = CursorActionType | StyleActionType | TypeActionType;
