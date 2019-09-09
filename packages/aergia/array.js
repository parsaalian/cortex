import _ from 'lodash';

export default class ArraySloth {
  constructor(array) {
    this.array = array;
    this.changes = [];
  }

  set(range, callback) {
    this.changes.push({ range, callback });
  }

  getByIndex(index) {
    if (!_.isEmpty(this.changes)) {
      // pass
    }
    return this.array[index];
  }

  getByCallback(callback) {
    if (!_.isEmpty(this.changes)) {
      // pass
    }
  }
}
