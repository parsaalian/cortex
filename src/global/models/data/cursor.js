const { Content } = require('index');

class Cursor {
  constructor(node, index) {
    this.node = node;
    this.index = index;
    this.classname = 'Cursor';
  }

  location() {
    return this.index;
  }

  left() {
    if (this.node.children[this.index - 1] !== undefined) {
      if (this.node.classname === 'Container') {
        this.node = this.node.children[this.index - 1];
        this.index = this.node.length;
      } else {
        this.index -= 1;
      }
    } else if (this.node.connection.left !== undefined) {
      this.node = this.node.connection.left;
      this.index = this.node.length;
    }

    if (this.node.children[this.index - 1].classname === 'Content') {
      this.node = this.node.children[this.index - 1];
      this.index = this.node.length;
    }
  }

  right() {
    if (this.node.children[this.index + 1] !== undefined) {
      if (this.node.classname === 'Container') {
        this.node = this.node.children[this.index + 1];
        this.index = 0;
      } else {
        this.index += 1;
      }
    } else if (this.node.connection.left !== undefined) {
      this.node = this.node.connection.left;
      this.index = 0;
    }

    if (this.node.children[this.index + 1].classname === 'Content') {
      this.node = this.node.children[this.index + 1];
      this.index = 0;
    }
  }

  type(content) {
    if (this.node.classname === 'Content') {
      this.node.insert(content, this.index);
      this.index += 1;
    } else {
      // TODO: redesign to avoid forward reference
      this.node.insert(new Content(content), this.index);
      this.node = content;
      this.index = 1;
    }
  }

  remove() {
    if (this.index === this.node.length) {
      this.node.connection.parent.replace(
        this.node.children,
        this.node.connection.index,
      );
      this.node = this.node.connection.parent;
      this.index = this.node.connection.index + this.node.children.length;
    } else if (this.node[this.index].classname === 'Container') {
      this.node.replace(this.node[this.index].children, this.index);
    } else this.node.delete(this.index);
  }

  backspace() {
    this.left();
    this.remove();
  }
}

module.exports = {
  Cursor,
};