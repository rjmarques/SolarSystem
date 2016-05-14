var Planet = require('./planet');
var glFactory = require('./glfactory');

function Mars() {
	Planet.call(this, 687, 1.027, 300);	
}

Mars.prototype = Object.create(Planet.prototype); 

Mars.prototype.addToScene = function(scene, textureLoader) {
	this.object = glFactory.createAstroObjMesh(textureLoader, {
		radius: 15,
		map: "/img/mars_2048.jpg"
	});
	var orbit = glFactory.createOrbitMesh(this.orbitRadius);
	
	scene.add(this.object);
	scene.add(orbit);
};

module.exports = Mars; 