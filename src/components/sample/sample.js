import Content from '../../data/content';
import Container from '../../data/container';
import { ParagraphContainer, BoldContainer } from '../styles';

class Document extends Container {}

const doc = new Document([
  new ParagraphContainer([
    new Content("This is this!"),
    new BoldContainer([new Content("This is bold!")])
  ]),
  new Content("Ok! I think its obvious"),
]);

export default doc;
