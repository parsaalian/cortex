// @flow
import _ from 'lodash';
import type { DocumentType } from '~/redux/types/editor';
import { wordSizes } from '~/redux/utils/editor/sizing';

const maxWidth = 559;
const maxHeight = 20;
export const SPC = 'BUFFER/SPACE';
export const GAP = 'BUFFER/GAP';
export const PAR = 'BUFFER/PARAGRAPH';

type WordType = {
  cursor: number,
  leftLength: number,
  rightLength: number,
  leftIndex: number,
  rightIndex: number,
  word: string,
};

// insertion related functions
export function grow(position: number, draft: DocumentType): DocumentType {
  const draftCopy = { ...draft };
  draftCopy.content = [
    ..._.slice(draftCopy.content, 0, position),
    ..._.times(128, _.constant(GAP)),
    ..._.slice(draftCopy.content, position),
  ];
  draftCopy.gapLeft = position;
  draftCopy.gapRight = position + 127;
  draftCopy.gapSize = 128;
  return draftCopy;
}

function getWordFromIndex(index: number, draft: DocumentType): WordType {
  const leftWord = [];
  const rightWord = [];
  let leftCursor = index - 1;
  let rightCursor = index + 1;

  while (
    draft.content[leftCursor] !== SPC &&
    draft.content[leftCursor] !== PAR &&
    leftCursor >= 0
  ) {
    if (draft.content[leftCursor] !== GAP) {
      if (typeof draft.content[leftCursor] === 'string') {
        throw new Error('looped on string instead of object');
      } else {
        leftWord.push(draft.content[leftCursor].char);
        leftCursor -= 1;
      }
    } else {
      leftCursor -= 1;
    }
  }
  while (
    draft.content[rightCursor] !== SPC &&
    draft.content[rightCursor] !== PAR &&
    rightCursor < draft.content.length
  ) {
    if (draft.content[rightCursor] !== GAP) {
      if (typeof draft.content[rightCursor] === 'string') {
        throw new Error('looped on string instead of object');
      } else {
        rightWord.push(draft.content[rightCursor].char);
        rightCursor += 1;
      }
    } else {
      rightCursor += 1;
    }
  }

  return {
    cursor: index,
    leftLength: leftWord.length,
    rightLength: rightWord.length,
    leftIndex: leftCursor + 1,
    rightIndex: rightCursor - 1,
    word: _.join(_.concat(_.reverse(leftWord), [draft.content[index].char], rightWord), ''),
  };
}

function getWidthFromSizes(array: Array<{ width: number, height: number }>): number {
  const lastItem = _.last(array);
  return _.isUndefined(lastItem) ? 0 : lastItem.width;
}

function getHeightFromSizes(array: Array<{ width: number, height: number }>): number {
  return _.max(_.map(array, (member: { width: number, height: number }): number => member.height));
}

function getSideSpace(word: WordType, side: string, draft: DocumentType): Array<string> {
  const isLeft = side === 'left';
  let index = isLeft ? word.leftIndex - 1 : word.rightIndex + 1;
  const space = [];
  while (
    typeof draft.content[index] === 'string' &&
    (isLeft ? index >= 0 : index < draft.content.length)
  ) {
    if (draft.content[index] !== GAP) {
      space.push(draft.content[index]);
    }
    index -= isLeft ? 1 : -1;
  }
  return isLeft ? _.reverse(space) : space;
}

function getLastWordEndIndex(word: WordType, draft: DocumentType): number {
  const leftSpace = getSideSpace(word, 'left', draft);
  return word.leftIndex - leftSpace.length - 1;
}

function getNextWordStartIndex(word: WordType, draft: DocumentType): number {
  const rightSpace = getSideSpace(word, 'right', draft);
  return word.rightIndex + rightSpace.length + 1;
}

export function adjustParagraph(draft: DocumentType) {
  let index = draft.gapLeft;
  const word = getWordFromIndex(draft.gapLeft, draft);
  while (!_.includes(getSideSpace(word, 'left', draft), PAR) && index < draft.content.length) {
    const pointerWord = getWordFromIndex(index, draft);
    console.log(pointerWord.word);
    /* const d = getLastCharDistanceFromSide(pointerWord, draft);
    if (d > maxWidth) {
      adjustLineAndPageNumber(word, draft);
    }
    if (_.isEqual(pointerWord, word)) {
      adjustByReassign(pointerWord, draft);
    } else {
      adjustByShift(pointerWord, draft);
    } */
    index = getNextWordStartIndex(pointerWord, draft);
  }
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 */

export function insertChar(char: string, draft: DocumentType) {
  draft.content[draft.gapLeft] = { char, side: 0, height: 0, page: 0, line: 0 };

  adjustParagraph(draft);
  // first adjust current word sizes
  // then adjust until the end of paragraph
  // after that change line numbering until the end of document

  draft.gapLeft += 1;
  draft.gapSize -= 1;
  if (draft.gapSize === 0) {
    grow(draft.gapLeft, draft);
  }
}

export function insertSpace(draft: DocumentType) {
  draft.content[draft.gapLeft] = SPC;

  draft.gapLeft += 1;
  draft.gapSize -= 1;
  if (draft.gapSize === 0) {
    grow(draft.gapLeft, draft);
  }
}

export function insertEnter(draft: DocumentType) {
  draft.content[draft.gapLeft] = PAR;

  draft.gapLeft += 1;
  draft.gapSize -= 1;
  if (draft.gapSize === 0) {
    grow(draft.gapLeft, draft);
  }
}
