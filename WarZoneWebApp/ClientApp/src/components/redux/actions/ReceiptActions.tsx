import { ActionCreator, Dispatch } from 'redux';
import { IReceipt, ReceiptClient } from '../../../ApiClient';
import { IReceiptState } from '../reducers/ReceiptReducer';
import { ThunkAction } from 'redux-thunk';
import { type } from 'os';

// Import Receipt Typing

// Create Action Constants
export enum ReceiptActionTypes {
    GET_ALL = 'GET_ALL',
    SELECT = 'SELECT',
}

// Interface for Get All Action Type
export interface IReceiptGetAllAction {
    type: ReceiptActionTypes.GET_ALL;
    receipts: IReceipt[];
}
export interface IReceiptSelectReceiptAction {
    type: ReceiptActionTypes.SELECT;
    selectedReceipt: IReceipt | undefined;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type ReceiptActions = IReceiptGetAllAction & IReceiptSelectReceiptAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllReceipts: ActionCreator<ThunkAction<Promise<any>, IReceiptState, null, IReceiptGetAllAction>> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await new ReceiptClient().getReceipts();
            dispatch({
                receipts: response,
                type: ReceiptActionTypes.GET_ALL,
            });
        } catch (err) {
            console.error(err);
        }
    };
};

export const selectReceiptAction = (type: ReceiptActionTypes.SELECT, selectedReceipt: IReceipt | undefined) => {
    alert(" okurwa ja pierdole jest: " + (selectReceiptAction ? selectReceiptAction!.name : "pusty kyrwa"));
    const ret: IReceiptSelectReceiptAction = {
        type: ReceiptActionTypes.SELECT,
        selectedReceipt: selectedReceipt
    };
    return ret;
}
