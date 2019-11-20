import React, { useState, useEffect, Consumer } from 'react'
import { ReceiptClient, IReceipt, Customer } from '../../ApiClient';
import { Alert } from 'antd';
import CustomerList, { customers } from '../../CustomerList';

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
        <div>
            <h2>Rachunki</h2>
            {receipts && receipts.map((receipt) => {
                const data = receipt.creationDate;
                return (
                    <div>
                        <h2>Rachunek:{' ' + data.getFullYear() + '-' + data.getMonth() + '-' +
                            data.getDay() + ' ' + data.getHours() + ':' + data.getMinutes() + ":" + data.getMinutes() + '\t'}
                            {receipt.customer!.customerSurname + " " + receipt.customer!.customerName}</h2>
                        <h3>
                            rec
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}

export default Receipts;

