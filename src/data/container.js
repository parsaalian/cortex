import Node from './node';

class Container extends Node {
  constructor(type, nodes=[]) {
    this.type = type;
    this.childrenInfo = this.__connectNodes(nodes, 0);
    this.__updateIndex(0);
  }

  edit = {
    merge: {
      /**
        appends another node's children to start of this
      */
      _prefixMerge: (other) => {
        this.childrenInfo.unshift(...this.__connectNodes(other.children(), 0));
        this.edit.merge.__bind(other.length());
      },

      /**
        appends another node's children to end of this
      */
      _suffixMerge: (other) => {
        this.childrenInfo.push(...this.__connectNodes(other.children(), this.length()));
        this.edit.merge.__bind(this.length());
      },

      /**
        connects items at i, i + 1, communicatorally and may merge them!
      */
      __bind(i) {
        let a = this.childrenInfo[i].node;
        let b = this.childrenInfo[i + 1].node;
        if (typeof a == typeof b) {
          if (a.length() < b.length()) {
            b.edit.merge._prefixMerge(a);
            var m = b;
          } else {
            a.edit.merge._suffixMerge(b);
            var m = a;
          }

          this.childrenInfo.splice(i, 2, m);
        } else {
          this.childrenInfo[i].next = b;
          this.childrenInfo[i + 1].prev = a;
        }
      }
    },

    /**
      removes this node's style
    */
    sucideStyle: () => {
      this.communicator.parent.edit.removeStyle(this.communicator.index);
    },

    /**
      removes ith style node but preserving it contents
    */
    removeStyle: (i) => {
      let node = this.childrenInfo[i].node;
      this.childrenInfo.splice(i, 1, ...this.__connectNodes(node.children(), i));

      this.edit.merge.__bind(i + node.length() - 1);
      this.edit.merge.__bind(i - 1);
      this.__updateIndex(i);
    },

    remove: (i) => {
      this.childrenInfo.splice(i, 1);

      this.edit.merge.__bind(i);
      this.__updateIndex(i);
    },

    insert: (node, i) => {
      this.childrenInfo.splice(i, 0, node);
      this.edit.merge.__bind(i - 1);
      this.__updateIndex(i);
    },

    insertAll: (nodes, i) => {
      this.childrenInfo.splice(i, 0, ...this.__connectNodes(nodes, i));
      this.edit.merge.__bind(i + nodes.length - 1);
      this.edit.merge.__bind(i - 1);
      this.__updateIndex(i);
    }
  };
  /**
    computes communicator for nodes assuming insertion at i
  */
  __connectNodes(nodes, i) {
    arr = [];
    for (int c = 0; c < nodes.length; c ++) {
      var info = {
        communicator: {
          index: c + i,
          next: nodes[c + 1],
          prev: nodes[c - 1],
          parent: this
        },
        node: node,
        index: null
      };
      node.setCommunicator(info.communicator);
      arr.push(info);
    }
  }

  /**
    update indexes from i to the end of childrenInfo
  */
  __updateIndex(i = 0) {
    if (i == 0)
      var totalLength = 0;
    else
      var totalLength = this.childrenInfo[i - 1].index
        + this.childrenInfo[i - 1].node.length();
    for (c = i; c < this.childrenInfo.length; c ++) {
      this.childrenInfo[i].index = totalLength;
      totalLength += info.length();
    }

    this.communicator.parent.__updateIndex(this.communicator.index);
  }

  children() {
    return this.childrenInfo.map(x => x.node);
  }

  length() {
    return this.childrenInfo.length;
  }
}
