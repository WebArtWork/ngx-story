import { Injectable } from '@angular/core';
import { Storychange } from '../interfaces/storychange.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StorychangeService extends CrudService<Storychange> {
	constructor() {
		super({
			name: 'storychange',
		});
	}
}
