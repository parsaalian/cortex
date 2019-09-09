/* eslint-disable */
import GapBuffer from '..';

describe('vulcan gap buffer', () => {
  it('should be tested', () => {
    const buffer = new GapBuffer();
    buffer.insert('h');
    buffer.left();
    buffer.insert('o');
    console.log(...buffer.document);
    console.log(...buffer.sizeArray);
  });
});
