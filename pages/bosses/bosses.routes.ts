import { Routes } from '@angular/router';
import { BossesComponent } from './bosses.component';

export const bossesRoutes: Routes = [
	{
		path: '',
		component: BossesComponent
	},
	{
		path: ':story',
		component: BossesComponent
	}
];
