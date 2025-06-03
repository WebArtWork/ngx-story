import { Routes } from '@angular/router';
import { SkillsComponent } from './skills.component';

export const skillsRoutes: Routes = [
	{
		path: '',
		component: SkillsComponent
	},
	{
		path: ':story',
		component: SkillsComponent
	}
];
