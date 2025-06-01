import { CrudDocument } from 'wacom';

export interface Storyevent extends CrudDocument {
	order: number;
	story: string;
	thumb: string;
	name: string;
	description: string;
}
