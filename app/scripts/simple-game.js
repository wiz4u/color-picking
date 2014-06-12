(function (CP) {
    'use strict';

    var SimpleGame = function () {
        this.color = CP.ColorUtil.getRandomColor({s: {min: 128}, v: {min: 128}});
        this.startTime = null;
        this.endTime = null;
    };

    SimpleGame.prototype.getColor = function () {
        return this.color;
    };

    SimpleGame.prototype.start = function () {
        this.startTime = new Date();
    };

    SimpleGame.prototype.stop = function () {
        this.endTime = new Date();
    };

    SimpleGame.prototype.calcScore = function (pickingColor) {
        return CP.ColorUtil.calcColorDistance(this.color, pickingColor);
    };

    SimpleGame.prototype.getElapsedTimeMs = function () {
        var now = new Date();
        var startTime = this.startTime !== null ? this.startTime : now;
        var endTime = this.endTime !== null ? this.endTime : now;
        return endTime - startTime;
    };

    // Export
    CP.SimpleGame = SimpleGame;

})(window.CP = window.CP || {});
