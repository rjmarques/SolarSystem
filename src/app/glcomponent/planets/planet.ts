/** Holds the base definition of a planet **/
const THREE = require('three');

import { AstronomicalObject } from './astronomical-object';
import { Satellite } from './satellite';

export abstract class Planet extends AstronomicalObject {

	private ring: any = null;
	private satellites: Satellite[] = [];

	constructor(orbitTimeByEarthDays: number, rotationTimeByEarthDays: number, orbitRadius: number, glObject: any, ring: any) {
		super(orbitTimeByEarthDays, rotationTimeByEarthDays, orbitRadius, glObject);
		this.ring = ring;
	}

	public addSatellite(satellite: Satellite): void {
		this.satellites.push(satellite);
	}

	public getSatellites(): Satellite[] {
		return this.satellites;
	}

	public getGLRing() {
		return this.ring;
	}
}