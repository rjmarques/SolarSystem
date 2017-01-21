import { Planet } from '../planet';

export class Neptune extends Planet {	
	constructor(glObject: any) {
		super(60190, 0.67, 16000, glObject, null);
	}
}