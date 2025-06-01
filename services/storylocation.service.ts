import { Injectable } from '@angular/core';
import { Storylocation } from '../interfaces/storylocation.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class StorylocationService extends CrudService<Storylocation> {
	constructor() {
		super({
			name: 'storylocation',
		});
	}
}
