import { Satellite } from '../satellite';
import { Planet } from '../planet';

export class Luna extends Satellite {	
	constructor(planet: Planet, glObject: any) {
		super(planet, 27.33, 27.33, 80, glObject);
	}
}