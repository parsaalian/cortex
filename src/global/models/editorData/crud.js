let NodeReplace = (_super) => class extends _super {
  bind(i) {
    let a = this.children[i];
    let b = this.children[i + 1];
    if (typeof a == typeof b) {
      this.children.splice(i, 1);
      a.insert(b.children, b.length);
    }
  }

  replace(nodes, i, j) {
    if (j == undefined)
      j = i + 1;
    if (!Array.isArray(children))
      children = [children];
    super.replace(nodes, i, j);
    this.bind(i - 1);
    if (nodes.length > 0) {
      this.bind(i + nodes.length - 1);
    }
    this.connect(i - 1);
  }
};

let CRUD = (_super) => class extends _super {
  replace(children, i, j) {
    if (j == undefined)
      j = i + 1;
    if (!Array.isArray(children))
      children = [children];
    this.children.splice(i, j - i, ...children);
    if (this.length == 0) {
      this.sucide();
    }
  }

  sucide() {
    this.connection.parent.delete(this.connection.index);
  }

  insert(children, i) {
    this.replace(children, i, i);
  }

  delete(i, j) {
    this.replace([], i, j);
  }
}
