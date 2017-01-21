import { Planet } from '../planet';

export class Earth extends Planet {	
	constructor(glObject: any) {
		super(365, 1, 1600, glObject, null);
	}
}