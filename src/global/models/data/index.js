const { Connectable, Connector } = require('./connection');
const { CRUD, NodeReplace } = require('./crud');
const { VisualTree } = require('./visual');
const { Cursor } = require('./cursor');

class Node {
  constructor(children) {
    this.children = children;
    this.classname = 'Node';
  }

  get length() {
    return this.children.length;
  }
}

Node = Connectable(Node);
Node = CRUD(Node);
Node = VisualTree(Node);

class Container extends Node {
  constructor(type, children, attributes) {
    super(children);
    this.type = type;
    this.attributes = attributes;
    this.classname = 'Container';
  }
}

class Content extends Node {
  constructor(content) {
    super(content);
    this.classname = 'Content';
  }
}

Container = Connector(Container);
Container = NodeReplace(Container);

module.exports = {
  Container,
  Content,
  Cursor,
};
