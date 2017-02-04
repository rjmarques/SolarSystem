import { Injectable } from '@angular/core';

const THREE = require('three');

import { AstronomicalObject } from './astronomical-object';
import { Planet } from './planet';
import { Satellite } from './satellite';

import { Mercury } from './mercury/mercury';
import { Venus } from './venus/venus';
import { Earth } from './earth/earth';
import { Luna } from './earth/luna';
import { Mars } from './mars/mars';
import { Jupiter } from './jupiter/jupiter';
import { Saturn } from './saturn/saturn';
import { Uranus } from './uranus/uranus';
import { Neptune } from './neptune/neptune';

@Injectable()
export class GLPlanetsService {

	private readonly REVOLUTION_TIME: number = 2000; // time is takes for a full earth day, in miliseconds

	private clock: any = new THREE.Clock();	;

	private mercury: Planet; 
	private venus: Planet;
	private earth: Planet;
	private mars: Planet;
	private jupiter: Planet;
	private saturn: Planet;
	private uranus: Planet;
	private neptune: Planet;

	private planetsByName: {[name: string]: Planet};
	private focussedPlanet: Planet;

	public createPlanets(scene: any, textureLoader: any) {
		this.mercury = this.createMercury(scene, textureLoader);
		this.venus = this.createVenus(scene, textureLoader);
		this.earth = this.createEarth(scene, textureLoader);
		this.mars = this.createMars(scene, textureLoader);
		this.jupiter = this.createJupiter(scene, textureLoader);
		this.saturn = this.createSaturn(scene, textureLoader);
		this.uranus = this.createUranus(scene, textureLoader);
		this.neptune = this.createNeptune(scene, textureLoader);

		this.planetsByName = {
			'mercury': this.mercury,
			'venus': this.venus,
			'earth': this.earth,
			'mars': this.mars,
			'jupiter': this.jupiter,
			'saturn': this.saturn,
			'uranus': this.uranus,
			'neptune': this.neptune
		};
	}

	public update(controls: any, camera: any) {
		let elapsedTime = this.clock.getElapsedTime();

		this.updatePlanet(this.mercury, elapsedTime);
		this.updatePlanet(this.venus, elapsedTime);
		this.updatePlanet(this.earth, elapsedTime);
		this.updatePlanet(this.mars, elapsedTime);
		this.updatePlanet(this.jupiter, elapsedTime);
		this.updatePlanet(this.saturn, elapsedTime);
		this.updatePlanet(this.uranus, elapsedTime);
		this.updatePlanet(this.neptune, elapsedTime);

		if(this.focussedPlanet) {
			let planetPos = this.focussedPlanet.getGLObject().position;
			controls.target.copy(planetPos);

			let planetRadius = this.focussedPlanet.getGLObject().planetRadius * 4;
			let cameraPos = this.getPointInBetween(planetPos, new THREE.Vector3(0,0,0), planetRadius);
			camera.position.copy(cameraPos);
		}
	}

	public focusOn(planetName: string): void {
		let planet: Planet = this.planetsByName[planetName];
		if(planet) {
			this.focussedPlanet = planet;
		}
	}

	private getPointInBetween(pointA: any, pointB: any, distance: any): any {
		let dir = pointB.clone().sub(pointA).normalize().multiplyScalar(distance);
		return pointA.clone().add(dir);
	}

	private createMercury(scene: any, textureLoader: any): Planet {
		let glObject = this.createAstroObjMesh(textureLoader, {
			radius: 10,
			map: require("./mercury/images/mercury_2048.jpg")
		});
		scene.add(glObject);

		let mercury: Mercury = new Mercury(glObject);

		let orbit = this.createOrbitMesh(mercury.getOrbitRadius());
		scene.add(orbit);

		return mercury;
	}

	private createVenus(scene: any, textureLoader: any): Planet {
		let glObject = this.createAstroObjMesh(textureLoader, {
			radius: 12,
			map: require("./venus/images/venus_1024.jpg")
		});
		scene.add(glObject);

		let venus: Venus = new Venus(glObject);

		let orbit = this.createOrbitMesh(venus.getOrbitRadius());
		scene.add(orbit);

		return venus;
	}

	private createEarth(scene: any, textureLoader: any): Planet {
		// earth creation
		let earthRadius = 20;
		let earthGeometry = new THREE.SphereGeometry( earthRadius, 32, 32 );
		let earthMaterial = new THREE.MeshPhongMaterial( {
			shininess: 15,
			map: textureLoader.load( require('./earth/images/earth_atmos_2048.jpg') ),
			specularMap: textureLoader.load( require("./earth/images/earth_specular_2048.jpg") ),
			normalMap: textureLoader.load( require("./earth/images/earth_normal_2048.jpg") ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		let earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
		
		let materialClouds = new THREE.MeshLambertMaterial( {
			map: textureLoader.load( require("./earth/images/earth_clouds_2048.png") ),
			transparent: true
		} );
		let earthCloudsMesh = new THREE.Mesh( earthGeometry, materialClouds );
		
		let earthSystem = new THREE.Object3D();
		earthSystem.add(earthMesh);
		earthSystem.add(earthCloudsMesh);
		earthSystem.rotation.z = -0.41; // earth's tilt TODO IMPROVE
		earthSystem.planetRadius = earthRadius;		
		
		scene.add(earthSystem);
		
		let earth: Earth = new Earth(earthSystem);

		let orbit = this.createOrbitMesh(earth.getOrbitRadius());
		scene.add(orbit);

		// moon creation
		let lunaMesh = this.createAstroObjMesh(textureLoader, {
			radius: 5,
			map: require("./earth/images/luna_2048.jpg")
		});
		lunaMesh.castShadow = true;

		scene.add(lunaMesh);

		// wire moon and earth
		let moon = new Luna(earth, lunaMesh);
		earth.addSatellite(moon);

		return earth;
	}

	private createMars(scene: any, textureLoader: any): Planet {
		let glObject = this.createAstroObjMesh(textureLoader, {
			radius: 15,
			map: require("./mars/images/mars_2048.jpg")
		});
		scene.add(glObject);

		let mars: Mars = new Mars(glObject);

		let orbit = this.createOrbitMesh(mars.getOrbitRadius());
		scene.add(orbit);

		return mars;
	}

	private createJupiter(scene: any, textureLoader: any): Planet {
		let glObject = this.createAstroObjMesh(textureLoader, {
			radius: 111.94,
			map: require("./jupiter/images/jupiter_2048.jpg")
		});
		scene.add(glObject);

		let jupiter: Jupiter = new Jupiter(glObject);

		let orbit = this.createOrbitMesh(jupiter.getOrbitRadius());
		scene.add(orbit);

		return jupiter;
	}

	private createSaturn(scene: any, textureLoader: any): Planet {
		let planetRadius = 50;
		let glObject = this.createAstroObjMesh(textureLoader, {
			radius: planetRadius,
			map: require("./saturn/images/saturn_1024.jpg")
		});
		scene.add(glObject);

		let ring = this.createRingMesh(planetRadius*1.5, planetRadius*2.2, textureLoader, {
			map: require("./saturn/images/saturn_ring.jpg"),
			alphaMap: require("./saturn/images/saturn_ring_alpha.jpg"), 
		});
		ring.rotation.x = -135 * Math.PI/180; // tilt ring diagonally
		scene.add(ring);

		let saturn: Saturn = new Saturn(glObject, ring);

		let orbit = this.createOrbitMesh(saturn.getOrbitRadius());
		scene.add(orbit);

		return saturn;
	}

	private createUranus(scene: any, textureLoader: any): Planet {
		let glObject = this.createAstroObjMesh(textureLoader, {
			radius: 50,
			map: require("./uranus/images/uranus_1024.jpg")
		});
		scene.add(glObject);

		let uranus: Uranus = new Uranus(glObject);

		let orbit = this.createOrbitMesh(uranus.getOrbitRadius());
		scene.add(orbit);

		return uranus;
	}

	private createNeptune(scene: any, textureLoader: any): Planet {
		let glObject = this.createAstroObjMesh(textureLoader, {
			radius: 60,
			map: require("./neptune/images/neptune_2048.jpg")
		});
		scene.add(glObject);

		let neptune: Neptune = new Neptune(glObject);

		let orbit = this.createOrbitMesh(neptune.getOrbitRadius());
		scene.add(orbit);

		return neptune;
	}

	private updatePlanet(planet: Planet, elapsedTime: number): void {
		this.updateAstroObject(planet, elapsedTime);

		// update ring position
		if(planet.getGLRing()) {
			planet.getGLRing().position.copy(planet.getGLObject().position);
		}

		planet.getSatellites().forEach(satellite => {
			this.updateSatellite(satellite, elapsedTime);
		});
	}

	private updateSatellite(satellite: Satellite, elapsedTime: number): void {
		let planetPos: any = satellite.getPlanet().getGLObject().position;
		this.updateAstroObject(satellite, elapsedTime, planetPos);
	}

	private updateAstroObject(astro: AstronomicalObject, elapsedTime: number, orbitCentre: any = new THREE.Vector3()): void {
		// orbit update
		let orbitTime = this.REVOLUTION_TIME*astro.getOrbitTimeByEarthDays();
		let orbitDegPerSec = (360/orbitTime)*1000;
		let orbitAngle = (orbitDegPerSec * elapsedTime) % 360;	
		
		let glObject = astro.getGLObject();
		glObject.position.x = Math.sin(orbitAngle * Math.PI / 180) * astro.getOrbitRadius();
		glObject.position.z = Math.cos(orbitAngle * Math.PI / 180) * astro.getOrbitRadius();
		glObject.position.add(orbitCentre);

		// rotation update
		let rotationTime = this.REVOLUTION_TIME*astro.getRotationTimeByEarthDays();
		let degPerSec = (360/rotationTime)*1000;
		let rotationAngle = (degPerSec * elapsedTime) % 360;
		glObject.rotation.y = rotationAngle * Math.PI / 180;
	}

	private createAstroObjMesh = function(textureLoader: any, config: MeshConfig): any {
		let geometry = new THREE.SphereGeometry( config.radius, 32, 32 );
		let material = new THREE.MeshPhongMaterial({
			map: textureLoader.load( config.map )
		});
		let mesh = new THREE.Mesh( geometry, material );
		
		mesh.planetRadius = config.radius;
	
		return mesh;
	}

	private createOrbitMesh(orbitRadius: number): any {
		let curve = new THREE.EllipseCurve(
			0, 0,
			orbitRadius, orbitRadius, 
			0, 2 * Math.PI,
			false,
			0
		);

		let path = new THREE.Path( curve.getPoints( 50 ) );
		let geometry = path.createPointsGeometry( 50 );
		let material = new THREE.LineBasicMaterial( { 
			color : 0x333333,
			transparent: true,
			opacity: 0.4
		} );
		let orbit = new THREE.Line( geometry, material );
		orbit.rotation.x = 90 * Math.PI/180; // tilt orbit vertically
			
		return orbit;
	}

	private createRingMesh = function(innerRadius: number, outerRadius: number, textureLoader: any, config: MeshConfig): any {
		let geometry = new THREE.RingGeometry( innerRadius, outerRadius );
		let material = new THREE.MeshPhongMaterial( {
			map: textureLoader.load( config.map ),
			side: THREE.DoubleSide,
			alphaMap: textureLoader.load( config.alphaMap ),
			transparent: true,
			opacity: 0.7
		} );
		let mesh = new THREE.Mesh( geometry, material );
		
		return mesh;
	}
}

// Note: is immutable
class MeshConfig {
	constructor(public radius?: number, public map?: string, public alphaMap?: string) {}
}