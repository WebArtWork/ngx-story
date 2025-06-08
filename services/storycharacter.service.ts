import { Injectable } from '@angular/core';
import { Storycharacter } from '../interfaces/storycharacter.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class StorycharacterService extends CrudService<Storycharacter> {
	storycharacters: Storycharacter[] = this.getDocs();

	storycharactersByAuthor: Record<string, Storycharacter[]> = {};

	constructor() {
		super({
			name: 'storycharacter'
		});

		this.get();

		this.filteredDocuments(this.storycharactersByAuthor);
	}
}
