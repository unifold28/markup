// Parser takes in a source string and outputs a tree of tokens
var Parser = {};

Parser.parse = function(source){
    source = source.trim();

    var tokens = [];

    while(source.length > 0){
        var isMatched = false;
        for(var i = 0; i < TOKENS.length; i++){
            var token = TOKENS[i];
            if(token.scope != "block") continue;

            var separator = "\n\n";
            var expression = new RegExp(`(?<=${separator}|^)${token.expression.source}(?=${separator}|$)`);

            var match = source.match(expression);
            if(match == null || match.index != 0) continue;

            var type = token.type;
            var content = token.isVoid ? [] : Parser._parseInline(match[1]);

            tokens.push({type: type, content: content});

            source = source.slice(match[0].length + separator.length);
            isMatched = true;
            break;
        }
        if(!isMatched) source = source.slice(1);
    }

    return tokens;
};

Parser._parseInline = function(source){
    var tokens = [];

    while(source.length > 0){
        var isMatched = false;
        for(var i = 0; i < TOKENS.length; i++){
            var token = TOKENS[i];
            if(token.scope != "inline") continue;

            var match = source.match(token.expression);
            if(match == null || match.index != 0) continue;

            var type = token.type;
            var content;
            var step = match[0].length;
            if(type == "text"){
                var index = Parser._indexText(match[1]);
                if(index == 0) continue;

                content = source.slice(0, index);
                step = index;
            }else if(token.isVoid){
                content = [];
            }else{
                content = Parser._parseInline(match[1]);
            }

            tokens.push({type: type, content: content});

            source = source.slice(step);
            isMatched = true;
            break;
        }
        if(!isMatched) source = source.slice(1);
    }

    return tokens;
};

Parser._indexText = function(source){
    var indexes = [];
    for(var i = 0; i < TOKENS.length; i++){
        var token = TOKENS[i];
        if(token.scope != "inline" || token.type == "text") continue;

        var match = source.match(token.expression);
        if(match == null) continue;

        indexes.push(match.index);
    }
    if(indexes.length == 0) return source.length;

    return Math.min(...indexes);
};