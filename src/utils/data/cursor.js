class Cursor {
  constructor() {
    this.char = 0;
    this.word = 0;
    this.line = 0;
    this.page = 0;
  }

  goto(char, word, line, page) {
    this.char = char;
    this.word = word;
    this.line = line;
    this.page = page;
  }

  prevChar() {
    this.char -= 1;
  }

  nextChar() {
    this.char += 1;
  }

  prevWord() {
    this.word -= 1;
  }

  nextWord() {
    this.word += 1;
  }

  prevLine() {
    this.line -= 1;
  }

  nextLine() {
    this.line += 1;
  }

  prevPage() {
    this.page -= 1;
  }

  nextPage() {
    this.page += 1;
  }
}

export default new Cursor();
