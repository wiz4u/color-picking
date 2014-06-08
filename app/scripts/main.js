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

    // change camera button
    $('.change-camera').on('click', function() {
        camera.changeCamera();
    });

    // start game button
    $('.start-game').on('click', function () {
        var game = new window.CP.Game();
        gameView.start(game);
    });

})();
