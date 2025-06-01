import { Injectable } from '@angular/core';
import { Storycharacter } from '../interfaces/storycharacter.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StorycharacterService extends CrudService<Storycharacter> {
	constructor() {
		super({
			name: 'storycharacter',
		});
	}
}
