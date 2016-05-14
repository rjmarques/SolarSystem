var Planet = require('./planet');
var glFactory = require('./glfactory');

function Jupiter() {
	Planet.call(this, 4222.16, 0.41, 850);	
}

Jupiter.prototype = Object.create(Planet.prototype); 

Jupiter.prototype.addToScene = function(scene, textureLoader) {
	this.object = glFactory.createAstroObjMesh(textureLoader, {
		radius: 111.94,
		map: "/img/jupiter_2048.jpg"
	});
	var orbit = glFactory.createOrbitMesh(this.orbitRadius);
	
	scene.add(this.object);
	scene.add(orbit);
};

module.exports = Jupiter; 