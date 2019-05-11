import Content from '../data/content';
import { Paragraph,
          Size } from '../data/styles';

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
  }
}
