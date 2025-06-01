import { CrudDocument } from 'wacom';

export interface Storychange extends CrudDocument {
	story: string;
	name: string;
	description: string;
}
