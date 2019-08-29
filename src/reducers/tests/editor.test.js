/* eslint-disable */
// @flow
import produce from 'immer';
import initialState from '../../store/initialState';
import { cursorReducer, typingReducer } from '../editor';
import { moveCursor, typeChar, removeChar } from '../../actions/editor';
import { LEFT, RIGHT, UP, DOWN } from '../../constants/editor';

describe('cursor', () => {
  it('should contains action creators', () => {
    expect(cursorReducer.has(moveCursor)).toBeTruthy();
  });

  it('should return initial state on false input', () => {
    expect(cursorReducer(initialState, moveCursor('test'))).toEqual(initialState);
  });
});

describe('typing', () => {
  it('should contains action creators', () => {
    expect(typingReducer.has(typeChar)).toBeTruthy();
    expect(typingReducer.has(removeChar)).toBeTruthy();
  });

  it('should return initial state on false input', () => {
    expect(typingReducer(initialState, typeChar(undefined))).toEqual(initialState);
    expect(typingReducer(initialState, typeChar(null))).toEqual(initialState);
    expect(typingReducer(initialState, typeChar(0))).toEqual(initialState);
  });

  it('should append character in the first place if document is empty', () => {
    const content = 'a';
    const nextState = produce(initialState, (draftState) => {
      draftState.document.pages[0].lineGroups[0].wordGroups[0].characters.push({ content });
      draftState.document.cursor[3] += 1;
    });
    const newState = typingReducer(initialState, typeChar(content));
    expect(newState.document.pages[0].lineGroups[0].wordGroups[0].character).toEqual(
      nextState.document.pages[0].lineGroups[0].wordGroups[0].character,
    );
  });

  it('should move cursor one place if document is empty', () => {
    const content = 'a';
    const nextState = typingReducer(initialState, typeChar(content));
    expect(nextState.document.cursor).toEqual([0, 0, 0, 1]);
  });
});
