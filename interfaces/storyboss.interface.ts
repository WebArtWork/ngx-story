import { CrudDocument } from 'wacom';

export interface Storyboss extends CrudDocument {
	name: string;
	description: string;
}
