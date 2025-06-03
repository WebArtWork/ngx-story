import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryService } from '../../services/story.service';
import { Story } from '../../interfaces/story.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { storyFormComponents } from '../../formcomponents/story.formcomponents';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { CrudComponent } from 'wacom';

@Component({
	imports: [CommonModule, TableModule],
	templateUrl: './stories.component.html',
	styleUrls: ['./stories.component.scss']
})
export class StoriesComponent extends CrudComponent<
	StoryService,
	Story,
	FormInterface
> {
	columns = ['name'];

	config = this.getConfig();

	constructor(
		_storyService: StoryService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(storyFormComponents, _form, _translate, _storyService);

		this.setDocuments();

		this.config.buttons.push(
			...[
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
					icon: 'category',
					hrefFunc: (doc: Story): string => {
						return '/character/types/' + doc._id;
					}
				},
				{
					icon: 'event',
					hrefFunc: (doc: Story): string => {
						return '/events/' + doc._id;
					}
				},
				{
					icon: 'sports_martial_arts',
					hrefFunc: (doc: Story): string => {
						return '/bosses/' + doc._id;
					}
				},
				{
					icon: 'psychology',
					hrefFunc: (doc: Story): string => {
						return '/skills/' + doc._id;
					}
				}
			]
		);
	}
}
