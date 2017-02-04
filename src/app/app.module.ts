import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent }   from './app.component';

import { ControlsModule } from './controls';
import { GLModule } from './glcomponent';

import { PlanetService } from './shared/services';

@NgModule({
	imports: [
		BrowserModule,		
		ControlsModule,
		GLModule,
		routing
	],
	declarations: [
		AppComponent
	],
	providers: [
		appRoutingProviders,
		PlanetService
	], 
	exports: [],
	bootstrap: [AppComponent],
})

export class AppModule {}
