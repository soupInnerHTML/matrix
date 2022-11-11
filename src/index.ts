window.addEventListener('resize', () => location.reload())

window.onload = function () {
    class Canvas {
        cnv = document.createElement('canvas')
        ctx = this.cnv.getContext('2d')

        fontSize = 13
        color = "#00ff00"

        get width() {
            return this.cnv.width;
        }
        get height() {
            return this.cnv.height;
        }

        updateStyle() {
            //fade effect
            this.ctx.fillStyle = "rgba(0, 0, 0, .05)";
            this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);

            this.ctx.fillStyle = this.color;
            this.ctx.font = this.fontSize + "px system-ui";
        }

        constructor() {
            document.body.append(this.cnv)
            this.cnv.width = window.innerWidth;
            this.cnv.height = window.innerHeight;
        }
    }

    class Utils {
        static random(to = 1) {
            return Math.round(Math.random() * to)
        }
        static zeros(length) {
            return Array.from({
                length
            }, () => 0)
        }
    }

    class Matrix {
        constructor(private canvas) {}
        speed = 50
        cols = Utils.zeros(Math.round(this.canvas.width / this.canvas.fontSize))
        glyphs = "牡マキグナルファ系路克瑞大阪市立学鎰命科ャマ能力ϒ人は妻スティ要望通り玉宏サ丹谷Ѫ灯影伝鶐"
        alphabet = this.glyphs.split('')

        randomShift = 0.975

        draw() {
            return setInterval(() => {
                this.canvas.updateStyle()

                this.cols.forEach((value, index) => {
                    const glyph = this.alphabet[Utils.random(this.alphabet.length - 1)]
                    const x = index * this.canvas.fontSize
                    const y = value * this.canvas.fontSize;
                    this.canvas.ctx.fillText(glyph, x, y)

                    if(
                        y >= this.canvas.height ||
                        //make generation more disordered
                        Math.random() > this.randomShift
                    ) {
                        this.cols[index] = 0;
                    }
                    else {
                        this.cols[index]++;
                    }
                })


            }, this.speed)
        }
    }

    const canvas = new Canvas()
    const matrix = new Matrix(canvas)

    matrix.draw()
}
