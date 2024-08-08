// A sample string
var markup = `
# A heading of level 1

## A heading of level 2

### A heading of level 3

A paragraph.

Text formattings: **bold**, //italicized//, __underlined__.

Combined text formattings: **//bold and ititalicized//**, **__bold and underlined__**, //__italicized and underlined__//, **//__bold, italicized and underlined__//**.

Nested text formattings: **bold //bold and ititalicized// bold**, **bold __bold and underlined__ bold**, //italicized __italicized and underlined__, italicized//.

## Headings can contain text formatting: **bold**, //italicized//, __underlined__.

(The bold formatting is not displayed because font weight is applied to headings.)
`;

var tokenized = Lexer.tokenize(markup);
var rendered = Renderer.render(tokenized);

var element = document.getElementById("markup");
element.innerHTML = rendered;
console.log(rendered);