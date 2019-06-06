import {Container, Content, Cursor} from 'global/models/data';

const doc = new Container('document', [
  new Container('paragraph', [
    new Container('light', [new Content('this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! ')]),
    new Container('size-large3', [new Content('this should be tiny!'),
      new Container('bold', [new Content('bold and tiny')])
    ])
  ]),
  new Content('this is a test')
]);

const cursor = new Cursor(doc, 0);

export {doc, cursor};
