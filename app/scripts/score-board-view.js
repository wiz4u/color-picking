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
        this.gameMode = null;
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
        scoreModel.set('gameMode', this.gameMode);
        scoreModel.set('user', this.user);
        scoreModel.save();
    };

    ScoreBoardView.prototype.show = function (score, gameMode) {
        this.score = score;
        this.gameMode = gameMode;

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
        var self = this;
        var updateView = function () {
            self.user = Parse.User.current();
            self.show(self.score);
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
        var showMyScore = function () {

        };

        var showFriendsScore = function () {
            // show
            this.$element.removeClass('show').addClass('next');
        };

        // fetch my score
        var query = new Parse.Query(CP.Score);
        query.equalTo('gameMode', this.gameMode);
        query.equalTo('user', this.user);
        query.descending('score');
        query.find({
            success: function (result) {
                console.log('found ' + result.length + ' scores');
                showMyScore();
            },
            error: function () {
                showMyScore();
            }
        });

        // fetch friends score
        var self = this;
        var friendIds = [this.user.get('facebookId')];
        CP.FbUtil.getFriends(function (friends) {
            for (var i = 0, l = friends.length; i < l; i++) {
                var facebookId = friends[i].get('facebookId');
                if (facebookId) {
                    friendIds.push();
                }
            }

            var userQuery = new Parse.Query(Parse.User);
            userQuery.containedIn('facebookId', friendIds);
            var scoreQuery = new Parse.Query(CP.Score);
            scoreQuery.equalTo('gameMode', self.gameMode);
            scoreQuery.matchesQuery('user', userQuery);
            scoreQuery.descending('score');
            scoreQuery.limit(10);
            scoreQuery.find({
                success: function (result) {
                    showFriendsScore(result);
                },
                error: function () {
                    console.log('error');
                    showFriendsScore([]);
                }
            });
        }, function () {
            console.log('cannot get friends');
            showFriendsScore([]);
        });
    };


    // Export
    CP.ScoreBoardView = ScoreBoardView;

})(window.CP = window.CP || {});
