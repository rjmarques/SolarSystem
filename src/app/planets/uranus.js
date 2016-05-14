var Planet = require('./planet');
var glFactory = require('./glfactory');

function Uranus() {
	Planet.call(this, 30685, -0.72, 2500);	
}

Uranus.prototype = Object.create(Planet.prototype); 

Uranus.prototype.addToScene = function(scene, textureLoader) {
	this.object = glFactory.createAstroObjMesh(textureLoader, {
		radius: 50,
		map: "/img/uranus_1024.jpg"
	});
	var orbit = glFactory.createOrbitMesh(this.orbitRadius);
	
	// TODO can't forget saturn's ring!!
	
	scene.add(this.object);
	scene.add(orbit);
};

module.exports = Uranus;