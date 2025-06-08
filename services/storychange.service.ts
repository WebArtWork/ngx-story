import { Injectable } from '@angular/core';
import { Storychange } from '../interfaces/storychange.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StorychangeService extends CrudService<Storychange> {
	storychanges: Storychange[] = this.getDocs();

	storychangesByAuthor: Record<string, Storychange[]> = {};

	constructor() {
		super({
			name: 'storychange',
		});

		this.get();

		this.filteredDocuments(this.storychangesByAuthor);
	}
}
