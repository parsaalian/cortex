/* eslint-disable */
import GapBuffer from '..';

describe('vulcan gap buffer', () => {
  it('should be tested', () => {
    const buffer = new GapBuffer();
    buffer.insert('h');
    buffer.left();
    buffer.right();
    console.log(...buffer.document);
  });
});
