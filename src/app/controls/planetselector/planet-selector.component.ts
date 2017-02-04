import { Component } from '@angular/core';

import { PlanetService } from '../../shared/services';

@Component({
	selector: 'planet-selector',
	template: require('./planet-selector.component.html'),
	styles: [require('./planet-selector.component.scss')]
})

export class PlanetSelectorComponent {
	private opened: boolean = false;

	constructor(private planetService: PlanetService) {}

	public toggle(): void {
		this.opened = !this.opened;
	}

	public isOpen(): boolean {
		return this.opened;
	}

	public getPlanetList(): string[] {
		return this.planetService.getPlanetList();
	}

	public selectPlanet(name: string) {
		this.planetService.select(name);
	}
}