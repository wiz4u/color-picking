(function (CP) {
    'use strict';

    var TimeAttackGame = function (canvas, video) {
        this.gameView = new CP.GameView(canvas, video);

        this.TOTAL_TIME_MS = 1000 * 30; // 30 [min]
        this.SCORE_THRESH = 85;

        this.endTime = null;
        this.score = 0;

        this.color = null;

    };

    TimeAttackGame.prototype.update = function () {
        this.gameView.update();
    };

    TimeAttackGame.prototype.start = function () {
        // initialize
        this.endTime = null;
        this.score = 0;
        this.setNextColor();

        var self = this;
        this.gameView.start(function () {
            var now = new Date();
            now.setMilliseconds(now.getMilliseconds() + self.TOTAL_TIME_MS);
            self.endTime = now;
        });
    };

    TimeAttackGame.prototype.stop = function () {
        this.endTime = null;
        this.gameView.stop();
    };

    TimeAttackGame.prototype.setNextColor = function () {
        this.color = CP.ColorUtil.getRandomColor({s: {min: 128}, v: {min: 128}});
        this.gameView.setColor(this.color);
    };

    TimeAttackGame.prototype.calcScore = function () {
        var pickingColor = this.gameView.getPickingColor();
        var score = CP.ColorUtil.calcColorDistance(this.color, pickingColor);

        if (score > this.SCORE_THRESH) {
            this.score++;
            this.setNextColor();
        }

        return this.score + ' : ' + score;
    };

    TimeAttackGame.prototype.getTimeMs = function () {
        if (this.endTime === null) {
            return 0;
        } else {
            var remainTime = this.endTime - (new Date());
            if (remainTime <= 0) {
                this.stop();
                remainTime = 0;
            }
            return remainTime;
        }
    };

    // Export
    CP.TimeAttackGame = TimeAttackGame;

})(window.CP = window.CP || {});
