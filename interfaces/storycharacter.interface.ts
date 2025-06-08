import { CrudDocument } from 'wacom';

export interface Storycharacter extends CrudDocument {
	order: number;
	story: string;
	thumb: string;
	name: string;
	description: string;
	data: Record<string, unknown>;
}
