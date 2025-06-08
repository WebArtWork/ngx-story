import { Injectable } from '@angular/core';
import { Storychangetype } from '../interfaces/storychangetype.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StorychangetypeService extends CrudService<Storychangetype> {
	storychangetypes: Storychangetype[] = this.getDocs();

	storychangetypesByAuthor: Record<string, Storychangetype[]> = {};

	constructor() {
		super({
			name: 'storychangetype',
		});

		this.get();

		this.filteredDocuments(this.storychangetypesByAuthor);
	}
}
