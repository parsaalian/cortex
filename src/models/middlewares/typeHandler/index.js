import keyMap from './keyMap';
import ActionStorage from './actionStorage';

class Typeical {
  constructor() {
    this.keyMap = keyMap;
    this.actions = new ActionStorage(this);
  }

  logKey(e) {
    this.actions.get(e.keyCode)(e);
  }

  type(value) {
    console.log(value);
  }

  delete() {
    console.log('delete');
  }

  enter() {
    console.log('enter');
  }

  space() {
    console.log('space');
  }

  move(direction) {
    console.log('move ', direction);
  }
}

export default new Typeical();
