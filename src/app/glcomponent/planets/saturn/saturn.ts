import { Planet } from '../planet';

export class Saturn extends Planet {	
	constructor(glObject: any, glRing: any) {
		super(10752.9, 0.44, 7200, glObject, glRing);
	}
}