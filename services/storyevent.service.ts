import { Injectable } from '@angular/core';
import { Storyevent } from '../interfaces/storyevent.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StoryeventService extends CrudService<Storyevent> {
	constructor() {
		super({
			name: 'storyevent',
		});
	}
}
