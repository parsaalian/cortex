const VisualTree = (_super) =>
  class extends _super {
    visualChildren(cursor) {
      if (this === cursor.node) {
        return [
          ...this.children.slice(0, cursor.index),
          cursor,
          ...this.children.slice(cursor.index),
        ];
      }
      return this.children;
    }
  };

module.exports = {
  VisualTree,
};
