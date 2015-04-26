var AirShot = function() {

    // extends Shot
    var parent = new Shot();
    var public = parent;

    public.init =  function() {
        parent.init(public.speed, public.animationDelay, public.damage, public.impactRadius);
        this.createVisual(public.sprite, [1, 1, 1, 1], 0.2);
        //this.playSound('flak');
    };

    return public;
}; 