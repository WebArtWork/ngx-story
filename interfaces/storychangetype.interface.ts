import { CrudDocument } from 'wacom';

export interface Storychangetype extends CrudDocument {
	order: number;
	story: string;
	change: string;
	thumb: string;
	name: string;
	description: string;
}
