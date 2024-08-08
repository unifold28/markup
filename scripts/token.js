// Properties of tokens (of certain type)
// Order does matter, beacause some RegExps can override others
const TOKEN_DATA_LIST = [
    // Block scopes

    {type: "HEADING_3", scope: "BLOCK", expression: /^### (.+?)$/m, html: (content) => `<h3>${content}</h3>`},
    {type: "HEADING_2", scope: "BLOCK", expression: /^## (.+?)$/m, html: (content) => `<h2>${content}</h2>`},
    {type: "HEADING_1", scope: "BLOCK", expression: /^# (.+?)$/m, html: (content) => `<h1>${content}</h1>`},

    {type: "PARAGRAPH", scope: "BLOCK", expression: /^(.+?)$/m, html: (content) => `<p>${content}</p>`},

    // Inline scopes

    {type: "BOLD", scope: "INLINE", expression: /\*\*(.+?)\*\*/, html: (content) => `<b>${content}</b>`},
    {type: "ITALICIZED", scope: "INLINE", expression: /\/\/(.+?)\/\//, html: (content) => `<i>${content}</i>`},
    {type: "UNDERLINED", scope: "INLINE", expression: /__(.+?)__/, html: (content) => `<u>${content}</u>`},

    // Since text tokes are everything except other tokens, text is placed last in the 
    // array to prevent it from overriding other RegExps
    {type: "TEXT", scope: "INLINE", expression: /(.+)/, html: (content) => `${content}`},
];

// Generate a map based on the list for convinience
const TOKEN_DATA = {};
for(var i = 0; i < TOKEN_DATA_LIST.length; i++){
    var data = TOKEN_DATA_LIST[i];
    TOKEN_DATA[data.type] = data;
}

class Token{
    constructor(type, content){
        this.type = type;
        this.content = content;
    };
};