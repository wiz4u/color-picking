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

        getRandomColor: function (option) {
            var minH = (option && option.h && option.h.min) ? option.h.min : 0;
            var maxH = (option && option.h && option.h.max) ? option.h.max : 360;
            var minS = (option && option.s && option.s.min) ? option.s.min : 0;
            var maxS = (option && option.s && option.s.max) ? option.s.max : 256;
            var minV = (option && option.v && option.v.min) ? option.v.min : 0;
            var maxV = (option && option.v && option.v.max) ? option.v.max : 256;

            var h = Math.floor(Math.random() * (maxH - minH) + minH);
            var s = Math.floor(Math.random() * (maxS - minS) + minS);
            var v = Math.floor(Math.random() * (maxV - minV) + minV);

            return CP.ColorUtil.hsv2rgb({h: h, s: s, v: v});
        },

        // return [0, 100]
        calcColorDistance: function (color1, color2) {
            if (!color1 || !color2) {
                return 0;
            }

            var _getHsv = function (color) {
                if (color.h !== undefined &&
                    color.s !== undefined &&
                    color.v !== undefined) {
                    return color;
                }
                return CP.ColorUtil.rgb2hsv(color);
            };

            var hsv1 = _getHsv(color1);
            var hsv2 = _getHsv(color2);

            var diffH = Math.abs(hsv1.h - hsv2.h);
            diffH = diffH < 180 ? diffH : 360 - diffH;
            var scoreH = 1 - diffH / 180;
            var scoreS = 1 - Math.abs(hsv1.s - hsv2.s) / 255;
            var scoreV = 1 - Math.abs(hsv1.v - hsv2.v) / 255;

            var weightH = 0.6;
            var weightS = 0.2;
            var weightV = 0.2;

            var score = weightH * scoreH * scoreH +
                        weightS * scoreS * scoreS +
                        weightV * scoreV * scoreV;

            return Math.round(score * 100);
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
        },

        hsv2rgb: function (hsv) {
            var h = hsv.h,
                s = hsv.s,
                v = hsv.v,
                r, g, b;

            var i = Math.floor(h / 60) % 6;
            var f = (h / 60) - Math.floor(h / 60);
            var p = Math.round(v * (1 - (s / 255)));
            var q = Math.round(v * (1 - (s / 255) * f));
            var t = Math.round(v * (1 - (s / 255) * (1 - f)));

            switch (i) {
                case 0 : r = v; g = t; b = p; break;
                case 1 : r = q; g = v; b = p; break;
                case 2 : r = p; g = v; b = t; break;
                case 3 : r = p; g = q; b = v; break;
                case 4 : r = t; g = p; b = v; break;
                case 5 : r = v; g = p; b = q; break;
            }

            return {r: r, g: g, b: b};
        }
    };

    // Export
    CP.ColorUtil = ColorUtil;

})(window.CP = window.CP || {});
