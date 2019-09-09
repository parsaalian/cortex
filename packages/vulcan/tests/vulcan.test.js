/* eslint-disable */
import GapBuffer from '..';

describe('vulcan gap buffer', () => {
  it('should be tested', () => {
    const buffer = new GapBuffer();
    buffer.insert('t');
    buffer.insert('e');
    buffer.insert('s');
    buffer.insert('t');
    buffer.insert('t');
    buffer.insert('e');
    buffer.insert('s');
    buffer.insert('t');
    buffer.insert('t');
    buffer.insert('e');
    buffer.insert('s');
    buffer.insert('t');
    console.log(...buffer.document);
    console.log(...buffer.sizeArray);
  });
});
