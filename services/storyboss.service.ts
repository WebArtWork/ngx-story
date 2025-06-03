import { Injectable } from '@angular/core';
import { Storyboss } from '../interfaces/storyboss.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StorybossService extends CrudService<Storyboss> {
	constructor() {
		super({
			name: 'storyboss',
		});
	}
}
