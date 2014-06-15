(function (CP) {
    'use strict';

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
