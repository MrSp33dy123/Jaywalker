"use strict";
var locIteration;
var score;

function generateGMap {
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
}

function initGame() {
    $('#loadingText').hide();
    $('#accountOverlay').hide();
    $('#title').hide();
    $('#map').show();
    score = 0;
    locIteration = 0;
    
    streetview.setPosition({lat: mapLevels[currentMap]['LEVELS'][locIteration][0], lng: mapLevels[currentMap]['LEVELS'][locIteration][1]});
    $('#map').show();
    $('#gameOverlay').fadeIn(380);
}

$('.nextLoc').click(function(){
    $('#gameOverlay').css({'min-height':'1%'});
    $('#answerBox > a').css("background-color","transparent");
    $('#answerBox > a').removeClass('disabledBtn');
    console.info(locIteration + " | " + mapLevels[currentMap]['LEVELS'].length);

    locIteration++;
    if (locIteration < mapLevels[currentMap]['LEVELS'].length) {
        streetview.setPosition({lat: mapLevels[currentMap]['LEVELS'][locIteration][0], lng: mapLevels[currentMap]['LEVELS'][locIteration][1]});
        console.info("locIteration: " + locIteration);
    } else {
        alert('Map complete!\nYour score was ' + score + ", good job!\nHit 'OK' to go back to the main map screen and play another game, or exit.");
        $('#map').fadeOut(380);
        $('#gameOverlay').fadeOut(380);
        $('#bgVideo').fadeIn(380);
        selectMap();
    }
});

$('#answerBox > a').click(function(){
    $(this).css("background-color","rgba(25,45,45,0.8)");
    $('#answerBox > a.' + mapLevels[currentMap]['LEVELS'][locIteration][2]).css('background-color','rgba(0,120,0,0.2)');
    console.log($(this).attr('class') + " | " + mapLevels[currentMap]['LEVELS'][locIteration][2]);
    
    if ($(this).attr('class') == 'unsure') {
        $('#gameOverlay > .response').css("color","white");
        $('#gameOverlay > .response').html(mapLevels[currentMap]['LEVELS'][locIteration][3] + "<p class='score'>Score | <b>"+ score +"</b></p>");
    } else if (JSON.parse($(this).attr('class')) == mapLevels[currentMap]['LEVELS'][locIteration][2]) {
        score += 100;
        $('#gameOverlay > .response').css("color","green");
        $('#gameOverlay > .response').html("<i>Correct!</i><br>" + mapLevels[currentMap]['LEVELS'][locIteration][3] + "<p class='score'>Score | <b>"+ score +"</b></p>");
    } else {
        score -= 50;
        $('#gameOverlay > .response').css("color","red");
        $('#gameOverlay > .response').html("<i>Incorrect!</i><br>" + mapLevels[currentMap]['LEVELS'][locIteration][3] + "<p class='score'>Score | <b>"+ score +"</b></p>");
    }
    $('#answerBox > a').addClass('disabledBtn');
    $('#gameOverlay').css({'min-height':'75%'});
    
});


