import CustomerList, { customers } from '../../CustomerList';
import React, { Consumer, useEffect, useState } from 'react';
import ReceiptPanel from '../receipt/ReceiptPanel';
import { Alert } from 'antd';
import { connect } from 'react-redux';
import { Customer, IReceipt, ReceiptClient } from '../../ApiClient';
import { IAppState } from '../redux/Store';
import '../receipt/receipt.css';

export interface IReceiptsProps {
    receipts: IReceipt[],
    selectedReceipt: IReceipt | undefined
}

const Receipts: React.FunctionComponent<IReceiptsProps> = (props: IReceiptsProps) => {
    const [selectedReceipt, setSelectedReceipt] = useState<IReceipt>();

    /* const CreateReceipt = () => {
         console.log("szukamm");
         new ReceiptClient().getReceipts().then(e => {
             console.log(e);
             setReceipts(e);
         });
     }*/

    useEffect(() => {
        // CreateReceipt();
    }, []);


    return (
        <div className="receiptsGrid">
            {props.receipts && props.receipts.map((receipt, index) => {

                const data = receipt.creationDate;
                return (
                    <React.Fragment>
                        {/*                         <h3>Rachunek:{' ' + data.getFullYear() + '-' + data.getMonth() + '-' +
                            data.getDay() + ' ' + data.getHours() + ':' + data.getMinutes() + ":" + data.getMinutes() + '\t'}
                            {receipt.customer!.customerSurname + " " + receipt.customer!.customerName}</h3> */}
                        <ReceiptPanel receipt={receipt} id={index} selectReceipt={(xd) => { }} />
                    </React.Fragment>
                );
            })}
        </div>

    );
}
const mapStateToProps = (store: IAppState) => {
    const ret: IReceiptsProps = {
        receipts: store.receiptState.receipts,
        selectedReceipt: store.receiptState.selectedReceipt
    }
    return ret;
};

const mapDispatchToProps = (dispatch: any) => ({
    selectedReceipt: (f: any) => { return f.target.selectedReceipt },
});

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
//export default Receipts;

