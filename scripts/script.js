// A sample string
var markup = `
# Markup examples

---

## Headings

# A heading of level 1

## A heading of level 2

### A heading of level 3

---

## Paragraphs

A paragraph.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan nisi id mauris mollis tincidunt. Nulla facilisi. Quisque congue lorem in gravida placerat. Morbi vitae magna sed nisi volutpat suscipit tempus quis lacus. Sed pretium rhoncus mollis. Vivamus ac laoreet nisl. Nam tincidunt, nisl quis venenatis blandit, sapien metus porttitor quam, eu dignissim lorem tellus in diam. Aenean non tellus justo. Morbi eget tincidunt quam. In enim lectus, convallis ut maximus eu, eleifend et eros. Sed dictum ligula massa. Fusce id egestas enim. Nam id semper velit, a posuere diam.

---

## Text formattings

Text formattings: **bold**, //italicized//, __underlined__, ~~strikethrough~~, \`\`code\`\`.

They can be combined: **//bold and ititalicized//**.

Or nested: **bold (__bold and underlined__) bold**.

---

## Lists

This is an unordered list:

- Unordered list item
- Unordered list item
- Unordered list item
- Unordered list item
- Unordered list item

This is an ordered list:

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3
4. Ordered list item 4
5. Ordered list item 5

---

## Links

This is a (link)[https://github.com/unifold28/markup] to the GitHub page of this project.

---

## Images

Here is an image:

(Bliss.)<https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png>
`;

var tokenized = Lexer.tokenize(markup);
var rendered = Renderer.render(tokenized);

var element = document.getElementById("markup");
element.innerHTML = rendered;