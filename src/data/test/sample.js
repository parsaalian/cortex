const Container = require('../container');
const Content = require('../content');
// const Cursor = require('../cursor');
const {Paragraph, Size} = require('../styles');

class Document extends Container {};

module.exports = new Document([
  new Paragraph([
    new Content("This is this!"),
    new Size(18, [new Content("with size 14!")])
  ]),
  new Content("Ok! I think its obvious"),
]);


// console.dir(doc, {depth:4})
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
