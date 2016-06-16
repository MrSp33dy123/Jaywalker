"use strict";
var locIteration = 0;

function initGame() {
    $('#loadingText').hide();
    $('#accountOverlay').hide();
    $('#title').hide();
    //$('#map').show();
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        scrollwheel: true,
        zoom: 8,
        streetViewControl: false
    });
    getMapData({callback:startGame});
    
    $('#nextLoc').click(function(){
        if (locIteration < mapData.length) {
            map.setCenter({lat: mapData[locIteration][0], lng: mapData[locIteration][1]});
            locIteration++;
        } else {
            alert('Map complete!');
        }
    });
}



function startGame() {
    
}