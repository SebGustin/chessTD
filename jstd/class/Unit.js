var Unit = function() {

    var gameObject = new GameObject();
    var public = {};
    var private = {};
    private.engaged = false;
    private.dead = false;
    private.zone = undefined;

    gameObject.init('<span>', {
        'class': 'enemy'
    });

    // methods
    public.init = function(speed, animationDelay,  mazeStrategy, hitpoints, code) {
        public.speed          = speed;
        public.animationDelay = animationDelay;
        public.mazeStrategy   = mazeStrategy;
        public.hitpoints      = hitpoints;
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
        gameObject.setClass('enemy' + type);
    };

    public.move = function(zone, pathIndex) {
        if(private.engaged && !private.dead) {
            if(zone.isPath()) {
                zone.get().append(gameObject.get());
                zone.setPathIndex(pathIndex);
                private.zone = zone;
            }
        }
    };

    public.getZone = function() {
        return private.zone;
    };

    public.isEngaged = function() {
        return private.engaged;
    };

    public.engage = function(zone, pathIndex) {
        if(!private.engaged && !private.dead) {
            private.engaged = true;
            public.move(zone, pathIndex);
        } 
    };

    public.playInitSound = function() {
        /* ... */
    };

    public.playDeathSound = function() {
        /* ... */
    };

    public.playVictorySound = function() {
        /* ... */
    };

    public.update = function() {
        /* ... */
    };

    public.hit = function(shot) {
        /* ... */
    };

    return public;
 };