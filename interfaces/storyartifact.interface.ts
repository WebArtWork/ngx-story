import { CrudDocument } from 'wacom';

export interface Storyartifact extends CrudDocument {
	story: string;
	thumb: string;
	name: string;
	description: string;
}
