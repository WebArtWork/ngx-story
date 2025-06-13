import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ChangesComponent } from './changes.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ChangesComponent
	},
	{
		path: ':_id',
		component: ChangesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ChangesComponent],
	providers: []
})
export class ChangesModule {}
