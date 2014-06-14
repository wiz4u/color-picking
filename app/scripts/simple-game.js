(function (CP) {
    'use strict';

    var SimpleGame = function (gameView) {
        this.gameView = gameView;
        this.color = null;
        this.startTime = null;
        this.endTime = null;
    };

    SimpleGame.prototype.start = function () {
        // initialize
        this.startTime = null;
        this.endTime = null;
        this.color = CP.ColorUtil.getRandomColor({s: {min: 128}, v: {min: 128}});

        var self = this;
        this.gameView.start(this.color, function () {
            self.startTime = new Date();
        });
    };

    SimpleGame.prototype.stop = function () {
        this.endTime = new Date();
        this.gameView.stop();
    };

    SimpleGame.prototype.calcScore = function () {
        var pickingColor = this.gameView.getPickingColor();
        return CP.ColorUtil.calcColorDistance(this.color, pickingColor);

    };

    // return elapsed time [ms]
    SimpleGame.prototype.getTimeMs = function () {
        var now = new Date();
        var startTime = this.startTime !== null ? this.startTime : now;
        var endTime = this.endTime !== null ? this.endTime : now;
        return endTime - startTime;
    };

    // Export
    CP.SimpleGame = SimpleGame;

})(window.CP = window.CP || {});
