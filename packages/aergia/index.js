import PrimitiveSloth from './primitive';

export default class Sloth {
  constructor(bear) {
    const type = typeof bear;
    if (type === 'number' || type === 'boolean' || type === 'string') {
      return new PrimitiveSloth(bear);
    }
  }
}
