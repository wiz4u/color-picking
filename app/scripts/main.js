/* global Parse */

(function (CP) {
    'use strict';

    // Firefox OS
    if (navigator.mozApps) {
        var reqSelf = navigator.mozApps.getSelf();
        reqSelf.onsuccess = function () {
            if (!reqSelf.result) { // not installed
                var baseUrl = location.href;
                var manifestUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/')) + '/manifest.webapp';
                var reqInstall = navigator.mozApps.install(manifestUrl);
                reqInstall.onsuccess = function () {
                    window.alert('success to install');
                };
                reqInstall.onerror = function () {
                    window.alert('failed to install: ' + this.error.message);
                };
            }
        };
        reqSelf.onerror = function () {
            window.alert('an error occured while checking install status:' + this.error.message);
        };
    }

    var setUpFb = function () {
        window.fbAsyncInit = function() {
            Parse.FacebookUtils.init({
                appId      : CP.Config.facebook.appId,
                status     : true,
                cookie     : true,
                xfbml      : true
            });
        };
    };

    var setUpParse = function () {
        Parse.initialize(CP.Config.parse.appKey, CP.Config.parse.jsKey);
    };

    setUpFb();
    setUpParse();

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
        camera.initialize(function () {
            if (camera.getNumCameras() < 2) {
                $('.change-camera').hide();
            }
        }, function () {
            if (game) {
                game.stop();
            }
        });
    });

    // score board
    var scoreBoardView = new CP.ScoreBoardView(document.getElementById('score_board')).initialize();

    // feedback
    new CP.FeedbackView().initialize().render();

    // game
    var game = null;
    var gameSimple = new CP.SimpleGame(
        document.getElementById('game_view'),
        camera.getElement(),
        scoreBoardView
    );

    var gameTA = new CP.TimeAttackGame(
        camera,
        document.getElementById('game_view'),
        scoreBoardView
    );

    setGame(gameTA);

    // button behavior
    var $changeCamera = $('.change-camera');
    var $logout = $('.logout');

    // change camera button
    $changeCamera.on('click', function() {
        camera.changeCamera();
    });

    // logout
    $logout.on('click', function () {
        Parse.User.logOut();
    });

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
