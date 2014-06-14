(function (CP) {
    'use strict';

    var SimpleGame = function (canvas, video) {
        this.gameView = new CP.GameView(canvas, video);

        this.color = null;
        this.startTime = null;
        this.endTime = null;

        this._onClickMainButton = this.onClickMainButton.bind(this);
    };

    SimpleGame.prototype.initialize = function () {
        // set up dom event
        var $mainButton = $('.main-button');
        $mainButton.on('click', this._onClickMainButton);
    };

    SimpleGame.prototype.finalize = function () {
        // tear down dom event
        var $mainButton = $('.main-button');
        $mainButton.off('click', this._onClickMainButton);

        // reset view
        $mainButton.removeClass('pick');
        $mainButton.addClass('start-game');

        // reset
        this.stop();
        this.color = null;
        this.startTime = null;
        this.endTime = null;
    };

    SimpleGame.prototype.update = function () {
        this.gameView.update();
    };

    SimpleGame.prototype.start = function () {
        // initialize
        this.startTime = null;
        this.endTime = null;
        this.color = CP.ColorUtil.getRandomColor({s: {min: 128}, v: {min: 128}});

        var self = this;
        this.gameView.setColor(this.color);
        this.gameView.start(function () {
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

    SimpleGame.prototype.onClickMainButton = function () {
        var $mainButton = $('.main-button');
        if ($mainButton.hasClass('start-game')) { // start game
            $mainButton.removeClass('start-game');
            $mainButton.addClass('pick');
            this.start();
        } else { // pick
            $mainButton.addClass('start-game');
            $mainButton.removeClass('pick');
            this.stop();
        }
    };

    // Export
    CP.SimpleGame = SimpleGame;

})(window.CP = window.CP || {});
