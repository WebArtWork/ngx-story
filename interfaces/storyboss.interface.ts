import { CrudDocument } from 'wacom';

export interface Storyboss extends CrudDocument {
	story: string;
	name: string;
	description: string;
}
