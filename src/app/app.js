(function() {
	var planets = require('./planets/planets');
	
	var scene, camera, renderer, textureLoader;
	var controls;
	var clock;
	
	var mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;
	
	function init() {
		scene = new THREE.Scene();
		scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
		scene.fog.color.setHSL( 0.51, 0.4, 0.01 );
		
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 70000 );
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
	    
		mercury = new planets.Mercury();
		mercury.addToScene(scene, textureLoader);
		
		venus = new planets.Venus();
		venus.addToScene(scene, textureLoader);
		
		earth = new planets.Earth();
		earth.addToScene(scene, textureLoader);
		
		mars = new planets.Mars();
		mars.addToScene(scene, textureLoader);
		
		jupiter = new planets.Jupiter();
		jupiter.addToScene(scene, textureLoader);
		
		saturn = new planets.Saturn();
		saturn.addToScene(scene, textureLoader);
		
		uranus = new planets.Uranus();
		uranus.addToScene(scene, textureLoader);
		
		neptune = new planets.Neptune();
		neptune.addToScene(scene, textureLoader);
	}

	function createMilkyway() {
		var skyBoxGeometry = new THREE.SphereGeometry(32000, 60, 40);
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

		mercury.update(elapsedTime);
		venus.update(elapsedTime);
		earth.update(elapsedTime);
		mars.update(elapsedTime);
		jupiter.update(elapsedTime);
		saturn.update(elapsedTime);
		uranus.update(elapsedTime);
		neptune.update(elapsedTime);
		
		controls.update();
		
		renderer.render( scene, camera );
	}

	init();
	animate();
}());