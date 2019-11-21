import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReceiptTableInner from './ReceiptTableInner';
import {
    Collapse,
    Divider,
    Icon,
    Table,
    Tag,
    Typography
    } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import {
    IReceipt,
    ITransaction,
    Receipt,
    TransactionClient
    } from '../../ApiClient';
import './receipt.css';

interface IReceiptPanelProps {
    receipt: IReceipt;
}

const ReceiptPanel: React.FunctionComponent<IReceiptPanelProps> = props => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

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
                <Collapse defaultActiveKey={['1']} onChange={() => { }}>
                    <Collapse.Panel header={getHeader()} key="1" extra={genExtra()}>
                        <ReceiptTableInner transactions={transactions} />
                    </Collapse.Panel>
                </Collapse>
            }
        </div>)

}

export default ReceiptPanel;