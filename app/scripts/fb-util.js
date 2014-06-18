/* global FB */

(function (CP) {
    'use strict';

    var FbUtil = {};

    // Get Frinend List
    FbUtil.getFriends = function (successCallback, errorCallback) {
        FB.api('/me/friends', function(response) {
            if (response.data) {
                successCallback(response.data);
            } else {
                errorCallback();
            }
        });
    };

    // Get User Picture
    FbUtil.getUserPictureUrl = function (id, width, height) {
        if (!id) {
            return null;
        }

        var base = 'http://graph.facebook.com/';
        var url = base + id + '/picture';
        if (width && height) {
            url += '/picture?width=' + width + '&height=' + height;
        }

        return url;
    };

    // Export
    CP.FbUtil = FbUtil;

})(window.CP = window.CP || {});
