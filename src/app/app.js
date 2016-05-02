(function() {
	var scene, camera, renderer, textureLoader;
	var controls;
	var clock;
	
	var earth;
	var mercury;
	var mars;
	
	function init() {
		scene = new THREE.Scene();
		scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
		scene.fog.color.setHSL( 0.51, 0.4, 0.01 );
		
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 14000 );
		camera.position.z = -400;
		camera.position.y = 50;

		renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		document.body.appendChild( renderer.domElement );
	
		clock = new THREE.Clock();				
		
		textureLoader = new THREE.TextureLoader();
		
		controls = new THREE.OrbitControls( camera );
		controls.mouseButtons = { PAN: THREE.MOUSE.LEFT, ORBIT: THREE.MOUSE.RIGHT, ZOOM: THREE.MOUSE.MIDDLE };
		controls.minDistance = 50;
		controls.maxDistance = 2500;
		
		window.addEventListener( 'resize', onWindowResize, false );
		
		initScene();
	}	
	
	function initScene() {		
		createMilkyway();
	    
	    // sun TODO
		createSun();
	    
		createMercury();
	    
		
		// earth clouds and orbit
		createEarth();
		
		// mars
		createMars();
		
		// jupiter
		
		// neptune
	}

	function createMilkyway() {
		var skyBoxGeometry = new THREE.SphereGeometry(6000, 60, 40);
	    var uniforms = {
	      texture: { type: 't', value: textureLoader.load('/img/milkyway.jpg') }
	    };
	    var skyBoxmaterial = new THREE.ShaderMaterial( {
	      uniforms:       uniforms,
	      vertexShader:   document.getElementById('skybox-vertex').textContent,
	      fragmentShader: document.getElementById('skybox-fragment').textContent
	    });

	    skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxmaterial);
	    skyBox.scale.set(-1, 1, 1);
	    skyBox.renderOrder = 'XZY';
	    skyBox.rotation.z = Math.PI/2;
	    skyBox.rotation.x = Math.PI;
	    skyBox.renderOrder = 1000.0;
	    scene.add(skyBox);
	}
	
	function createSun() {
		var light = new THREE.PointLight( 0xffffff, 1, 0 );
		scene.add( light );
	}
	
	function createMercury(){
		var orbitRadius = 100;
		var geometry = new THREE.SphereGeometry( 10, 32, 32 );
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		var material = new THREE.MeshPhongMaterial( {
			map: textureLoader.load( "img/mercury_2048.jpg" )
		} );
		mercury = new THREE.Mesh( geometry, material );
		
		scene.add(mercury);
		
		var curve = new THREE.EllipseCurve(
			0, 0,            
			orbitRadius, orbitRadius,           
			0, 2 * Math.PI,  
			false,            
			0               
		);

		var path = new THREE.Path( curve.getPoints( 50 ) );
		var orbitGeometry = path.createPointsGeometry( 50 );
		var orbitMaterial = new THREE.LineBasicMaterial( { color : 0x333333 } );
		var orbit = new THREE.Line( orbitGeometry, orbitMaterial );
		orbit.rotation.x = 90 * Math.PI/180;
			
		scene.add(orbit);
	}
	
	function createEarth() {
		var orbitRadius = 200;
		var earthGeometry = new THREE.SphereGeometry( 20, 32, 32 );
		var earthMaterial = new THREE.MeshPhongMaterial( {
			shininess: 15,
			map: textureLoader.load( "img/earth_atmos_2048.jpg" ),
			specularMap: textureLoader.load( "img/earth_specular_2048.jpg" ),
			normalMap: textureLoader.load( "img/earth_normal_2048.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		var earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
		
		var materialClouds = new THREE.MeshLambertMaterial( {
			map: textureLoader.load( "img/earth_clouds_2048.png" ),
			transparent: true
		} );
		var earthCloudsMesh = new THREE.Mesh( earthGeometry, materialClouds );
		
		earth = new THREE.Object3D();
		earth.add(earthMesh);
		earth.add(earthCloudsMesh);
		earth.rotation.z = -0.41; // earth's tilt TODO IMPROVE
		
		scene.add(earth);
		
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
		var earthOrbit = new THREE.Line( geometry, material );
		earthOrbit.rotation.x = 90 * Math.PI/180;
		
		scene.add(earthOrbit);
	}
	
	function createMars() {
		var orbitRadius = 300;
		var geometry = new THREE.SphereGeometry( 10, 32, 32 );
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		var material = new THREE.MeshPhongMaterial( {
			map: textureLoader.load( "img/mars_2048.jpg" )
		} );
		mars = new THREE.Mesh( geometry, material );
		
		scene.add(mars);
		
		var curve = new THREE.EllipseCurve(
			0, 0,            
			orbitRadius, orbitRadius,           
			0, 2 * Math.PI,  
			false,            
			0               
		);

		var path = new THREE.Path( curve.getPoints( 50 ) );
		var orbitGeometry = path.createPointsGeometry( 50 );
		var orbitMaterial = new THREE.LineBasicMaterial( { color : 0x333333 } );
		var orbit = new THREE.Line( orbitGeometry, orbitMaterial );
		orbit.rotation.x = 90 * Math.PI/180;
			
		scene.add(orbit);
	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		controls.handleResize();

	}

	function animate() {
		requestAnimationFrame( animate );
		
		render();
	}

	function render() {					
		var elapsedTime = clock.getElapsedTime();
		
		// day revolution
		var revolutionTime = 10000; // time is takes for a full earth day, in miliseconds
		var degPerSec = (360/revolutionTime)*1000;
		var angle = (degPerSec * elapsedTime) % 360;
		earth.rotation.y = angle * Math.PI / 180;

		// earth orbit
		var orbitTime = revolutionTime*365;
		var obitDegPerSec = (360/orbitTime)*1000;
		var orbitAngle = (obitDegPerSec * elapsedTime) % 360;		
		earth.position.x = Math.sin(orbitAngle * Math.PI / 180) * 200;
		earth.position.z = Math.cos(orbitAngle * Math.PI / 180) * 200;
		
		// mercury orbit
		orbitTime = revolutionTime*88;
		obitDegPerSec = (360/orbitTime)*1000;
		orbitAngle = (obitDegPerSec * elapsedTime) % 360;		
		mercury.position.x = Math.sin(orbitAngle * Math.PI / 180) * 100;
		mercury.position.z = Math.cos(orbitAngle * Math.PI / 180) * 100;
		
		// mars orbit
		orbitTime = revolutionTime*687;
		obitDegPerSec = (360/orbitTime)*1000;
		orbitAngle = (obitDegPerSec * elapsedTime) % 360;		
		mars.position.x = Math.sin(orbitAngle * Math.PI / 180) * 300;
		mars.position.z = Math.cos(orbitAngle * Math.PI / 180) * 300;
		
		controls.update();
		
		renderer.render( scene, camera );
	}

	init();
	animate();
}());