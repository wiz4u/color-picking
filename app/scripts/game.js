(function (CP) {
    'use strict';

    var Game = function () {
        this.color = CP.ColorUtil.getRandomColor({s: {min: 128}, v: {min: 128}});
        this.startTime = null;
        this.endTime = null;
    };

    Game.prototype.getColor = function () {
        return this.color;
    };

    Game.prototype.start = function () {
        this.startTime = new Date();
    };

    Game.prototype.stop = function () {
        this.endTime = new Date();
    };

    Game.prototype.calcScore = function (pickingColor) {
        return CP.ColorUtil.calcColorDistance(this.color, pickingColor);
    };

    Game.prototype.getElapsedTimeMs = function () {
        var now = new Date();
        var startTime = this.startTime !== null ? this.startTime : now;
        var endTime = this.endTime !== null ? this.endTime : now;
        return endTime - startTime;
    };

    // Export
    CP.Game = Game;

})(window.CP = window.CP || {});
