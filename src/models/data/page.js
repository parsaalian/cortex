import Cursor from './cursor';
import Line from './line';

export default class Page {
  constructor(parent, pageIndex = 0) {
    this.parent = parent;
    this.pageIndex = pageIndex;
    this.lines = [new Line(this)];
    this.length = 0;
  }

  changeIndex(newIndex) {
    this.pageIndex = newIndex;
  }

  insertLine() {
    this.lines.push(new Line(this));
    this.length += 1;
  }

  insertValue(value) {
    this.lines[Cursor.line].insertValue(value, Cursor);
  }

  space() {
    this.lines[Cursor.line].space();
  }

  get() {
    return this.lines.map((line) => line.get());
  }
}
