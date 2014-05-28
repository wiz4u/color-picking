(function () {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia;

    var changeCameraElement = document.getElementsByClassName('change-camera');
    var videoElement = document.getElementById('video');
    var videoSourceInfo = [];
    var audioSourceInfo = [];
    var currentVideoSourceInfoId = null;
    var currentAudioSourceInfoId = null;
    var stream = null;

    var gotSources = function (sourceInfos) {
        for (var i = 0; i !== sourceInfos.length; ++i) {
            var sourceInfo = sourceInfos[i];
            if (sourceInfo.kind === 'video') {
                videoSourceInfo.push(sourceInfo.id);
            } else if (sourceInfo.kind === 'audio') {
                audioSourceInfo.push(sourceInfo.id);
            }
        }

        if (videoSourceInfo.length) {
            // In general, rear camera is last one.
            currentVideoSourceInfoId = videoSourceInfo.length - 1;
        }
        if (audioSourceInfo.length) {
            currentAudioSourceInfoId = 0;
        }

        start();
    };

    var changeCamera = function () {
        var numSource = videoSourceInfo.length;
        if (numSource) {
            currentVideoSourceInfoId = (currentVideoSourceInfoId + 1) % numSource;
        }

    console.log(numSource, currentVideoSourceInfoId);

        start();
    };

    var successCallback = function (aStream) {
        stream = aStream;
        videoElement.src = window.URL.createObjectURL(stream);
        videoElement.play();
    };

    var errorCallback = function (error) {
        console.log('navigator.getUserMedia error: ', error);
    };

    var start = function () {
        if (!!stream) {
            videoElement.src = null;
            stream.stop();
        }

        var audioSourceId = audioSourceInfo[currentAudioSourceInfoId];
        var videoSourceId = videoSourceInfo[currentVideoSourceInfoId];
        var constraints = {
            audio: {
                optional: [{sourceId: audioSourceId}]
            },
            video: {
                optional: [{sourceId: videoSourceId}]
            }
        };

        navigator.getUserMedia(constraints, successCallback, errorCallback);
    };

    if (typeof window.MediaStreamTrack === 'undefined'){
        window.alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
    } else {
        window.MediaStreamTrack.getSources(gotSources);
    }

    changeCameraElement[0].onclick = changeCamera;

})();
