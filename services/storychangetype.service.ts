import { Injectable } from '@angular/core';
import { Storychangetype } from '../interfaces/storychangetype.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StorychangetypeService extends CrudService<Storychangetype> {
	constructor() {
		super({
			name: 'storychangetype',
		});
	}
}
