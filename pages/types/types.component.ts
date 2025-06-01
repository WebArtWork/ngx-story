import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { StorychangetypeService } from '../../services/storychangetype.service';
import { Storychangetype } from '../../interfaces/storychangetype.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { storychangetypeFormComponents } from '../../formcomponents/storychangetype.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { StorychangeService } from 'src/app/modules/story/services/storychange.service';

@Component({
	templateUrl: './types.component.html',
	styleUrls: ['./types.component.scss'],
	standalone: false
})
export class TypesComponent {
	change = this._router.url.includes('/types/')
		? this._router.url.replace('/types/', '')
		: '';

	story: string;

	columns = ['name'];

	form: FormInterface = this._form.getForm(
		'storychangetype',
		storychangetypeFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._storychangetypeService.setPerPage.bind(
			this._storychangetypeService
		),
		allDocs: false,
		create: this.change
			? (): void => {
					this._form.modal<Storychangetype>(this.form, {
						label: 'Create',
						click: async (created: unknown, close: () => void) => {
							close();

							this._preCreate(created as Storychangetype);

							await firstValueFrom(
								this._storychangetypeService.create(
									created as Storychangetype
								)
							);

							this.setRows();
						}
					});
				}
			: null,
		update: (doc: Storychangetype): void => {
			this._form
				.modal<Storychangetype>(this.form, [], doc)
				.then((updated: Storychangetype) => {
					this._core.copy(updated, doc);

					this._storychangetypeService.update(doc);
				});
		},
		delete: (doc: Storychangetype): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this storychangetype?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._storychangetypeService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'arrow_upward',
				click: (doc: Storychangetype): void => {
					const index = this.rows.findIndex((d) => d._id === doc._id);

					[this.rows[index], this.rows[index - 1]] = [
						this.rows[index - 1],
						this.rows[index]
					];

					for (let i = 0; i < this.rows.length; i++) {
						if (this.rows[i].order !== i) {
							this.rows[i].order = i;
							this._storychangetypeService.update(this.rows[i]);
						}
					}
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Storychangetype): void => {
					this._form.modalUnique<Storychangetype>(
						'storychangetype',
						'url',
						doc
					);
				}
			}
		],
		headerButtons: [
			this.change
				? {
						icon: 'playlist_add',
						click: this._bulkManagement(),
						class: 'playlist'
					}
				: null,
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Storychangetype[] = [];

	constructor(
		private _storychangetypeService: StorychangetypeService,
		private _storychangeService: StorychangeService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();

		if (this.change) {
			this._storychangeService
				.fetch({
					_id: this.change
				})
				.subscribe((change) => {
					if (change) {
						this.story = change.story;
					}
				});
		}
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._storychangetypeService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Storychangetype>(create ? [] : this.rows)
				.then(async (storychangetypes: Storychangetype[]) => {
					if (create) {
						for (const storychangetype of storychangetypes) {
							this._preCreate(storychangetype);

							await firstValueFrom(
								this._storychangetypeService.create(
									storychangetype
								)
							);
						}
					} else {
						for (const storychangetype of this.rows) {
							if (
								!storychangetypes.find(
									(localStorychangetype) =>
										localStorychangetype._id ===
										storychangetype._id
								)
							) {
								await firstValueFrom(
									this._storychangetypeService.delete(
										storychangetype
									)
								);
							}
						}

						for (const storychangetype of storychangetypes) {
							const localStorychangetype = this.rows.find(
								(localStorychangetype) =>
									localStorychangetype._id ===
									storychangetype._id
							);

							if (localStorychangetype) {
								this._core.copy(
									storychangetype,
									localStorychangetype
								);

								await firstValueFrom(
									this._storychangetypeService.update(
										localStorychangetype
									)
								);
							} else if (this.story) {
								this._preCreate(storychangetype);

								await firstValueFrom(
									this._storychangetypeService.create(
										storychangetype
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(storychangetype: Storychangetype): void {
		delete storychangetype.__created;

		storychangetype.story = this.story;

		storychangetype.change = this.change;
	}
}
