import Cursor from './cursor';
import Page from './page';

class Document {
  constructor() {
    this.pages = [new Page()];
  }

  insert(value) {
    this.pages[Cursor.page].insertValue(value);
    console.log(Cursor);
  }

  space() {
    this.pages[Cursor.page].space();
    console.log(Cursor);
  }

  move(direction) {
    switch (direction) {
      case 'l':
        Cursor.prevChar();
        break;
      case 'r':
        Cursor.nextChar();
        break;
      default:
    }
  }

  get() {
    const data = this.pages.map((page) => page.get());
    let word = data[Cursor.page][Cursor.line][Cursor.word];
    word = [...word.slice(0, Cursor.char), 'cursor', ...word.slice(Cursor.char)];
    data[Cursor.page][Cursor.line][Cursor.word] = word;
    return data;
  }
}

export default new Document();
