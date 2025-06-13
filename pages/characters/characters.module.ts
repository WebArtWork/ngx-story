import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CharactersComponent } from './characters.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CharactersComponent
	},
	{
		path: ':story',
		component: CharactersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CharactersComponent],
	providers: []
})
export class CharactersModule {}
