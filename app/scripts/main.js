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

    // change camera button
    $('.change-camera').on('click', function() {
        camera.changeCamera();
    });

    // start game button
    $('.start-game').on('click', function () {
        $('#score').text('Score : ');

        game = new window.CP.Game();
        gameView.start(game);
    });

    // pick button
    $('.pick').on('click', function () {
        gameView.stop();
        game.stop();
        showScore();
    });

})();
