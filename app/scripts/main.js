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

    // camera
    var camera = new CP.Camera(null, function () {
        camera.initialize();
        if (camera.getNumCameras() === 1) {
            $('.change-camera').hide();
        }
    });

    // game
    var gameType = 'time-attack';
    var gameSimple = new CP.SimpleGame(
        document.getElementById('game_view'),
        camera.getElement()
    );

    var gameTA = new CP.TimeAttackGame(
        document.getElementById('game_view'),
        camera.getElement()
    );

    var game = gameSimple;

    // button behavior
    var $changeCamera = $('.change-camera');
    var $mainButton = $('.main-button');
    var $switchSimpleMode = $('.switch-simple-mode');
    var $switchTAMode = $('.switch-ta-mode');

    // change camera button
    $changeCamera.on('click', function() {
        camera.changeCamera();
    });

    // change game mode
    $switchSimpleMode.on('click', function () {
        $mainButton.addClass('start-game');
        $mainButton.removeClass('pick');
        game.stop();
        game = gameSimple;
    });

    $switchTAMode.on('click', function () {
        $mainButton.addClass('start-game');
        $mainButton.removeClass('pick');
        game.stop();
        game = gameTA;
    });

    // main button
    $mainButton.on('click', function () {
        if ($mainButton.hasClass('start-game')) { // start game
            $mainButton.removeClass('start-game');
            $mainButton.addClass('pick');

            $('#score').text('Score : ');

            game.start();
        } else { // pick
            $mainButton.addClass('start-game');
            $mainButton.removeClass('pick');

            game.stop();
            showScore();
        }
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
