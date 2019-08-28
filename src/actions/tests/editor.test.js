/* eslint-disable */
// @flow
import { moveCursor, changeStyle } from '../editor';

describe('cursor', () => {
  test('return left action', () => {
    const action = moveCursor('l');
    expect(action.payload).toEqual({ direction: 'l' });
  });

  test('return right action', () => {
    const action = moveCursor('r');
    expect(action.payload).toEqual({ direction: 'r' });
  });

  test('return up action', () => {
    const action = moveCursor('u');
    expect(action.payload).toEqual({ direction: 'u' });
  });

  test('return down action', () => {
    const action = moveCursor('d');
    expect(action.payload).toEqual({ direction: 'd' });
  });
});
