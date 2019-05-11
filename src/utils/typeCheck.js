import Content from '../data/content';
import { Paragraph,
          Size,
          Bold} from '../data/styles';

export default class TypeCheck {
  getType(obj) {
    if (obj instanceof Content) {
      return 'content';
    }
    else if (obj instanceof Paragraph) {
      return 'paragraph';
    }
    else if (obj instanceof Size) {
      return 'size';
    }
    else if (obj instanceof Bold) {
      return 'bold';
    }
  }
}
