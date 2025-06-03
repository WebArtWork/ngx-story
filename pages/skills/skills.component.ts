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

@Component({
	imports: [CommonModule, TableModule],
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent extends CrudComponent<
	StoryskillService,
	Storyskill,
	FormInterface
> {
	columns = ['name', 'description'];

	config = {
		...this.getConfig(),
	};

	constructor(
		_storyskillService: StoryskillService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(storyskillFormComponents, _form, _translate, _storyskillService);

		this.setDocuments();
	}
}
