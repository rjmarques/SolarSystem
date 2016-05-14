var Planet = require('./planet');
var glFactory = require('./glfactory');

function Earth() {
	Planet.call(this, 365, 1, 200);	
}

Earth.prototype = Object.create(Planet.prototype); 

Earth.prototype.update = function(elapsedTime) {
	// call super
	Planet.prototype.update.call(this, elapsedTime);
	
	// update moon
	// TODO
};

Earth.prototype.addToScene = function(scene, textureLoader) {
	this.object = createEarth(textureLoader);
	var orbit = glFactory.createOrbitMesh(this.orbitRadius);
	
	scene.add(this.object);
	scene.add(orbit);
};

function createEarth(textureLoader) {
	var earthGeometry = new THREE.SphereGeometry( 20, 32, 32 );
	var earthMaterial = new THREE.MeshPhongMaterial( {
		shininess: 15,
		map: textureLoader.load( "/img/earth_atmos_2048.jpg"),
		specularMap: textureLoader.load( "/img/earth_specular_2048.jpg" ),
		normalMap: textureLoader.load( "/img/earth_normal_2048.jpg" ),
		normalScale: new THREE.Vector2( 0.85, 0.85 )
	} );
	var earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
	
	var materialClouds = new THREE.MeshLambertMaterial( {
		map: textureLoader.load( "/img/earth_clouds_2048.png" ),
		transparent: true
	} );
	var earthCloudsMesh = new THREE.Mesh( earthGeometry, materialClouds );
	
	var earth = new THREE.Object3D();
	earth.add(earthMesh);
	earth.add(earthCloudsMesh);
	earth.rotation.z = -0.41; // earth's tilt TODO IMPROVE
	
	return earth;
}

module.exports = Earth; 