import { CrudDocument } from 'wacom';

export interface Storyskill extends CrudDocument {
	story: string;
	thumb: string;
	name: string;
	description: string;
}
