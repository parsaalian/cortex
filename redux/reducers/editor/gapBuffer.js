// @flow
import _ from 'lodash';
import type { DocumentType } from '~/redux/types/editor';
import { wordSizes } from '~/redux/utils/editor/sizing';

const maxWidth = 559;
const maxHeight = 100;
const spaceSize = 4;
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
  draft.content = [
    ..._.slice(draft.content, 0, position),
    ..._.times(128, _.constant(GAP)),
    ..._.slice(draft.content, position),
  ];
  draft.gapLeft = position;
  draft.gapRight = position + 127;
  draft.gapSize = 128;
  return draft;
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

function getWordSideString(word: WordType, side: string, draft: DocumentType): Array<string> {
  const isLeft = side === 'left';
  let index = isLeft ? word.leftIndex - 1 : word.rightIndex + 1;
  const space = [];
  while (typeof draft.content[index] === 'string' && index >= 0 && index < draft.content.length) {
    space.push(draft.content[index]);
    index -= isLeft ? 1 : -1;
  }
  return isLeft ? _.reverse(space) : space;
}

function getLastWordEndIndex(word: WordType, draft: DocumentType): number {
  const leftSpace = getWordSideString(word, 'left', draft);
  return word.leftIndex - leftSpace.length - 1;
}

function getNextWordStartIndex(word: WordType, draft: DocumentType): number {
  const rightSpace = getWordSideString(word, 'right', draft);
  return word.rightIndex + rightSpace.length + 1;
}

function getSpaceWidth(array: Array<string>): number {
  return _.filter(array, (index: number): boolean => index === SPC).length * spaceSize;
}

function getFirstCharDistanceFromSide(word: WordType, draft: DocumentType): number {
  const leftSideString = getWordSideString(word, 'left', draft);
  const lastWordEndIndex = getLastWordEndIndex(word, draft);
  const spacesWidth = getSpaceWidth(leftSideString);
  if (lastWordEndIndex < 0) {
    return spacesWidth;
  }
  if (
    draft.content[lastWordEndIndex].page === draft.content[word.cursor].page &&
    draft.content[lastWordEndIndex].line === draft.content[word.cursor].line
  ) {
    return draft.content[lastWordEndIndex].side + spacesWidth;
  }
  return 0;
}

function getLastCharDistanceFromSide(word: WordType, draft: DocumentType): number {
  const sizes = wordSizes(word.word);
  const wordWidth = getWidthFromSizes(sizes);
  return getFirstCharDistanceFromSide(word, draft) + wordWidth;
}

function adjustByReassign(word: WordType, draft: DocumentType) {
  const sizes = wordSizes(word.word);
  const firstCharDistanceFromSide = getFirstCharDistanceFromSide(word, draft);
  let counter = 0;
  _.forEach(_.range(word.leftIndex, word.rightIndex + 1), (index: number) => {
    const { page, line } = draft.content[index];
    if (draft.content[index] !== GAP) {
      _.assign(draft.content[index], {
        side: firstCharDistanceFromSide + sizes[counter].width,
        height: sizes[counter].height,
      });
      _.assign(draft.paging[page][line], {
        height: _.max([sizes[counter].height, draft.paging[page][line]]),
      });
      counter += 1;
    }
  });
}

function adjustLineAndPageNumber(word: WordType, draft: DocumentType) {
  const sizes = wordSizes(word.word);
  const height = getHeightFromSizes(sizes);
  const { page, line } = draft.content[word.cursor];
  let newPage = page;
  let newLine = line;
  if (draft.paging[page][line].height + height <= maxHeight) {
    newLine = line + 1;
    if (_.isUndefined(draft.paging[newPage][newLine])) {
      draft.paging[page].push({ start: word.leftIndex, height: 0 });
    }
  } else {
    newPage = page + 1;
    newLine = 0;
    if (_.isUndefined(draft.paging[newPage])) {
      draft.paging.push([{ start: word.leftIndex, height: 0 }]);
    }
  }
  _.forEach(_.range(word.leftIndex, word.rightIndex + 1), (index: number) => {
    if (draft.content[index] !== GAP) {
      _.assign(draft.content[index], {
        page: newPage,
        line: newLine,
      });
    }
  });
  _.assign(draft.paging[page][line], {
    end: getLastWordEndIndex(word, draft),
  });
}

function setPagingNumbers(word: WordType, draft: DocumentType) {
  const { page, line } = draft.content[word.cursor];
  _.assign(draft.paging[page][line], {
    start: _.min([
      word.leftIndex <= draft.gapLeft ? word.leftIndex : word.leftIndex - draft.gapSize + 1,
      draft.paging[page][line].start,
    ]),
    end: _.max([
      word.rightIndex <= draft.gapLeft ? word.rightIndex : word.rightIndex - draft.gapSize + 1,
      draft.paging[page][line].end,
    ]),
  });
}

function setCursorPageAndLine(word: WordType, draft: DocumentType) {
  const { page, line } = draft.content[word.cursor];
  draft.cursorPage = page;
  draft.cursorLine = line;
}

export function adjustParagraph(draft: DocumentType) {
  let index = draft.gapLeft;
  const word = getWordFromIndex(draft.gapLeft, draft);
  while (!_.includes(getWordSideString(word, 'left', draft), PAR) && index < draft.content.length) {
    const d = getLastCharDistanceFromSide(word, draft);
    if (d > maxWidth) {
      adjustLineAndPageNumber(word, draft);
    }
    setCursorPageAndLine(word, draft);
    setPagingNumbers(word, draft);
    adjustByReassign(word, draft);
    index = getNextWordStartIndex(word, draft);
  }
}

export function insertChar(char: string, draft: DocumentType) {
  draft.content[draft.gapLeft] = {
    char,
    side: 0,
    height: 0,
    page: draft.cursorPage,
    line: draft.cursorLine,
  };

  adjustParagraph(draft);

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
