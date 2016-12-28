import { Planet } from '../planet';

export class Venus extends Planet {	
	constructor(glObject: any) {
		super(224.7, -243.02, 200, glObject, null);
	}
}