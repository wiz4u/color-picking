(function (CP) {
    'use strict';

    var Game = function () {
        this.color = getRandomColor();
        this.startTime = null;
        this.endTime = null;
    };

    var getRandomColor = function () {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return {r: r, g: g, b: b};
    };

    Game.prototype.getColor = function () {
        return this.color;
    };

    Game.prototype.start = function () {
        this.startTime = new Date();
    };

    Game.prototype.pick = function () {
        this.endTime = new Date();
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
