/* global Parse, FB */

(function (CP) {
    'use strict';

    var setUpFb = function () {
        window.fbAsyncInit = function() {
            Parse.FacebookUtils.init({
                appId      : CP.Config.facebook.appId,
                status     : true,
                xfbml      : true
            });
        };
    };

    var setUpParse = function () {
        Parse.initialize(CP.Config.parse.appKey, CP.Config.parse.jsKey);
    };

    setUpFb();
    setUpParse();

    var login = function (callback) {

        if (Parse.User.current()) {
            window.alert('already logged in');
            callback();
        } else {
            Parse.FacebookUtils.logIn('public_profile,user_friends', {
                success: function(user) {
                    if (!user.existed()) {
                        FB.api('/me', function (response) {
                            if (!response.error) {
                                user.set('displayName', response.name);
                                user.save();
                            }
                        });
                        window.alert('User signed up and logged in through Facebook!');
                    } else {
                        window.alert('User logged in through Facebook!');
                    }
                    callback();
                },
                error: function(/*user, error*/) {
                    console.log('User cancelled the Facebook login or did not fully authorize.');
                }
            });
        }
    };

    var getFriends = function () {
        // Get Frinend List
        FB.api('/me/friends', function(response) {
            if(response.data) {
                window.alert('#friends : ' + response.data.length);
            }
        });
    };

    $('.login').on('click', function () {
        login(function () {
            getFriends();
        });
    });

    var showTime = function () {
        if (game) {
            var time = game.getTimeMs() / 1000;
            $('#elapsed_time').text(time.toFixed(2));
        }
    };

    var showScore = function () {
        if (game) {
            var score = game.calcScore();
            $('#score').text('Score : ' + score);
        }
    };

    var setGame = function (newGame) {
        if (game) {
            game.stop();
            game.finalize();
        }
        newGame.initialize();
        game = newGame;
    };

    // camera
    var camera = new CP.Camera(null, function () {
        camera.initialize();
        if (camera.getNumCameras() === 1) {
            $('.change-camera').hide();
        }
    });

    // game
    var game = null;
    var gameSimple = new CP.SimpleGame(
        document.getElementById('game_view'),
        camera.getElement()
    );

    var gameTA = new CP.TimeAttackGame(
        document.getElementById('game_view'),
        camera.getElement()
    );

    setGame(gameTA);

    // button behavior
    var $changeCamera = $('.change-camera');
    var $switchSimpleMode = $('.switch-simple-mode');
    var $switchTAMode = $('.switch-ta-mode');

    // change camera button
    $changeCamera.on('click', function() {
        camera.changeCamera();
    });

    // change game mode
    $switchSimpleMode.on('click', setGame.bind(null, gameSimple));
    $switchTAMode.on('click', setGame.bind(null, gameTA));

    // update
    var requestId = null;
    var update = function () {
        game.update();
        showTime();
        showScore();

        // call next frame
        requestId = window.requestAnimationFrame(update);
    };
    update();

})(window.CP);
