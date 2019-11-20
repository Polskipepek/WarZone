

import { Customer } from './Customer';
import { ModelBase } from './ModelBase';
export interface Receipt extends ModelBase {
	
		creationDate: Date;
		modifyDate: Date;
		closeDate?: Date;
		customerId: number;
		customer: Customer;
}
