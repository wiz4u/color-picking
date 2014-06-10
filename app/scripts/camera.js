(function (CP) {
    'use strict';

    var Camera = function (element, callback) {
        this.element = element || document.createElement('video');
        this.element.setAttribute('muted', 'true');
        this.element.setAttribute('autoplay', 'true');

        this.stream = null;

        this.videoSourceInfo = [];
        this.audioSourceInfo = [];
        this.currentVideoSourceInfoIndex = 0;
        this.currentAudioSourceInfoIndex = 0;

        var self = this;
        var _callback = callback || function () {};
        var _gotSources = function (sourceInfos) {
            for (var i = 0, l = sourceInfos.length; i < l; ++i) {
                var sourceInfo = sourceInfos[i];
                if (sourceInfo.kind === 'video') {
                    self.videoSourceInfo.push(sourceInfo.id);
                } else if (sourceInfo.kind === 'audio') {
                    self.audioSourceInfo.push(sourceInfo.id);
                }
            }

            if (self.videoSourceInfo.length) {
                // In general, rear camera is last one.
                self.currentVideoSourceInfoIndex = self.videoSourceInfo.length - 1;
            }
            if (self.audioSourceInfo.length) {
                self.currentAudioSourceInfoIndex = 0;
            }

            _callback();
        };

        if (typeof window.MediaStreamTrack !== 'undefined' &&
            typeof window.MediaStreamTrack.getSources !== 'undefined') {
            window.MediaStreamTrack.getSources(_gotSources);
        } else {
            setTimeout(_callback, 0);
        }
    };

    Camera.prototype.initialize = function (successCallback, errorCallback) {
        // stop stream
        if (!!this.stream) {
            this.element.src = null;
            this.stream.stop();
        }

        // build callback functions
        var self = this;
        var _successCallback = function (stream) {
            self.stream = stream;
            self.element.src = window.URL.createObjectURL(stream);
            self.element.play();

            if (successCallback) {
                successCallback();
            }
        };

        var _errorCallback = function (error) {
            console.log('navigator.getUserMedia error:', error);

            if (errorCallback) {
                errorCallback();
            }
        };

        // build constraints object
        var constraints = null;
        if (this.videoSourceInfo.length) {
            var videoSourceId = this.videoSourceInfo[this.currentVideoSourceInfoIndex];
            var audioSourceId = this.audioSourceInfo[this.currentAudioSourceInfoIndex];
            constraints = {
                video: {
                    optional: [{sourceId: videoSourceId}]
                },
                audio: {
                    optional: [{sourceId: audioSourceId}]
                }
            };
        } else {
            constraints = {
                video: true,
                audio: true
            };
        }

        // get camera stream
        navigator.getUserMedia(constraints, _successCallback, _errorCallback);
    };

    Camera.prototype.getNumCameras = function () {
        return this.videoSourceInfo.length !== 0 ? this.videoSourceInfo.length : 1;
    };

    Camera.prototype.changeCamera = function () {
        var numCamera = this.videoSourceInfo.length;
        if (numCamera && numCamera > 1) {
            var index = this.currentVideoSourceInfoIndex;
            this.currentVideoSourceInfoIndex = (index + 1) % numCamera;

            this.initialize();
        }
    };

    Camera.prototype.getElement = function () {
        return this.element;
    };

    // Export
    CP.Camera = Camera;

})(window.CP = window.CP || {});
