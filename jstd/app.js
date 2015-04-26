


// var zones = [];
// var towers = [];
var currentDrag = undefined;
var TD = undefined;

$(document).ready(function() {
    TD = new GameLogic();
    TD.init();

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
