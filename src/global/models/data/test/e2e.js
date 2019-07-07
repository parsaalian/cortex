const { Container, Content } = require('../');
const { Cursor } = require('../cursor');

const doc = new Container([], 'document', {});
const cursor = new Cursor(doc, 0);

console.log(doc.visualChildren(cursor));
