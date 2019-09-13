/* eslint {no-param-reassign: off, no-unused-vars: off} */
import _ from 'lodash';
import produce from 'immer';
import { handleAction } from 'redux-actions';
import insertChar from '../utils';
import initialState from '~/store/initialState';
import { KEYBOARD_EVENT } from '~/store/constants/actions/editor';
import sizing from '~/packages/damastes';
import typing, {
  INSERT_CHAR,
  INSERT_SPACE,
  INSERT_ENTER,
  REMOVE_CHAR,
} from '~/store/utils/editor/typing';

const maxWidth = 559;
const maxHeight = 20;
const lineSize = 18;
const GAP = 'GAP';

// BUG: change sizing of the last word on character insert

function grow(position, draft) {
  draft.content = [
    ..._.slice(draft.content, 0, position),
    ..._.times(128, _.constant(GAP)),
    ..._.slice(draft.content, position),
  ];
  draft.gapLeft = position;
  draft.gapRight = position + 127;
  draft.gapSize = 128;
}

function left() {
  if (this.gapLeft !== 0) {
    this.gapLeft -= 1;
    this.gapRight -= 1;
    this.document[this.gapRight + 1] = this.document[this.gapLeft];
    this.document[this.gapLeft] = GAP;
  }
}

function right() {
  if (this.gapRight !== this.document.length - 1) {
    this.gapLeft += 1;
    this.gapRight += 1;
    this.document[this.gapLeft - 1] = this.document[this.gapRight];
    this.document[this.gapRight] = GAP;
  }
}

function move(position) {
  this.document = [
    ..._.slice(this.document, 0, this.gapLeft),
    ..._.slice(this.document, this.gapRight + 1),
  ];
  if (_.inRange(position, 0, this.document.length + 1)) {
    this.grow(position);
  } else if (position < 0) {
    this.grow(0);
  } else {
    this.grow(this.document.length);
  }
}

function paste(text) {
  _.forEach(text, (char) => {
    this.insert(char);
  });
}

function adjust(char, draft) {
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

// typing reducers
const typeCharReducer = handleAction(
  INSERT_CHAR,
  (state, action) =>
    produce(state, (draft) => {
      const char = action.payload;
      adjust(char, draft);
      draft.gapLeft += 1;
      draft.gapSize -= 1;
      if (draft.gapSize === 0) {
        grow(draft.gapLeft, draft);
      }
      return draft;
    }),
  initialState.document,
);

const insertSpaceReducer = handleAction(
  INSERT_SPACE,
  (state, action) =>
    produce(state, (draft) => {
      const { cursor } = draft;
      const initialWord = _.assign({}, initialState.document.pages[0].lineGroups[0].wordGroups[0]);
      const line = draft.pages[cursor[0]].lineGroups[cursor[1]];
      line.wordGroups.push(initialWord);
      line.size[1] += 4;
      cursor[2] += 1;
      cursor[3] = 0;
    }),
  initialState.document,
);

const insertEnterReducer = handleAction(
  INSERT_ENTER,
  (state, action) => state,
  initialState.document,
);

const removeCharReducer = handleAction(
  REMOVE_CHAR,
  (state, action) => state,
  initialState.document,
);

export default function keyboardReducer(state = initialState.document, action) {
  let typingAction;
  if (action.type === KEYBOARD_EVENT) {
    typingAction = typing(action.payload);
  }
  switch (action.type) {
    case KEYBOARD_EVENT:
      switch (typingAction.type) {
        case INSERT_CHAR:
          return typeCharReducer(state, typingAction);
        case INSERT_SPACE:
          return insertSpaceReducer(state, typingAction);
        case INSERT_ENTER:
          return insertEnterReducer(state, typingAction);
        case REMOVE_CHAR:
          return removeCharReducer(state, typingAction);
        default:
          return state;
      }
    default:
      return state;
  }
}
