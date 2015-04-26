// constants
const TILE_H = 15;
const TILE_W = 15;
const MAP_H = 11;
const MAP_W = 11; 

var level1 = {
    "towers" : [
        {"type": "basic"},
        {"type": "air"}
    ],
    "path": [
        {"x":0, "y":0},
        {"x":11, "y":0},
        {"x":11, "y":4},
        {"x":3, "y":4},
        {"x":3, "y":3},
        {"x":1, "y":3},
        {"x":1, "y":7},
        {"x":10, "y":7},
        {"x":10, "y":9},
        {"x":4, "y":9},
        {"x":4, "y":11}
    ],
    "wave": [
        {"type": "enemy1", "count": 2}
    ]
};

var Base = function() {
    var public = {};
    var private = {};

    var $mapzone = $('#mapzone');
    var $towerzone = $('#towerzone');

    public.zones = [];
    public.towers = [];
    public.wave = [];
    private.path = [];
    public.gameLoop = undefined;

    public.init = function() {
        private.generateZones();
        private.generateTowers();
        private.generatePath();
        private.generateWave();
    };

    private.generateTowers = function() {
        for(var index in level1.towers) {
            var tower = public.newTowerByType(level1.towers[index].type);
            tower.setId('tower-' + public.towers.length);
            public.towers.push(tower);
            $towerzone.append(tower.get());
        }
    };

    private.generateZones = function() {
        public.zones = [];
        for(var j=0 ; j<=MAP_W ; j++) {
            for(var i=0 ; i<=MAP_H ; i++) {
                private.generateZone(i,j);
            }
        }
    };

    private.generateWave = function() {
        for(var index in level1.wave) {
            for(var i = 0; i < level1.wave[index].count; i++) {
                var unit = public.newUnitByType(level1.wave[index].type);
                unit.setId('unit-' + public.wave.length);
                public.wave.push(unit);            
            }

        }
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

    public.newUnitByType = function(type) {
        switch(type) {
            case 'enemy1' : var unit = new Enemy1(); break;
        };

        return unit;
    };

    private.generatePath = function() {
        var oldx = undefined;
        var oldy = undefined;
        for(var index in level1.path) {
            if(index == 0 && oldx == undefined && oldy == undefined) {
                var zone = public.getZone(level1.path[index].x, level1.path[index].y);
                var pathIndex = public.getZoneIndex(level1.path[index].x, level1.path[index].y);
                
                if(pathIndex != private.path[private.path.length - 1]) {
                    private.path.push(pathIndex);
                    zone.activePath();
                    zone.setPathIndex(pathIndex);
                }
            } else {
                if(level1.path[index].x != oldx) {
                    var zone = private.generatePathLine(level1.path[index], 'x', oldx);
                } else if(level1.path[index].y != oldy) {
                    var zone = private.generatePathLine(level1.path[index], 'y', oldy);
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