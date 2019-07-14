import { Container, Content, Cursor } from 'global/models/data';

const doc = new Container('document', [
  new Container('single-spacing', [
    new Container('light', [new Content('this should be bold! ')]),
    new Container('size-normal', [
      new Content('this should be tiny! as hell pnumenoultramicroscopicsilicovolcanoconiosis'),
    ]),
  ]),
  new Content('this is a test'),
]);

const cursor = new Cursor(doc, 0);

export { doc, cursor };
