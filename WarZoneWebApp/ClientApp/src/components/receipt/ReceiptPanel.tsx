import React, { useEffect, useState } from 'react';
import ReceiptTableInner from './ReceiptTableInner';
import { Collapse, Icon, Typography } from 'antd';
import {
    IReceipt,
    ITransaction,
    Receipt,
    TransactionClient
    } from '../../ApiClient';
import './receipt.css';

interface IReceiptPanelProps {
    receipt: IReceipt;
    id: number;
}

const ReceiptPanel: React.FunctionComponent<IReceiptPanelProps> = (props: IReceiptPanelProps) => {
    const [transactions, setTransactions] = useState<ITransaction[] | null>([]);

    useEffect(() => {
        new TransactionClient().getTransactions(props.receipt as Receipt).then((_transactions) => {
            setTransactions(_transactions);
        })
    }, []);

    const genExtra = () => (
        <Icon
            type="setting"
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );



    const getHeader = () => {
        return (
            <Typography.Title style={{ textAlign: "center", fontSize: 25 }}>
                {`${props.receipt.customer!.customerName} ${props.receipt.customer!.customerSurname} ${props.receipt.creationDate.toLocaleDateString("pl-PL")}
                ${props.receipt.creationDate.toLocaleTimeString("pl-PL")}  ${props.receipt.totalPrice} zł`}
            </Typography.Title>
        );
    }

    return (
        <div className="receiptPanel">
            {transactions &&
                <Collapse>
                    <Collapse.Panel header={getHeader()} key={props.id} extra={genExtra()}>
                        <ReceiptTableInner transactions={transactions} />
                    </Collapse.Panel>
                </Collapse>
            }
        </div>)

}

export default ReceiptPanel;