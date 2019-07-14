const ContainerReplace = (_super) => class extends _super {
  bind(i) {
    const a = this.children[i];
    const b = this.children[i + 1];
    if (a && b && a.classname === b.classname && a.type === b.type) {
      console.log('Bedooz ', a, b);
      this.children.splice(i - 1, 1);
      a.insert(b.children, a.length);
    }
  }

  replace(children, i, j) {
    if (j === undefined) j = i + 1;
    if (!Array.isArray(children)) children = [children];
    this.children.splice(i, j - i, ...children);
    this.bind(i - 1);
    if (children.length > 0) {
      this.bind(i + children.length - 1);
    }
    this.connect(i > 0 ? i - 1 : 0);
  }
};

const ContentReplace = (_super) => class extends _super {
  replace(children, i, j) {
    if (j === undefined) j = i + 1;
    this.children = this.children.slice(0, i) + children + this.children.slice(j);
    if (this.length === 0) {
      this.suicide();
    }
  }
};

const CRUD = (_super) => class extends _super {
  suicide() {
    this.connection.parent.remove(this.connection.index);
  }

  insert(children, i) {
    this.replace(children, i, i);
  }

  remove(i, j) {
    this.replace([], i, j);
  }
};

module.exports = {
  ContainerReplace,
  ContentReplace,
  CRUD,
};
