<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="description" content="">
        <meta name="author" content="Ollie Roozen">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>JAYWALKER</title>
        <meta property="og:site_name" content="JAYWALKER">
        <meta property="og:description" content="">
        <meta property="og:title" content="JAYWALKER">
        <meta property="og:type" content="website">
        <meta property="og:url" content="">
        <meta property="og:image" content="">
        <meta property="og:image:width" content="300">
        <meta property="og:image:height" content="300">
        <link rel="stylesheet" type="text/css" href="mainstyle.css?v=<?php echo mt_rand(0,1000)?>">
        <link rel="stylesheet" type="text/css" href="libraries/font-awesome-4.6.3/css/font-awesome.min.css">
        <script src="libraries/jquery-3.0.0.min.js" type="text/javascript"></script>
        <script src="libraries/typed.min.js" type="text/javascript" defer></script>
        <script src="menu.js?v=<?php echo mt_rand(0,1000)?>" type="text/javascript" defer></script>
        <script src="game.js?v=<?php echo mt_rand(0,1000)?>" type="text/javascript" defer></script>
        <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvvmPGE775sxXoxt-VtAEQasBEYHkQ-LU&callback=generateGMap" type="text/javascript"></script>
	</head>
	<body>
		<div id="wrapper">
            <div id="bodyWrapper">
                <video loop muted autoplay id="bgVideo" style="display:none;">
                    <source src="media/bgVid2-4.mp4" type="video/mp4">
                </video>
                <audio id="ambientSound" loop>
                    <source src="media/ambienceV2-2.mp3" type="audio/mpeg">
                </audio>
                <audio id="glitch_sfx">
                    <source src="media/glitcheffect.mp3" type="audio/mpeg">
                </audio>
                <div id="contentWrapper">
                    <nav id="navigation">
                        <a href="">thememeldex</a>
                        <a class="help">help</a>
                        <?php if(isset($_COOKIE['username'])) {echo("<a>".$_COOKIE['username']."</a>");} ?>
                    </nav>
                    <div id="content">
                        <div id="loadingText" class="centered"><p></p><br><p></p></div>
                        <div id="accountOverlay">
                            <div class="formWrapper">
                                <form id="createAccountForm" class="centered">
                                    <input id="usernameInput" name="username" spellcheck="false" autocomplete="off" maxlength="32" placeholder='How will your friends know you?' type="text"><br>
                                </form>
                                <div class="background"></div>
                            </div>
                        </div>
                        <a id="title" class="centered" style="display:none;">
                            <div class="main" style="display:none;"><span>J</span><span>A</span><span>Y</span><span>W</span><span>A</span><span>L</span><span>K</span><span>E</span><span>R</span></div><br>
                            <div class="sub error" style="display:none;">A Road Safety Game</div>
                        </a>
                        <div id="hoverReminder">Hover over title to play</div>
                        <div id="selectMap"></div>
                        <div id="map" style="height:100vh; width:100vw;"></div>
                        <div id="muteButton" class="fa fa-volume-up" aria-hidden="true"></div>
                        <div id="gameOverlay">
                            <div id="answerBox">
                                <a class="true">Safe</a>
                                <a class="unsure">Unsure</a>
                                <a class="false">Unsafe</a>
                            </div>
                            <div class="background"></div>
                            <div class="response"></div>
                            <div class="backgroundInverted"></div>
                            <a class="nextLoc">Next</a>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</body>
</html>
