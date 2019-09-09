import _ from 'lodash';

const VOID = 'VOID';

export default class GapBuffer {
  constructor(bufferSize = 128) {
    this.bufferSize = bufferSize;
    this.cursor = 0;
    this.document = _.times(bufferSize, _.constant(VOID));
    this.lastBufferIndex = 127;
  }

  grow(position) {
    this.document = [
      ..._.slice(this.document, 0, position),
      ..._.times(this.bufferSize, _.constant(VOID)),
      ..._.slice(this.document, position),
    ];
    this.lastBufferIndex = position + this.bufferSize - 1;
  }

  left() {
    if (this.cursor !== 0) {
      this.cursor -= 1;
      this.document[this.lastBufferIndex] = this.document[this.cursor];
      this.document[this.cursor] = VOID;
      this.lastBufferIndex -= 1;
    }
  }

  right() {
    if (this.lastBufferIndex !== this.document.length - 1) {
      this.lastBufferIndex += 1;
      this.document[this.cursor] = this.document[this.lastBufferIndex];
      this.document[this.lastBufferIndex] = VOID;
      this.cursor += 1;
    }
  }

  insert(char) {
    this.document[this.cursor] = char;
    this.cursor += 1;
  }
}
