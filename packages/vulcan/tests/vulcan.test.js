/* eslint-disable */
import GapBuffer from '..';

describe('vulcan gap buffer', () => {
  it('should be tested', () => {
    const buffer = new GapBuffer();
    buffer.insert('h');
    buffer.insert('e');
    buffer.insert('l');
    buffer.insert('l');
    buffer.insert('o');
    buffer.left();
    buffer.left();
    buffer.left();
    buffer.left();
    buffer.left();
    buffer.move(5);
    console.log(...buffer.document);
  });
});
