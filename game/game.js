"use strict";
var locIteration = 0;
var mapData = [
    [-43.640022, 172.486058, false, 'There are multiple cars approaching on both sides of the road. You must wait for a large enough gap in the traffic to safely cross.\nIt is not a good idea to cross here as there is a designated pedestrian crossing only a few metres down the road. Cross there.'],
    [-43.634008, 172.486040, true, "It's scarcer out here than in a Mad Max movie. Although there is no pedestrian crossing, there are no cars as far as the eye can see and this road has no blind spots."]
];

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