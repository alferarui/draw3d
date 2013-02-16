/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 8:17 AM
 * To change this template use File | Settings | File Templates.
 */
var Sphere = (function () {
    function Sphere(center, radius, surface) {
        this.center = center;
        this.surface = surface;
        this.radius2 = radius * radius;
        this.build="new Sphere("+center+","+radius+","+surface.build+");";
    }
    Sphere.prototype.normal = function (pos) {
        return Vector.norm(Vector.minus(pos, this.center));
    };
    Sphere.prototype.intersect = function (ray) {
        var eo = Vector.minus(this.center, ray.start);
        var v = Vector.dot(eo, ray.dir);
        var dist = 0;
        if(v >= 0) {
            var disc = this.radius2 - (Vector.dot(eo, eo) - v * v);
            if(disc >= 0) {
                dist = v - Math.sqrt(disc);
            }
        }
        if(dist === 0) {
            return null;
        } else {
            return {
                thing: this,
                ray: ray,
                dist: dist
            };
        }
    };
    return Sphere;
})();