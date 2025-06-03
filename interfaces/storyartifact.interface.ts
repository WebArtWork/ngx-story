import { CrudDocument } from 'wacom';

export interface Storyartifact extends CrudDocument {
	story: string;
	name: string;
	description: string;
}
