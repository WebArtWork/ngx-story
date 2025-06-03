import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryartifactService } from '../../services/storyartifact.service';
import { Storyartifact } from '../../interfaces/storyartifact.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { storyartifactFormComponents } from '../../formcomponents/storyartifact.formcomponents';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { CrudComponent } from 'wacom';
import { Router } from '@angular/router';

@Component({
	imports: [CommonModule, TableModule],
	templateUrl: './artifacts.component.html',
	styleUrls: ['./artifacts.component.scss']
})
export class ArtifactsComponent extends CrudComponent<
	StoryartifactService,
	Storyartifact,
	FormInterface
> {
	story = this._router.url.includes('skills/')
		? this._router.url.replace('/skills/', '')
		: '';

	columns = ['name'];

	config = this.getConfig();

	constructor(
		_storyartifactService: StoryartifactService,
		_translate: TranslateService,
		_form: FormService,
		private _router: Router
	) {
		super(
			storyartifactFormComponents,
			_form,
			_translate,
			_storyartifactService
		);

		this.setDocuments();
	}

	override allowCreate(): boolean {
		return !!this.story;
	}

	override preCreate(doc: Storyartifact): void {
		delete doc.__created;

		doc.story = this.story;
	}

	override allowUrl(): boolean {
		return false;
	}
}
