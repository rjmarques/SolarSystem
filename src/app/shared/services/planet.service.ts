import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlanetService {

	private currentPlanet: string;
	private currentPlanetSource = new Subject<string>();

	public currentPlanet$ = this.currentPlanetSource.asObservable();

  	public select(planet: string) {
		this.currentPlanet = planet;
		this.currentPlanetSource.next(this.currentPlanet);
	}

	public getCurrentPlanet(): string {
		return this.currentPlanet;
	}

	public getPlanetList(): string[] {
		return [
			'mercury',
			'venus',
			'earth',
			'mars',
			'jupiter',
			'saturn',
			'uranus',
			'neptune'
			//'pluto' sorry Pluto... =(
		];
	}
}