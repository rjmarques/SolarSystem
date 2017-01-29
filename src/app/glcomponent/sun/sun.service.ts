import { Injectable } from '@angular/core';

const THREE = require('three');

@Injectable()
export class SunService {

	private sunClock: any = new THREE.Clock();
	private sun: any;

	public createSun(scene: any, camera: any, textureLoader: any) {
		// light source
		let light = new THREE.PointLight( 0xffffff, 1, 0 );
		light.castShadow = true;
		light.shadow.camera.near = 1;
		light.shadow.camera.far = 140000;
		light.shadow.mapSize.width = 4096;
		light.shadow.mapSize.height = 4096;
		light.shadow.bias = 0.01;
		scene.add( light );

		// sun system
		this.sun = new THREE.Object3D();

		// sun mesh
		let sunSize = 170;
		let geometry = new THREE.SphereGeometry( sunSize, 32, 32 );
		
		let uniforms = {
			texture1: { type: 't', value: textureLoader.load(require('./images/sun_1024.jpg')) },
			texture2: { type: 't', value: textureLoader.load(require('./images/sun_noise_256.png')) },
			time: { type: 'f', value: 1.0 }
		};
		uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
		uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = THREE.RepeatWrapping;

		let sunMaterial = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: require('./shaders/sun-vertex.shader'),
			fragmentShader: require('./shaders/sun-fragment.shader')
		});

		let sunSurface = new THREE.Mesh( geometry, sunMaterial );
		this.sun.add( sunSurface );
		this.sun.surface = sunSurface; 

		// lens flare
		let lensFlare = this.makeStarLensflare(sunSize, camera, textureLoader);
		this.sun.lensFlare = lensFlare;
		this.sun.lensFlare.name == 'lensflare';
		this.sun.add( lensFlare );
		
		// add sun to scene
		scene.add(this.sun);
	}

	public update(camera: any) {
		let delta = this.sunClock.getDelta() / 7;
		this.sun.surface.material.uniforms.time.value += delta;
		
		// sun effects position		
		let rotatedPos = this.rotateToCamera( this.sun.lensFlare.offset.clone(), camera.rotation );
		this.sun.lensFlare.position.copy( this.sun.surface.position.clone().add(rotatedPos) );
	}

	private makeStarLensflare(sunSize: number, camera: any, textureLoader: any): any {
		let textureFlare0 = textureLoader.load( require('./images/lensflare/lensflare0.png') );
		let textureFlare1 = textureLoader.load( require('./images/lensflare/lensflare1.png') );
		let textureFlare2 = textureLoader.load( require('./images/lensflare/lensflare2.png') );
		let textureFlare3 = textureLoader.load( require('./images/lensflare/lensflare3.png') );

		let flareColor = new THREE.Color( 0xffffff );
		
		let lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );
		lensFlare.size = 2000;
		lensFlare.offset = new THREE.Vector3(0, 0, sunSize*1.1);

		lensFlare.add( textureFlare1, 512, 0.0, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 40, 0.6, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 80, 0.7, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 60, 1.0, THREE.AdditiveBlending );

		let _this = this; // sigh...
		lensFlare.customUpdateCallback = function(object: any){
			if( !object.visible ) {
				return;
			}

			let f: any;
			let fl = this.lensFlares.length;
			let flare: any;
			let vecX = -this.positionScreen.x * 2;
			let vecY = -this.positionScreen.y * 2;
			let size = object.size;

			let camDistance = camera.position.length();

			for( f = 0; f < fl; f ++ ) {

				flare = this.lensFlares[ f ];

				flare.x = this.positionScreen.x + vecX * flare.distance;
				flare.y = this.positionScreen.y + vecY * flare.distance;

				flare.scale = size / camDistance;

				if( camDistance < 10.0 ){
					flare.opacity = Math.pow(camDistance * 2.0,2.0);
				}
				else{
					flare.opacity = 1.0;
				}

				flare.rotation = 0;
			}

			for( f=2; f<fl; f++ ){
				flare = this.lensFlares[ f ];
				let dist = Math.sqrt( Math.pow(flare.x,2) + Math.pow(flare.y,2) );
				flare.opacity = _this.constrain( dist, 0.0, 1.0 );
				flare.wantedRotation = flare.x * Math.PI * 0.25;
				flare.rotation += ( flare.wantedRotation - flare.rotation ) * 0.25;
			}
		};

		return lensFlare;
	}

	private constrain(v: number, min: number, max: number): number{
		if( v < min ) {
			v = min;
		} else if( v > max ) {
			v = max;
		}
		return v;
	}

	private rotateToCamera(offsetPos: any, rotation: any): any {
		let rotationMatrix = new THREE.Matrix4().makeRotationFromEuler( rotation );
		return offsetPos.clone().applyMatrix4(rotationMatrix);		
	}
}