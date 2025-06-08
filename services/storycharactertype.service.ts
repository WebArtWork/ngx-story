import { Injectable } from '@angular/core';
import { Storycharactertype } from '../interfaces/storycharactertype.interface';
import { CrudService } from 'wacom';
import { storycharacterFormComponents } from '../formcomponents/storycharacter.formcomponents';

@Injectable({
	providedIn: 'root'
})
export class StorycharactertypeService extends CrudService<Storycharactertype> {
	storycharactertpess: Storycharactertype[] = this.getDocs();

	storycharactertpessByAuthor: Record<string, Storycharactertype[]> = {};

	constructor() {
		super({
			name: 'storycharactertype'
		});

		this.get().subscribe(() => {
			for (const type of this.storycharactertpess) {
				storycharacterFormComponents.components.push({
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
		});

		this.filteredDocuments(this.storycharactertpessByAuthor);
	}
}
