(function (CP) {
    'use strict';

    var TimeAttackGame = function (canvas, video, scoreBoardView) {
        this.gameView = new CP.GameView(canvas, video);
        this.scoreBoardView = scoreBoardView;

        this.TOTAL_TIME_MS = 1000 * 30; // 30 [min]
        this.SCORE_THRESH = 85;

        this.endTime = null;
        this.score = 0;

        this.color = null;

        this.$mainButton = null;
        this._onClickMainButton = this.onClickMainButton.bind(this);
    };

    TimeAttackGame.prototype.initialize = function () {
        // set up dom event
        this.$mainButton = $('.main-button');
        this.$mainButton.on('click', this._onClickMainButton);
    };

    TimeAttackGame.prototype.finalize = function () {
        // tear down dom event
        this.$mainButton.off('click', this._onClickMainButton);

        // reset view
        this.$mainButton.addClass('start-game');
        this.$mainButton.removeClass('restart-game');

        // reset
        this.stop();
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
        this.$mainButton.addClass('disable');

        var self = this;
        this.gameView.start(function () {
            self.$mainButton.removeClass('disable');
            self.$mainButton.removeClass('start-game');
            self.$mainButton.addClass('restart-game');

            var now = new Date();
            now.setMilliseconds(now.getMilliseconds() + self.TOTAL_TIME_MS);
            self.endTime = now;
        });
    };

    TimeAttackGame.prototype.stop = function () {
        this.$mainButton.addClass('start-game');
        this.$mainButton.removeClass('restart-game');
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

        return this.score;
    };

    TimeAttackGame.prototype.getTimeMs = function () {
        if (this.endTime === null) {
            return 0;
        } else {
            var remainTime = this.endTime - (new Date());
            if (remainTime <= 0) {
                this.stop();
                this.scoreBoardView.show(this.calcScore());
                remainTime = 0;
            }
            return remainTime;
        }
    };

    TimeAttackGame.prototype.onClickMainButton = function () {
        if (this.$mainButton.hasClass('start-game')) { // start game
            this.start();
        } else { // restart
            this.stop();
            this.start();
        }
    };

    // Export
    CP.TimeAttackGame = TimeAttackGame;

})(window.CP = window.CP || {});
