/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 7:51 AM
 * To change this template use File | Settings | File Templates.
 */
var Color = (function () {
    function Color(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.build="new Color("+r+","+g+","+b+");";
    }
    Color.scale = function scale(k, v) {
        return new Color(k * v.r, k * v.g, k * v.b);
    };
    Color.plus = function plus(v1, v2) {
        return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b);
    };
    Color.times = function times(v1, v2) {
        return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b);
    };
    Color.red = new Color(1.0, 0, 0);
    Color.orange = new Color(1.0,.5, 0);
    Color.yellow = new Color(1.0, 1.0, 0);
    Color.green = new Color(0, 1.0, 0);
    Color.cyan = new Color(0.5, 0, 1.0);
    Color.blue = new Color(0, 0, 1.0);
    Color.magenta = new Color(1.0, 0, 1.0);
    Color.white = new Color(1.0, 1.0, 1.0);
    Color.grey = new Color(0.5, 0.5, 0.5);
    Color.black = new Color(0.0, 0.0, 0.0);
    Color.background = Color.black;
    Color.defaultColor = Color.black;
    Color.toDrawingColor = function toDrawingColor(c) {
        var legalize = function (d) {
            return d > 1 ? 1 : d;
        };
        return {
            r: Math.floor(legalize(c.r) * 255),
            g: Math.floor(legalize(c.g) * 255),
            b: Math.floor(legalize(c.b) * 255)
        };
    };
    return Color;
})();