var GameLogic = function(){

    // extends Base
    //var parent = new Base();
    var base = new Base();
    var private = {};
    private.iteration = 0;
    private.isPaused = false;
    
    base.start = function() {        
        /* ... */
        if(!private.isPaused) {
            console.log('start');
            base.startNextLevel();
        } else {
            console.log('continue', base.gameLoop);
        }
        
        //base.gameLoop = undefined;
        //base.start();
        //base.startNextLevel();
        if (!base.gameLoop) {
            //base.start();
            var me = base;
            me.gameLoop = setInterval(function() {
                me.tick();
            }, TICK_INTERVAL);    
        } else {
            return false;
            //private.iteration = 0;
            console.log('end', base.gameLoop);
            base.pause();
            //base.startNextLevel();
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
            private.iteration = 0;
            private.isPaused = false;
            console.log('wave finish');
        }
        //for()
    };

    base.pause = function() {
        console.log('pause', base.gameLoop);
        if (base.gameLoop) {
            
            private.isPaused = true;
            clearInterval(base.gameLoop);
            base.gameLoop = undefined;    
        }
    };


    return base;
};