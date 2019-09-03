import _ from 'lodash';

function createElement(text, style) {
  console.log(document);
  const doc = document.implementation.createHTMLDocument('Sizing document');
  console.log(doc);
  const element = doc.createElement('div');
  const textNode = doc.createTextNode(text);
  element.appendChild(textNode);
  _.forEach(style, (value, key) => {
    element.style[key] = value;
  });
  element.style.position = 'absolute';
  element.style.visibility = 'hidden';
  element.style.left = '-999px';
  element.style.top = '-999px';
  element.style.height = 'auto';
  doc.body.appendChild(element);
  console.log(element.offsetWidth);
  return element;
}

function destroyElement(element) {
  element.parentNode.removeChild(element);
}

export default (text, style = {}) => {
  const element = createElement(text, style);
  const size = {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
  destroyElement(element);
  return size;
};
