let Connectable = (_super) => class extends _super {
  setConnection(connection) {
    this.connection = connection;
  }
};

let Connector = (_super) => class extends _super {
  constructor(children, type, attributes) {
    super(children, type, attributes);
    this.connect();
  }

  connect(start = 0) {
    for (var c = start; c < this.children.length; c ++) {
      let connection = {
        index: c,
        next: nodes[c + 1],
        prev: nodes[c - 1],
        parent: this
      }
      this.children[c].setConnection(connection);
    }
  }
};

module.exports = {
  Connectable: Connectable,
  Connector: Connector
}
