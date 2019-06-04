let { Connectable, Connector } = require("./connection");
let { CRUD, NodeReplace } = require("./crud");
let { CursorHandle } = require("./cursor");

class Node {
  constructor(children) {
    this.children = children
    this.classname = "Node";
  }

  get length() {
    this.children.length;
  }
}

Node = Connectable(Node);
Node = CRUD(Node);
Node = CursorHandle(Node);

class Container extends Node {
  constructor(children, type, attributes) {
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

Container = Connector(Container);
Container = NodeReplace(Container);

module.exports = {
  Container: Container,
  Content: Content
}
