class Node {
  constructor(children) {
    this.children = children
    this.classname = "Node";
  }

  get length() {
    this.children.length;
  }
}

class Container extends Node {
  constructor(children) {
    super(children, type, attributes);
    this.type = type;
    this.attributes = attributes;
    this.classname = "Container";
  }
}

class Content extends Node {
  constructor(content) {
    super(content);
    this.classname = "Content";
  }
}

export {Node, Container, Content};
