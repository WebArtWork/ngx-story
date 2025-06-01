import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TypesComponent } from './types.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TypesComponent
	},
	{
		path: ':change',
		component: TypesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TypesComponent],
	providers: []
})
export class TypesModule {}
