import EditReceiptPanelModal from './EditReceiptPanelModal';
import Icon from '@ant-design/icons/lib/components/Icon';
import React, { useContext, useEffect, useState } from 'react';
import ReceiptDetails from './ReceiptDetails';
import ReceiptTableInner from './ReceiptTableInner';
import { AppContext, IAppContext } from '../../App';
import {
    Button,
    Card,
    Col,
    Collapse,
    Typography
    } from 'antd';
import { EditOutlined } from '@ant-design/icons';
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
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);

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
        if (selectedReceipt === undefined) {
            return (
                <Typography.Title style={{ textAlign: "center", fontSize: 25 }}>
                    {`${props.receipt.customer!.customerName} ${props.receipt.customer!.customerSurname} ${props.receipt.creationDate.toLocaleDateString("pl-PL")}
                ${props.receipt.creationDate.toLocaleTimeString("pl-PL")}  ${props.receipt.totalPrice} zł`}
                </Typography.Title>
            );
        } else {
            return (
                <ReceiptDetails receipt={props.receipt} />
            );
        }
    }

    return (
        <div className="receiptPanel">
            {transactions && transactions.length > 0 &&
                <Col span={8}>
                    <Card title={getHeader()} key={props.id} style={{ width: "28vw", height: "auto", maxHeight: "60vh" }}>
                        <ReceiptTableInner transactions={transactions} />
                        <Button size="large" prefix="a " onClick={() => {
                            toggleSelectedReceipt!(props.receipt);
                        }}>Edycja</Button>

                    </Card>
                </Col>
            }
        </div>)
}

export default ReceiptPanel;