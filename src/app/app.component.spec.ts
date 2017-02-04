import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ControlsModule } from './controls';
import { GLModule } from './glcomponent';
import { PlanetService } from './shared/services';

import { AppComponent } from './app.component';

describe('App', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				ControlsModule,
				GLModule,
			],
			providers: [
				PlanetService
			],
			declarations: [
				AppComponent
			]		 
		});
	});
	it ('should work', () => {
		let fixture = TestBed.createComponent(AppComponent);
		expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
	});
});