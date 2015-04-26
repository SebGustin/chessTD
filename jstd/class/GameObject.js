var GameObject = function() {
    var public = {};
    var private = {};

    private.element = undefined;

    public.init = function(tag, options) {
        private.element = $(tag, options);
    };

    public.get = function() {
        return private.element;
    };

    public.setClass = function(classname) {
        private.element.addClass(classname);
    };

    public.setText = function(text) {
        private.element.html(text);
    };

    public.setId = function(idname) {
        private.element.attr('id', idname);
    };

    public.getId = function() {
        return private.element.attr('id');
    };

    public.setAttr = function(attrName, attrValue) {
        private.element.attr(attrName, attrValue);
    };

    public.append = function(element) {
        private.element.append(element);
    };

    return public;
}