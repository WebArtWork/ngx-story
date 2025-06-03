import { Injectable } from '@angular/core';
import { Storyartifact } from '../interfaces/storyartifact.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StoryartifactService extends CrudService<Storyartifact> {
	constructor() {
		super({
			name: 'storyartifact',
		});
	}
}
