(function () {
    'use strict';

    // camera
    var videoElement = document.getElementById('video');
    var camera = new window.CP.Camera(videoElement, function () {
        camera.initialize();
    });

    // change camera button
    var changeCameraElement = document.getElementsByClassName('change-camera');
    changeCameraElement[0].onclick = function () {
        camera.changeCamera();
    };

})();
