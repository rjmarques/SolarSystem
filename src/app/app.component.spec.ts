import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from './shared';
import { GLModule } from './glcomponent';

import { AppComponent } from './app.component';

describe('App', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				GLModule,
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