var Planet = require('./planet');
var glFactory = require('./glfactory');

function Saturn() {
	Planet.call(this, 10752.9, 0.44, 1800);	
}

Saturn.prototype = Object.create(Planet.prototype); 

Saturn.prototype.addToScene = function(scene, textureLoader) {
	this.object = glFactory.createAstroObjMesh(textureLoader, {
		radius: 50,
		map: "/img/saturn_1024.jpg"
	});
	var orbit = glFactory.createOrbitMesh(this.orbitRadius);
	
	// TODO can't forget saturn's ring!!
	
	scene.add(this.object);
	scene.add(orbit);
};

module.exports = Saturn;