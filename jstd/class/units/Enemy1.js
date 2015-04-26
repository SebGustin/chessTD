var Enemy1 = function() {

    var unit = new Unit();
    var private = {};

    private.speed          =  1;
    private.animationDelay = 200;
    private.hitpoints   = 10;
    private.description = 'The first enemy';
    private.nickName    = 'enemy 1';
    private.rating       = private.speed * private.hitpoints;
    private.code         = '&#9823;';
    private.sprite         = '';

    unit.init(private.speed, private.animationDelay, private.range, private.shotType, private.code);
    unit.setType('enemy1');



    return unit;
};