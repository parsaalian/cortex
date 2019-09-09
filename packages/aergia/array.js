import _ from 'lodash';

export default class ArraySloth {
  constructor(array) {
    this.array = array;
    this.changes = [];
  }

  call(range, callback) {
    this.changes.push({ range, callback });
  }

  getByIndex(index) {
    if (!_.isEmpty(this.changes)) {
      this.array[index] = _.reduce(
        _.filter(this.changes, (change) => {
          const { start, end } = change.range;
          return _.inRange(index, start, end);
        }),
        (array, change) => change.callback(array[index]),
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
