// Token properties for a specific token type
const RULES_LIST = [
    {
        type: "heading_1",
        isBlock: true,
        expression: /! ([\s\S]+?)/,
        tag: "h1",
        isVoid: false,
        validContent: ["bold", "italic", "underlined", "strikethrough", "code", "text"],
    },
    {
        type: "heading_2",
        isBlock: true,
        expression: /!! ([\s\S]+?)/,
        tag: "h2",
        isVoid: false,
        validContent: ["bold", "italic", "underlined", "strikethrough", "code", "text"],
    },
    {
        type: "heading_3",
        isBlock: true,
        expression: /!!! ([\s\S]+?)/,
        tag: "h3",
        isVoid: false,
        validContent: ["bold", "italic", "underlined", "strikethrough", "code", "text"],
    },
    {
        type: "horizontal_line",
        isBlock: true,
        expression: /---/,
        tag: "hr",
        isVoid: true,
        validContent: [],
    },
    {
        type: "paragraph",
        isBlock: true,
        expression: /([\s\S]+?)/,
        tag: "p",
        isVoid: false,
        validContent: ["line_break", "bold", "italic", "underlined", "strikethrough", "code", "text"],
    },

    {
        type: "line_break",
        isBlock: false,
        expression: /\n/,
        tag: "br",
        isVoid: true,
        validContent: [],
    },
    {
        type: "bold",
        isBlock: false,
        expression: /\*([\s\S]+?)\*/,
        tag: "b",
        isVoid: false,
        validContent: ["italic", "underlined", "strikethrough", "text"],
    },
    {
        type: "italic",
        isBlock: false,
        expression: /\/([\s\S]+?)\//,
        tag: "i",
        isVoid: false,
        validContent: ["bold", "underlined", "strikethrough", "text"],
    },
    {
        type: "underlined",
        isBlock: false,
        expression: /_([\s\S]+?)_/,
        tag: "u",
        isVoid: false,
        validContent: ["bold", "italic", "strikethrough", "text"],
    },
    {
        type: "strikethrough",
        isBlock: false,
        expression: /~([\s\S]+?)~/,
        tag: "s",
        isVoid: false,
        validContent: ["bold", "italic", "underlined", "text"],
    },
    {
        type: "code",
        isBlock: false,
        expression: /`([\s\S]+?)`/,
        tag: "code",
        isVoid: false,
        validContent: ["text"],
    },
    {
        type: "text",
        isBlock: false,
        expression: /([\s\S]+)/,
        tag: "",
        isVoid: true,
        validContent: [],
    },
];
const RULES = {};
for(var i = 0; i < RULES_LIST.length; i++){
    var token = RULES_LIST[i];
    var type = token.type;
    RULES[type] = token;
}

class Token{
    constructor(type, content){
        this.type = type;
        this.content = content;
    };
};