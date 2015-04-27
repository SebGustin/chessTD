


// var zones = [];
// var towers = [];
var currentDrag = undefined;
var TD = undefined;

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
        {"type": "enemy1", "count": 5},
        {"type": "enemy1", "count": 2}
    ]
};

var level2 = {
    "towers" : [
        {"type": "basic"}
    ],
    "path": [
        {"x":6, "y":0},
        {"x":6, "y":11}
    ],
    "wave": [
        {"type": "enemy1", "count": 1}
    ]
};

$(document).ready(function() {
    TD = new GameLogic();
    TD.init([level1,level2]);

    $('#play').on('click', function() {
        TD.start();
    });

    $('#pause').on('click', function() {
        TD.pause();
    });
});

function allowDrop(ev) {
    ev.preventDefault();
    //console.log(currentDrag);
    //console.log(ev.target);
}

function drag(ev) {
    currentDrag = ev.target;
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    if(TD.isValidZone(ev)) {
        var zone = TD.getZone(getCurrentZoneX(ev), getCurrentZoneY(ev));
    }
    
    if(zone !== undefined && zone.isEmpty()) {
        var tower = TD.getTower(currentDrag.id);
        TD.add(tower, zone);
    }
    currentDrag = undefined;
}

function getCurrentZoneX(ev) {
    var zonesXY = ev.target.id.match(/\d+/g); 
    return parseInt(zonesXY[0], 10); 
}

function getCurrentZoneY(ev) {
    var zonesXY = ev.target.id.match(/\d+/g); 
    return parseInt(zonesXY[1], 10); 
}
