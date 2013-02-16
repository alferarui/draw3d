/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 7:53 AM
 * To change this template use File | Settings | File Templates.
 */
var Surfaces;
(function (Surfaces) {
    Surfaces.diffuse = {
        diffuse: function (pos) {
            return Color.grey;
        },
        specular: function (pos) {
            return Color.grey;
        },
        reflect: function (pos) {
            //console.log(pos);
            return 0.05;
        },
        build:"Surfaces.diffuse",
        roughness: 100
    };
    Surfaces.shiny = {
        diffuse: function (pos) {
            return Color.white;
        },
        specular: function (pos) {
            return Color.white;
        },
        reflect: function (pos) {
            //console.log(pos);
            return 0.3;
        },
        build:"Surfaces.shiny",
        roughness: 200
    };
    Surfaces.checkerboard = {
        diffuse: function (pos) {
            if((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
                return Color.black;
            } else {
                return Color.orange;
            }
        },
        specular: function (pos) {
            return Color.grey;
        },
        reflect: function (pos) {
            if((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
                return 0.1;
            } else {
                return 0.3;
            }
        },
        build:"Surfaces.checkerboard",
        roughness: 200
    };
})(Surfaces || (Surfaces = {}));