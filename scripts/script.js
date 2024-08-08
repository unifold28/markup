// A sample string
var markup = `
# Heading 1

## Heading 2

### Heading 3

A paragraph.
Text formattings: regular, **bold**, //italicized//, __underlined__.
`;

var tokenized = Lexer.tokenize(markup);