// @flow
import _ from 'lodash';
import type { DocumentType } from '~/redux/types/editor';
import sizing, { wordSizes } from '~/redux/utils/editor/sizing';

const maxWidth = 559;
const maxHeight = 20;
const lineSize = 18;
const SPC = 'BUFFER/SPACE';
const GAP = 'BUFFER/GAP';

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
  char: string,
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
    leftWord.push(draft.content[leftCursor].char);
    leftCursor -= 1;
  }
  while (draft.content[rightCursor] !== SPC && rightCursor < draft.content.length) {
    rightWord.push(draft.content[rightWord].char);
    rightCursor += 1;
  }
  return {
    leftLength: leftWord.length,
    rightLength: rightWord.length,
    cursor: draft.gapLeft - leftCursor - 1,
    word: _.join(_.concat(_.reverse(leftWord), [char], rightWord), ''),
  };
}

function insertChar(char: string, draft: DocumentType): DocumentType {
  const currentWord = getCurrentWord(char, draft);
  console.log(currentWord);
  const sizes = wordSizes(currentWord.word);
  console.log(sizes);
}

// TODO: refactor this method
export function adjust(char: string, draft: DocumentType): DocumentType {
  insertChar(char, draft);
  const charSize = sizing(char).width;
  if (draft.gapLeft === 0) {
    draft.content[draft.gapLeft] = {
      char,
      side: charSize,
      top: 0,
      page: 0,
      line: 0,
    };
    if (_.isUndefined(draft.content[draft.gapRight + 1])) {
      draft.paging[0][0].end = 0;
    }
  } else if (draft.content[draft.gapLeft - 1].side + charSize < maxWidth) {
    draft.content[draft.gapLeft] = {
      char,
      side: draft.content[draft.gapLeft - 1].side + charSize,
      top: draft.content[draft.gapLeft - 1].top,
      page: draft.content[draft.gapLeft - 1].page,
      line: draft.content[draft.gapLeft - 1].line,
    };
    if (_.isUndefined(draft.content[draft.gapRight + 1])) {
      draft.paging[draft.content[draft.gapLeft].page][draft.content[draft.gapLeft].line].end =
        draft.gapLeft;
    }
  } else if (
    draft.content[draft.gapLeft - 1].side + charSize >= maxWidth &&
    draft.content[draft.gapLeft - 1].top + lineSize < maxHeight
  ) {
    draft.content[draft.gapLeft] = {
      char,
      side: charSize,
      top: draft.content[draft.gapLeft - 1].top + lineSize,
      page: draft.content[draft.gapLeft - 1].page,
      line: draft.content[draft.gapLeft - 1].line + 1,
    };
    draft.paging[draft.content[draft.gapLeft - 1].page][draft.content[draft.gapLeft - 1].line].end =
      draft.gapLeft - 1;
    if (
      _.isUndefined(
        draft.paging[draft.content[draft.gapLeft].page][draft.content[draft.gapLeft].line],
      )
    ) {
      draft.paging[draft.content[draft.gapLeft].page].push({
        start: draft.gapLeft,
        end: draft.gapLeft,
      });
    } else {
      draft.paging[draft.content[draft.gapLeft].page][draft.content[draft.gapLeft].line].start =
        draft.gapLeft;
    }
  } else {
    draft.content[draft.gapLeft] = {
      char,
      side: charSize,
      top: 0,
      page: draft.content[draft.gapLeft - 1].page + 1,
      line: 0,
    };
    draft.paging[draft.content[draft.gapLeft - 1].page][draft.content[draft.gapLeft - 1].line].end =
      draft.gapLeft - 1;
    if (_.isUndefined(draft.paging[draft.content[draft.gapLeft].page])) {
      draft.paging.push([{ start: draft.gapLeft, end: draft.gapLeft }]);
    } else if (
      _.isUndefined(
        draft.paging[draft.content[draft.gapLeft].page][draft.content[draft.gapLeft].line],
      )
    ) {
      draft.paging[draft.content[draft.gapLeft].page].push({
        start: draft.gapLeft,
        end: draft.gapLeft,
      });
    } else {
      draft.paging[draft.content[draft.gapLeft].page][draft.content[draft.gapLeft].line].start =
        draft.gapLeft;
    }
  }
  draft.content = _.map(draft.content, (size: number, index: number): number => {
    if (index > draft.gapRight) {
      const leftIndex = index === draft.gapRight + 1 ? draft.gapLeft : index - 1;
      if (draft.content[index].side + charSize < maxWidth) {
        draft.content[index].side += charSize;
        draft.content[index].top = draft.content[leftIndex].top;
      } else if (
        draft.content[index].side + charSize >= maxWidth &&
        draft.content[index].top + lineSize < maxHeight
      ) {
        draft.content[index] = {
          char: draft.content[index].char,
          side: sizing(draft.content[index].char).width,
          top: draft.content[index].top + lineSize,
          page: draft.content[index].page,
          line: draft.content[leftIndex].line + 1,
        };
        draft.paging[draft.content[leftIndex].page][draft.content[leftIndex].line].end = leftIndex;
        if (_.isUndefined(draft.paging[draft.content[index].page][draft.content[index].line])) {
          draft.paging[draft.content[index].page].push({ start: index - 128, end: index - 128 });
        } else {
          draft.paging[draft.content[index].page][draft.content[index].line].start = index - 128;
        }
      } else {
        draft.content[index] = {
          char: draft.content[index].char,
          side: draft.content[index].side - draft.content[leftIndex].side - charSize,
          top: 0,
          page: draft.content[leftIndex].page + 1,
          line: 0,
        };
        draft.paging[draft.content[leftIndex].page][draft.content[leftIndex].line].end = leftIndex;
        if (_.isUndefined(draft.paging[draft.content[index].page])) {
          draft.paging.push([{ start: index - 128, end: index - 128 }]);
        } else if (
          _.isUndefined(draft.paging[draft.content[index].page][draft.content[index].line])
        ) {
          draft.paging[draft.content[index].page].push({ start: index - 128, end: index - 128 });
        } else {
          draft.paging[draft.content[index].page][draft.content[index].line].start = index - 128;
        }
      }
    }
    return size;
  });
  return draft;
}

// cursor related functions
export function left(draft: DocumentType) {
  if (draft.gapLeft !== 0) {
    draft.gapLeft -= 1;
    draft.gapRight -= 1;
    draft.content[draft.gapRight + 1] = draft.content[draft.gapLeft];
    draft.content[draft.gapLeft] = GAP;
  }
}

export function right(draft: DocumentType) {
  if (draft.gapRight !== draft.content.length - 1) {
    draft.gapLeft += 1;
    draft.gapRight += 1;
    draft.content[draft.gapLeft - 1] = draft.content[draft.gapRight];
    draft.content[draft.gapRight] = GAP;
  }
}

export function move(position: number, draft: DocumentType) {
  draft.content = [
    ..._.slice(draft.content, 0, draft.gapLeft),
    ..._.slice(draft.content, draft.gapRight + 1),
  ];
  if (_.inRange(position, 0, draft.content.length + 1)) {
    grow(position, draft);
  } else if (position < 0) {
    grow(0, draft);
  } else {
    grow(draft.content.length, draft);
  }
}
