/* eslint-disable */
import ArraySloth from '../array';

describe('array lazy type', () => {
  it('should get initial type with no change', () => {
    const test = [1, 2, 3];
    const sloth = new ArraySloth(test);
    expect(sloth.getByIndex(0)).toBe(1);
    expect(sloth.getByIndex(1)).toBe(2);
    expect(sloth.getByIndex(2)).toBe(3);
  });

  it('should change only on get', () => {
    const test = [1, 2, 3];
    const expected = [1, 2, 4];
    const sloth = new ArraySloth(test);
    sloth.call(
      {
        start: 2,
        end: 3,
      },
      (x) => 4,
    );
    expect(sloth.getByIndex(2)).toBe(4);
  });
});
