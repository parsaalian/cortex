import Data from '../data';

import Typeical from './typeical';
import sizing from './sizing';

import { INS, SPC, DEL, ENT } from './typeical/consts';

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
      default:
    }
  }

  insert(value) {
    const size = sizing(value);
    Data.insert({ value, width: size.width });
  }

  space() {
    Data.space();
  }

  enter() {
    Data.enter();
  }

  delete() {
    Data.delete();
  }
}

export default new Middleware();
