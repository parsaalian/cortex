import Document from '../data';

import Typeical from './typeical';

import { INS, SPC, DEL, ENT, MV } from './typeical/consts';

class Middleware {
  input(event) {
    const action = Typeical.get(event);
    switch (action.type) {
      case INS:
        this.insert(action.value);
        break;
      case SPC:
        this.space();
        break;
      case DEL:
        this.delete();
        break;
      case ENT:
        this.enter();
        break;
      case MV:
        this.move(action.direction);
        break;
      default:
    }
  }

  insert(value) {
    Document.insert(value);
  }

  space() {
    Document.space();
  }

  enter() {
    Document.enter();
  }

  delete() {
    Document.delete();
  }

  move(direction) {
    Document.move(direction);
  }
}

export default new Middleware();
