// Renderer takes in a tree of tokens (produced by the parser) and output a string of html elements
var Renderer = {};

Renderer.render = function(tree){
    var html = "";
    for(var i = 0; i < tree.length; i++){
        var token = tree[i];
        var rule = RULES[token.type];

        if(rule.tag == ""){
            html += Renderer._tag(token.type, token.content);
        }else if(rule.isVoid){
            html += Renderer._tag(token.type, [], token.attributes);
        }else{
            html += Renderer._tag(token.type, Renderer.render(token.content), token.attributes);
        }
    };
    return html;
};

Renderer._escapeHtml = function(source){
    return source
    .replace(/&/g, "&amp;")
    .replace(/\</g, "&lt;")
    .replace(/\>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

Renderer._tag = function(type, inner, attributes){
    var rule = RULES[type];
    if(rule.tag == "" || rule.type == "escape") return Renderer._escapeHtml(inner);

    var tag = `<${rule.tag}`;

    var keys = Object.keys(attributes);
    for(var i = 0; i < keys.length; i++){
        var name = keys[i];
        var value = attributes[name];

        tag += ` ${name}="${value}"`;
    }

    tag += ">";
    if(!rule.isVoid) tag += `${inner}</${rule.tag}>`;

    return tag;
};