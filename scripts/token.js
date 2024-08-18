const HANDLERS = {
    default: function(type, match){
        var rule = RULES[type];
    
        var content = [];
        if(!rule.isVoid) content = Parser._parseRecursive(match[1], rule.validContent);
        var attributes = match.groups || [];
        var token = new Token(type, content, attributes);
        var step = match[0].length;

        return {token: token, step: step};
    },
    text: function(type, match){
        var validContent = RULES.paragraph.validContent;

        var index = match[1].length;
        for(var i = 0; i < validContent.length; i++){
            var rule = RULES[validContent[i]];
            if(rule.type == "text") continue;

            var _match = match[1].match(rule.expression);

            if(_match == null) continue;

            if(_match.index < index) index = _match.index;
        }
        if(index == 0) return null;

        var content = match[1].slice(0, index);
        var token = new Token(type, content, []);
        var step = index;

        return {token: token, step: step};
    },
    code_span: function(type, match){
        var token = new Token(type, match[1], []);
        var step = match[0].length
        return {token: token, step: step};
    },
    blockquote: function(type, match){
        var rule = RULES[type];
        var trimmed = match[1].replace(/^\| /g, "").replace(/\n\| /g, "\n");
        var content = Parser._parseRecursive(trimmed, rule.validContent);
        var token = new Token(type, content, []);
        var step = match[0].length;

        return {token: token, step: step};
    },
};

// Token properties for a specific token type
const RULES_LIST = [
    {
        type: "heading_1",
        isBlock: true,
        expression: /! ([\s\S]+?)/,
        tag: "h1",
        isVoid: false,
        validContent: ["bold", "italic", "underlined", "strikethrough", "inline_code", "text"],
        handler: HANDLERS.default,
    },
    {
        type: "heading_2",
        isBlock: true,
        expression: /!! ([\s\S]+?)/,
        tag: "h2",
        isVoid: false,
        validContent: ["bold", "italic", "underlined", "strikethrough", "inline_code", "text"],
        handler: HANDLERS.default,
    },
    {
        type: "heading_3",
        isBlock: true,
        expression: /!!! ([\s\S]+?)/,
        tag: "h3",
        isVoid: false,
        validContent: ["bold", "italic", "underlined", "strikethrough", "inline_code", "text"],
        handler: HANDLERS.default,
    },
    {
        type: "blockquote",
        isBlock: true,
        expression: /((?:\| .*\n)*\| .*)/,
        tag: "blockquote",
        isVoid: false,
        validContent: ["heading_1", "heading_2", "heading_3", "blockquote", "horizontal_line", "image", "paragraph"],
        handler: HANDLERS.blockquote,
    },
    {
        type: "horizontal_line",
        isBlock: true,
        expression: /---/,
        tag: "hr",
        isVoid: true,
        validContent: [],
        handler: HANDLERS.default,
    },
    {
        type: "image",
        isBlock: true,
        expression: /\[(?<alt>[^\n]+?)\]{(?<src>[^\n]+?)}/,
        tag: "img",
        isVoid: true,
        validContent: [],
        handler: HANDLERS.default,
    },
    {
        type: "paragraph",
        isBlock: true,
        expression: /([\s\S]+?)/,
        tag: "p",
        isVoid: false,
        validContent: ["line_break", "link", "bold", "italic", "underlined", "strikethrough", "inline_code", "text"],
        handler: HANDLERS.default,
    },

    {
        type: "line_break",
        isBlock: false,
        expression: /\n/,
        tag: "br",
        isVoid: true,
        validContent: [],
        handler: HANDLERS.default,
    },
    {
        type: "link",
        isBlock: false,
        expression: /\[([^\n]+?)\]\<(?<href>[^\n]+?)\>/,
        tag: "a",
        isVoid: false,
        validContent: ["bold", "italic", "underlined", "strikethrough", "text"],
        handler: HANDLERS.default,
    },
    {
        type: "bold",
        isBlock: false,
        expression: /\*([\s\S]+?)\*/,
        tag: "b",
        isVoid: false,
        validContent: ["link", "italic", "underlined", "strikethrough", "inline_code", "text"],
        handler: HANDLERS.default,
    },
    {
        type: "italic",
        isBlock: false,
        expression: /\/([\s\S]+?)\//,
        tag: "i",
        isVoid: false,
        validContent: ["link", "bold", "underlined", "strikethrough", "inline_code", "text"],
        handler: HANDLERS.default,
    },
    {
        type: "underlined",
        isBlock: false,
        expression: /_([\s\S]+?)_/,
        tag: "u",
        isVoid: false,
        validContent: ["link", "bold", "italic", "strikethrough", "inline_code", "text"],
        handler: HANDLERS.default,
    },
    {
        type: "strikethrough",
        isBlock: false,
        expression: /~([\s\S]+?)~/,
        tag: "s",
        isVoid: false,
        validContent: ["link", "bold", "italic", "underlined", "inline_code", "text"],
        handler: HANDLERS.default,
    },
    {
        type: "inline_code",
        isBlock: false,
        expression: /`([\s\S]+?)`/,
        tag: "code",
        isVoid: false,
        validContent: ["code_span"],
        handler: HANDLERS.default,
    },
    {
        type: "code_span",
        isBlock: false,
        expression: /([\s\S]+)/,
        tag: "",
        isVoid: true,
        validContent: [],
        handler: HANDLERS.code_span,
    },
    {
        type: "text",
        isBlock: false,
        expression: /([\s\S]+)/,
        tag: "",
        isVoid: true,
        validContent: [],
        handler: HANDLERS.text,
    },
];
const RULES = {};
for(var i = 0; i < RULES_LIST.length; i++){
    var token = RULES_LIST[i];
    var type = token.type;
    RULES[type] = token;
}

class Token{
    constructor(type, content, attributes){
        this.type = type;
        this.content = content;
        this.attributes = attributes;
    };
};