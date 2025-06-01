import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { LocationsComponent } from './locations.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: LocationsComponent
	},
	{
		path: ':story',
		component: LocationsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [LocationsComponent],
	providers: []
})
export class LocationsModule {}
