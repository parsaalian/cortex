import _ from 'lodash';

function createElement(text, style) {
  const element = document.createElement('div');
  _.forEach(text, (char, index) => {
    const charSpan = document.createElement('span');
    const charNode = document.createTextNode(char);
    charSpan.appendChild(charNode);
    charSpan.setAttribute('id', `sizing-char-${index}`);
    element.appendChild(charSpan);
  });
  _.forEach(style, (value, key) => {
    element.style[key] = value;
  });
  element.style.position = 'absolute';
  element.style.visibility = 'hidden';
  element.style.left = '-999px';
  element.style.top = '-999px';
  element.style.height = 'auto';
  document.body.appendChild(element);
  return element;
}

function destroyElement(element) {
  element.parentNode.removeChild(element);
}

export function wordSizes(text, style = {}) {
  const element = createElement(text, style);
  const sizes = [];
  _.forEach(_.range(text.length), (index) => {
    const ithSpan = document.getElementById(`sizing-char-${index}`);
    sizes.push({
      width: (_.isUndefined(sizes[index - 1]) ? 0 : sizes[index - 1].width) + ithSpan.offsetWidth,
      height: ithSpan.offsetHeight,
    });
  });
  destroyElement(element);
  return sizes;
}

export default (text, style = {}) => {
  // const element = createElement(text, style);
  const size = {
    width: 8, // element.offsetWidth,
    height: 18, // element.offsetHeight,
  };
  // destroyElement(element);
  return size;
};
