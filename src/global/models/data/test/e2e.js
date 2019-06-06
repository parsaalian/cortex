let {Container, Content} = require("../");
let {Cursor} = require("../cursor")

let doc = new Container([], "document", {});
let cursor = new Cursor(doc, 0);

console.log(doc.visualChildren(cursor));
