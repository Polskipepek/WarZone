import { Service } from './Service';
import { Receipt } from './Receipt';
import { ModelBase } from './ModelBase';
export interface Transaction extends ModelBase {
	
		serviceId: number;
		receiptId: number;
		service: Service;
		receipt: Receipt;
}
