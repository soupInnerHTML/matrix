window.addEventListener('resize', function () { return location.reload(); });
window.onload = function () {
    var Canvas = /** @class */ (function () {
        function Canvas() {
            this.cnv = document.createElement('canvas');
            this.ctx = this.cnv.getContext('2d');
            this.fontSize = 13;
            this.color = "#00ff00";
            document.body.append(this.cnv);
            this.cnv.width = window.innerWidth;
            this.cnv.height = window.innerHeight;
        }
        Object.defineProperty(Canvas.prototype, "width", {
            get: function () {
                return this.cnv.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "height", {
            get: function () {
                return this.cnv.height;
            },
            enumerable: false,
            configurable: true
        });
        Canvas.prototype.updateStyle = function () {
            //fade effect
            this.ctx.fillStyle = "rgba(0, 0, 0, .05)";
            this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);
            this.ctx.fillStyle = this.color;
            this.ctx.font = this.fontSize + "px system-ui";
        };
        return Canvas;
    }());
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.random = function (to) {
            if (to === void 0) { to = 1; }
            return Math.round(Math.random() * to);
        };
        Utils.zeros = function (length) {
            return Array.from({
                length: length
            }, function () { return 0; });
        };
        return Utils;
    }());
    var Matrix = /** @class */ (function () {
        function Matrix(canvas) {
            this.canvas = canvas;
            this.speed = 50;
            this.cols = Utils.zeros(Math.round(this.canvas.width / this.canvas.fontSize));
            this.glyphs = "牡マキグナルファ系路克瑞大阪市立学鎰命科ャマ能力ϒ人は妻スティ要望通り玉宏サ丹谷Ѫ灯影伝鶐";
            this.alphabet = this.glyphs.split('');
            this.randomShift = 0.975;
        }
        Matrix.prototype.draw = function () {
            var _this = this;
            return setInterval(function () {
                _this.canvas.updateStyle();
                _this.cols.forEach(function (value, index) {
                    var glyph = _this.alphabet[Utils.random(_this.alphabet.length - 1)];
                    var x = index * _this.canvas.fontSize;
                    var y = value * _this.canvas.fontSize;
                    _this.canvas.ctx.fillText(glyph, x, y);
                    if (y >= _this.canvas.height ||
                        //make generation more disordered
                        Math.random() > _this.randomShift) {
                        _this.cols[index] = 0;
                    }
                    else {
                        _this.cols[index]++;
                    }
                });
            }, this.speed);
        };
        return Matrix;
    }());
    var canvas = new Canvas();
    var matrix = new Matrix(canvas);
    matrix.draw();
};
