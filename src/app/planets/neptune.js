var Planet = require('./planet');
var glFactory = require('./utils/glfactory');

function Neptune() {
	Planet.call(this, 60190, 0.67, 4000);	
}

Neptune.prototype = Object.create(Planet.prototype); 

Neptune.prototype.addToScene = function(scene, textureLoader) {
	this.object = glFactory.createAstroObjMesh(textureLoader, {
		radius: 60,
		map: "/img/neptune_2048.jpg"
	});
	var orbit = glFactory.createOrbitMesh(this.orbitRadius);
	
	scene.add(this.object);
	scene.add(orbit);
};

module.exports = Neptune; 