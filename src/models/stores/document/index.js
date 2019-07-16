import _ from 'lodash';

import statics from './statics';
import dynamics from './dynamics';
import temporals from './temporals';

class DocumentStore {
  constructor() {
    this.statics = statics;
    this.dynamics = dynamics;
    this.temporals = temporals;
  }

  set(path, newValue) {
    if (_.has(this.statics, path) || _.has(this.temporals, path)) {
      throw new Error('Only dynamic types can change.');
    } else if (!_.has(this.dynamics, path)) {
      throw new Error('State does not exist.');
    } else {
      _.set(this.dynamics, path, newValue);
    }
  }

  get(path, type = null) {
    if (type !== null) {
      return _.get(_.get(this, [type]), path);
    }
    if (!_.has(this.statics, path) && !_.has(this.dynamics, path) && !_.has(this.temporals, path)) {
      throw new Error('State does not exist.');
    } else if (_.has(this.temporals, path)) {
      return _.get(this.temporals, path)();
    } else if (_.has(this.dynamics, path)) {
      return _.get(this.dynamics, path);
    }
    return _.get(this.statics, path);
  }
}

export default new DocumentStore();
