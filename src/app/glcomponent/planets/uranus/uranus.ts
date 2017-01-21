import { Planet } from '../planet';

export class Uranus extends Planet {	
	constructor(glObject: any) {
		super(30685, -0.72, 10000, glObject, null);
	}
}