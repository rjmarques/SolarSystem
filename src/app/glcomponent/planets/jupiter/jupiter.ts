import { Planet } from '../planet';

export class Jupiter extends Planet {	
	constructor(glObject: any) {
		super(4222.16, 0.41, 4400, glObject, null);
	}
}