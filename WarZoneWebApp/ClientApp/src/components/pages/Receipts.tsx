import CustomerList, { customers } from '../../CustomerList';
import React, { Consumer, useEffect, useState } from 'react';
import ReceiptPanel from '../receipt/ReceiptPanel';
import { Alert } from 'antd';
import { Customer, IReceipt, ReceiptClient } from '../../ApiClient';
import '../receipt/receipt.css';

const Receipts: React.FunctionComponent = props => {
    const [receipts, setReceipts] = useState<IReceipt[]>([]);

    const CreateReceipt = () => {
        console.log("szukamm");
        new ReceiptClient().getReceipts().then(e => {
            console.log(e);
            setReceipts(e);
        });
    }

    useEffect(() => {
        CreateReceipt();
    }, []);


    return (
        <div className="receiptsGrid">
            {receipts && receipts.map((receipt) => {
                const data = receipt.creationDate;
                return (
                    <React.Fragment>
                        {/*                         <h3>Rachunek:{' ' + data.getFullYear() + '-' + data.getMonth() + '-' +
                            data.getDay() + ' ' + data.getHours() + ':' + data.getMinutes() + ":" + data.getMinutes() + '\t'}
                            {receipt.customer!.customerSurname + " " + receipt.customer!.customerName}</h3> */}
                        <ReceiptPanel receipt={receipt} />
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default Receipts;

