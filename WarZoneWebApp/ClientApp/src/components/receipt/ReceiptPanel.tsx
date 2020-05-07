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
    Divider,
    Tooltip,
    Typography
    } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
    IReceipt,
    ITransactionListDto,
    Receipt,
    ReceiptClient,
    TransactionClient
    } from '../../ApiClient';

interface IReceiptPanelProps {
    receipt: IReceipt;
    id: number;
    editMode?: boolean;
    setParentTableValues?: (newValues: IReceiptTableValues[]) => void;
    totalPrice?: number;
}

const ReceiptPanel: React.FunctionComponent<IReceiptPanelProps> = (props: IReceiptPanelProps) => {
    const [transactions, setTransactions] = useState<ITransactionListDto[] | null>([]);
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);
    const [valuesState, setValuesState] = useState<IReceiptTableValues[] | undefined>(undefined);

    useEffect(() => {
        new TransactionClient().getTransactions(props.receipt as Receipt).then((_transactions) => {
            setTransactions(_transactions);
            if (_transactions)
                setValuesState(mapTransactionsToValues(_transactions));
        })
    }, [props.receipt]);

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

    const getHeader = () => {
        if (!!props.editMode) {
            return (
                <ReceiptDetails receipt={props.receipt} totalPrice={props.totalPrice} />
            );
        } else {
            const cname = `${props.receipt.customer!.customerName} ${props.receipt.customer!.customerSurname}`;
            return (
                <div className="kliven-centered" style={{ fontSize: 20 }}>
                    <Tooltip overlayClassName="tooltip-box" placement="bottomRight" title={(<div>
                        <span className="tooltip-title">{<b>Imię i nazwisko</b>}</span>
                        <div>{cname.length > 30 && cname}</div>
                    </div>)}>
                        <span>{getDescriptionShortcut(cname)}</span>
                    </Tooltip>
                    <Divider type="vertical" style={{ height: "2vh" }} />
                    <Tooltip overlayClassName="tooltip-box" placement="bottomRight" title={(<div>
                        <span className="tooltip-title">{"Godzina ostatniej modyfikacji"}</span>
                    </div>)}>
                        <div>{`${props.receipt.creationDate.toLocaleTimeString("pl-PL").substring(0, 5)}`}</div>
                    </Tooltip>
                    <Divider type="vertical" style={{ height: "2vh" }} />
                    <Tooltip overlayClassName="tooltip-box" placement="bottomRight" title={(<div>
                        <span className="tooltip-title">{"Należność"}</span>
                    </div>)}>
                        <div>{`${props.receipt.totalPrice} zł`}</div>
                    </Tooltip>

                </div>
            );
        }
    }

    const getDescriptionShortcut = (description: string) => {
        if (description.length > 30) {
            return `${description.substring(0, 30)}...`;
        }
        else {
            return description;
        }
    }

    const addSearchRow = () => {
        if (valuesState) {
            valuesState.push(
                {
                    key: valuesState.length + 1,
                    count: 0,
                    price: 0,
                    serviceId: 2137,
                    totalPrice: 0,
                    serviceName: "janpaweł"
                }
            );
        }
    }

    return (<>
        {transactions && transactions.length > 0 &&
            <Col span={8}>
                <Card title={getHeader()} key={props.id} style={{ width: "28vw", height: "auto", maxHeight: "60vh" }}>
                    <ReceiptTableInner {...props} tableValues={valuesState!} changeCountValue={changeCountValue} />
                    {props.editMode !== true && (
                        <Button
                            size="large"
                            style={{ marginTop: "1vh" }}
                            onClick={() => {
                                toggleSelectedReceipt!(props.receipt);
                            }}>Edycja</Button>
                    )}

                </Card>
            </Col>
        }
    </>)
}
export default ReceiptPanel;