var Shot = function(){

    // extends GameObject
    var parent = new GameObject();
    var public = parent;

    // attributes
    public.speed          =  1;
    public.animationDelay = 10;
    public.damage         = 1;
    public.impactRadius   = 1;
    public.sprite         = '';

    public.init = function(speed, animationDelay, damage, impactRadius) {
        public.speed          = speed;
        public.animationDelay = animationDelay;
        public.damage         = damage;
        public.impactRadius   = impactRadius;
    };

    public.update = function() {
        parent.update();
        /* ... */
    };

    return public;
};