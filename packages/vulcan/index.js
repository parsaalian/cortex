import _ from 'lodash';

const maxWidth = 20;
const maxHeight = 20;
const lineSize = 18;
const VOID = 'VOID';

// eslint-disable-next-line no-unused-vars
function mockSizing(char) {
  return 8;
}

export default class GapBuffer {
  constructor(size = 128) {
    this.size = size;
    this.gapSize = size;
    this.gapLeft = 0;
    this.gapRight = 127;
    this.document = _.times(size, _.constant(VOID));
    this.sizeArray = _.times(size, _.constant(VOID));
  }

  grow(position) {
    this.document = [
      ..._.slice(this.document, 0, position),
      ..._.times(this.size, _.constant(VOID)),
      ..._.slice(this.document, position),
    ];
    this.sizeArray = [
      ..._.slice(this.sizeArray, 0, position),
      ..._.times(this.size, _.constant(VOID)),
      ..._.slice(this.sizeArray, position),
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
      this.sizeArray[this.gapRight + 1] = this.sizeArray[this.gapLeft];
      this.sizeArray[this.gapLeft] = VOID;
    }
  }

  right() {
    if (this.gapRight !== this.document.length - 1) {
      this.gapLeft += 1;
      this.gapRight += 1;
      this.document[this.gapLeft - 1] = this.document[this.gapRight];
      this.document[this.gapRight] = VOID;
      this.sizeArray[this.gapLeft - 1] = this.sizeArray[this.gapRight];
      this.sizeArray[this.gapRight] = VOID;
    }
  }

  move(position) {
    this.document = [
      ..._.slice(this.document, 0, this.gapLeft),
      ..._.slice(this.document, this.gapRight + 1),
    ];
    this.sizeArray = [
      ..._.slice(this.sizeArray, 0, this.gapLeft),
      ..._.slice(this.sizeArray, this.gapRight + 1),
    ];
    if (_.inRange(position, 0, this.document.length + 1)) {
      this.grow(position);
    } else if (position < 0) {
      this.grow(0);
    } else {
      this.grow(this.document.length);
    }
  }

  insert(char) {
    this.document[this.gapLeft] = char;
    this.adjust(char);
    this.gapLeft += 1;
    this.gapSize -= 1;
    if (this.gapSize === 0) {
      this.grow(this.gapLeft);
    }
  }

  adjust(char) {
    const charSize = mockSizing(char);
    console.log(...this.sizeArray, this.gapLeft);
    if (this.gapLeft === 0) {
      this.sizeArray[this.gapLeft] = {
        side: charSize,
        top: 0,
      };
    } else if (this.sizeArray[this.gapLeft - 1].side + charSize < maxWidth) {
      this.sizeArray[this.gapLeft] = {
        side: this.sizeArray[this.gapLeft - 1].side + charSize,
        top: this.sizeArray[this.gapLeft - 1].top,
      };
    } else if (
      this.sizeArray[this.gapLeft - 1].side + charSize >= maxWidth &&
      this.sizeArray[this.gapLeft - 1].top + lineSize < maxHeight
    ) {
      this.sizeArray[this.gapLeft] = {
        side: charSize,
        top: this.sizeArray[this.gapLeft - 1].top + lineSize,
      };
    } else {
      this.sizeArray[this.gapLeft] = {
        side: charSize,
        top: 0,
      };
    }
    this.sizeArray = _.map(this.sizeArray, (size, index) => {
      if (index > this.gapRight) {
        const leftIndex = index === this.gapRight + 1 ? this.gapLeft : index - 1;
        if (this.sizeArray[index].side + charSize < maxWidth) {
          this.sizeArray[index].side += charSize;
          this.sizeArray[index].top = this.sizeArray[leftIndex].top;
        } else if (
          this.sizeArray[index].side + charSize >= maxWidth &&
          this.sizeArray[index].top + lineSize < maxHeight
        ) {
          this.sizeArray[index] = {
            side: this.sizeArray[index].side - this.sizeArray[leftIndex].side - charSize,
            top: this.sizeArray[index].top + lineSize,
          };
        } else {
          this.sizeArray[index] = {
            side: this.sizeArray[index].side - this.sizeArray[leftIndex].side - charSize,
            top: 0,
          };
        }
      }
      return size;
    });
  }
}
