

import { Customer } from './Customer';
import { Service } from './Service';
import { Receipt } from './Receipt';
import { ModelBase } from './ModelBase';
export interface Transaction extends ModelBase {
	
		customerId: number;
		serviceId: number;
		receiptId: number;
		customer: Customer;
		service: Service;
		receipt: Receipt;
}
