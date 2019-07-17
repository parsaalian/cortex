import _ from 'lodash';

import sizing from '../middlewares/sizing';

const maxWidth = 816;
const BR = 'break';

class Data {
  constructor() {
    this.words = [{ word: '', width: 0, taken: 0 }];
  }

  getText() {
    return this.words;
  }

  insert(char) {
    const lastWord = _.last(this.words);
    if (lastWord.taken + char.width > maxWidth) {
      lastWord.word += char.value;
      lastWord.width += char.width;
      lastWord.taken = lastWord.width;
      this.words = [...this.words.slice(0, this.words.length - 1), BR, lastWord];
    } else {
      lastWord.word += char.value;
      lastWord.width += char.width;
      lastWord.taken += char.width;
    }
  }

  space() {
    const lastWord = _.last(this.words);
    this.words.push({ word: '', width: 0, taken: lastWord.taken + 4.2 });
  }

  enter() {
    this.words.push(BR);
    this.words.push({ word: '', width: 0, taken: 0 });
  }

  delete() {
    const lastWord = _.last(this.words);
    if (lastWord.word === '' || lastWord === BR) {
      this.words.pop();
    } else {
      lastWord.word = lastWord.word.slice(0, lastWord.word.length - 1);
      lastWord.width = sizing(lastWord.word.width).width;
    }
  }
}

export default new Data();
