// Parser takes in a source string and outputs a tree of tokens, which is passed to the renderer
var Parser = {};

Parser.parse = function(source){
    var validContent = [];
    for(var i = 0; i < RULES_LIST.length; i++){
        var rule = RULES_LIST[i];
        if(rule.isBlock) validContent.push(rule.type);
    }

    return Parser._parseRecursive(source, validContent);
};

Parser._parseRecursive = function(source, validContent){
    source = source.trim();

    var tokens = [];
    while(source.length > 0){
        var isMatched = false;
        for(var i = 0; i < validContent.length; i++){
            var rule = RULES[validContent[i]];

            var expression = rule.expression;

            var separator = "\n\n";
            if(rule.isBlock){
                var lookBehind = `(?<=${separator}|^)`;
                var lookAhead = `(?=${separator}|$)`;
                expression = new RegExp(lookBehind + expression.source + lookAhead);
            }

            var match = source.match(expression);
            if(match == null || match.index != 0) continue;

            var token = new Token(rule.type, [], match.groups || []);
            var step = match[0].length;
            if(rule.type == "text"){
                var index = Parser._indexText(match[1], validContent);
                if(index == 0) continue;

                token.content = match[1].slice(0, index);
                step = index;
            }else if(!rule.isVoid){
                token.content = Parser._parseRecursive(match[1], rule.validContent);
            };

            tokens.push(token);

            if(rule.isBlock) step += separator.length;
            source = source.slice(step);

            isMatched = true;
            break;
        }
        if(!isMatched) source = source.slice(1);
    }

    return tokens;
};

Parser._indexText = function(source, validContent){
    var indexes = [];
    for(var i = 0; i < validContent.length; i++){
        var rule = RULES[validContent[i]];
        if(rule.type == "text") continue;

        var match = source.match(rule.expression);
        if(match == null) continue;

        indexes.push(match.index);
    }
    if(indexes.length == 0) return source.length;

    return Math.min(...indexes);
};