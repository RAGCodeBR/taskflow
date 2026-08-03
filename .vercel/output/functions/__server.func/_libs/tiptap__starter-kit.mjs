import { k as Extension } from "./tiptap__core.mjs";
import { B as Blockquote } from "./tiptap__extension-blockquote.mjs";
import { B as Bold } from "./tiptap__extension-bold.mjs";
import { C as Code } from "./tiptap__extension-code.mjs";
import { C as CodeBlock } from "./tiptap__extension-code-block.mjs";
import { D as Document } from "./tiptap__extension-document.mjs";
import { H as HardBreak } from "./tiptap__extension-hard-break.mjs";
import { H as Heading } from "./tiptap__extension-heading.mjs";
import { H as HorizontalRule } from "./@tiptap/extension-horizontal-rule+[...].mjs";
import { I as Italic } from "./tiptap__extension-italic.mjs";
import { L as Link } from "./tiptap__extension-link.mjs";
import { B as BulletList, L as ListItem, a as ListKeymap, O as OrderedList } from "./tiptap__extension-list.mjs";
import { P as Paragraph } from "./tiptap__extension-paragraph.mjs";
import { S as Strike } from "./tiptap__extension-strike.mjs";
import { T as Text } from "./tiptap__extension-text.mjs";
import { U as Underline } from "./tiptap__extension-underline.mjs";
import { D as Dropcursor, G as Gapcursor, U as UndoRedo, T as TrailingNode } from "./tiptap__extensions.mjs";
var StarterKit = Extension.create({
  name: "starterKit",
  addExtensions() {
    var _a, _b, _c, _d;
    const extensions = [];
    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options.bold));
    }
    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options.blockquote));
    }
    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options.bulletList));
    }
    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options.code));
    }
    if (this.options.codeBlock !== false) {
      extensions.push(CodeBlock.configure(this.options.codeBlock));
    }
    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options.document));
    }
    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options.dropcursor));
    }
    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options.gapcursor));
    }
    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options.hardBreak));
    }
    if (this.options.heading !== false) {
      extensions.push(Heading.configure(this.options.heading));
    }
    if (this.options.undoRedo !== false) {
      extensions.push(UndoRedo.configure(this.options.undoRedo));
    }
    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule.configure(this.options.horizontalRule));
    }
    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options.italic));
    }
    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options.listItem));
    }
    if (this.options.listKeymap !== false) {
      extensions.push(ListKeymap.configure((_a = this.options) == null ? void 0 : _a.listKeymap));
    }
    if (this.options.link !== false) {
      extensions.push(Link.configure((_b = this.options) == null ? void 0 : _b.link));
    }
    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options.orderedList));
    }
    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options.paragraph));
    }
    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options.strike));
    }
    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options.text));
    }
    if (this.options.underline !== false) {
      extensions.push(Underline.configure((_c = this.options) == null ? void 0 : _c.underline));
    }
    if (this.options.trailingNode !== false) {
      extensions.push(TrailingNode.configure((_d = this.options) == null ? void 0 : _d.trailingNode));
    }
    return extensions;
  }
});
var index_default = StarterKit;
export {
  index_default as i
};
