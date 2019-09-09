import _ from 'lodash';

const VOID = 'VOID';

export default class GapBuffer {
  constructor(size = 128) {
    this.size = size;
    this.gapSize = size;
    this.gapLeft = 0;
    this.gapRight = 127;
    this.document = _.times(size, _.constant(VOID));
  }

  grow(position) {
    this.document = [
      ..._.slice(this.document, 0, position),
      ..._.times(this.size, _.constant(VOID)),
      ..._.slice(this.document, position),
    ];
    this.gapLeft = position;
    this.gapRight = position + this.size - 1;
    this.gapSize = this.size;
  }

  left() {
    if (this.gapLeft !== 0) {
      this.gapLeft -= 1;
      this.gapRight -= 1;
      this.document[this.gapRight + 1] = this.document[this.gapLeft];
      this.document[this.gapLeft] = VOID;
    }
  }

  right() {
    if (this.gapRight !== this.document.length - 1) {
      this.gapLeft += 1;
      this.gapRight += 1;
      this.document[this.gapLeft - 1] = this.document[this.gapRight];
      this.document[this.gapRight] = VOID;
    }
  }

  move(position) {
    this.document = [
      ..._.slice(this.document, 0, this.gapLeft),
      ..._.slice(this.document, this.gapRight + 1),
    ];
    if (_.inRange(position, 0, this.document.length + 1)) {
      this.grow(position);
    }
  }

  insert(char) {
    this.document[this.gapLeft] = char;
    this.gapLeft += 1;
    this.gapSize -= 1;
    if (this.gapSize === 0) {
      this.grow(this.gapLeft);
    }
  }
}
