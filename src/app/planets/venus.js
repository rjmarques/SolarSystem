var Planet = require('./planet');
var glFactory = require('./glfactory');

function Venus() {
	Planet.call(this, 224.7, -243.02, 200);	
}

Venus.prototype = Object.create(Planet.prototype); 

Venus.prototype.addToScene = function(scene, textureLoader) {
	this.object = glFactory.createAstroObjMesh(textureLoader, {
		radius: 12,
		map: "/img/venus_1024.jpg"
	});
	var orbit = glFactory.createOrbitMesh(this.orbitRadius);
	
	scene.add(this.object);
	scene.add(orbit);
};

module.exports = Venus;