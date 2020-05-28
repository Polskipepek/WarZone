import { ModelBase } from './ModelBase';

export interface Receipt extends ModelBase {
	
	creationDate: Date;
	modifyDate: Date;
	closeDate?: Date;
	totalPrice: number;
}
