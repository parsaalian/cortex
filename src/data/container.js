import Node from './node';

class Container extends Node {
  constructor(nodes=[]) {
    this.childrenInfo = []
    insertNodes(nodes, 0);
  }

  removeStyle(i) {
    let node = this.childrenInfo[i].node;
    removeNode(i);
    insertNodes(nodes.childrenInfo.map(x => x.node));
  }

  removeNode(i) {
    this.children = this.children.slice(0, i) + this.children.slice(i + 1);
    updateIndex(i);
  }

  insertNodes(nodes, i) {
    if (i > 0) {
      this.childrenInfo[i - 1].next = nodes[0];
      nodes.unshift(this.childrenInfo[i - 1].node);
    } else
      nodes.unshift(undefined);

    if (i < this.childrenInfo.length) {
      this.childrenInfo[i].next = nodes[nodes.length - 1];
      nodes.push(this.childrenInfo[i].node);
    } else
      nodes.push(undefined);

    // ignore prefix and suffix in insertion
    for (c = 1; c < nodes.length - 1; c ++) {
      var node = nodes[c];
      var info = {
        communicator: {
          index: c + i - 1,
          next: nodes[c + 1],
          prev: nodes[c - 1],
          parent: this
        },
        node: node,
        index: null
      };
      node.setCommunicator(info.communicator);
    }
    updateIndex(i);
  }

  removeRange(i, j) {
    // TODO make it binary search
    var c = 0;
    for (var i = 0; i < this.lengths.length; i ++) {
      if (c < i && c + this.lengths[i] >= i) {
        this.children[i].
        break;
      }
      c += this.lengths[i];
    }
  }

  updateIndex(i = 0) {
    if (i == 0)
      var totalLength = 0;
    else
      var totalLength = this.childrenInfo[i - 1].index
        + this.childrenInfo[i - 1].node.length();
    for (c = i; c < this.childrenInfo.length; c ++) {
      this.childrenInfo[i].index = totalLength;
      totalLength += info.length();
    }
  }
}
