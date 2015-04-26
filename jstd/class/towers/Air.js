var AirTower = function() {

    // extends Tower
    var tower = new Tower();
    var private = {};

    private.speed          =  1;
    private.animationDelay = 200;
    private.range          = 5;
    private.shotType       = 1;
    private.code           = '&#9821';
    private.sprite         = '';

    tower.init(private.speed, private.animationDelay, private.range, private.shotType, private.code);
    tower.setType('air');

    // var public = parent;

    // public.init = function() {
    //     console.log(parent);
    //     parent.init(public.speed, 200, public.range, public.shotType);
    //     //this.createVisual(public.sprite, [1, 1, 1, 1]);
    // };

    // public.targetFilter = function(target) {
    //     //return parent.targetFilter(target);
    // };

    // public.update = function() {
    //     //parent.update();
    // };

    return tower;
};