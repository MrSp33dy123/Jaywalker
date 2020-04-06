"use strict";

// Declare variables
var locIteration;
var score;

// When Google Maps dependancies are loaded, generate the Gmap and streetview panorama
function generateGMap() {
    window.streetview = new google.maps.StreetViewPanorama(document.getElementById('map'),{
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

// Initialize game...
function initGame() {
    // Hide menu screen
    $('#loadingText').hide();
    $('#accountOverlay').hide();
    $('#title').hide();
    // Reset score count and location iteration
    score = 0;
    locIteration = 0;
    
    // Set the streetview panorama to the first level of the map
    streetview.setPosition({lat: mapLevels[currentMap]['LEVELS'][locIteration][0], lng: mapLevels[currentMap]['LEVELS'][locIteration][1]});
    
    // Show map, fade in UI
    $('#map').fadeIn(580);
    $('#gameOverlay').fadeIn(880);
    google.maps.event.trigger(map, "resize");
}

// When the 'next' button is clicked...
$('.nextLoc').click(function(){
    //Move box back down to bottom of screen, reset buttons
    $('#gameOverlay').css({'min-height':'1%'});
    $('#answerBox > a').css("background-color","transparent");
    $('#answerBox > a').removeClass('disabledBtn');

    // Increase iteration by 1
    locIteration++;
    
    // If location iteration is less than the amount of levels in the map...
    if (locIteration < mapLevels[currentMap]['LEVELS'].length) {
        // Load next level
        streetview.setPosition({lat: mapLevels[currentMap]['LEVELS'][locIteration][0], lng: mapLevels[currentMap]['LEVELS'][locIteration][1]});
    } else {
        //Show map is complete, print score
        var endMessage = "Map complete!\nYour score was " + score;
        if (score > 100) {
            endMessage += ", good job!";
        } else {
            endMessage += ", better luck next time :(";
        }
        alert(endMessage + "\nHit 'OK' to go back to the main map screen and play another game, or exit.");
        
        // Reset back to 'select map' screen
        $('#map').fadeOut(380);
        $('#gameOverlay').fadeOut(380);
        $('#bgVideo').fadeIn(380);
        selectMap();
    }
});

// When the player chooses an answer...
$('#answerBox > a').click(function(){
    // Make the selected button have dark turquoise highlight, make correct answer have green highlight.
    $(this).css("background-color","rgba(25,45,45,0.8)");
    $('#answerBox > a.' + mapLevels[currentMap]['LEVELS'][locIteration][2]).css('background-color','rgba(0,120,0,0.2)');
    
    // If the answer chosen is 'unsure'...
    if ($(this).attr('class') == 'unsure') {
        //Display answer in white text, do nothing to score
        $('#gameOverlay > .response').css("color","white");
        $('#gameOverlay > .response').html(mapLevels[currentMap]['LEVELS'][locIteration][3] + "<p class='score'>Score | <b>"+ score +"</b></p>");
        
    // If the answer chosen is the same as the correct answer...
    } else if (JSON.parse($(this).attr('class')) == mapLevels[currentMap]['LEVELS'][locIteration][2]) {
        // Add 100 to score, display answer text in green.
        score += 100;
        $('#gameOverlay > .response').css("color","green");
        $('#gameOverlay > .response').html("<i>Correct!</i><br>" + mapLevels[currentMap]['LEVELS'][locIteration][3] + "<p class='score'>Score | <b>"+ score +"</b></p>");
    // Else if answer is wrong
    } else {
        //Deduct 50 from score, display answer text in red.
        score -= 50;
        $('#gameOverlay > .response').css("color","red");
        $('#gameOverlay > .response').html("<i>Incorrect!</i><br>" + mapLevels[currentMap]['LEVELS'][locIteration][3] + "<p class='score'>Score | <b>"+ score +"</b></p>");
    }
    // Disable buttons from being clicked again, move answerbox up to the centre of screen from the bottom
    $('#answerBox > a').addClass('disabledBtn');
    $('#gameOverlay').css({'min-height':'75%'});
    
});


