import { CrudDocument } from 'wacom';

export interface Storychangetype extends CrudDocument {
	name: string;
	description: string;
	change: string;
	thumb: string;
}
