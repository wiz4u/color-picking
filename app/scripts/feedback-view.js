(function (CP) {
    'use strict';

    var FeedbackView = function () {};

    var BROWSER_TYPES = [
        'Android : Default Browser',
        'Android : Chrome',
        'Android : Chrome Beta',
        'Android : Firefox',
        'Android : Firefox Beta',
        'Android : Opera',
        'Android : Opera Mini',
        'Android : Opera Beta',
        'Android : Another one',
        'Firefox OS',
        'iOS',
        'Mac OS',
        'Windows',
        'Another Platform'
    ];

    FeedbackView.prototype.initialize = function () {
        this._onSend = this.onSend.bind(this);
        this.$element = $('#feedback_modal');
        this.$btnSend = $('#feedback_modal .feedback_send')
            .on('click', this._onSend);
        return this;
    };

    FeedbackView.prototype.finalize = function () {
        this.$btnSend.off('click', this._onSend);
    };

    FeedbackView.prototype.render = function () {
        var $select = $('#feedback_browser_type');
        for (var i = 0, l = BROWSER_TYPES.length; i < l; i++) {
            var browserType = BROWSER_TYPES[i];
            $('<option>')
                .attr({value: browserType})
                .text(browserType)
                .appendTo($select);
        }
        return this;
    };

    FeedbackView.prototype.onSend = function () {
        var browserType = $('#feedback_browser_type > :selected').val();
        var comment = $('#feedback_free_text').val();

        this.model = new CP.Feedback();
        this.model.set('browser_type', browserType);
        this.model.set('comment', comment);
        this.model.save();

        // close modal
        this.$element.modal('hide');
    };

    // Export
    CP.FeedbackView = FeedbackView;

})(window.CP = window.CP || {});
