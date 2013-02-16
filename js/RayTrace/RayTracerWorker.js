/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 2:06 PM
 * To change this template use File | Settings | File Templates.
 */
importScripts(
    "Vector.class.js",
    "Color.class.js",
    "Plane.class.js",
    "Surfaces.class.js",
    "Sphere.class.js",
    "Camera.class.js",
    "Raytracer.class.js"
);
var default_scene={camera:null,lights:[],things:[]};
self.onmessage = function(event) {
    //var data=JSON.parse(event.data);
    self.postMessage(event.data);

    switch (data.command){
        case 'makeScene':
            var scene=data.data;
            default_scene=data.data;
            default_scene.camera=new Camera(new Vector().init(scene.camera.pos), new Vector().init(scene.camera.forward));
            default_scene.lights[i]=scene.lights;
            for(var i=0;i<scene.lights.length;i++){

            }
            //default_scene.things=[];
            break;
        case 'startRender':
            break;
    }
};

/*
function defaultScene() {
    return {
        things: [
            new Plane(new Vector(0.0, 1.0, 0.0), 0.0, Surfaces.checkerboard),
            new Plane(new Vector(1.0, 0.0, 0.0), 4.0, Surfaces.diffuse),
            new Sphere(new Vector(0.0, 1.0, -0.25), 1.0, Surfaces.shiny),
            new Sphere(new Vector(-1.0, 0.5, 1.5), 0.5, Surfaces.shiny)
        ],
        lights: [
            {
                pos: new Vector(-2.0, 2.5, 0.0),
                color: new Color(0.1, 0.31, 0)
            },
            {
                pos: new Vector(1.5, 2.5, 1.5),
                color: new Color(0.1, 0.21, 0.1)
            },
            {
                pos: new Vector(1.5, 2.5, -1.5),
                color: new Color(0.21, 0.21, 0.1)
            },
            {
                pos: new Vector(0.0, 3.5, 0.0),
                color: new Color(1, 1, 1)
            }
        ],
        camera: new Camera(new Vector(6.0, 4.0, 8.0), new Vector(-4.0, -2.0, -2.0))
    };
}
*/

/*
self.onMesssage=function(message){
    self.postMessage("yeahhhh !!");
    switch(message){
        case "start":
            self.postMessage("started");
            break;
        case "stop":
            self.postMessage("stopped");
            break;
    }
}*/