// Lexer generates a token tree from a given string
var Lexer = {};

// The main function
Lexer.tokenize = function(string){
    // The idea is to shorten the string gradually from right to left, matching 
    // tokens along the way
    var tokens = [];

    while(string.length > 0){
        var isMatched = false;
        for(var i = 0; i < TOKEN_DATA_LIST.length; i++){
            // Tokenize blocks first
            var data = TOKEN_DATA_LIST[i];
            if(data.scope != "BLOCK") continue;

            // Try to find the first match for the token type, if no match is found, or it is 
            // not directly in the beginning, skip the current token
            var match = string.match(data.expression);
            if(match == null || match.index != 0) continue;

            var content = [];
            // If the token's element is not self-closing, add content to it
            if(!data.isVoid){
                // The token's content is based on the first capture group
                // If the token has a capture group (has content), tokenize it as an inline
                if(match[1] != undefined) content = Lexer._tokenizeInline(match[1]);
            }

            var attributes = match.groups;
            if(attributes == undefined) attributes = {};

            var token = new Token(data.type, content, attributes);
            tokens.push(token);

            // Shorten the string
            string = string.slice(match[0].length);
            isMatched = true;
            break;
        }
        // If no token has been matched, shorten the string by 1 character
        if(!isMatched) string = string.slice(1);
    }

    return tokens;
};

Lexer._tokenizeInline = function(string){
    var tokens = [];

    // The general idea is the same as in Lexer.tokenize function
    while(string.length > 0){
        var isMatched = false;
        for(var i = 0; i < TOKEN_DATA_LIST.length; i++){
            var data = TOKEN_DATA_LIST[i];
            if(data.scope != "INLINE") continue;

            var match = string.match(data.expression);
            if(match == null || match.index != 0) continue;

            var step = match[0].length;
            var content = match[1];

            // Make an exception for text tokens, because they are everything except other 
            // tokens, so taking a RegExp-only approach wouldn't be practical
            if(data.type == "TEXT"){
                // Find where the text ends and the next token starts
                var index = Lexer._indexText(string);
                if(index == 0) continue;

                content = string.slice(0, index);
                step = index;
            }else{
                // If the token is not text (which is considered terminal), find any other tokens 
                // inside. This is a recursive approach
                var content = Lexer._tokenizeInline(content);
            }

            var attributes = match.groups;
            if(attributes == undefined) attributes = {};

            var token = new Token(data.type, content, attributes);
            tokens.push(token);

            string = string.slice(step);
            isMatched = true;
            break;
        }
        if(!isMatched) string = string.slice(1);
    }

    return tokens;
};

// Find where the text token ends and the next token starts in a string
Lexer._indexText = function(string){
    // The idea is to match all inline types with the string, get their starting 
    // indexes, find the minimum (there, the text token ends)
    var indexes = [];

    for(var i = 0; i < TOKEN_DATA_LIST.length; i++){
        var data = TOKEN_DATA_LIST[i];
        if(data.scope == "BLOCK" || data.type == "TEXT") continue;

        var match = string.match(data.expression);
        if(match == null) continue;

        indexes.push(match.index);
    }
    if(indexes.length == 0) return string.length;

    var index = Math.min(...indexes);
    return index;
};