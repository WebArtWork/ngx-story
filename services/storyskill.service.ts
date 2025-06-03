import { Injectable } from '@angular/core';
import { Storyskill } from '../interfaces/storyskill.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StoryskillService extends CrudService<Storyskill> {
	constructor() {
		super({
			name: 'storyskill',
		});
	}
}
