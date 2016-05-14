module.exports.createOrbitMesh = function(orbitRadius) {
	var curve = new THREE.EllipseCurve(
		0, 0,            
		orbitRadius, orbitRadius,           
		0, 2 * Math.PI,  
		false,            
		0               
	);

	var path = new THREE.Path( curve.getPoints( 50 ) );
	var geometry = path.createPointsGeometry( 50 );
	var material = new THREE.LineBasicMaterial( { color : 0x333333 } );
	var orbit = new THREE.Line( geometry, material );
	orbit.rotation.x = 90 * Math.PI/180; // tilt orbit vertically
		
	return orbit;
};

module.exports.createAstroObjMesh = function(textureLoader, config) {
	var geometry = new THREE.SphereGeometry( config.radius, 32, 32 );
	var material = new THREE.MeshPhongMaterial( {
		map: textureLoader.load( config.map )
	} );
	var mesh = new THREE.Mesh( geometry, material );
	
	return mesh;
};