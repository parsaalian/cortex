class Word {
  constructor(value='') {
    this.string = value;
  }

  appendChar(c) {
    this.string += c;
  }

  getString() {
    return this.string;
  }
}

class Paragraph {
  constructor() {
    this.words = [new Word()];
  }

  appendWord(word) {
    this.words.push(word);
  }

  writeChar(c) {
    if (c === ' ') {
      this.words.push(new Word(' '));
      this.words.push(new Word());
    }
    else {
      this.words[this.words.length - 1].appendChar(c);
    }
  }

  getWords() {
    return this.words;
  }
}

export default class Document {
  constructor() {
    this.document = [new Paragraph()];
  }

  appendParagraph() {
    this.document.push(new Paragraph());
    return this.document;
  }

  clearParagraph() {
    if (this.document.length > 0 && this.document[this.document.length - 1].words.length === 0) {
      this.document.pop();
    }
    return this.document;
  }

  writeWord(c) {
    this.document[this.document.length - 1].writeChar(c);
    return this.document;
  }

  getDocument() {
    return this.document;
  }
}
