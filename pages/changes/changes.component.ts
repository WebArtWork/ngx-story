import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { StorychangeService } from '../../services/storychange.service';
import { Storychange } from '../../interfaces/storychange.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { storychangeFormComponents } from '../../formcomponents/storychange.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	templateUrl: './changes.component.html',
	styleUrls: ['./changes.component.scss'],
	standalone: false,
})
export class ChangesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('storychange', storychangeFormComponents);

	story = this._router.url.includes('/changes/') ? this._router.url.replace('/changes/', '') : '';

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._storychangeService.setPerPage.bind(this._storychangeService),
		allDocs: false,
		create: this.story ? (): void => {
			this._form.modal<Storychange>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Storychange);

					await firstValueFrom(
						this._storychangeService.create(created as Storychange)
					);

					this.setRows();
				},
			});
		} : null,
		update: (doc: Storychange): void => {
			this._form
				.modal<Storychange>(this.form, [], doc)
				.then((updated: Storychange) => {
					this._core.copy(updated, doc);

					this._storychangeService.update(doc);
				});
		},
		delete: (doc: Storychange): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this storychange?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._storychangeService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'style',
				hrefFunc: (doc: Storychange): string => {
					return '/types/' + doc._id;
				},
			},
			{
				icon: 'cloud_download',
				click: (doc: Storychange): void => {
					this._form.modalUnique<Storychange>('storychange', 'url', doc);
				},
			},
		],
		headerButtons: [
			this.story ? {
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			} : null,
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			}
		],
	};

	rows: Storychange[] = [];

	constructor(
		private _storychangeService: StorychangeService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._storychangeService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Storychange>(create ? [] : this.rows)
				.then(async (storychanges: Storychange[]) => {
					if (create) {
						for (const storychange of storychanges) {
							this._preCreate(storychange);

							await firstValueFrom(
								this._storychangeService.create(storychange)
							);
						}
					} else {
						for (const storychange of this.rows) {
							if (
								!storychanges.find(
									(localStorychange) => localStorychange._id === storychange._id
								)
							) {
								await firstValueFrom(
									this._storychangeService.delete(storychange)
								);
							}
						}

						for (const storychange of storychanges) {
							const localStorychange = this.rows.find(
								(localStorychange) => localStorychange._id === storychange._id
							);

							if (localStorychange) {
								this._core.copy(storychange, localStorychange);

								await firstValueFrom(
									this._storychangeService.update(localStorychange)
								);
							} else {
								this._preCreate(storychange);

								await firstValueFrom(
									this._storychangeService.create(storychange)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(storychange: Storychange): void {
		delete storychange.__created;

		storychange.story = this.story;
	}
}
