// Renderer takes in a tree of tokens (produced by the parser) and output a string of html elements
var Renderer = {};

Renderer.render = function(tree){
    var html = "";
    for(var i = 0; i < tree.length; i++){
        var token = tree[i];
        var rule = RULES[token.type];

        if(token.type == "text") html += Renderer._tag(token.type, token.content);
        else if(rule.isVoid) html += Renderer._tag(token.type);
        else html += Renderer._tag(token.type, Renderer.render(token.content));
    };
    return html;
};

Renderer._tag = function(type, content){
    if(type == "text") return content;

    var rule = RULES[type];
    var tag = `<${rule.tag}>`;
    if(!rule.isVoid) tag += `${content}</${rule.tag}>`;

    return tag;
};