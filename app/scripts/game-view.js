(function (CP) {
    'use strict';

    var GameView = function (canvas, video) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.video = video;

        this.maskCanvas = document.createElement('canvas');
        this.maskCtx = this.maskCanvas.getContext('2d');

        this.showColor = false;
        this.colorRadius = 0;
        this.color = 'rgba(0, 0, 0, 0)';

        this.layout();
        this.update();
    };

    // TODO : call this when window is resized
    GameView.prototype.layout = function () {
        var size = $(this.canvas).width();
        this.canvas.width = size;
        this.canvas.height = size;
        this.maskCanvas.width = size;
        this.maskCanvas.height = size;
    };

    GameView.prototype.update = function () {
        var ctx = this.ctx;

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
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(cS / 2, cS / 2, cS / 3, 0, Math.PI * 2);
            ctx.rect(cS, 0, -1 * cS, cS);
            ctx.fill();
        }

        // call next frame
        this.requestId = window.requestAnimationFrame(this.update.bind(this));
    };

    var getRandomColor = function () {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return 'rgba(' + r + ', ' +  g + ', ' + b + ', 1)';
    };

    GameView.prototype.start = function () {
        // start count down
        $('.count-pane-wrapper').addClass('active');
        setTimeout(function () {
            $('.count-pane-wrapper').removeClass('active');
        }, 2000);

        // choose color
        this.color = getRandomColor();
        this.showColor = true;

        //
    };

    // Export
    CP.GameView = GameView;

})(window.CP = window.CP || {});
