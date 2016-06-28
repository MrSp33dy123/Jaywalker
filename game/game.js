"use strict";
var locIteration = 0;

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
        fullscreenControl:false,
        disableDoubleClickZoom:true
    });
    streetview.setPosition({lat: mapLevels[currentMap]['LEVELS'][locIteration][0], lng: mapLevels[currentMap]['LEVELS'][locIteration][1]});
    $('#map').show();
    $('#gameOverlay').fadeIn(380);
    
    $('#nextLoc').click(function(){
        if (locIteration < mapLevels.length) {
            streetview.setPosition({lat: mapLevels[currentMap]['LEVELS'][locIteration][0], lng: mapLevels[currentMap]['LEVELS'][locIteration][1]});
            locIteration++;
        } else {
            alert('Map complete!');
        }
    });
}

$('#answerBox > a').click(function(){
    $(this).css("background-color","rgba(0,255,255,0.1)")
    if (($(this).attr('class') == 'safe' && mapLevels[currentMap]['LEVELS'][locIteration][2] == true) || ($(this).attr('class') == 'unsafe' && mapLevels[currentMap]['LEVELS'][locIteration][2] == false)) {
        $('#gameOverlay > .response').css("color","green");
        $(this).css('background-color','rgba(0,120,0,0.2)');
        $('#gameOverlay > .response').html("<i>Correct!</i>  " + mapLevels[currentMap]['LEVELS'][locIteration][3]);
    } else {
        $('#gameOverlay > .response').css("color","red");
        $(this).css('background-color','rgba(0,120,0,0.2)');
        $('#gameOverlay > .response').html("<i>Inorrect!</i>  " + mapLevels[currentMap]['LEVELS'][locIteration][3]);
    }
    $('#gameOverlay').css({'min-height':'75%'});
    
    
});


function startGame() {
    
}