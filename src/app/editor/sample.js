import Content from 'global/models/editorData/content';
import Container from 'global/models/editorData/container';

const doc = new Container('document', [
  new Container('arbitrary-spacing', [
    new Container('light', [new Content('this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! this should be bold! ')]),
    new Container('size-large3', [new Content('this should be tiny!')])
  ], {lineHeight: 2.5}),
  new Content('this is a test')
]);

export default doc;
