(function (CP) {
    'use strict';

    var Game = function () {
        this.color = getRandomColor({s: {min: 128}, v: {min: 128}});
        this.startTime = null;
        this.endTime = null;
    };

    var getRandomColor = function (option) {
        var minH = (option && option.h && option.h.min) ? option.h.min : 0;
        var maxH = (option && option.h && option.h.max) ? option.h.max : 360;
        var minS = (option && option.s && option.s.min) ? option.s.min : 0;
        var maxS = (option && option.s && option.s.max) ? option.s.max : 256;
        var minV = (option && option.v && option.v.min) ? option.v.min : 0;
        var maxV = (option && option.v && option.v.max) ? option.v.max : 256;

        var h = Math.floor(Math.random() * (maxH - minH) + minH);
        var s = Math.floor(Math.random() * (maxS - minS) + minS);
        var v = Math.floor(Math.random() * (maxV - minV) + minV);

        return CP.ColorUtil.hsv2rgb({h: h, s: s, v: v});
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
