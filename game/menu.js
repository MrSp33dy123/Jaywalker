"use strict";

// Declare misc variables
var BGlake = document.getElementById("bgLake");
var BGcity = document.getElementById("bgCity");
var glitchSFX = document.getElementById("glitch_sfx");
var themeLivery = ['#00FFFF','#FFFFFF','#808080','rgb(0, 194, 190)'];
var username = '';
var mapLevels = [];
var currentMap = '';
var muteBtn = false;

// Declare all the map data
var tempMapdata = {
    "HqlHapAz":{
        "MAPCODE":"HqlHapAz",
        "MAPNAME":"Lincoln, New Zealand",
        "MAPDESC":"A small map based in Lincoln, Canterbury. Locations range from modern subdivisions to outback gravel paths and old main roads.",
        "OFFICIAL":"1",
        "LEVELS":[
            [-43.640204,172.4847637,true,"Right here is a pedestrian crossing--the designated places for you to cross. It's safe to cross here, but still be vigilant to oncoming vehicles."],
            [-43.6327348,172.4845592,false,"You should be careful with this road as cars will begin to travel quite fast down it. Don't cross, as there is a car approaching."],
            [-43.619917,172.4819197,true,"The map description said there were gravel roads, and well... we needed one. Can you see any cars? No? Cross!"],
            [-43.6413878,172.4746944,false,"Crossing at intersections is a bad idea. Instead of having two directions of traffic to worry about, you effectively have four."],
            [-43.6449333,172.5015875,false,"Crossing on a main road is just generally a bad idea. The cars travel so fast."],
            [-43.6434251,172.4943935,false,"This is what is known as 'da hood', kids. Crossing the road here is a bad idea, unless it's for the sole purpose of getting yer a** out of here ASAP."],
            [-43.6379826,172.4833182,true,"Here is fine to cross. Cars won't be going to fast, and you have good visibility. Just make sure your vision is not blocked by a parked car by the side of the road."],
            [-43.6416564,172.4707025,true,"Roundabouts are a dodgey place to be near - for both pedestrians and cars - however if you need to cross, then here is the place to do so. With that said, watch out for traffic in both directions."]
        ]
    },
    "hdsHoINa":{
        "MAPCODE":"hdsHoINa",
        "MAPNAME":"New Zealand",
        "MAPDESC":"A map featuring locations from all around New Zealand. Mountains to beaches, from north to south, it's all in here.",
        "OFFICIAL":"1",
        "LEVELS":[
            [-43.6607711,172.620919,true,"The summit road is quite out of the way of well... most things. Including traffic. Beware of the blind corners here--listen out closely, however you should be safe to cross now."],
            [-43.506325,172.7305636, false, "It's probably not a good idea to cross here. Just down the road, there is a pedestrian crossing. You should probably cross there, as they are designated crossing locations."],
            [-43.5669107,172.7591716, true, "This is a perfect place to cross! No cars, there's a pedestrian crossing and oh wow! Look at the weather!"],
            [-42.8869134,171.5553017, false, "Why the heck are you even here?!"],
            [-41.3276805,174.7869435, true, "Not much traffic here, a nice quiet road. Again, beware of blind corners."],
            [-37.7431297,176.1050425, false, "Crossing highways is generally a bad idea in any situation. However, if you REALLY need to do so then it's OK provided you can make sure no vehicles are near and can see in all directions."],
            [-36.8486892,174.7624288, true, "That's one big pointed implement. This 'road' is probably closer to a pathway than anything else-- you shouldn't expect cars to be going much faster than walking pace down it. Feel free to not just cross it, but walk down it. Even so, still watch out for cars, not all drivers are good drivers."],
            [-46.5974791,168.3392011, true, "'You're bluffing!' Am I?... (Ahem) Yes! It's safe to cross here as there are no cars and plenty of line-of-sight."]
        ]
    },
    "peAnehaO":{
        "MAPCODE":"peAnehaO",
        "MAPNAME":"Florida, United States",
        "MAPDESC":"A map spread out across the sprawling western state of Florida, explore incredible keys, expansive plains, and even discover where rockets come from.",
        "OFFICIAL":"1",
        "LEVELS":[
            [24.5504396,-81.7763076, false, "Remember that in America, people drive on the right hand side of the road. If you look northeast, you'll see a car coming. It's best to wait until it passes."],
            [25.2339515,-80.8206776, true, "There don't appear to be any cars within sight. Go ahead, it's safe to cross the road, but still watch out even so."],
            [26.0113492,-80.1502275, false, "There are quite a lot of cars coming, it's best to wait a bit. Also, crossing next to cars parked by the side of the road is generally a bad idea. They obstruct vision between you and the cars on the road."],
            [29.285988,-81.6489923, true, "Watch out for blind corners like this, cars can come up on you unexpected. Make sure to listen out, and cross the road quickly."],
            [30.3511322,-81.6025485, false, "Four lane anvenues are not the safest of places to cross, especially near intersections like this. On top of that, there are a number of cars approaching right now. Walking down the road to the intersection is a better idea as there is a stop-light controlled pedestrian crossing."],
            [28.5822823,-80.6457249, true, "What's that there? A clock? Also thats a big building! This road is safe to cross as there are no cars coming and is a very small road-- the cars wont be going that fast."]
        ]
    }
};

// When document (webpage) is ready
$(document).ready(function() {
    // Begin typing animation
    $("#loadingText p:nth-of-type(1)").typed({
        strings: ["S T A N D B Y ,^300 L O A D I N G^600 .^100 .^100 ."],
        typeSpeed: 8,
        startDelay: 250,
        backSpeed: 1,
        backDelay: 3200,
        callback: function() {
            // Once first sequence is done, start second typing sequence
            $("#loadingText p:nth-of-type(2)").typed({
                strings: ["[PRESS &#60;F11&#62; TO GO FULLSCREEN]"],
                typeSpeed: 8,
                startDelay: 250,
                backSpeed: 1,
                backDelay: 3000,
                showCursor:false,
                callback: function() {
                    // Once second sequence is done, begin to fade in lake sound effect
                    BGlake.volume = 0;
                    BGlake.play();
                    $('#bgLake').animate({volume: 0.1}, 6000, "swing", function(){
                        // Next fade in city sound effect
                        BGcity.volume = 0;
                        BGcity.play();
                        $('#bgCity').animate({volume: 0.5}, 2000, "swing", function(){
                            // Fade in the main menu screen, animating all applicable text
                            setTimeout(function(){
                                // Fade out loadingtext screen
                                $("#loadingText").fadeOut(1200);
                                setTimeout(function(){
                                    // Fade in city background video
                                    $("#bgVideo").fadeIn(4000);
                                },1200)
                                $("#title").show();
                                setTimeout(function(){
                                    // Show title and subtitle
                                    $("#title .main").show();
                                    $("#title .sub").show();
                                    // Activiate title animation
                                    titleEntrance();
                                },3000);
                                // Navigation bar glide in from top of screen
                                $('nav').toggleClass('navEntry');
                            },500);
                        });
                    });
                }
            });
        },
    });
});

// Main title 3D text animation
function titleEntrance() {
    var letters = $('#title .main span');
    var subContainer = $('#title .container');
    var letterQuantity = letters.length;
    var count = 0;
    var entryTime = 1500;
    
    var letterIterate = setInterval(function() {
        if (count <= letterQuantity) {
            letters.eq(count).addClass('letterSpin');
            count++;
        } else {
            clearTimeout(letterIterate);
            subContainer.css('opacity','1');
        }
    }, entryTime/letterQuantity); 
}

// Function controlling event that scales background greyscale amount with how close the cursor is to the centre of the screen
function backgroundMouseGradient(event) {
    var diffrential = Math.sqrt((event.pageX-=$(window).width()/2)*event.pageX + (event.pageY-=$(window).height()/2)*event.pageY);
    var threshold = $(window).height() * 1.35
    
    $("#bgVideo").css("-webkit-filter","blur(5px) brightness(65%) grayscale("+ ((diffrential / threshold) * 200) +"%)");
}

// When mouse is moved on the webpage...
$(document).mousemove(function(event){
    throttle(backgroundMouseGradient(event), 80);
});

// When the main title hover state changes...
$("#title").hover(function() {
    // Start animation seqence on hover in
    $("#title .main").css('opacity','0');
    $("#title .sub").css('top','60%');
    $("#title .sub").toggleClass('error');
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(5) rotate(50deg) translate(0%,-50%)'});
        glitchSFX.play();
    },350);
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(10) rotate(20deg) translate(0%,-50%)'});
    },380);
    setTimeout(function(){
        $("#title .sub").html('<span>></span>START YOUR JOURNEY<span><</span>');
        $("#title .sub").css({'font-size': '40px'});
    },410);
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(8) rotate(35deg) translate(%,-50%)'});
    },440);
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(3) rotate(40deg) translate(0%,-50%)'});
    },470);
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(1) translate(-50%,-50%)'});
    },500);
}, function() {
    // Start reversed animation seqence on hover out
    $("#title .main").css('opacity','1');
    $("#title .sub").css('top','108%');
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(5) rotate(50deg) translate(0%,-50%)'});
        glitchSFX.play();
    },350);
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(10) rotate(20deg) translate(0%,-50%)'});
    },380);
    setTimeout(function(){
        $("#title .sub").html('A ROAD SAFETY GAME');
        $("#title .sub").css({'font-size': '30px'});
    },410);
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(8) rotate(35deg) translate(%,-50%)'});
    },440);
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(3) rotate(40deg) translate(0%,-50%)'});
    },470);
    setTimeout(function(){
        $("#title .sub").css({transform: 'scaleX(1) translate(-50%,-50%)'});
        $("#title .sub").toggleClass('error');
    },500);

});

// When a button on the nav bar is hovered...
$('nav > a').hover(function(){
    // Change colour to dark cyan
    $(this).css('color',themeLivery[3]);
},function(){
    // Revert to initial colour on hover out
    $(this).css('color','initial');
});

// When title clicked...
$('#title').click(function(){
    // Check for username cookie on client's browser
    if (getCookie('username') == '') {
        // Activate 'create account' screen
        $('#accountOverlay').fadeIn(300);
        $('#title').fadeOut(300);
        $('nav').fadeOut(300);
        $('#hoverReminder').fadeOut(300);
        $(".formWrapper").on("click", ".background", function() {
            $("#accountOverlay").fadeOut(480);
            $('#title').fadeIn(300);
            $('nav').fadeIn(300);
        });
        
        // When 'create account form' is submit...
        $('#createAccountForm').submit(function(event) {
            event.preventDefault();
            var flashCount = 4;
            
            // Check input validity
            if ($('#usernameInput').val().length < 2) {
                // Flash red, and do nothing
                var flashRed = setInterval(function(){
                    if (flashCount <= 0) {
                        clearInterval(flashRed);
                    } else {
                        $('#usernameInput').toggleClass('flashRed');
                    }
                    flashCount--
                },100);
            } else {
                // Flash green, create new cookie and move onto next screen
                username = $('#usernameInput').val();
                var flashGreen = setInterval(function(){
                    if (flashCount <= 0) {
                        clearInterval(flashGreen);
                    } else {
                        $('#usernameInput').toggleClass('flashGreen');
                    }
                    flashCount--
                },100);
                document.cookie = "username=" + username + "; expires=" + (Date.now + 15000) + " UTC";
                setTimeout(function(){
                    selectMap();
                },900);
            }
        });
    } else {
        // Refresh cookie expiry date and load next screen
        username = getCookie('username');
        document.cookie = "username=" + username + "; expires=" + (Date.now + 15000) + " UTC";
        setTimeout(function(){
            selectMap();
        },900);
    }
});

// Each time a letter is typed into 'create account' form...
$('#accountOverlay > .formWrapper input').keyup(function(){
    // Check validity
    if ($(this).val().length < 2) {
        $(this).css({'box-shadow':'none'});
    } else {
        // If valid, make border green
        $(this).css({'box-shadow':'0 0 6px RGB(48,130,48)'});
    }
});

// Initialize 'select map' screen...
function selectMap() {
    // Hide title, reset inner HTML of select map screen
    $('#loadingText').hide();
    $('#accountOverlay').hide();
    $('#title').hide();
    $('#selectMap').html("");
//    $.ajax({
//        url: "ajax/servegamedata.php",
//        data: {},
//        type: 'POST',
//        success: function(data){
//            
//            if (JSON.parse(data).length == 0) {
//                $('#selectMap').text('No maps could be loaded from the server. Please try again later.')
//            } else {
//                JSON.parse(data).forEach(function(currentVar) {
//                    $('#selectMap').append('<a data-map-id="'+currentVar.MAPCODE +'" onclick="mapSelected(this);"><img alt="'+ currentVar.MAPNAME +'" src="maps/'+ currentVar.MAPCODE +'.jpg"><div class="text"><p class="title">'+ currentVar.MAPNAME +'</p><p class="description">'+ currentVar.MAPDESC +'</p></div></div>');
//                });
//                console.warn(data);
//            }
//            $('#selectMap').fadeIn(500);
//        },
//        error: function(xhr,status){
//            console.error("AJAX error! Contact website adminstrator or check network connection.");
//            $('#selectMap').text('The request to the server enountered an error. Check your internet connection, or try again later.');
//        }
//    });
    
    
    //TEMP----------
    // For each value in variable 'tempmapdata'...
    for (var key in tempMapdata) {
        if (tempMapdata.hasOwnProperty(key)) {
            // Append HTML element with map's corresponding data
            $('#selectMap').append('<a data-map-id="'+tempMapdata[key].MAPCODE +'" onclick="mapSelected(this);"><img alt="'+ tempMapdata[key].MAPNAME +'" src="maps/'+ tempMapdata[key].MAPCODE +'.jpg"><div class="text"><p class="title">'+ tempMapdata[key].MAPNAME +'</p><p class="description">'+ tempMapdata[key].MAPDESC +'</p></div></div>');
        }
    }
    // Fade in select map screen
    $('#selectMap').fadeIn(500);
    //--------------
}

// When a map has been selected..
function mapSelected(sender) {
    // Save current map to variable
    currentMap = $(sender).attr('data-map-id');
//    $.ajax({ //Make AJAX request for a list of map levels
//        url: "ajax/servegamedata.php",
//        data: {'map' : 'arwhrlel'/*currentMap*/},
//        method: 'POST',
//        dataType: 'json',
//        success: function(data){
//            console.warn(JSON.stringify(data));
//            mapLevels = data;
//            initGame();
//        },
//        error: function(xhr,status){
//            console.error("AJAX error! Contact website adminstrator or check network connection.");
//            $('#selectMap').text('The request to the server enountered an error. Check your internet connection, or try again later.');
//        }
//    });
    
    //TEMP------
        // Parse mapdata variable and initialize game
        mapLevels = tempMapdata;
        initGame();
    
    //----------
    
    $(sender).css({ //As soon as AJAX request is sent, begin the loading sequence.
        'transform':'scale(8)',
        opacity:'0'
    });
    setTimeout(function(){
        $('#bgVideo').hide();
        $('#selectMap').hide();
    },530);
}

// When the mute button is clicked...
$('#muteButton').click(function(){
    // If the sound is not allready muted...
    if (muteBtn == false) {
        // Mute sound, update icon
        $(this).addClass('fa-volume-off');
        $(this).removeClass('fa-volume-up');
        $(this).css({'margin-right':'18px;'});
        muteMenu(true);
    } else {
        // Unmute sound, update icon
        $(this).removeClass('fa-volume-off');
        $(this).addClass('fa-volume-up');
        $(this).css({'margin-right':'14px;'});
        muteMenu(false);
    }
});

// When nav help button is clicked...
$("#navigation .help").click(function(){
    // Display 'help' alert
    alert("In order to start the game, hover over the title and click. It'll prompt you for a username if you haven't made one allready-- choose something longer than two characters.\n\nSelect a level, and then you will load into the map. Take a look around, survey the area, and decide if it's safe or unsafe to cross at that location. Consider things like cars, enviroment, conditions, etc. Once you've decided or if you're unsure, click the corrorsponding button at the bottom. Once you've read an explination for the location, click next, repeat, and have fun!");
});

// Controls the muting of all sounds...
function muteMenu(mute) {
    if (mute == true) {
        BGlake.volume = 0
        BGcity.volume = 0
        glitchSFX.volume = 0
    } else {
        BGlake.volume = 0.1
        BGcity.volume = 0.5
        glitchSFX.volume = 1
    }
    muteBtn = !muteBtn;
}

// Compressed function to find/read a specified cookie. If no cookie is found, return empty string...
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

//JS Throttle function from [Underscore.js]: Limits the amount of times a function can be called in a certain time period
function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };