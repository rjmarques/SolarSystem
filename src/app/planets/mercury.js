var Planet = require('./planet');
var glFactory = require('./glfactory');

function Mercury() {
	Planet.call(this, 88, 175.97, 100);	
}

Mercury.prototype = Object.create(Planet.prototype); 

Mercury.prototype.addToScene = function(scene, textureLoader) {
	this.object = glFactory.createAstroObjMesh(textureLoader, {
		radius: 10,
		map: "/img/mercury_2048.jpg"
	});
	var orbit = glFactory.createOrbitMesh(this.orbitRadius);
	
	scene.add(this.object);
	scene.add(orbit);
};

module.exports = Mercury; 