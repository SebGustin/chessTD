var GameLogic = function(){

    // extends Base
    //var parent = new Base();
    var base = new Base();
    var private = {};
    private.iteration = 0;
    
    base.start = function() {        
        /* ... */

        if (!base.gameLoop) {
            var me = base;
            me.gameLoop = setInterval(function() {
                me.tick();
            }, TICK_INTERVAL);    
        }
    };

    base.tick = function() {
        /* ... */
        //console.log('tick', base.wave);
        if(base.wave.length > 0) {
            if(private.iteration < base.wave.length) {
                private.iteration++;
                for(var i = 0; i< private.iteration; i++) {
                var unit = base.wave[i];
                base.move(unit, i);
                }  
            } else {
                for(var index in base.wave) {
                    var unit = base.wave[index];
                    base.move(unit, index);
                }
            }
        } else {
            clearInterval(base.gameLoop);
            base.gameLoop = undefined; 
            console.log('wave finish');
        }
        //for()
    };

    base.pause = function() {
        if (base.gameLoop) {
            clearInterval(base.gameLoop);
            base.gameLoop = undefined;    
        }
    };


    return base;
};