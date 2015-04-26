// constants
const TILE_H = 50;
const TILE_W = 50;
const MAP_H = 11;
const MAP_W = 11; 
const TICK_INTERVAL = 1000; 

var Base = function() {
    var public = {};
    var private = {};

    var $mapzone = $('#mapzone');
    var $towerzone = $('#towerzone');

    private.levels = [];
    private.currentLevel = -1;
    public.zones = [];
    public.towers = [];
    public.wave = [];
    private.path = [];
    public.gameLoop = undefined;

    public.init = function(levels) {
        private.levels = levels;
    };

    // public.start = function() {

    // };

    public.startNextLevel = function() {
        console.log('startNextLevel');
        if(private.levels[private.currentLevel + 1] !== undefined) {
            private.currentLevel++;
            console.log('start level ' + private.currentLevel);
            private.generateZones();
            private.generateTowers();
            private.generatePath();
            private.generateWave();
        } else {
            console.log('levels finish');
            private.currentLevel = 0;
            private.generateZones();
            private.generateTowers();
            private.generatePath();
            private.generateWave();
        }
        //TD.start();
    };

    private.generateTowers = function() {
        //public.towers = [];
        if(public.towers.length <= 0) {
            for(var index in private.levels[private.currentLevel].towers) {
                var tower = public.newTowerByType(private.levels[private.currentLevel].towers[index].type);
                tower.setId('tower-' + public.towers.length);
                public.towers.push(tower);
                $towerzone.append(tower.get());
            }
        } else {
            for(var index in private.levels[private.currentLevel].towers) {
                var tower = public.getTowerByType(private.levels[private.currentLevel].towers[index].type);
                if(tower == false) {
                    tower.setId('tower-' + public.towers.length);
                    public.towers.push(tower);
                    $towerzone.append(tower.get());
                }
            }
        }
    };

    private.generateZones = function() {
        if(public.zones.length <= 0) {
            for(var j=0 ; j<=MAP_W ; j++) {
                for(var i=0 ; i<=MAP_H ; i++) {
                    private.generateZone(i,j);
                }
            }
        } else {
            for(var j=0 ; j<=MAP_W ; j++) {
                for(var i=0 ; i<=MAP_H ; i++) {
                    private.refreshZone(i,j);
                }
            }
        }  
        
    };

    private.generateWave = function() {
        //public.wave = [];
        for(var index in private.levels[private.currentLevel].wave) {
            for(var i = 0; i < private.levels[private.currentLevel].wave[index].count; i++) {
                var unit = public.newUnitByType(private.levels[private.currentLevel].wave[index].type);
                unit.setId('unit-' + public.wave.length);
                public.wave.push(unit);            
            }

        }
    };

    private.refreshZone = function(i,j) {
        var zone = public.getZone(i, j);
        zone.refresh();
    };

    private.generateZone = function(i,j) {
        var zone = new Zone();
        zone.init(i, j);
        public.zones.push(zone);
        $mapzone.append(zone.get());
    };

    public.getZone = function(x, y) {
        for(var index in public.zones) {
            if(public.zones[index].getX() == x && public.zones[index].getY() == y) {
                return public.zones[index];
            }
        }

        return false;
    };

    public.getZoneIndex = function(x, y) {
        for(var index in public.zones) {
            if(public.zones[index].getX() == x && public.zones[index].getY() == y) {
                return index;
            }
        }

        return false;
    };

    public.getNextZone = function(x, y) {
        for(var index in public.zones) {
            index = parseInt(index, 10);
            if(public.zones[index].getX() == x && public.zones[index].getY() == y) {
                if(public.zones[index + 1] !== undefined) {
                    return public.zones[index + 1];
                }
            }
        }
        return false;
    };

    public.getNextZonePath = function(index) {
        index = parseInt(index, 10);
        if(private.path[index + 1] !== undefined) {
            return public.zones[private.path[index + 1]];
        } else {
            return false;
        }
    };

    public.getTower = function(id) {
        for(var index in public.towers) {
            if(public.towers[index].getId() == id) {
                return public.towers[index];
            }
        }
    };

    public.newTowerByType = function(type) {
        switch(type) {
            case 'basic' : var tower = new BasicTower(); break;
            case 'air' : var tower = new AirTower(); break;
        };

        return tower;
    };

    public.getTowerByType = function(type) {
        for(var index in public.towers) {
            if(type == public.towers[index].type) {
                return public.towers[index];
            }
        }
        return false;
    };

    public.newUnitByType = function(type) {
        switch(type) {
            case 'enemy1' : var unit = new Enemy1(); break;
        };

        return unit;
    };

    private.generatePath = function() {
        var oldx = undefined;
        var oldy = undefined;
        private.path = [];
        for(var index in private.levels[private.currentLevel].path) {
            if(index == 0 && oldx == undefined && oldy == undefined) {
                var zone = public.getZone(private.levels[private.currentLevel].path[index].x, private.levels[private.currentLevel].path[index].y);
                var pathIndex = public.getZoneIndex(private.levels[private.currentLevel].path[index].x, private.levels[private.currentLevel].path[index].y);
                
                if(pathIndex != private.path[private.path.length - 1]) {
                    private.path.push(pathIndex);
                    zone.activePath();
                    zone.setPathIndex(pathIndex);
                }
            } else {
                if(private.levels[private.currentLevel].path[index].x != oldx) {
                    var zone = private.generatePathLine(private.levels[private.currentLevel].path[index], 'x', oldx);
                } else if(private.levels[private.currentLevel].path[index].y != oldy) {
                    var zone = private.generatePathLine(private.levels[private.currentLevel].path[index], 'y', oldy);
                } else {
                    console.log('what else !');
                }
            }
            oldx = zone.getX();
            oldy = zone.getY();
        }
    };

    private.generatePathLine = function(path, ref, old) {
        if(ref == 'x') {
            var looper = path.x;
        } else {
            var looper = path.y;
        }

        if(looper > old) {
            for(var i = old; i <=  looper; i++) {
                if(ref == 'x') {
                    var zone = public.getZone(i, path.y);
                    var pathIndex = public.getZoneIndex(i, path.y);
                } else {
                    var zone = public.getZone(path.x, i);
                    var pathIndex = public.getZoneIndex(path.x, i);
                }
                
                if(pathIndex != private.path[private.path.length - 1]) {
                    private.path.push(pathIndex);
                    zone.activePath();
                    zone.setPathIndex(pathIndex);
                }
            }
        } else if(old > looper) {
            for(var i = old; i >=  looper; i--) {

                if(ref == 'x') {
                    var zone = public.getZone(i, path.y);
                    var pathIndex = public.getZoneIndex(i, path.y);
                    
                } else {
                    var zone = public.getZone(path.x, i);
                    var pathIndex = public.getZoneIndex(path.x, i);
                }
                
                if(pathIndex != private.path[private.path.length - 1]) {
                    private.path.push(pathIndex);
                    zone.activePath();
                    zone.setPathIndex(pathIndex);
                }
            }
        }
        return zone;
    };

    public.isValidZone = function(ev) {
        return $(ev.target).hasClass('zone');
    };

    public.isValidTower = function(ev) {
        return $(ev.target).hasClass('tower');
    };

    public.move = function(unit, index) {
        //console.log(unit);
        if(unit.isEngaged()) {
            var unitZone = unit.getZone();
            var pathIndex = unitZone.getPathIndex();
            var nextZone = public.getNextZonePath(pathIndex);
            if(nextZone !== false) {
                unit.move(nextZone, pathIndex + 1);
            } else {
                public.wave.splice(index, 1);
            }
        } else {
            unit.engage(public.zones[private.path[0]], private.path[0]);
            $mapzone.prepend(unit.get());
        }
        
    };

    public.add = function(tower, zone) {
        if(zone.isEmpty()) {
            zone.fill();
            var newTower = public.newTowerByType(tower.type);
            newTower.clone(tower);
            var gameObjectZone = zone.get();
            gameObjectZone.append(newTower.get());
            newTower.active();
        }
    };


    // public.init = function() {
    //     this.events = {};
    // };

    // public.registerEvent = function(event) {
    //     if (!this.events[event])
    //         this.events[event] = [];
    // };

    // public.unregisterEvent = function(event) {
    //     if (this.events[event])
    //         delete this.events[event];
    // };

    // public.triggerEvent = function(event, args) {
    //     if (this.events[event]) {
    //         var e = this.events[event];

    //         for (var i = e.length; i--; )
    //             e[i].apply(this, [args || {}]);
    //     }
    // };

    // public.addEventListener = function(event, handler) {
    //     if (this.events[event] && handler && typeof(handler) === 'function')
    //         this.events[event].push(handler);
    // };

    // public.removeEventListener = function(event, handler) {
    //     if (this.events[event]) {
    //         if (handler && typeof(handler) === 'function') {
    //             var index = this.events[event].indexOf(handler);
    //             this.events[event].splice(index, 1);
    //         } else
    //             this.events[event].splice(0, this.events[event].length);
    //     }
    // };

    return public;
};