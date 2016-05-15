var Satellite = require('./satellite');
var glFactory = require('./glfactory');

function Luna(planet) {
	Satellite.call(this, planet, 27.33, 27.33, 80);	
}

Luna.prototype = Object.create(Satellite.prototype); 

Luna.prototype.addToScene = function(scene, textureLoader) {
	var lunaMesh = glFactory.createAstroObjMesh(textureLoader, {
		radius: 5,
		map: "/img/luna_2048.jpg"
	});
	lunaMesh.castShadow = true;
	
	this.object = lunaMesh;
	scene.add(this.object);
};

module.exports = Luna;