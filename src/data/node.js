export default class Node {
  setCommunicator(comm) {
    this.comm = comm;
  }

  children() {
    return [];
  }

  contentLength() {
    return 0;
  }

  length() {
    return 0;
  }
}
