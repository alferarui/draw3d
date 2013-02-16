/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 7:51 AM
 * To change this template use File | Settings | File Templates.
 */
var Vector = (function () {
    function Vector(x, y, z) {
        this.x = x||0;
        this.y = y||0;
        this.z = z||0;
        this.build="new Vector("+x+","+y+","+z+");";
    }
    Vector.init=function(pos){
        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
        return this;
    }
    Vector.times = function times(k, v) {
        return new Vector(k * v.x, k * v.y, k * v.z);
    };
    Vector.minus = function minus(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    };
    Vector.plus = function plus(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    };
    Vector.dot = function dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    };
    Vector.mag = function mag(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    };
    Vector.norm = function norm(v) {
        var mag = Vector.mag(v);
        var div = (mag === 0) ? Infinity : 1.0 / mag;
        return Vector.times(div, v);
    };
    Vector.cross = function cross(v1, v2) {
        return new Vector(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    };

    return Vector;
})();