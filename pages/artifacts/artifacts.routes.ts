import { Routes } from '@angular/router';
import { ArtifactsComponent } from './artifacts.component';

export const artifactsRoutes: Routes = [
	{
		path: '',
		component: ArtifactsComponent
	},
	{
		path: ':story',
		component: ArtifactsComponent
	}
];
