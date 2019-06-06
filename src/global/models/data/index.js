let { Connectable, Connector } = require("./connection");
let { CRUD, NodeReplace } = require("./crud");
let { VisualTree } = require("./visual");
let { Cursor } = require("./cursor");

class Node {
  constructor(children) {
    this.children = children
    this.classname = "Node";
  }

  get length() {
    return this.children.length;
  }
}

Node = Connectable(Node);
Node = CRUD(Node);
Node = VisualTree(Node);

class Container extends Node {
  constructor(type, children) {
    super(children);
    this.type = type;
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
  Content: Content,
  Cursor: Cursor
}
