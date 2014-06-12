(function () {
    'use strict';

    var showTime = function () {
        if (game) {
            var time = game.getElapsedTimeMs() / 1000;
            $('#elapsed_time').text(time.toFixed(2));
        }
    };

    var showScore = function () {
        if (game) {
            var color = gameView.getPickingColor();
            var score = game.calcScore(color);
            $('#score').text('Score : ' + score);
        }
    };

    // camera
    var camera = new window.CP.Camera(null, function () {
        camera.initialize();
        if (camera.getNumCameras() === 1) {
            $('.change-camera').hide();
        }
    });

    // game
    var game = null;

    // game view
    var gameView = new window.CP.GameView(
        document.getElementById('game_view'),
        camera.getElement(),
        function () { // update
            showTime();
            showScore();
        });

    // button behavior
    var $changeCamera = $('.change-camera');
    var $mainButton = $('.main-button');

    // change camera button
    $changeCamera.on('click', function() {
        camera.changeCamera();
    });

    // main button
    $mainButton.on('click', function () {
        if ($mainButton.hasClass('start-game')) { // start game
            $mainButton.removeClass('start-game');
            $mainButton.addClass('pick');

            $('#score').text('Score : ');

            game = new window.CP.SimpleGame();
            gameView.start(game);
        } else { // pick
            $mainButton.addClass('start-game');
            $mainButton.removeClass('pick');

            gameView.stop();
            game.stop();
            showScore();
        }
    });

})();
