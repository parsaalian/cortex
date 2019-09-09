import _ from 'lodash';

class SlothNumber {
  constructor(number) {
    this.number = number;
    this.change = null;
  }

  set(callback) {
    this.change = callback;
  }

  get() {
    this.number = this.change(this.number);
    return this.number;
  }
}
