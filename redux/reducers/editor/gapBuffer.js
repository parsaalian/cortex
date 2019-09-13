import _ from 'lodash';
import sizing from '~/redux/utils/editor/sizing';

const maxWidth = 559;
const maxHeight = 20;
const lineSize = 18;
const GAP = 'BUFFER/GAP';

// insertion related functions
export function grow(position, draft) {
  draft.content = [
    ..._.slice(draft.content, 0, position),
    ..._.times(128, _.constant(GAP)),
    ..._.slice(draft.content, position),
  ];
  draft.gapLeft = position;
  draft.gapRight = position + 127;
  draft.gapSize = 128;
}

export function paste(text, draft) {
  _.forEach(text, (char) => {
    draft.insert(char);
  });
}

export function adjust(char, draft) {
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
      draft.paging.push([{ start: draft.gapLeft }]);
    } else if (
      _.isUndefined(
        draft.paging[draft.content[draft.gapLeft].page][draft.content[draft.gapLeft].line],
      )
    ) {
      draft.paging[draft.content[draft.gapLeft].page].push({ start: draft.gapLeft });
    } else {
      draft.paging[draft.content[draft.gapLeft].page][draft.content[draft.gapLeft].line].start =
        draft.gapLeft;
    }
  }
  draft.content = _.map(draft.content, (size, index) => {
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
          side: sizing(draft.content[index].char).width,
          top: draft.content[index].top + lineSize,
          line: draft.content[leftIndex].line + 1,
        };
        draft.paging[draft.content[leftIndex].page][draft.content[leftIndex].line].end = leftIndex;
        if (_.isUndefined(draft.paging[draft.content[index].page][draft.content[index].line])) {
          draft.paging[draft.content[index].page].push({ start: index - 128 });
        } else {
          draft.paging[draft.content[index].page][draft.content[index].line].start = index - 128;
        }
      } else {
        draft.content[index] = {
          side: draft.content[index].side - draft.content[leftIndex].side - charSize,
          top: 0,
          page: draft.content[leftIndex].page + 1,
          line: 0,
        };
        draft.paging[draft.content[leftIndex].page][draft.content[leftIndex].line].end = leftIndex;
        if (_.isUndefined(draft.paging[draft.content[index].page])) {
          draft.paging.push([{ start: index - 128 }]);
        } else if (
          _.isUndefined(draft.paging[draft.content[index].page][draft.content[index].line])
        ) {
          draft.paging[draft.content[index].page].push({ start: index - 128 });
        } else {
          draft.paging[draft.content[index].page][draft.content[index].line].start = index - 128;
        }
      }
    }
    return size;
  });
}

// cursor related functions
export function left(draft) {
  if (draft.gapLeft !== 0) {
    draft.gapLeft -= 1;
    draft.gapRight -= 1;
    draft.content[draft.gapRight + 1] = draft.content[draft.gapLeft];
    draft.content[draft.gapLeft] = GAP;
  }
}

export function right(draft) {
  if (draft.gapRight !== draft.content.length - 1) {
    draft.gapLeft += 1;
    draft.gapRight += 1;
    draft.content[draft.gapLeft - 1] = draft.content[draft.gapRight];
    draft.content[draft.gapRight] = GAP;
  }
}

export function move(position, draft) {
  draft.document = [
    ..._.slice(draft.document, 0, draft.gapLeft),
    ..._.slice(draft.document, draft.gapRight + 1),
  ];
  if (_.inRange(position, 0, draft.document.length + 1)) {
    draft.grow(position);
  } else if (position < 0) {
    draft.grow(0);
  } else {
    draft.grow(draft.document.length);
  }
}