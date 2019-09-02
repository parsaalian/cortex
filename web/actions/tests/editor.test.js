/* eslint-disable */
// @flow
import { moveCursor, changeStyle } from '../editor';

// TODO: complete tests for actions

describe('cursor', () => {
  it('should return left action', () => {
    const action = moveCursor('l');
    expect(action.payload).toEqual({ direction: 'l' });
  });

  it('should return right action', () => {
    const action = moveCursor('r');
    expect(action.payload).toEqual({ direction: 'r' });
  });

  it('should return up action', () => {
    const action = moveCursor('u');
    expect(action.payload).toEqual({ direction: 'u' });
  });

  it('should return down action', () => {
    const action = moveCursor('d');
    expect(action.payload).toEqual({ direction: 'd' });
  });
});

describe('style', () => {});
