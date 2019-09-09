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
      this.array = _.reduce(
        _.filter(this.changes, (change) => {
          const { start, end } = change.range;
          _.inRange(index, start, end);
        }),
        (array, callback) => callback(array),
        this.array,
      );
    }
    return this.array[index];
  }

  getByCallback(callback) {
    if (!_.isEmpty(this.changes)) {
      // pass
    }
  }
}
