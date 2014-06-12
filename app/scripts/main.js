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

    // game view
    var gameView = new CP.GameView(
        document.getElementById('game_view'),
        camera.getElement(),
        function () { // update
            showTime();
            showScore();
        });

    // game
    var game = new CP.SimpleGame(gameView);

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

            game.start();
        } else { // pick
            $mainButton.addClass('start-game');
            $mainButton.removeClass('pick');

            game.stop();
            showScore();
        }
    });

})(window.CP);
