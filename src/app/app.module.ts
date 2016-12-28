import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent }   from './app.component';

import { SharedModule } from './shared';
import { GLModule } from './glcomponent';

@NgModule({
	imports: [
		FormsModule,
		HttpModule,
		BrowserModule,		
		SharedModule,
		GLModule,
		routing
	],
	declarations: [
		AppComponent
	],
	providers: [
		appRoutingProviders
	], 
	exports: [],
	bootstrap: [AppComponent],
})

export class AppModule {}
