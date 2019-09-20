// @flow
import _ from 'lodash';
import { GAP, grow } from './gapBuffer';
import type { DocumentType } from '~/redux/types/editor';

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
