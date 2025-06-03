import { CrudDocument } from 'wacom';

export interface Storyskill extends CrudDocument {
	name: string;
	description: string;
}
