class Sloth {
  constructor(bear) {
    this.type = typeof bear;
    this.bear = bear;
    this.stack = [];
  }

  call(callback) {
    if (this.type === 'number' || this.type === 'boolean') {
      this.stack[0] = callback;
    }
  }

  get(path = undefined) {
    if (this.type === 'number' || this.type === 'boolean') {
      if (this.stack.length !== 0) {
        this.bear = this.stack[0](this.bear);
      }
      return this.bear;
    }
  }
}

const sloth = new Sloth(true);
let date = new Date().getTime();
sloth.call((x) => !x);
console.log(sloth.bear, new Date().getTime() - date);
date = new Date().getTime();
console.log(sloth.get(), new Date().getTime() - date);
