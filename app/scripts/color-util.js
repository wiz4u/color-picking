(function (CP) {
    'use strict';

    var ColorUtil = {
        buildColorString: function (rgb, type) {
            switch (type) {
            default:
            case 'rgba':
                return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1)';
            case '#':
                var r = rgb.r.toString(16);
                r = r.length === 2 ? r : '0' + r;
                var g = rgb.g.toString(16);
                g = g.length === 2 ? g : '0' + g;
                var b = rgb.b.toString(16);
                b = b.length === 2 ? b : '0' + b;
                return '#' + r + g + b;
            }
        },

        calcComplementaryColor: function (rgb) {
            var r = rgb.r, g = rgb.g, b = rgb.b;
            var maxmin = Math.max(r, g, b) + Math.min(r, g, b);
            return {r: maxmin - r, g: maxmin - g, b: maxmin - b};
        }
    };

    // Export
    CP.ColorUtil = ColorUtil;

})(window.CP = window.CP || {});
