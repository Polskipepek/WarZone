import React, { useEffect, useState } from 'react';
import ReceiptTableInner from './ReceiptTableInner';
import {
    Button,
    Card,
    Col,
    Collapse,
    Icon,
    Typography
    } from 'antd';
import {
    IReceipt,
    ITransactionListDto,
    Receipt,
    TransactionClient
    } from '../../ApiClient';

interface IReceiptPanelProps {
    receipt: IReceipt;
    id: number;
}

const ReceiptPanel: React.FunctionComponent<IReceiptPanelProps> = (props: IReceiptPanelProps) => {
    const [transactions, setTransactions] = useState<ITransactionListDto[] | null>([]);

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
                <Col span={8}>
                    <Card title={getHeader()} key={props.id} style={{ width: "30vw", height: "50vh" }}>
                        <ReceiptTableInner transactions={transactions} />
                        <Button size="large" icon="edit">Edycja</Button>

                    </Card>
                </Col>
            }
        </div>)
    /* <Collapse>
                        <Collapse.Panel header={getHeader()} key={props.id} extra={genExtra()}>
                            <ReceiptTableInner transactions={transactions} />
                        </Collapse.Panel>
                    </Collapse> */
}

export default ReceiptPanel;