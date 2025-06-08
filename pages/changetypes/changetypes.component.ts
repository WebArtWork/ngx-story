import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorychangetypeService } from '../../services/storychangetype.service';
import { Storychangetype } from '../../interfaces/storychangetype.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { storychangetypeFormComponents } from '../../formcomponents/storychangetype.formcomponents';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { CrudComponent } from 'wacom';
import { Router } from '@angular/router';

@Component({
	imports: [CommonModule, TableModule],
	templateUrl: './changetypes.component.html',
	styleUrls: ['./changetypes.component.scss']
})
export class ChangetypesComponent extends CrudComponent<
	StorychangetypeService,
	Storychangetype,
	FormInterface
> {
	change = this._router.url.includes('type/')
		? this._router.url.replace('/change/type/', '')
		: '';

	override allowCreate(): boolean {
		return !!this.change;
	}

	override configType: 'local' | 'server' = 'local';

	columns = ['name', 'description'];

	config = this.getConfig();

	constructor(
		_storychangetypeService: StorychangetypeService,
		_translate: TranslateService,
		_form: FormService,
		private _router: Router
	) {
		super(
			storychangetypeFormComponents,
			_form,
			_translate,
			_storychangetypeService
		);

		this.setDocuments();
	}
}
