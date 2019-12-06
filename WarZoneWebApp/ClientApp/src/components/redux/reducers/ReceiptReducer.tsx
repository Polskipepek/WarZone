import { IReceipt, Receipt } from '../../../ApiClient';
import { ReceiptActions, ReceiptActionTypes } from '../actions/ReceiptActions';
import { Reducer } from 'redux';


// Define the Character State
export interface IReceiptState {
    readonly receipts: IReceipt[];
    selectedReceipt: IReceipt | undefined;
}

// Define the initial state
const initialReceiptState: IReceiptState = {
    receipts: [],
    selectedReceipt: undefined
};

export const receiptReducer: Reducer<IReceiptState, ReceiptActions> = (
    state = initialReceiptState,
    action
) => {
    switch (action.type) {
        case ReceiptActionTypes.GET_ALL: {
            return {
                ...state,
                receipts: action.receipts,
            };
        }
        case ReceiptActionTypes.SELECT: {
            return {
                ...state,
                selectedReceipt: action.selectedReceipt,
            };
        }
        default:
            return state;
    }
};
export default receiptReducer;