class Cursor {
  this(node, index) {
    this.node = node;
    this.index = index;
  }

  left() {
    if (this.node intanceof Content) {
      if (this.index > 0) {
        this.index --;
      } else if (this.node.communicator.prev != undefined) {
        this.node = this.node.communicator.prev;
        this.index = this.node.length();
        if (this.node.children()[index - 1] instanceof Content) {
          left();
        }
      }
    } else {
      // TODO
    }
  }

  right() {
    if (this.node intanceof Content) {
      if (this.index < this.node.length()) {
        this.index ++;
      } else if (this.node.communicator.next != undefined) {
        this.node = this.node.communicator.next;
        this.index = 0;
        if (this.node.children()[index] instanceof Content) {
          right();
        }
      }
    } else {
      // TODO
    }
  }

  backspace() {
    if (this.node instanceof Content) {
      if (this.index > 0) {
        this.node.communicator.prev.edit.sucideStyle();
      } else {
        this.node.edit.deleteContent(this.index - 1, this.index);
        this.index --;
      }
    } else {
      // TODO
    }
  }
}
