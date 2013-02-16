/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 7:52 AM
 * To change this template use File | Settings | File Templates.
 */
var Camera = (function () {
    function Camera(pos, lookAt) {
        this.pos = pos;
        var down = new Vector(0.0, -1.0, 0.0);
        this.forward = Vector.norm(Vector.minus(lookAt, this.pos));
        this.right = Vector.times(1.5, Vector.norm(Vector.cross(this.forward, down)));
        this.up = Vector.times(1.5, Vector.norm(Vector.cross(this.forward, this.right)));
        this.build="new Camera("+pos.build+""+lookAt.build+");";
    }
    return Camera;
})();