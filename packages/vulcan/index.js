import _ from 'lodash';

const maxWidth = 20;
const maxHeight = 20;
const lineSize = 18;
const GAP = 'GAP';

// eslint-disable-next-line no-unused-vars
function mockSizing(char) {
  return 8;
}

export default class GapBuffer {
  constructor(size = 128) {
    this.size = size;
    this.gapSize = size;
    this.gapLeft = 0;
    this.gapRight = size - 1;
    this.document = _.times(size, _.constant(GAP));
  }

  grow(position) {
    this.document = [
      ..._.slice(this.document, 0, position),
      ..._.times(this.size, _.constant(GAP)),
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
      this.document[this.gapLeft] = GAP;
    }
  }

  right() {
    if (this.gapRight !== this.document.length - 1) {
      this.gapLeft += 1;
      this.gapRight += 1;
      this.document[this.gapLeft - 1] = this.document[this.gapRight];
      this.document[this.gapRight] = GAP;
    }
  }

  move(position) {
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

  insert(char) {
    this.adjust(char);
    this.gapLeft += 1;
    this.gapSize -= 1;
    if (this.gapSize === 0) {
      this.grow(this.gapLeft);
    }
  }

  adjust(char) {
    const charSize = mockSizing(char);
    if (this.gapLeft === 0) {
      this.document[this.gapLeft] = {
        char,
        side: charSize,
        top: 0,
        page: 0,
        line: 0,
      };
    } else if (this.document[this.gapLeft - 1].side + charSize < maxWidth) {
      this.document[this.gapLeft] = {
        char,
        side: this.document[this.gapLeft - 1].side + charSize,
        top: this.document[this.gapLeft - 1].top,
        page: this.document[this.gapLeft - 1].page,
        line: this.document[this.gapLeft - 1].line,
      };
    } else if (
      this.document[this.gapLeft - 1].side + charSize >= maxWidth &&
      this.document[this.gapLeft - 1].top + lineSize < maxHeight
    ) {
      this.document[this.gapLeft] = {
        char,
        side: charSize,
        top: this.document[this.gapLeft - 1].top + lineSize,
        page: this.document[this.gapLeft - 1].page,
        line: this.document[this.gapLeft - 1].line + 1,
      };
    } else {
      this.document[this.gapLeft] = {
        char,
        side: charSize,
        top: 0,
        page: this.document[this.gapLeft - 1].page + 1,
        line: 0,
      };
    }
    this.document = _.map(this.document, (size, index) => {
      if (index > this.gapRight) {
        const leftIndex = index === this.gapRight + 1 ? this.gapLeft : index - 1;
        if (this.document[index].side + charSize < maxWidth) {
          this.document[index].side += charSize;
          this.document[index].top = this.document[leftIndex].top;
        } else if (
          this.document[index].side + charSize >= maxWidth &&
          this.document[index].top + lineSize < maxHeight
        ) {
          this.document[index] = {
            side: mockSizing(this.document[index].char),
            top: this.document[index].top + lineSize,
            line: this.document[leftIndex].line + 1,
          };
        } else {
          this.document[index] = {
            side: this.document[index].side - this.document[leftIndex].side - charSize,
            top: 0,
            page: this.document[leftIndex].page + 1,
            line: 0,
          };
        }
      }
      return size;
    });
  }
}
