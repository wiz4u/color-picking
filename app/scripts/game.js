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

    Game.prototype.stop = function () {
        this.endTime = new Date();
    };

    Game.prototype.calcScore = function (pickingColor) {
        // complare this.color vs pickingColor
        var colorHsv = CP.ColorUtil.rgb2hsv(this.color);
        var pickingColorHsv = CP.ColorUtil.rgb2hsv(pickingColor);

        var diffH = Math.abs(colorHsv.h - pickingColorHsv.h);
        diffH = diffH < 180 ? diffH : 360 - diffH;
        var scoreH = 1 - diffH / 180;

        var scoreS = 1 - Math.abs(colorHsv.s - pickingColorHsv.s) / 255;

        var weightH = 0.7;
        var weightS = 0.3;
        var score = weightH * scoreH + weightS * scoreS;

        score = Math.round(score * 100);
        return score;
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
