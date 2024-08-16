// A sample source string
var source = `
! Heading of level 1

!! Heading of level 2

!!! Heading of level 3

---

!! Paragraphs

A paragraph with no line breaks.

A paragraph with
line breaks
like this.

---

!! Text formattings

Text formattings: *bold*, /italic/, _underline_, ~strikethrough~, \`code\`.

Text formattings can be combined: */bold and italic/*,
or nested: /italic, _italic and underlined_, italic/.
`;

var parsed = Parser.parse(source);