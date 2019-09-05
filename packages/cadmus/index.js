import keyMap from './keyMap';
import actionStorage from './actionStorage';

export default function type(event) {
  return actionStorage[keyMap[event.code]](event);
}
