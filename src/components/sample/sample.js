import Content from '../../data/content';
import Container from '../../data/container';

const doc = new Container('document', [
  new Container('paragraph', [
    new Container('bold', [new Content('this should be bold! ')]),
    new Container('size', [new Content('this should be large!')], { size: 24 })
  ]),
  new Content('this is a test')
]);

export default doc;
