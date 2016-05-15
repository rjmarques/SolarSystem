var Planet = require('./planet');
var glFactory = require('./utils/glfactory');

function Saturn() {
	Planet.call(this, 10752.9, 0.44, 1800);	
	this.ring = null;
}

Saturn.prototype = Object.create(Planet.prototype); 

Saturn.prototype.update = function(elapsedTime) {
	Planet.prototype.update.call(this, elapsedTime);
	
	this.ring.position.copy(this.object.position);
};

Saturn.prototype.addToScene = function(scene, textureLoader) {
	var planetRadius = 50;
	this.object = glFactory.createAstroObjMesh(textureLoader, {
		radius: planetRadius,
		map: "/img/saturn_1024.jpg"
	});
	
	var orbit = glFactory.createOrbitMesh(this.orbitRadius);
	
	var ring = glFactory.createRingMesh(planetRadius*1.5, planetRadius*2.2, textureLoader, {
		map: "/img/saturn_ring.jpg",
		alphaMap: "/img/saturn_ring_alpha.jpg", 
	});
	ring.rotation.x = -135 * Math.PI/180; // tilt ring diagonally
	this.ring = ring;
	
	scene.add(this.object);
	scene.add(orbit);
	scene.add(this.ring);
};

module.exports = Saturn;