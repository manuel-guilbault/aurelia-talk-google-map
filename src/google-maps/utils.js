function cloneChildren(from, to) {
  var currentChild = from.firstChild,
      nextSibling;
  while (currentChild) {
    nextSibling = currentChild.nextSibling;
    to.appendChild(currentChild.cloneNode(true));
    currentChild = nextSibling;
  }
  return to;
}

export function compileContent(element, compiler, resources) {
  let content = cloneChildren(element, document.createDocumentFragment());
  return compiler.compile(content, resources);
}