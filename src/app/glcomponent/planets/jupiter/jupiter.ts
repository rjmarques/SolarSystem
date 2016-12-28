import { Planet } from '../planet';

export class Jupiter extends Planet {	
	constructor(glObject: any) {
		super(4222.16, 0.41, 1100, glObject, null);
	}
}