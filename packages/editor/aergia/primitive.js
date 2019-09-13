import _ from 'lodash';

export default class PrimitiveSloth {
  constructor(primitive) {
    this.primitive = primitive;
    this.changes = [];
  }

  call(callback) {
    if (typeof callback === 'function') {
      this.changes.push(callback);
    } else {
      throw new Error('Input should be function');
    }
  }

  get() {
    if (!_.isEmpty(this.changes)) {
      this.primitive = _.reduce(
        this.changes,
        (primitive, callback) => callback(primitive),
        this.primitive,
      );
    }
    return this.primitive;
  }
}
