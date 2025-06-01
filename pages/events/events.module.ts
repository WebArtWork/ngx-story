import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { EventsComponent } from './events.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: EventsComponent
	},
	{
		path: ':story',
		component: EventsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [EventsComponent],
	providers: []
})
export class EventsModule {}
