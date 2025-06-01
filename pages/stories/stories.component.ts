import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { StoryService } from '../../services/story.service';
import { Story } from '../../interfaces/story.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { storyFormComponents } from '../../formcomponents/story.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './stories.component.html',
	styleUrls: ['./stories.component.scss'],
	standalone: false
})
export class StoriesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('story', storyFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._storyService.setPerPage.bind(this._storyService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Story>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Story);

					await firstValueFrom(
						this._storyService.create(created as Story)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Story): void => {
			this._form
				.modal<Story>(this.form, [], doc)
				.then((updated: Story) => {
					this._core.copy(updated, doc);

					this._storyService.update(doc);
				});
		},
		delete: (doc: Story): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this story?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._storyService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'track_changes',
				hrefFunc: (doc: Story): string => {
					return '/changes/' + doc._id;
				}
			},
			{
				icon: 'place',
				hrefFunc: (doc: Story): string => {
					return '/locations/' + doc._id;
				}
			},
			{
				icon: 'person',
				hrefFunc: (doc: Story): string => {
					return '/characters/' + doc._id;
				}
			},
			{
				icon: 'event',
				hrefFunc: (doc: Story): string => {
					return '/events/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Story): void => {
					this._form.modalUnique<Story>('story', 'url', doc);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Story[] = [];

	constructor(
		private _translate: TranslateService,
		private _storyService: StoryService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._storyService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Story>(create ? [] : this.rows)
				.then(async (storys: Story[]) => {
					if (create) {
						for (const story of storys) {
							this._preCreate(story);

							await firstValueFrom(
								this._storyService.create(story)
							);
						}
					} else {
						for (const story of this.rows) {
							if (
								!storys.find(
									(localStory) => localStory._id === story._id
								)
							) {
								await firstValueFrom(
									this._storyService.delete(story)
								);
							}
						}

						for (const story of storys) {
							const localStory = this.rows.find(
								(localStory) => localStory._id === story._id
							);

							if (localStory) {
								this._core.copy(story, localStory);

								await firstValueFrom(
									this._storyService.update(localStory)
								);
							} else {
								this._preCreate(story);

								await firstValueFrom(
									this._storyService.create(story)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(story: Story): void {
		delete story.__created;
	}
}
