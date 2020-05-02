import EditReceiptPanelModal from './EditReceiptPanelModal';
import Icon from '@ant-design/icons/lib/components/Icon';
import React, { useContext, useEffect, useState } from 'react';
import ReceiptDetails from './ReceiptDetails';
import ReceiptTableInner, { IReceiptTableValues } from './ReceiptTableInner';
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
    editMode?: boolean;
    setParentTableValues?: (newValues: IReceiptTableValues[]) => void;
    setReceiptRefreshFunction: any;
}

const ReceiptPanel: React.FunctionComponent<IReceiptPanelProps> = (props: IReceiptPanelProps) => {
    const [transactions, setTransactions] = useState<ITransactionListDto[] | null>([]);
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);
    const [valuesState, setValuesState] = useState<IReceiptTableValues[] | undefined>(undefined);

    useEffect(() => {
        receiptRefreshFunc();
    }, []);

    const receiptRefreshFunc = () => {
        new TransactionClient().getTransactions(props.receipt as Receipt).then((_transactions) => {
            setTransactions(_transactions);
            if (_transactions)
                setValuesState(mapTransactionsToValues(_transactions));
        })
    }


    const changeCountValue = (id: number, newValue: number, serviceId: number) => {
        if (newValue < 0 || serviceId < 3 && newValue < 1)
            return;

        if (valuesState) {
            let newState: IReceiptTableValues[] = [];
            valuesState[id].count = newValue;
            valuesState[id].totalPrice = newValue * valuesState[id].price!;
            try {
                newState = JSON.parse(JSON.stringify(valuesState));
            } catch { }

            if (newState.length > 0) {
                setValuesState(newState);

                if (props.setParentTableValues) {
                    props.setParentTableValues(newState);
                }
            }
        }
    }

    const mapTransactionsToValues = (transactions: ITransactionListDto[]) => {
        let data: IReceiptTableValues[] = [];
        transactions.map((transaction, index) => {
            data.push({ ...transaction, key: index });
        });
        return data;
    }


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
        if (!!props.editMode) {
            return (
                <ReceiptDetails receipt={props.receipt} />
            );
        } else {
            return (
                <Typography.Title style={{ textAlign: "center", fontSize: 25 }}>
                    {`${props.receipt.customer!.customerName} ${props.receipt.customer!.customerSurname} ${props.receipt.creationDate.toLocaleDateString("pl-PL")}
                ${props.receipt.creationDate.toLocaleTimeString("pl-PL")}  ${props.receipt.totalPrice} zł`}
                </Typography.Title>
            );
        }
    }

    return (
        <div className="receiptPanel">
            {transactions && transactions.length > 0 &&
                <Col span={8}>
                    <Card title={getHeader()} key={props.id} style={{ width: "28vw", height: "auto", maxHeight: "60vh" }}>
                        <ReceiptTableInner {...props} tableValues={valuesState!} changeCountValue={changeCountValue} />
                        {props.editMode !== true && (
                            <Button size="large" prefix="a " onClick={() => {
                                toggleSelectedReceipt!(props.receipt);
                                props.setReceiptRefreshFunction(() => receiptRefreshFunc)
                            }}>Edycja</Button>
                        )}

                    </Card>
                </Col>
            }
        </div>)
}

export default ReceiptPanel;