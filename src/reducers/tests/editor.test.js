/* eslint-disable */
// @flow
import initialState from '../../store/initialState';
import { cursorReducer, typingReducer } from '../editor';
import { moveCursor, typeChar, removeChar } from '../../actions/editor';
import { LEFT, RIGHT, UP, DOWN } from '../../constants/editor';

describe('cursor', () => {
  it('should contains action creators', () => {
    expect(cursorReducer.has(moveCursor)).toBeTruthy();
  });

  it('should return initial state on false input', () => {
    expect(cursorReducer(undefined, moveCursor('test'))).toEqual(initialState);
  });
});

describe('typing', () => {
  it('should contains action creators', () => {
    expect(typingReducer.has(typeChar)).toBeTruthy();
    expect(typingReducer.has(removeChar)).toBeTruthy();
  });
});
