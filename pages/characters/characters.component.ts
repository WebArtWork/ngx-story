import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { StorycharacterService } from '../../services/storycharacter.service';
import { Storycharacter } from '../../interfaces/storycharacter.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { storycharacterFormComponents } from '../../formcomponents/storycharacter.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { StorylocationService } from 'src/app/modules/story/services/storylocation.service';
import { StorychangetypeService } from 'src/app/modules/story/services/storychangetype.service';
import { StorycharactertypeService } from '../../services/storycharactertype.service';

@Component({
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss'],
	standalone: false
})
export class CharactersComponent {
	story = this._router.url.includes('/characters/')
		? this._router.url.replace('/characters/', '')
		: '';

	columns = ['name'];

	showTable = false;

	form: FormInterface = this._form.getForm(
		'storycharacter',
		JSON.parse(JSON.stringify(storycharacterFormComponents))
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._storycharacterService.setPerPage.bind(
			this._storycharacterService
		),
		allDocs: false,
		create: this.story
			? (): void => {
					this._form.modal<Storycharacter>(this.form, {
						label: 'Create',
						click: async (created: unknown, close: () => void) => {
							close();

							this._preCreate(created as Storycharacter);

							await firstValueFrom(
								this._storycharacterService.create(
									created as Storycharacter
								)
							);

							this.setRows();
						}
					});
				}
			: null,
		update: (doc: Storycharacter): void => {
			this._form
				.modal<Storycharacter>(this.form, [], doc)
				.then((updated: Storycharacter) => {
					this._core.copy(updated, doc);

					this._storycharacterService.update(doc);
				});
		},
		delete: (doc: Storycharacter): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this storycharacter?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._storycharacterService.delete(doc)
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
				click: (doc: Storycharacter): void => {
					const index = this.rows.findIndex((d) => d._id === doc._id);

					[this.rows[index], this.rows[index - 1]] = [
						this.rows[index - 1],
						this.rows[index]
					];

					for (let i = 0; i < this.rows.length; i++) {
						if (this.rows[i].order !== i) {
							this.rows[i].order = i;
							this._storycharacterService.update(this.rows[i]);
						}
					}
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Storycharacter): void => {
					this._form.modalUnique<Storycharacter>(
						'storycharacter',
						'url',
						doc
					);
				}
			}
		],
		headerButtons: [
			this.story
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

	rows: Storycharacter[] = [];

	constructor(
		private _storycharacterService: StorycharacterService,
		private _types: StorycharactertypeService,
		public locationService: StorylocationService,
		public typeService: StorychangetypeService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();

		this._types.get().subscribe((types) => {
			for (const type of types) {
				this.columns.push(type.name);

				this.form.components.push({
					name: type.field,
					key: 'data.' + type.name,
					fields: [
						{
							name: 'Placeholder',
							value: `fill ${type.name} ...`
						},
						{
							name: 'Label',
							value: type.name
						},
						{
							name: 'Items',
							value: type.entities
						}
					]
				});
			}

			console.log(types, this.form.components);

			this.showTable = true;
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._storycharacterService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Storycharacter>(create ? [] : this.rows)
				.then(async (storycharacters: Storycharacter[]) => {
					if (create) {
						for (const storycharacter of storycharacters) {
							this._preCreate(storycharacter);

							await firstValueFrom(
								this._storycharacterService.create(
									storycharacter
								)
							);
						}
					} else {
						for (const storycharacter of this.rows) {
							if (
								!storycharacters.find(
									(localStorycharacter) =>
										localStorycharacter._id ===
										storycharacter._id
								)
							) {
								await firstValueFrom(
									this._storycharacterService.delete(
										storycharacter
									)
								);
							}
						}

						for (const storycharacter of storycharacters) {
							const localStorycharacter = this.rows.find(
								(localStorycharacter) =>
									localStorycharacter._id ===
									storycharacter._id
							);

							if (localStorycharacter) {
								this._core.copy(
									storycharacter,
									localStorycharacter
								);

								await firstValueFrom(
									this._storycharacterService.update(
										localStorycharacter
									)
								);
							} else if (this.story) {
								this._preCreate(storycharacter);

								await firstValueFrom(
									this._storycharacterService.create(
										storycharacter
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(storycharacter: Storycharacter): void {
		delete storycharacter.__created;

		storycharacter.story = this.story;
	}
}
