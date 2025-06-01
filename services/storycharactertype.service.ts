import { Injectable } from '@angular/core';
import { Storycharactertype } from '../interfaces/storycharactertype.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StorycharactertypeService extends CrudService<Storycharactertype> {
	constructor() {
		super({
			name: 'storycharactertype',
		});
	}
}
