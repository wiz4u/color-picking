/* global Parse, FB */
(function (CP) {
    'use strict';

    var ScoreBoardView = function (element) {
        this.$element = $(element);
        this.$score = this.$element.find('.score-board-score');
        this.$login = this.$element.find('.btn-login');
        this.$history = this.$element.find('.btn-history');

        this.user = Parse.User.current();
    };

    ScoreBoardView.prototype.show = function (score) {
        if (this.user) {
            this.$login.hide();
            this.$history.show();
        } else {
            this.$login.show();
            this.$history.hide();
        }
        this.$score.text(score);
        this.$element.addClass('show');
    };

    ScoreBoardView.prototype.onLogin = function () {
        if (this.user && this.user.get('facebookId')) {
            window.alert('already logged in');
        } else {
            Parse.FacebookUtils.logIn('public_profile,user_friends', {
                success: function(user) {
                    if (!user.existed()) {
                        FB.api('/me', function (response) {
                            console.log(response);
                            if (!response.error) {
                                user.set('displayName', response.name);
                                user.set('facebookId', response.id);
                                user.save();
                            }
                        });
                        window.alert('User signed up and logged in through Facebook!');
                    } else {
                        window.alert('User logged in through Facebook!');
                    }
                },
                error: function(/*user, error*/) {
                    console.log('User cancelled the Facebook login or did not fully authorize.');
                }
            });
        }
    };


    // Export
    CP.ScoreBoardView = ScoreBoardView;

})(window.CP = window.CP || {});
