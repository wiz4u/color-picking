/* global Parse, FB */
(function (CP) {
    'use strict';

    var ScoreBoardView = function (element) {
        this.$element = $(element);
        this.$score = this.$element.find('.score-board-score');
        this.$login = this.$element.find('.btn-login');
        this.$history = this.$element.find('.btn-history');

        this._onLogin = this.onLogin.bind(this);
        this._onHistory = this.onHistory.bind(this);

        this.user = Parse.User.current();
        this.score = 0;
    };

    ScoreBoardView.prototype.initialize = function () {
        this.$login.on('click', this._onLogin);
        this.$history.on('click', this._onHistory);
        return this;
    };

    ScoreBoardView.prototype.finalize = function () {
        this.$login.off('click', this._onLogin);
        this.$history.off('click', this._onHistory);
        return this;
    };

    ScoreBoardView.prototype.saveScore = function () {
        var scoreModel = new CP.Score();
        scoreModel.set('score', this.score);
        scoreModel.set('user', this.user);
        scoreModel.save();
    };

    ScoreBoardView.prototype.show = function (score) {
        this.score = score;

        if (this.user) {
            this.$login.hide();
            this.$history.show();
            this.saveScore();
        } else {
            this.$login.show();
            this.$history.hide();
        }
        this.$score.text(score);
        this.$element.addClass('show');
    };

    ScoreBoardView.prototype.onLogin = function () {
        var updateView = function () {
            this.user = Parse.User.current();
            this.show(this.score);
        };

        if (this.user && this.user.get('facebookId')) {
            window.alert('[Debug] already logged in');
            updateView();
        } else {
            Parse.FacebookUtils.logIn('public_profile,user_friends', {
                success: function(user) {
                    if (!user.existed()) {
                        FB.api('/me', function (response) {
                            if (!response.error) {
                                user.set('displayName', response.name);
                                user.set('facebookId', response.id);
                                user.save();
                            }
                        });
                        window.alert('[Debug] User signed up and logged in through Facebook!');
                    } else {
                        window.alert('[Debug] User logged in through Facebook!');
                    }
                    updateView();
                },
                error: function(/*user, error*/) {
                    console.log('[Debug] User cancelled the Facebook login or did not fully authorize.');
                }
            });
        }
    };

    ScoreBoardView.prototype.onHistory = function () {
        // fetch
        var query = new Parse.Query(CP.Score);
        query.equalTo('user', this.user);
        query.find({
            success: function (result) {
                window.alert('found ' + result.length + ' scores');
                console.log(result);
            },
            error: function () {
                console.log('error');
            }
        });

        // show
        this.$element.removeClass('show').addClass('next');
    };


    // Export
    CP.ScoreBoardView = ScoreBoardView;

})(window.CP = window.CP || {});
