export class Search {
  constructor() {}
  search(elm: Node, re: RegExp) {
    for (let i = 0; i < elm.childNodes.length; i++) {
      const inner_elm = elm.childNodes.item(i);
      switch (inner_elm.nodeType) {
        case Node.TEXT_NODE:
          const nodeValue = (inner_elm as Text).nodeValue;
          if (nodeValue == "\n\n") break;
          let regExpExecArray: RegExpExecArray;
          while ((regExpExecArray = re.exec(nodeValue)) !== null) {
            console.log(
              `${re.lastIndex - 1}文字目: ${regExpExecArray}: ${
                inner_elm.textContent
              }`
            );
          }
          break;
        case Node.ELEMENT_NODE:
          this.search(inner_elm, re);
        default:
          break;
      }
    }
  }
}
