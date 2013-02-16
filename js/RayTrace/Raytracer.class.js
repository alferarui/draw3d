/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 7:53 AM
 * To change this template use File | Settings | File Templates.
 */
var RayTracer = (function () {
    function RayTracer() {
        this.maxDepth = 5;
    }
    RayTracer.prototype.intersections = function (ray, scene) {
        var closest = +Infinity;
        var closestInter = undefined;
        for(var i in scene.things) {
            var inter = scene.things[i].intersect(ray);
            if(inter != null && inter.dist < closest) {
                closestInter = inter;
                closest = inter.dist;
            }
        }
        return closestInter;
    };
    RayTracer.prototype.testRay = function (ray, scene) {
        var isect = this.intersections(ray, scene);
        if(isect != null) {
            return isect.dist;
        } else {
            return undefined;
        }
    };
    RayTracer.prototype.traceRay = function (ray, scene, depth) {
        var isect = this.intersections(ray, scene);
        if(isect === undefined) {
            return Color.background;
        } else {
            return this.shade(isect, scene, depth);
        }
    };
    RayTracer.prototype.shade = function (isect, scene, depth) {
        var d = isect.ray.dir;
        var pos = Vector.plus(Vector.times(isect.dist, d), isect.ray.start);
        var normal = isect.thing.normal(pos);
        var reflectDir = Vector.minus(d, Vector.times(2, Vector.times(Vector.dot(normal, d), normal)));
        var naturalColor = Color.plus(Color.background, this.getNaturalColor(isect.thing, pos, normal, reflectDir, scene));
        var reflectedColor = (depth >= this.maxDepth) ? Color.grey : this.getReflectionColor(isect.thing, pos, normal, reflectDir, scene, depth);
        var endColor=Color.plus(naturalColor, reflectedColor);
        return endColor;
    };
    RayTracer.prototype.getReflectionColor = function (thing, pos, normal, rd, scene, depth) {
        return Color.scale(thing.surface.reflect(pos), this.traceRay({
            start: pos,
            dir: rd
        }, scene, depth + 1));
    };
    RayTracer.prototype.getNaturalColor = function (thing, pos, norm, rd, scene) {
        var _this = this;
        var addLight = function (col, light) {
            var ldis = Vector.minus(light.pos, pos);
            var livec = Vector.norm(ldis);
            var neatIsect = _this.testRay({
                start: pos,
                dir: livec
            }, scene);
            var isInShadow = (neatIsect === undefined) ? false : (neatIsect <= Vector.mag(ldis));
            if(isInShadow) {
                return col;
            } else {
                var illum = Vector.dot(livec, norm);
                var lcolor = (illum > 0) ? Color.scale(illum, light.color) : Color.defaultColor;
                var specular = Vector.dot(livec, Vector.norm(rd));
                var scolor = (specular > 0) ? Color.scale(Math.pow(specular, thing.surface.roughness), light.color) : Color.defaultColor;
                return Color.plus(col, Color.plus(Color.times(thing.surface.diffuse(pos), lcolor), Color.times(thing.surface.specular(pos), scolor)));
            }
        };
        return scene.lights.reduce(addLight, Color.defaultColor);
    };
    RayTracer.prototype.render = function (scene, ctx, screenWidth, screenHeight,passes,endpass,dialog) {
        var getPoint = function (x, y, camera) {
            var recenterX = function (x) {
                return (x - (screenWidth / 2.0)) / 2.0 / screenWidth;
            };
            var recenterY = function (y) {
                return -(y - (screenHeight / 2.0)) / 2.0 / screenHeight;
            };
            return Vector.norm(Vector.plus(camera.forward, Vector.plus(Vector.times(recenterX(x), camera.right), Vector.times(recenterY(y), camera.up))));
        };
        var render=(function(pass){
            var limit=function Limit(v){
                return (.9 -.3)*v+.9;
            }
            var p=Math.pow(2,pass-1);
            dialog.log(pass);
            for(var y = 0; y < screenHeight; y+=p) {
                for(var x = 0; x < screenWidth; x+=p) {
                    var color = this.traceRay({
                        start: scene.camera.pos,
                        dir: getPoint(x, y, scene.camera)
                    }, scene, 0);
                    var c = Color.toDrawingColor(color);
                    ctx.fillStyle = "rgba(" + String(c.r) + ", " + String(c.g) + ", " + String(c.b) + "," + limit((passes-pass)/passes) +")";
                    ctx.fillRect(x-p, y-p, x + p, y + p);
                }
                var pr=((10000-(pass)/passes*10000)<<0)/100;
                dialog.log("pass:"+(passes-pass)+" of "+passes+", "+pr+"%");
            }
            if(pass>endpass){
                //console.log(pass,p);
                var conf=true;
                //if(confirm('continue ?'))
                setTimeout((function(){render(--pass);}).bind(this),1);
            }
        }).bind(this);
        render(passes);
        return true;
    };
    return RayTracer;
})();