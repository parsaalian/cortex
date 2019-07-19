import Cursor from './cursor';
import Page from './page';

// const maxWidth = 816;

class Document {
  constructor() {
    this.pages = [new Page()];
  }

  insert(value) {
    this.pages[Cursor.page].insertValue(value);
    console.log(JSON.stringify(this.getText()));
    console.log(Cursor);
  }

  space() {
    this.pages[Cursor.page].space();
    console.log(JSON.stringify(this.getText()));
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

  getText() {
    return this.pages.map((page) => page.get());
  }
}

export default new Document();
