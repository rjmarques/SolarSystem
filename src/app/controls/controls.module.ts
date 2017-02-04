import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ControlsComponent } from './controls.component';
import { PlanetSelectorComponent } from './planetselector';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		ControlsComponent
	],
	declarations: [
		PlanetSelectorComponent,
		ControlsComponent
	]
})

export class ControlsModule { } 