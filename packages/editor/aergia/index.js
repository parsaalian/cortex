import PrimitiveSloth from './primitive';
import ArraySloth from './array';

export default class Sloth {
  constructor(bear) {
    const type = typeof bear;
    if (type === 'number' || type === 'boolean' || type === 'string') {
      return new PrimitiveSloth(bear);
    }
    if (type === 'array') {
      return new ArraySloth(bear);
    }
  }
}
