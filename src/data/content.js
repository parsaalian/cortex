class Content() {
  constructor(value='') {
    this.string = value;
  }

  insertContent(str, i) {
    this.string = this.string.slice(0, i) + str + this.string.slice(i);
  }

  deleteContent(i, j) {
    this.string += this.string.slice(0, i) + this.string.slice(j);
  }

  content() {
    return this.string;
  }

  length() {
    return this.string.length;
  }
}
