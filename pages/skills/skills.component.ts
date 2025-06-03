import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryskillService } from '../../services/storyskill.service';
import { Storyskill } from '../../interfaces/storyskill.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { storyskillFormComponents } from '../../formcomponents/storyskill.formcomponents';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { CrudComponent } from 'wacom';
import { Router } from '@angular/router';

@Component({
	imports: [CommonModule, TableModule],
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.scss']
})
export class SkillsComponent extends CrudComponent<
	StoryskillService,
	Storyskill,
	FormInterface
> {
	story = this._router.url.includes('skills/')
		? this._router.url.replace('/skills/', '')
		: '';

	columns = ['name'];

	config = this.getConfig();

	constructor(
		_storyskillService: StoryskillService,
		_translate: TranslateService,
		_form: FormService,
		private _router: Router
	) {
		super(storyskillFormComponents, _form, _translate, _storyskillService);

		this.setDocuments();
	}

	override allowCreate(): boolean {
		return !!this.story;
	}

	override preCreate(doc: Storyskill): void {
		delete doc.__created;

		doc.story = this.story;
	}

	override allowUrl(): boolean {
		return false;
	}
}
