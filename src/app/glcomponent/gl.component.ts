import { Component, ViewChild, ElementRef } from '@angular/core';

const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE)

import { PlanetsService, Planet } from './planets';
import { SunService } from './sun';

@Component({
	selector: 'gl',
	template: require('./gl.component.html'),
	providers: [PlanetsService, SunService],
	styles: [require('./gl.component.scss')]
})

export class GLComponent {
	@ViewChild('canvasTarget') canvasTarget: ElementRef;

	private scene: any;
	private camera: any;
	private renderer: any;
	private textureLoader: any;
	private controls: any;

	// horizon and sun
	private skyBox: any;

	constructor(private planetsService: PlanetsService, private sunService: SunService) {}

	private ngOnInit() {
		this.init();
		this.animate();
	}

	private init(): void {
		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
		this.scene.fog.color.setHSL( 0.51, 0.4, 0.01 );
		
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 140000 );
		this.camera.position.z = -800;

		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight, false );
		this.renderer.gammaInput = true;
		this.renderer.gammaOutput = true;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		
		this.canvasTarget.nativeElement.appendChild( this.renderer.domElement );
		
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

		this.sunService.createSun(this.scene, this.camera, this.textureLoader);
		this.planetsService.createPlanets(this.scene, this.textureLoader);
	}

	private createMilkyway(): void { // TODO extract to service
		let skyBoxGeometry = new THREE.SphereGeometry(64000, 60, 40);
		let uniforms = {
			texture: { type: 't', value: this.textureLoader.load(require('./images/milkyway.jpg')) }
		};
		let skyBoxmaterial = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: require('./shaders/skybox-vertex.shader'),
			fragmentShader: require('./shaders/skybox-fragment.shader')
		});

		this.skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxmaterial);
		this.skyBox.scale.set(-1, 1, 1);
		this.skyBox.renderOrder = 1000.0;
		this.scene.add(this.skyBox);
	}

	private animate(): void {
		let _this = this;
		requestAnimationFrame(function (_) { return _this.animate(); });
		
		this.render();
	}

	private render(): void {				
		this.updateScene();
		this.renderer.render( this.scene, this.camera );
	}

	private updateScene(): void {
		// update planets
		this.planetsService.update();

		// update sun
		this.sunService.update(this.camera);
		
		// user controls
		this.controls.update();		
	}

	private onWindowResize(): void {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.controls.handleResize();
	}
}
