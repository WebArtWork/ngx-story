import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorybossService } from '../../services/storyboss.service';
import { Storyboss } from '../../interfaces/storyboss.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { storybossFormComponents } from '../../formcomponents/storyboss.formcomponents';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { CrudComponent } from 'wacom';
import { Router } from '@angular/router';

@Component({
	imports: [CommonModule, TableModule],
	templateUrl: './bosses.component.html',
	styleUrls: ['./bosses.component.scss']
})
export class BossesComponent extends CrudComponent<
	StorybossService,
	Storyboss,
	FormInterface
> {
	story = this._router.url.includes('bosses/')
		? this._router.url.replace('/bosses/', '')
		: '';

	columns = ['name'];

	config = this.getConfig();

	constructor(
		_storybossService: StorybossService,
		_translate: TranslateService,
		_form: FormService,
		private _router: Router
	) {
		super(storybossFormComponents, _form, _translate, _storybossService);

		this.setDocuments();
	}

	override allowCreate(): boolean {
		return !!this.story;
	}

	override preCreate(doc: Storyboss): void {
		delete doc.__created;

		doc.story = this.story;
	}

	override allowUrl(): boolean {
		return false;
	}
}
