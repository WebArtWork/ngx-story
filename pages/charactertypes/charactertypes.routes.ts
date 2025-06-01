import { Routes } from '@angular/router';
import { CharactertypesComponent } from './charactertypes.component';

export const charactertypesRoutes: Routes = [
	{
		path: '',
		component: CharactertypesComponent
	},
	{
		path: ':story',
		component: CharactertypesComponent
	}
];
