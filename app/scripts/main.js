(function () {
    'use strict';

    // camera
    var camera = new window.CP.Camera(null, function () {
        camera.initialize();
    });

    // game view
    var gameView = new window.CP.GameView(
        document.getElementById('game_view'),
        camera.getElement());

    // game
    var game = null;

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
        var color = gameView.getPickingColor();
        var score = game.calcScore(color);

        $('#score').text('Score : ' + score);
    });

})();
