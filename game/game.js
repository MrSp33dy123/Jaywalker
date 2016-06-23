"use strict";
var locIteration = 0;
/*var mapData = [
    [-43.640022, 172.486058, false, 'There are multiple cars approaching on both sides of the road. You must wait for a large enough gap in the traffic to safely cross.\nIt is not a good idea to cross here as there is a designated pedestrian crossing only a few metres down the road. Cross there.'],
    [-43.634008, 172.486040, true, "It's scarcer out here than in a Mad Max movie. Although there is no pedestrian crossing, there are no cars as far as the eye can see and this road has no blind spots."]
];*/

function initGame() {
    $('#loadingText').hide();
    $('#accountOverlay').hide();
    $('#title').hide();
    $('#map').show();
    
    var streetview = new google.maps.StreetViewPanorama(document.getElementById('map'),{
        position: {lat:0, lng:0},
        pov: {
        heading: 0,
        pitch: 0
        },
        addressControl:false,
        clickToGo:false,
        imageDateControl:false,
        linksControl:false,
        fullscreenControl:false
    });
    $('#map').show();
    
    $('#nextLoc').click(function(){
        if (locIteration < mapLevels.length) {
            streetview.setPosition({lat: mapLevels[locIteration][0], lng: mapLevels[locIteration][1]});
            locIteration++;
        } else {
            alert('Map complete!');
        }
    });
}




function startGame() {
    
}