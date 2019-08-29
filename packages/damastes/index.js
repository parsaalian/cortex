function createElement(text, style) {
  const element = document.createElement('div');
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
  style.forEach((value, key) => {
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

export default (text, style = {}) => {
  const element = createElement(text, style);
  const size = {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
  destroyElement(element);
  return size;
};
