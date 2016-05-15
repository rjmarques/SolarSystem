var Planet = require('./planet');
var Luna = require('./luna');
var glFactory = require('./utils/glfactory');

function Earth() {
	Planet.call(this, 365, 1, 400);	
}

Earth.prototype = Object.create(Planet.prototype);

Earth.prototype.addToScene = function(scene, textureLoader) {
	createEarth(scene, textureLoader, this);
	createMoon(scene, textureLoader, this);
};

function createEarth(scene, textureLoader, earth) {	
	var earthGeometry = new THREE.SphereGeometry( 20, 32, 32 );
	var earthMaterial = new THREE.MeshPhongMaterial( {
		shininess: 15,
		map: textureLoader.load( "/img/earth_atmos_2048.jpg"),
		specularMap: textureLoader.load( "/img/earth_specular_2048.jpg" ),
		normalMap: textureLoader.load( "/img/earth_normal_2048.jpg" ),
		normalScale: new THREE.Vector2( 0.85, 0.85 )
	} );
	var earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
	earthMesh.receiveShadow = true;
	
	var materialClouds = new THREE.MeshLambertMaterial( {
		map: textureLoader.load( "/img/earth_clouds_2048.png" ),
		transparent: true
	} );
	var earthCloudsMesh = new THREE.Mesh( earthGeometry, materialClouds );
	
	var earthSystem = new THREE.Object3D();
	earthSystem.add(earthMesh);
	earthSystem.add(earthCloudsMesh);
	earthSystem.rotation.z = -0.41; // earth's tilt TODO IMPROVE
	
	var orbit = glFactory.createOrbitMesh(earth.orbitRadius);
	
	scene.add(earthSystem);
	scene.add(orbit);
	
	earth.object = earthSystem; 
}

function createMoon(scene, textureLoader, earth) {
	// create the moon
	var moon = new Luna(earth);
	earth.moons.push(moon);
	
	moon.addToScene(scene, textureLoader);
}

module.exports = Earth; 