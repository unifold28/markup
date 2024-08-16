// Token properties for a specific token type
const TOKENS = [
    {type: "heading1", scope: "block", expression: /! ([\s\S]+?)/, isVoid: false},
    {type: "heading2", scope: "block", expression: /!! ([\s\S]+?)/, isVoid: false},
    {type: "heading3", scope: "block", expression: /!!! ([\s\S]+?)/, isVoid: false},
    {type: "horizontal_line", scope: "block", expression: /---/, isVoid: true},
    {type: "paragraph", scope: "block", expression: /([\s\S]+?)/, isVoid: false},

    {type: "line_break", scope: "inline", expression: /\n/, isVoid: true},
    {type: "bold", scope: "inline", expression: /\*([\s\S]+?)\*/, isVoid: false},
    {type: "italic", scope: "inline", expression: /\/([\s\S]+?)\//, isVoid: false},
    {type: "underline", scope: "inline", expression: /_([\s\S]+?)_/, isVoid: false},
    {type: "strikethrough", scope: "inline", expression: /~([\s\S]+?)~/, isVoid: false},
    {type: "code", scope: "inline", expression: /`([\s\S]+?)`/, isVoid: false},
    {type: "text", scope: "inline", expression: /([\s\S]+)/, isVoid: false},
];

class Token{
    constructor(type, content){
        this.type = type;
        this.content = content;
    };
};