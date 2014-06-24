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

    ScoreBoardView.prototype.hide = function () {
        this.$element.removeClass('show next');
    };

    ScoreBoardView.prototype.onLogin = function () {
        var self = this;
        var updateView = function () {
            self.user = Parse.User.current();
            self.show(self.score, self.gameMode);
        };

        if (this.user && this.user.get('facebookId')) {
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
                    }
                    updateView();
                },
                error: function(/*user, error*/) {
                    window.alert('cancelled the Facebook login or did not fully authorize.');
                }
            });
        }
    };

    ScoreBoardView.prototype.onHistory = function () {
        var self = this;

        // show game mode
        this.$element.find('.game-mode').text(this.gameMode);

        var showMyScore = function (scores) {
            var $elements = $('.my-score-list').find('li');
            for (var i = 0, l = scores.length; i < l; i++) {
                $elements.eq(i).find('p').text(scores[i].get('score'));
            }
        };

        var showFriendsScore = function (scores) {
            var $elements = $('.all-score-list').find('li');
            var setImage = function ($img, user) {
                user.fetch({
                    success: function (user) {
                        var imageUrl = CP.FbUtil.getUserPictureUrl(user.get('facebookId'), 50, 50);
                        $img.attr({src: imageUrl});
                    }
                });
            };

            for (var i = 0, l = scores.length; i < l; i++) {
                var score = scores[i];
                $elements.eq(i).find('p').text(score.get('score'));

                var $img = $elements.eq(i).find('img');
                setImage($img, score.get('user'));
            }

            // show
            self.$element.removeClass('show').addClass('next');
        };

        // fetch my score
        var query = new Parse.Query(CP.Score);
        query.equalTo('gameMode', this.gameMode);
        query.equalTo('user', this.user);
        query.descending('score');
        query.limit(5);
        query.find({
            success: function (result) {
                console.log('found ' + result.length + ' scores');
                showMyScore(result);
            },
            error: function () {
                showMyScore([]);
            }
        });

        // fetch friends score
        var friendIds = [this.user.get('facebookId')];
        CP.FbUtil.getFriends(function (friends) {
            for (var i = 0, l = friends.length; i < l; i++) {
                friendIds.push(friends[i].id);
            }

            var userQuery = new Parse.Query(Parse.User);
            userQuery.containedIn('facebookId', friendIds);
            var scoreQuery = new Parse.Query(CP.Score);
            scoreQuery.equalTo('gameMode', self.gameMode);
            scoreQuery.matchesQuery('user', userQuery);
            scoreQuery.descending('score');
            scoreQuery.limit(5);
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
