module.exports = class Node {
  setCommunicator(comm) {
    this.comm = comm;
  }

  content() {
    return "";
  }

  children() {
    return [];
  }

  length() {
    return 0;
  }
}
