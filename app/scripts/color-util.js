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
        },

        rgb2hsv: function (rgb) {
            var r = rgb.r,
                g = rgb.g,
                b = rgb.b,
                h, s, v;
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);

            // h
            if (max === min) {
                h = 0;
            } else if (max === r) {
                h = (60 * (g - b) / (max - min) + 360) % 360;
            } else if (max === g) {
                h = (60 * (b - r) / (max - min)) + 120;
            } else if (max === b) {
                h = (60 * (r - g) / (max - min)) + 240;
            }

            // s
            if (max === 0) {
                s = 0;
            } else {
                s = (255 * ((max - min) / max));
            }

            // v
            v = max;

            return {h: h, s: s, v: v};
        }
    };

    // Export
    CP.ColorUtil = ColorUtil;

})(window.CP = window.CP || {});
