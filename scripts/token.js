// Properties of tokens (of certain type)
// Order does matter, beacause some RegExps can override others

// .type is used as an id for a token (mostly used internally)
// .scope is wether the token is parsed as a block or an inline
// .expression is a regex, which finds the needed pattern and captures token content or attributes
// .tag is the html tagname that will be used
// .isVoid is whether the tag is self-closing (void)
const TOKEN_DATA_LIST = [
    // Block scopes

    {type: "HEADING_3", scope: "BLOCK", expression: /^### (.+?)$/m, tag: "h3", isVoid: false},
    {type: "HEADING_2", scope: "BLOCK", expression: /^## (.+?)$/m, tag: "h2", isVoid: false},
    {type: "HEADING_1", scope: "BLOCK", expression: /^# (.+?)$/m, tag: "h1", isVoid: false},
    {type: "HORIZONTAL_LINE", scope: "BLOCK", expression: /^---$/m, tag: "hr", isVoid: true},
    {type: "IMAGE", scope: "BLOCK", expression: /^\((?<alt>.*?)\)\<(?<src>.+?)\>$/m, tag: "img", isVoid: true},
    {type: "UNORDERED_LIST", scope: "BLOCK", expression: /^(- [\s\S]+- .+)$/m, tag: "ul", isVoid: false},
    {type: "ORDERED_LIST", scope: "BLOCK", expression: /^(1\. [\s\S]+\d+\. .+)$/m, tag: "ol", isVoid: false},
    {type: "PARAGRAPH", scope: "BLOCK", expression: /^(.+?)$/m, tag: "p", isVoid: false},

    // Inline scopes

    {type: "BOLD", scope: "INLINE", expression: /\*\*(.+?)\*\*/, tag: "b", isVoid: false},
    {type: "ITALICIZED", scope: "INLINE", expression: /\/\/(.+?)\/\//, tag: "i", isVoid: false},
    {type: "UNDERLINED", scope: "INLINE", expression: /__(.+?)__/, tag: "u", isVoid: false},
    {type: "STRIKETHROUGH", scope: "INLINE", expression: /~~(.+?)~~/, tag: "s", isVoid: false},
    {type: "CODE", scope: "INLINE", expression: /``(.+?)``/, tag: "code", isVoid: false},
    {type: "LINK", scope: "INLINE", expression: /\((.+?)\)\[(?<href>.+?)\]/, tag: "a", isVoid: false},
    {type: "UNORDERED_LIST_ITEM", scope: "INLINE", expression: /^- (.+?)$/m, tag: "li", isVoid: false},
    {type: "ORDERED_LIST_ITEM", scope: "INLINE", expression: /^\d+\. (.+?)$/m, tag: "li", isVoid: false},

    // Since text tokes are everything except other tokens, it is placed last in the 
    // array to prevent it from overriding other RegExps
    {type: "TEXT", scope: "INLINE", expression: /(.+)/, tag: "", isVoid: false},
];

// Generate a map based on the list for convinience
const TOKEN_DATA = {};
for(var i = 0; i < TOKEN_DATA_LIST.length; i++){
    var data = TOKEN_DATA_LIST[i];
    TOKEN_DATA[data.type] = data;
}

class Token{
    constructor(type, content, attributes){
        this.type = type;
        this.content = content;
        this.attributes = attributes;
    };
};