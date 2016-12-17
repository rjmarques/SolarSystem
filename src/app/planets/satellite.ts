/** Holds the base definition of a planet **/
const THREE = require('three');

import { AstronomicalObject } from './astronomical-object';
import { Planet } from './planet';

export abstract class Satellite extends AstronomicalObject {

	private planet: Planet;

	constructor(planet: Planet, orbitTimeByEarthDays: number, rotationTimeByEarthDays: number, orbitRadius: number, glObject: any) {
		super(orbitTimeByEarthDays, rotationTimeByEarthDays, orbitRadius, glObject);
		this.planet = planet;
	}
	
	public getPlanet(): Planet {
		return this.planet;
	}
}