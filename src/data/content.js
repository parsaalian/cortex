class Content() {
  constructor(value='') {
    this.string = value;
  }

  edit = {
    merge: {
      _prefixMerge: (other) => {
        insertContent(other.content(), 0);
      },

      _suffixMerge: (other) => {
        insertContent(other.content(), this.length());
      },
    },

    sucide: () => {
      this.communicator.parent.edit.removeContent(this.communicator.index);
    },

    insert: (node, i) => {
      // TODO, break at i, insert nodes
    },

    insertContent: (str, i) => {
      this.string.splice(i, 0, ...str);
    },

    deleteContent: (i, j) =>  {
      this.string.splice(i, j - i);
      if (!this.string) {
        sucide();
      }
    }
  };

  content() {
    return this.string;
  }

  length() {
    return this.string.length;
  }
}
