import { Component, ViewChild, ElementRef  } from '@angular/core';
const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE)

import { PlanetsService, Planet } from './planets';

import '../../public/scss/styles.scss';

@Component({
	selector: 'solar-system',
	template: require('./app.component.html'),
	providers: [PlanetsService],
	styles: [require('./app.component.scss')]
})

export class AppComponent {

	@ViewChild('canvasTarget') canvasTarget: ElementRef;

	private scene: any;
	private camera: any;
	private renderer: any;
	private clock: any;
	private textureLoader: any;
	private controls: any;

	// horizon and sun
	private skyBox: any;
	private light: any;

	// planets
	private mercury: Planet; 
	private venus: Planet;
	private earth: Planet;
	private mars: Planet;
	private jupiter: Planet;
	private saturn: Planet;
	private uranus: Planet;
	private neptune: Planet;

	constructor(private planetsService: PlanetsService) {}	

	private ngOnInit() {
		this.init();
		this.animate();
	}

	private init(): void {
		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
		this.scene.fog.color.setHSL( 0.51, 0.4, 0.01 );
		
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 70000 );
		this.camera.position.z = -400;
		this.camera.position.y = 50;

		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight, false );
		this.renderer.gammaInput = true;
		this.renderer.gammaOutput = true;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		
		this.canvasTarget.nativeElement.appendChild( this.renderer.domElement );
	
		this.clock = new THREE.Clock();				
		
		this.textureLoader = new THREE.TextureLoader();
		
		this.controls = new OrbitControls( this.camera );
		this.controls.mouseButtons = { PAN: THREE.MOUSE.LEFT, ORBIT: THREE.MOUSE.RIGHT, ZOOM: THREE.MOUSE.MIDDLE };
		this.controls.minDistance = 50;
		this.controls.maxDistance = 2500;
		
		window.addEventListener( 'resize', this.onWindowResize, false );

		this.initScene();
	}

	private initScene(): void {
		this.createMilkyway();
		
		// create planets
		this.mercury = this.planetsService.createMercury(this.scene, this.textureLoader);
		this.venus = this.planetsService.createVenus(this.scene, this.textureLoader);
		this.earth = this.planetsService.createEarth(this.scene, this.textureLoader);
		this.mars = this.planetsService.createMars(this.scene, this.textureLoader);
		this.jupiter = this.planetsService.createJupiter(this.scene, this.textureLoader);
		this.saturn = this.planetsService.createSaturn(this.scene, this.textureLoader);
		this.uranus = this.planetsService.createUranus(this.scene, this.textureLoader);
		this.neptune = this.planetsService.createNeptune(this.scene, this.textureLoader);
	    
	    // sun TODO
		this.createSun();
	}

	private createMilkyway(): void {
		let skyBoxGeometry = new THREE.SphereGeometry(32000, 60, 40);
	    let uniforms = {
	      texture: { type: 't', value: this.textureLoader.load(require('./images/milkyway.jpg')) }
	    };
	    let skyBoxmaterial = new THREE.ShaderMaterial( {
	      uniforms:       uniforms,
	      vertexShader:   require('./shaders/skybox-vertex.shader'),
	      fragmentShader: require('./shaders/skybox-fragment.shader')
	    });

	    this.skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxmaterial);
	    this.skyBox.scale.set(-1, 1, 1);
	    this.skyBox.renderOrder = 1000.0;
	    this.scene.add(this.skyBox);
	}
	
	private createSun(): void {
		this.light = new THREE.PointLight( 0xffffff, 1, 0 );
		this.light.castShadow = true;
		this.light.shadow.camera.near = 1;
		this.light.shadow.camera.far = 70000;
		this.light.shadow.mapSize.width = 4096;
		this.light.shadow.mapSize.height = 4096;
		this.light.shadow.bias = 0.01;
		this.scene.add( this.light );
	}

	private animate(): void {
		var _this = this;
		requestAnimationFrame(function (_) { return _this.animate(); });
		
		this.render();
	}

	private render(): void {					
		let elapsedTime = this.clock.getElapsedTime();

		this.planetsService.updatePlanet(this.mercury, elapsedTime);
		this.planetsService.updatePlanet(this.venus, elapsedTime);
		this.planetsService.updatePlanet(this.earth, elapsedTime);
		this.planetsService.updatePlanet(this.mars, elapsedTime);
		this.planetsService.updatePlanet(this.jupiter, elapsedTime);
		this.planetsService.updatePlanet(this.saturn, elapsedTime);
		this.planetsService.updatePlanet(this.uranus, elapsedTime);
		this.planetsService.updatePlanet(this.neptune, elapsedTime);
		
		this.controls.update();
		
		this.renderer.render( this.scene, this.camera );
	}

	private onWindowResize(): void {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.controls.handleResize();
	}
 }
