const Container = require('./container');

module.exports = {
  Paragraph: class Paragraph extends Container {},

  Size: class Size extends Container {
    constructor(size, nodes) {
      super(nodes);
      this.size = size;
    }
  },

  Bold: class Bold extends Container {},

  Italic: class Italic extends Container {}
}
