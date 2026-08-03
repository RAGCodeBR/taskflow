import { N as Node3 } from "./tiptap__core.mjs";
var Document = Node3.create({
  name: "doc",
  topNode: true,
  content: "block+",
  renderMarkdown: (node, h) => {
    if (!node.content) {
      return "";
    }
    return h.renderChildren(node.content, "\n\n");
  }
});
export {
  Document as D
};
