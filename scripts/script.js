// A sample source string
var source = `
! Markup examples

---

!! Headings

! A heading of level 1

!! A heading of level 2

!!! A heading of level 3

!!!! A heading of level 4

---

!! Paragraphs

This is a paragraph with no line breaks.

This is a paragraph
with line breaks
like this.

---

!! Inline text

!!! Text formattings

This text is *bold*.
This text is /italicized/.
This text is _underlined_.
This text is ~struckthrough~.

!!! Combined and nested formattings

This text is */bold and italic/*.
This text is /italicized, _then both italicized and underlined_, and then only italicized again/.

!!! Inline code

This text is \`inline code\`.

---

!! Links

Here is a [link]<https://github.com/unifold28/markup> to this project's Github page.

---

!! Lists

An unordered list.

- Unordered list item 1
- Unordered list item 2
- Unordered list item 3
- Unordered list item 4

An ordered list.

# Ordered list item 1
# Ordered list item 2
# Ordered list item 3
# Ordered list item 4

---

!! Blockquotes

!!! Simple blockquotes

| A blockquote.

| Blockquotes can have
| line breaks
| like this.

!!! Block elements inside blockquotes

Blockqotes can also contain block elements inside.

| !!!! A heading inside a blockquote
| 
| A paragraph.
| 
| - List item 1
| - List item 2
| - List item 3
| - List item 4

!!! Nested blockquotes

| Blockquotes can contain other blockquotes inside them, too.
| 
| | This can be used to create nested blockquotes like this.
| | 
| | | Nesting can be as deep as you want.
| | | 
| | | | ...
| | | | 
| | | | | ...

---

!! Codeblocks

Here is a codeblock containing a piece of source code of this project.

\`\`\`
class Token{
    constructor(type, content, attributes){
        this.type = type;
        this.content = content;
        this.attributes = attributes;
    };
};
\`\`\`

---

!! Images

Here is an image.

[Bliss.]{https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png}

---

!! Escaping

Escaping markup forces a character to be shown literary in rendered result.

:!!!! Without escaping, this would be a heading.

Without escaping, this :*text:* would be bold.
`;

var parsed = Parser.parse(source);
var rendered = Renderer.render(parsed);

document.getElementById("markup").innerHTML = rendered;