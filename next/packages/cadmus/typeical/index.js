import keyMap from './keyMap';
import ActionStorage from './actionStorage';
import { INS, DEL, SPC, ENT, MV, MET } from './consts';

class Typeical {
  constructor() {
    this.keyMap = keyMap;
    this.actions = new ActionStorage(this);
  }

  get(e) {
    return this.actions.get(e.keyCode)(e);
  }

  type(value) {
    return {
      type: INS,
      value,
    };
  }

  delete() {
    return {
      type: DEL,
    };
  }

  space() {
    return {
      type: SPC,
    };
  }

  enter() {
    return {
      type: ENT,
    };
  }

  move(direction) {
    return {
      type: MV,
      direction,
    };
  }

  meta() {
    return {
      type: MET,
    };
  }
}

export default new Typeical();
