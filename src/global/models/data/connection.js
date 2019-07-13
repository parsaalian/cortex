const Connectable = (_super) =>
  class extends _super {
    setConnection(connection) {
      this.connection = connection;
    }
  };

const Connector = (_super) =>
  class extends _super {
    constructor(children, type, attributes) {
      super(children, type, attributes);
      this.connect();
    }

    connect(start = 0) {
      for (let c = start; c < this.children.length; c++) {
        const connection = {
          index: c,
          next: this.children[c + 1],
          prev: this.children[c - 1],
          parent: this,
        };
        this.children[c].setConnection(connection);
      }
    }
  };

module.exports = {
  Connectable,
  Connector,
};
