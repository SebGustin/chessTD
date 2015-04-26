var Zone = function() {

    var gameObject = new GameObject();
    var public = {};
    var private = {};

    private.empty = true;
    private.path = false;
    private.pathIndex = undefined;

    gameObject.init('<span>', {
        'class': 'zone',
        'ondrop' : 'drop(event)',
        'ondragover': 'allowDrop(event)'
    });

    private.x = undefined;
    private.y = undefined;

    public.init = function(x, y) {
        private.x = x;
        private.y = y;
        gameObject.setId('zone-' + x + '-' + y);
    };

    public.refresh = function() {
        private.empty = true;
        private.path = false;
        private.pathIndex = undefined;
        gameObject.removeClass('zonepath');
    };

    public.get = function() {
        return gameObject.get();
    };

    public.getX = function() {
        return private.x;
    };

    public.getY = function() {
        return private.y;
    };

    public.getPathIndex = function() {
        return private.pathIndex;
    };

    public.setPathIndex = function(index) {
        private.pathIndex = parseInt(index, 10);
    };

    public.isEmpty = function() {
        return private.empty;
    };

    public.isPath = function() {
        return private.path;
    };

    public.fill = function() {
        private.isEmpty = false;
    };

    public.dragging = function() {
        var element = gameObject.get();
        element.addClass('dragging');
    };

    public.activePath = function() {
        if(private.empty) {
            private.empty = false;
            private.path = true;
            gameObject.setClass('zonepath');
        }
    };

    return public;
};