Node = require('./node');

module.exports = class Content extends Node {
  constructor(value='') {
    super();
    this.string = value;
  }

  _prefixMerge(other) {
    insertContent(other.content(), 0);
  }

  _suffixMerge(other) {
    insertContent(other.content(), this.length());
  }

  sucide() {
    this.communicator.parent.edit.removeContent(this.communicator.index);
  }

  insert(node, i) {
    // TODO, break at i, insert nodes
  }

  insertContent(str, i) {
    this.string.splice(i, 0, ...str);
  }

  deleteContent(i, j)  {
    this.string.splice(i, j - i);
    if (!this.string) {
      sucide();
    }
  }

  content() {
    return this.string;
  }

  length() {
    return this.string.length;
  }
}
