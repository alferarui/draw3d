/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 7:52 AM
 * To change this template use File | Settings | File Templates.
 */
var Plane = (function () {
    function Plane(norm, offset, surface) {
        this.surface = surface;
        this.normal = function (pos) {
            return norm;
        };
        this.intersect = function (ray) {
            var denom = Vector.dot(norm, ray.dir);
            if(denom > 0) {
                return null;
            } else {
                var dist = (Vector.dot(norm, ray.start) + offset) / (-denom);
                return {
                    thing: this,
                    ray: ray,
                    dist: dist
                };
            }
        };
        this.build="new Plane("+norm.build+","+offset+","+surface.build+");";
    }
    return Plane;
})();
/*
var Cube = (function () {
    function Cube(norm, offset, surface) {
        this.sides=[
            new Plane(new Vector(0.0, 1.0, 0.0), 0.0, Surfaces.checkerboard),
            new Plane(new Vector(0.0, 1.0, 0.0), 10.0, Surfaces.checkerboard)
        ]
        this.surface = surface;
        this.normal = function (pos) {
            return norm;
        };
        this.intersect = function (ray) {
            var denom = Vector.dot(norm, ray.dir);
            if(denom > 0) {
                return null;
            } else {
                var dist = (Vector.dot(norm, ray.start) + offset) / (-denom);
                return {
                    thing: this,
                    ray: ray,
                    dist: dist
                };
            }
        };
    }
    return Plane;
})();
*/