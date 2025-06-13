import { CrudDocument } from 'wacom';

export interface Storyboss extends CrudDocument {
	story: string;
	thumb: string;
	name: string;
	description: string;
}
