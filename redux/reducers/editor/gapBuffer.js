// @flow
import _ from 'lodash';
import type { DocumentType } from '~/redux/types/editor';
import { wordSizes } from '~/redux/utils/editor/sizing';

const maxWidth = 559;
const maxHeight = 20;
export const SPC = 'BUFFER/SPACE';
export const GAP = 'BUFFER/GAP';

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

function getCurrentWord(
  char: ?string,
  draft: DocumentType,
): {
  leftLength: number,
  rightLength: number,
  cursor: number,
  word: string,
} {
  const leftWord = [];
  const rightWord = [];
  let leftCursor = draft.gapLeft - 1;
  let rightCursor = draft.gapRight + 1;

  while (draft.content[leftCursor] !== SPC && leftCursor >= 0) {
    if (typeof draft.content[leftCursor] === 'string') {
      throw new Error('looped on string instead of object');
    } else {
      leftWord.push(draft.content[leftCursor].char);
      leftCursor -= 1;
    }
  }
  while (draft.content[rightCursor] !== SPC && rightCursor < draft.content.length) {
    if (typeof draft.content[rightCursor] === 'string') {
      throw new Error('looped on string instead of object');
    } else {
      rightWord.push(draft.content[rightCursor].char);
      rightCursor += 1;
    }
  }

  return {
    leftLength: leftWord.length,
    rightLength: rightWord.length,
    cursor: draft.gapLeft - leftCursor - 1,
    word: _.join(_.concat(_.reverse(leftWord), [char], rightWord), ''),
  };
}

function getWordFromIndex(
  index: number,
  draft: DocumentType,
): {
  leftLength: number,
  rightLength: number,
  cursor: number,
  word: string,
} {
  const leftWord = [];
  const rightWord = [];
  let leftCursor = index - 1;
  let rightCursor = index + 1;

  while (draft.content[leftCursor] !== SPC && leftCursor >= 0) {
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
  while (draft.content[rightCursor] !== SPC && rightCursor < draft.content.length) {
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
    leftLength: leftWord.length,
    rightLength: rightWord.length,
    cursor: index - leftCursor - 1,
    word: _.join(_.concat(_.reverse(leftWord), [draft.content[index]], rightWord), ''),
  };
}

function getWidthFromSizes(array: Array<{ width: number, height: number }>): number {
  const lastItem = _.last(array);
  return _.isUndefined(lastItem) ? 0 : lastItem.width;
}

function getHeightFromSizes(array: Array<{ width: number, height: number }>): number {
  return _.max(_.map(array, (member: { width: number, height: number }): number => member.height));
}

function adjustWord(
  word: {
    leftLength: number,
    rightLength: number,
    cursor: number,
    word: string,
  },
  sizes: Array<{ width: number, height: number }>,
  widthDiff: number,
  draft: DocumentType,
) {
  const wordStart = draft.gapLeft - word.leftLength;
  const wordEnd = draft.gapRight + word.rightLength;
  const leftContent = draft.content[wordStart - 1];
  const width = getWidthFromSizes(sizes);
  const height = getHeightFromSizes(sizes);

  if (typeof leftContent === 'string') {
    throw new Error('problem in adjusting');
    // TODO: new change line criteria: remaining space / space number >= word spacing
  } else if ((_.isUndefined(leftContent) ? 0 : leftContent.side) + width <= maxWidth) {
    _.forEach(
      _.concat(_.range(wordStart, draft.gapLeft + 1), _.range(draft.gapRight + 1, wordEnd + 1)),
      (index: number) => {
        const sizeIndex = index - wordStart - (index >= draft.gapRight + 1 ? draft.gapSize - 1 : 0);
        _.assign(draft.content[index], {
          side: (_.isUndefined(leftContent) ? 0 : leftContent.side) + sizes[sizeIndex].width,
          height: sizes[sizeIndex].height,
          page: _.isUndefined(leftContent) ? 0 : leftContent.page,
          line: _.isUndefined(leftContent) ? 0 : leftContent.line,
        });
        if (typeof draft.content[index] !== 'string') {
          _.assign(draft.paging[draft.content[index].page][draft.content[index].line], {
            end: index,
            height: _.max([
              height,
              draft.paging[draft.content[index].page][draft.content[index].line].height,
            ]),
          });
        } else {
          throw new Error('looped on string instead of object');
        }
      },
    );
  }
}

export function adjust(draft: DocumentType) {
  _.forEach(_.range(0, draft.content.length), (index) => {
    const currentWord = getWordFromIndex(index, draft);
    const currentSizes = wordSizes(currentWord.word);
    const wordStart = index - currentWord.leftLength;
    const wordEnd = index + currentWord.rightLength;
    const leftContent = draft.content[wordStart - 1];
    const width = getWidthFromSizes(currentSizes);
    const height = getHeightFromSizes(currentSizes);
  });
}

export function insertChar(char: string, draft: DocumentType) {
  const currentWord = getCurrentWord(undefined, draft);
  const afterWord = getCurrentWord(char, draft);
  const currentSizes = wordSizes(currentWord.word);
  const afterSizes = wordSizes(afterWord.word);
  const widthDiff = getWidthFromSizes(afterSizes) - getWidthFromSizes(currentSizes);

  draft.content[draft.gapLeft] = { char, side: 0, height: 0, page: 0, line: 0 };

  // first adjust current word sizes
  adjustWord(afterWord, afterSizes, widthDiff, draft);
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
