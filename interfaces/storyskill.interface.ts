import { CrudDocument } from 'wacom';

export interface Storyskill extends CrudDocument {
	story: string;
	name: string;
	description: string;
}
