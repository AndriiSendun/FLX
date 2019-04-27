export default function createNode(tag, attribute, content) {
  const element = document.createElement(tag);

  if (attribute) {
    for (let key in attribute) {
      if (attribute.hasOwnProperty(key)) {
        element.setAttribute(key, attribute[key]);
      }
    }
  }

  if (content) {
    let text = document.createTextNode(content);
    element.appendChild(text);
  }

  return element;
}
