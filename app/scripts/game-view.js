(function (CP) {
    'use strict';

    var GameView = function (canvas, video, updateCallback) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.video = video;

        this.showColor = false;
        this.updatePickingColor = false;
        this.color = {r: 0, g: 0, b: 0};
        this.colorString = CP.ColorUtil.buildColorString(this.color);
        this.pickingColor = {r: 0, g: 0, b: 0};

        this.game = null;

        this.updateCallback = updateCallback || function () {};

        this.layout();
        this.update();
    };

    // TODO : call this when window is resized
    GameView.prototype.layout = function () {
        var size = $(this.canvas).width();
        this.canvas.width = size;
        this.canvas.height = size;
    };


    var getCenterColor = function (ctx, centerX, centerY, radius) {
        var len = radius * 2;
        var area = len * len;
        var imageData = ctx.getImageData(centerX - radius, centerY - radius, len, len);
        var numSample = area > 100 ? 100 : area;
        var numStep = Math.floor(area / numSample);
        var r = 0, g = 0, b = 0, j = 0;
        for (var i = 0, l = len * len; i < l; i += numStep) {
            r += imageData.data[4 * i + 0];
            g += imageData.data[4 * i + 1];
            b += imageData.data[4 * i + 2];
            j++;
        }

        // normalize
        r = Math.floor(r / j);
        g = Math.floor(g / j);
        b = Math.floor(b / j);

        return {r: r, g: g, b: b};
    };

    GameView.prototype.update = function () {
        var ctx = this.ctx;
        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;

        // crop camera center
        var cS = this.canvas.width;
        var vW = this.video.videoWidth;
        var vH = this.video.videoHeight;
        var vS = Math.min(vW, vH);
        this.ctx.drawImage(this.video,
                           (vW - vS) / 2, (vH - vS) / 2, vS, vS,
                           0, 0, cS, cS);

        // show color : fill outside of circle
        if (this.showColor) {
            ctx.fillStyle = this.colorString;
            ctx.beginPath();
            ctx.arc(centerX, centerY, cS / 3, 0, Math.PI * 2);
            ctx.rect(cS, 0, -1 * cS, cS);
            ctx.fill();
        }

        // show color : center
        if (this.showColor) {
            var radius = cS / 15;

            if (this.updatePickingColor) {
                this.pickingColor = getCenterColor(ctx, centerX, centerY, radius);
            }

            ctx.fillStyle = CP.ColorUtil.buildColorString(this.pickingColor);
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.lineWidth = 10;
            ctx.strokeStyle = this.colorString;
            ctx.stroke();

            // doughnut style
            /*
            var centerColor = getCenterColor(ctx, centerX, centerY, cS / 20);
            ctx.beginPath();
            ctx.arc(centerX, centerY, cS / 20, 0, Math.PI * 2);
            ctx.lineWidth = cS / 40;
            ctx.strokeStyle = buildColorString(centerColor);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, cS / 20 - cS / 80, 0, Math.PI * 2);
            ctx.lineWidth = 3;
            ctx.strokeStyle = this.color;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, cS / 20 + cS / 80, 0, Math.PI * 2);
            ctx.stroke();
            */
        }

        // callback
        this.updateCallback();

        // call next frame
        this.requestId = window.requestAnimationFrame(this.update.bind(this));
    };

    GameView.prototype.start = function (game) {
        this.game = game;

        // count-down end callback
        var _countdownEnd = function () {
            $('.count-pane-wrapper').removeClass('active');
            game.start();
        };

        // start count down
        $('.count-pane-wrapper').addClass('active');
        // TODO : use animationEnd event with browser prefix
        setTimeout(_countdownEnd, 1500);

        // choose color
        this.color = game.getColor();
        this.colorString = CP.ColorUtil.buildColorString(this.color);
        this.showColor = true;
        this.updatePickingColor = true;
    };

    GameView.prototype.stop = function () {
        this.updatePickingColor = false;
    };

    GameView.prototype.getPickingColor = function () {
        return this.pickingColor;
    };

    // Export
    CP.GameView = GameView;

})(window.CP = window.CP || {});
