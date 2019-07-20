import Cursor from './cursor';

export default class Word {
  constructor(parent, wordIndex = 0, content = []) {
    this.parent = parent;
    this.wordIndex = wordIndex;
    this.content = content;
    this.length = content.length;
    this.width = 0;
  }

  changeIndex(newIndex) {
    this.wordIndex = newIndex;
  }

  insertValue(value) {
    const charNumber = Cursor.char;
    this.content = [...this.content.slice(0, charNumber), value, ...this.content.slice(charNumber)];
    Cursor.nextChar();
  }

  removeChar(char, index = -1) {
    if (index === -1 || index === this.length) {
      this.content = this.content.slice(0, this.length - 1);
    } else {
      this.content = this.content.slice(0, index) + this.content.slice(index + 1);
    }
  }
}
