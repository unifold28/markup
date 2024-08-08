// Properties of tokens (of certain type)
// Order does matter, beacause some RegExps can override others
const TOKEN_DATA_LIST = [
    // Block scopes

    {type: "HEADING_3", scope: "BLOCK", expression: /^### (.+?)$/m},
    {type: "HEADING_2", scope: "BLOCK", expression: /^## (.+?)$/m},
    {type: "HEADING_1", scope: "BLOCK", expression: /^# (.+?)$/m},

    {type: "PARAGRAPH", scope: "BLOCK", expression: /^(.+?)$/m},

    // Inline scopes

    {type: "BOLD", scope: "INLINE", expression: /\*\*(.+?)\*\*/},
    {type: "ITALICIZED", scope: "INLINE", expression: /\/\/(.+?)\/\//},
    {type: "UNDERLINED", scope: "INLINE", expression: /__(.+?)__/},

    // Since text tokes are everything except other tokens, text is placed last in the 
    // array to prevent it from overriding other RegExps
    {type: "TEXT", scope: "INLINE", expression: /(.+)/},
];

// Generate a map based on the list for convinience
const TOKEN_DATA = {};
for(var i = 0; i < TOKEN_DATA_LIST.length; i++){
    var data = structuredClone(TOKEN_DATA_LIST[i]);
    var type = data.type;
    delete data.type;
    TOKEN_DATA[type] = data;
}

class Token{
    constructor(type, content){
        this.type = type;
        this.content = content;
    };
};