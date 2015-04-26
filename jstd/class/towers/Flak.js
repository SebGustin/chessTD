var Flak = function() {

    // extends Tower
    var parent = new Tower();
    var public = parent;

    public.init = function() {
        parent.init(public.speed, 200, public.range, public.shotType);
        this.createVisual(public.sprite, [1, 1, 1, 1]);
    };

    public.targetFilter = function(target) {
        return parent.targetFilter(target);
    };

    public.update = function() {
        parent.update();
    };

    return public;
};