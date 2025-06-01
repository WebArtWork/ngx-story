import { CrudDocument } from 'wacom';

export interface Storycharactertype extends CrudDocument {
	story: string;
	name: string;
	field: string;
	entities: string[];
}
