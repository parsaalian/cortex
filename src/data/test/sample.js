Container = require('../container');
Content = require('../content');
Cursor = require('../cursor');

class Document extends Container {};
class Paragraph extends Container {};
class Size extends Container {
  constructor(size, nodes) {
    super(nodes);
    this.size = size;
  }
};

var doc = new Document( [
  new Paragraph([
    new Content("This is this!"),
    new Size(14, [new Content("with size 14!")])
  ]),
  new Content("Ok! I think its obvious"),
]);


console.dir(doc,{depth:4})
/*
  It would be like this

  <div id="document">
    <p>
      this is this!
      <span style="font-size: 14">
        with size 14!
      </span>
    </p>
  </div>
*/
