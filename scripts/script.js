// A sample source string
var source = `
! Markup examples

---

!! Headings

! Heading of level 1

!! Heading of level 2

!!! Heading of level 3

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
It can't contain \`*any* /other/ _text_ ~formattings~\`.
And text formattings *\`can't\`* /\`contain\`/ _\`inline\`_ ~\`code\`~.
`;

var parsed = Parser.parse(source);
var rendered = Renderer.render(parsed);
document.getElementById("markup").innerHTML = rendered;