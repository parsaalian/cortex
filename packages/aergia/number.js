import _ from 'lodash';

export default class SlothNumber {
  constructor(number) {
    this.number = number;
    this.change = null;
  }

  set(callback) {
    if (typeof callback === 'function') {
      this.change = callback;
    } else {
      throw new Error('Input should be function');
    }
  }

  get() {
    if (!_.isNull(this.change)) {
      this.number = this.change(this.number);
    }
    return this.number;
  }
}
