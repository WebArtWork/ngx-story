import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { StorylocationService } from '../../services/storylocation.service';
import { Storylocation } from '../../interfaces/storylocation.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { storylocationFormComponents } from '../../formcomponents/storylocation.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	templateUrl: './locations.component.html',
	styleUrls: ['./locations.component.scss'],
	standalone: false
})
export class LocationsComponent {
	columns = ['name'];

	story = this._router.url.includes('/locations/')
		? this._router.url.replace('/locations/', '')
		: '';

	form: FormInterface = this._form.getForm(
		'storylocation',
		storylocationFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._storylocationService.setPerPage.bind(
			this._storylocationService
		),
		allDocs: false,
		create: this.story
			? (): void => {
					this._form.modal<Storylocation>(this.form, {
						label: 'Create',
						click: async (created: unknown, close: () => void) => {
							close();

							this._preCreate(created as Storylocation);

							await firstValueFrom(
								this._storylocationService.create(
									created as Storylocation
								)
							);

							this.setRows();
						}
					});
				}
			: null,
		update: (doc: Storylocation): void => {
			this._form
				.modal<Storylocation>(this.form, [], doc)
				.then((updated: Storylocation) => {
					this._core.copy(updated, doc);

					this._storylocationService.update(doc);
				});
		},
		delete: (doc: Storylocation): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this storylocation?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._storylocationService.delete(doc)
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
				click: (doc: Storylocation): void => {
					const index = this.rows.findIndex((d) => d._id === doc._id);

					[this.rows[index], this.rows[index - 1]] = [
						this.rows[index - 1],
						this.rows[index]
					];

					for (let i = 0; i < this.rows.length; i++) {
						if (this.rows[i].order !== i) {
							this.rows[i].order = i;
							this._storylocationService.update(this.rows[i]);
						}
					}
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Storylocation): void => {
					this._form.modalUnique<Storylocation>(
						'storylocation',
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

	rows: Storylocation[] = [];

	constructor(
		private _storylocationService: StorylocationService,
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
				this._storylocationService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Storylocation>(create ? [] : this.rows)
				.then(async (storylocations: Storylocation[]) => {
					if (create) {
						for (const storylocation of storylocations) {
							this._preCreate(storylocation);

							await firstValueFrom(
								this._storylocationService.create(storylocation)
							);
						}
					} else {
						for (const storylocation of this.rows) {
							if (
								!storylocations.find(
									(localStorylocation) =>
										localStorylocation._id ===
										storylocation._id
								)
							) {
								await firstValueFrom(
									this._storylocationService.delete(
										storylocation
									)
								);
							}
						}

						for (const storylocation of storylocations) {
							const localStorylocation = this.rows.find(
								(localStorylocation) =>
									localStorylocation._id === storylocation._id
							);

							if (localStorylocation) {
								this._core.copy(
									storylocation,
									localStorylocation
								);

								await firstValueFrom(
									this._storylocationService.update(
										localStorylocation
									)
								);
							} else {
								this._preCreate(storylocation);

								await firstValueFrom(
									this._storylocationService.create(
										storylocation
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(storylocation: Storylocation): void {
		delete storylocation.__created;

		storylocation.story = this.story;
	}
}
