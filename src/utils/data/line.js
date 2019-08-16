import Cursor from './cursor';
import Word from './word';

export default class Line {
  constructor(parent, lineIndex = 0) {
    this.parent = parent;
    this.lineIndex = lineIndex;
    this.words = [new Word(this)];
    this.width = 0;
    this.length = 0;
  }

  changeIndex(newIndex) {
    this.lineIndex = newIndex;
  }

  insertValue(value) {
    this.words[Cursor.word].insertValue(value, Cursor);
  }

  space() {
    const word = this.words[Cursor.word];
    if (word.content.length === Cursor.char) {
      this.words.push(new Word(this, Cursor.word + 1));
      this.length += 1;
    } else {
      const word1 = word.content.slice(0, Cursor.char);
      const word2 = word.content.slice(Cursor.char);
      this.words = [
        ...this.words.slice(0, Cursor.word),
        new Word(this, Cursor.word, word1),
        new Word(this, Cursor.word + 1, word2),
        ...this.words.slice(Cursor.word + 1),
      ];
    }
    Cursor.nextWord();
  }

  get() {
    return this.words.map((word) => word.content);
  }
}
