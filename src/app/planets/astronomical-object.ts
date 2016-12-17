/** Holds the base definition of a generic astronomical object **/
export abstract class AstronomicalObject {
	/**
	 * rotationTimeByEarthDays - how many earth days it takes for a full rotation
	 * orbitTimeByEarthDays - how many earth days it takes for a full orbit
	 * glObject - webgl object representation
	 */
	constructor(private orbitTimeByEarthDays: number, private rotationTimeByEarthDays: number, private orbitRadius: number, private glObject: any) {}

	public getOrbitRadius(): number {
		return this.orbitRadius;
	}

	public getRotationTimeByEarthDays(): number {
		return this.rotationTimeByEarthDays;
	}

	public getOrbitTimeByEarthDays(): number {
		return this.orbitTimeByEarthDays;
	}

	public getGLObject(): any {
		return this.glObject;
	}
}