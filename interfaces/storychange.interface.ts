import { CrudDocument } from 'wacom';

export interface Storychange extends CrudDocument {
	name: string;
	description: string;
}
