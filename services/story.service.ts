import { Injectable } from '@angular/core';
import { Story } from '../interfaces/story.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StoryService extends CrudService<Story> {
	constructor() {
		super({
			name: 'story',
		});
	}
}
