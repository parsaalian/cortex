/* eslint-disable */
import GapBuffer from '..';

describe('vulcan gap buffer', () => {
  it('should be tested', () => {
    const buffer = new GapBuffer();
    let time = 0;
    const date = new Date().getTime();
    buffer.insert('a');
    time += new Date().getTime() - date;
    console.log(time);
  });
});
