var Tower = function(){

    // extends GameObject
    //var parent = new GameObject();
    var gameObject = new GameObject();
    var public = {};
    var private = {};

    gameObject.init('<span>', {
        'class': 'tower',
        'draggable': true,
        'ondragstart': "drag(event)"
    });

    // methods
    public.init = function(speed, animationDelay, range, shotType, code) {
        public.speed          = speed;
        public.animationDelay = animationDelay;
        public.range          = range;
        public.shotType       = shotType;
        public.code           = code;
        gameObject.setText(public.code);
    };

    public.get = function() {
        return gameObject.get();
    };

    public.getId = function() {
        return gameObject.getId();
    };

    public.setId = function(idname) {
        gameObject.setId(idname);
    };

    public.setType = function(type) {
        public.type = type;
        gameObject.setClass('tower' + type);
    };

    public.active = function() {
        gameObject.setAttr('draggable', false);
    };

    public.clone = function(original) {
        public.speed          = original.speed;
        public.animationDelay = original.animationDelay;
        public.range          = original.range;
        public.shotType       = original.shotType;
        public.code           = original.code;
        gameObject.setText(public.code);
    };

    public.targetFilter = function(target) {
        return target.strategy !== MazeStrategy.air;
    };

    public.update = function() {
        parent.update();
        public.speed *= 2;
        public.range *= 2;
        /* ... */
    };

    public.shoot = function() {
        /* ... */
    };

    return public;
};