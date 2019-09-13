/* eslint-disable */
import PrimitiveSloth from '../primitive';

describe('primitive lazy types', () => {
  it('should get initial type with no change', () => {
    const test = 0;
    const sloth = new PrimitiveSloth(test);
    expect(sloth.get()).toBe(test);
  });

  it('should change primitive on get', () => {
    const test = 1;
    const sloth = new PrimitiveSloth(test);
    sloth.call((x) => 2 * x);
    expect(sloth.primitive).toBe(test);
    expect(sloth.get()).toBe(2 * test);
  });
});
