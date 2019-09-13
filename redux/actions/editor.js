// cursor actions
export const MOVE_CURSOR = 'EDITOR/MOVE_CURSOR';
export function moveCursor(direction) {
  return {
    type: MOVE_CURSOR,
    payload: { direction },
  };
}

// styling actions
export const CHANGE_STYLE = 'EDITOR/CHANGE_STYLE';
export function changeStyle(style) {
  return {
    type: CHANGE_STYLE,
    payload: { style },
  };
}

// typing actions
export const KEYBOARD_EVENT = 'EDITOR/KEYBOARD_EVENT';
export function keyboardEvent(event) {
  return {
    type: KEYBOARD_EVENT,
    payload: {
      key: event.key,
      code: event.keyCode,
    },
  };
}
