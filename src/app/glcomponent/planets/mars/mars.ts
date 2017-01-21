import { Planet } from '../planet';

export class Mars extends Planet {	
	constructor(glObject: any) {
		super(687, 1.027, 2400, glObject, null);
	}
}