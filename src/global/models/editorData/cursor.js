const Container = require("./container");
const Content = require("./content");

class Cursor {
  this(node, index) {
    this.node = node;
    this.index = index;
  }

  left() {
    if (this.node instanceof Conent && this.index > 0) {
      // pass the char
      this.index --;
    } else (this.this.index == 0) {
      // pass an start

    }


    if (this.node instanceof Content) {
      if (this.index > 0) {
        this.index --;
      } else if (this.node.communicator.prev !== undefined) {
        this.node = this.node.communicator.prev;
        this.index = this.node.length();

      }
    } else {
      // TODO
    }

    if (this.node.children()[this.index - 1] instanceof Content) {
      this.left();
    }
  }

  right() {
    if (this.node instanceof Content) {
      if (this.index < this.node.length()) {
        this.index ++;
      } else if (this.node.communicator.next !== undefined) {
        this.node = this.node.communicator.next;
        this.index = 0;
        if (this.node.children()[this.index] instanceof Content) {
          this.right();
        }
      }
    } else {
      // TODO
    }
  }

  backspace() {
    if (this.node instanceof Content) {
      if (this.index > 0) {
        this.node.communicator.prev.edit.suicideStyle();
      } else {
        this.node.edit.deleteContent(this.index - 1, this.index);
        this.index --;
      }
    } else {
      // TODO
    }
  }
}
