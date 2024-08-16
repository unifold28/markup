// Renderer takes in a tree of tokens (produced by the parser) and output a string of html elements
var Renderer = {};

Renderer.render = function(tree){
    var html = "";
    for(var i = 0; i < tree.length; i++){
        var token = tree[i];
        var isVoid = TOKENS[token.type].isVoid;

        if(token.type == "text") html += Renderer._generateTag(token.type, token.content);
        else if(isVoid) html += Renderer._generateTag(token.type);
        else html += Renderer._generateTag(token.type, Renderer.render(token.content));
    };
    return html;
};

Renderer._generateTag = function(type, content){
    if(type == "text") return content;

    var token = TOKENS[type];
    var tag = `<${token.tag}>`;
    if(!token.isVoid) tag += `${content}</${token.tag}>`;

    return tag;
};