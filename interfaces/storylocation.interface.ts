import { CrudDocument } from 'wacom';

export interface Storylocation extends CrudDocument {
	order: number;
	story: string;
	thumb: string;
	name: string;
	description: string;
}
