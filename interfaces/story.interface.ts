import { CrudDocument } from 'wacom';

export interface Story extends CrudDocument {
	thumb: string;
	name: string;
	description: string;
}
