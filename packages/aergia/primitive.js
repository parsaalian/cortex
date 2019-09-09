import _ from 'lodash';

export default class SlothNumber {
  constructor(primitive) {
    this.primitive = primitive;
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
      this.primitive = this.change(this.primitive);
    }
    return this.primitive;
  }
}
