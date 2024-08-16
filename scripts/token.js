// Token properties for a specific token type
const TOKENS_LIST = [
    {type: "heading_1", scope: "block", expression: /! ([\s\S]+?)/, tag: "h1", isVoid: false},
    {type: "heading_2", scope: "block", expression: /!! ([\s\S]+?)/, tag: "h2", isVoid: false},
    {type: "heading_3", scope: "block", expression: /!!! ([\s\S]+?)/, tag: "h3", isVoid: false},
    {type: "horizontal_line", scope: "block", expression: /---/, tag: "hr", isVoid: true},
    {type: "paragraph", scope: "block", expression: /([\s\S]+?)/, tag: "p", isVoid: false},

    {type: "line_break", scope: "inline", expression: /\n/, tag: "br", isVoid: true},
    {type: "bold", scope: "inline", expression: /\*([\s\S]+?)\*/, tag: "b", isVoid: false},
    {type: "italic", scope: "inline", expression: /\/([\s\S]+?)\//, tag: "i", isVoid: false},
    {type: "underline", scope: "inline", expression: /_([\s\S]+?)_/, tag: "u", isVoid: false},
    {type: "strikethrough", scope: "inline", expression: /~([\s\S]+?)~/, tag: "s", isVoid: false},
    {type: "code", scope: "inline", expression: /`([\s\S]+?)`/, tag: "code", isVoid: false},
    {type: "text", scope: "inline", expression: /([\s\S]+)/, tag: "", isVoid: false},
];
const TOKENS = {};
for(var i = 0; i < TOKENS_LIST.length; i++){
    var token = TOKENS_LIST[i];
    var type = token.type;
    TOKENS[type] = token;
}

class Token{
    constructor(type, content, text){
        this.type = type;
        this.content = content;
        this.text = text;
    };
};