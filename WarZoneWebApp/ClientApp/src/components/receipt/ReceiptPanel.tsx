import Icon from '@ant-design/icons/lib/components/Icon';
import React, { useContext, useEffect, useState } from 'react';
import ReceiptDetails from './ReceiptDetails';
import ReceiptTableInner, { IReceiptTableValues } from './ReceiptTableInner';
import Resources from '../../Resources';
import { AppContext, IAppContext } from '../../App';
import {
    Button,
    Card,
    Col,
    Collapse,
    Divider,
    Tooltip,
    Typography,
    Select
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
    IReceipt,
    IService,
    ITransactionListDto,
    Receipt,
    ReceiptClient,
    TransactionClient,
    ReceiptAndCustomerBinderClient,
    ICustomer
} from '../../ApiClient';
import { openErrorNotification } from '../../helpers/NotificationHelper';
import CustomerFinder from './CustomerFinder';

interface IReceiptPanelProps {
    receipt: IReceipt;
    id: number;
    editMode?: boolean;
    setParentTableValues?: (newValues: IReceiptTableValues[]) => void;
    totalPrice?: number;
    setCustomersCopy?: (newCustomers: ICustomer[]) => void;
}


const ReceiptPanel: React.FunctionComponent<IReceiptPanelProps> = (props: IReceiptPanelProps) => {
    const [transactions, setTransactions] = useState<ITransactionListDto[] | null>([]);
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);
    const [valuesState, setValuesState] = useState<IReceiptTableValues[] | undefined>(undefined);
    const [customers, setCustomers] = useState<ICustomer[]>([]);

    useEffect(() => {
        new TransactionClient().getTransactions(props.receipt as Receipt).then((_transactions) => {
            setTransactions(_transactions);
            if (_transactions)
                setValuesState(mapTransactionsToValues(_transactions));
        })

        new ReceiptAndCustomerBinderClient().getReceiptCustomers(props.receipt.id).then((cust) => {
            setCustomers(cust ? cust : []);
        })
    }, [props.receipt]);

    useEffect(() => {
        if (props.editMode) {
            if (valuesState === undefined) {
                setValuesState([])
            }
        }
    }, []);

    useEffect(() => {
        if (props.editMode && valuesState) {
            if (valuesState.length > 0 && valuesState[valuesState.length - 1].serviceId != 2137)
                addSearchRow();
        }
    }, [valuesState])

    useEffect(() => {
        if (props.setCustomersCopy) {
            props.setCustomersCopy(customers);
        }
    }, [customers])

    /*     useEffect(() => {
            new ReceiptAndCustomerBinderClient().getReceiptCustomers(props.receipt.id).then((cust) => {
                setCustomers(cust ? cust : []);
            })
        }, [props.editMode]); */

    const changeCountValue = (newValue: number, service: IService) => {
        if (service.id < 3 && newValue == -2137) { // próba dodania nowej wejsciowki poprzez searchService
            openErrorNotification("Błąd przy dodawaniu usługi",
                <>
                    <div>
                        Nie można dodać 'wejściówki' poprzez pole wyszukiwania.
                    </div>
                    <div><b>
                        Użyj przycisków +/-
                    </b></div>
                </>)
        }

        if (newValue != -2137 && newValue < 0 || service.id < 3 && newValue < 1) {
            return;
        }

        if (valuesState) {
            let valueState = valuesState.find(receiptValue => receiptValue.serviceId == service.id);
            if (valueState) {
                if (newValue == -2137) {
                    newValue = valueState.count + 1;
                }
                const id = valueState.key;
                valuesState[id].count = newValue;
                valuesState[id].totalPrice = newValue * valuesState[id].price!;
            } else {
                valuesState[valuesState.length - 1] = {
                    count: 1,
                    key: valuesState.length - 1,
                    price: service.servicePrice,
                    serviceId: service.id,
                    totalPrice: service.servicePrice,
                    serviceName: service.serviceName
                };
            }
            const newState: IReceiptTableValues[] = [...valuesState];

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
            return (
                <div className="kliven-centered" style={{ fontSize: 20 }}>
                    <Tooltip overlayClassName="tooltip-box" placement="bottomRight" title={(<div>
                        <span className="tooltip-title">
                            <div>
                                {`Godzina stworzenia: ${props.receipt.creationDate.toLocaleTimeString("pl-PL").substring(0, 5)}`}
                            </div>
                            <div>
                                {`Godzina modyfikacji: ${props.receipt.modifyDate.toLocaleTimeString("pl-PL").substring(0, 5)}`}
                            </div>
                        </span>
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
            const newValuesState = [...valuesState, {
                key: valuesState.length + 1,
                count: 0,
                price: 0,
                serviceId: 2137,
                totalPrice: 0,
                serviceName: "janpaweł"
            }];

            setValuesState(newValuesState);
        }
    }

    return (<>
        {transactions && transactions.length > 0 &&
            <Col span={8}>
                <Card title={getHeader()} key={props.id} style={{ width: "28vw", height: "auto", maxHeight: "60vh" }}>
                    <CustomerFinder editMode={!!props.editMode} customers={customers} setCustomers={setCustomers} />
                    {props.receipt.closeDate &&
                        <span style={{ paddingLeft: 5 }}>
                            <b>Zamknięty:</b> {props.receipt.closeDate.toLocaleDateString()} {props.receipt.closeDate.toLocaleTimeString().substring(0, 5)}
                        </span>}
                    <ReceiptTableInner {...props} tableValues={valuesState!} changeCountValue={changeCountValue} />
                    {props.editMode !== true && props.receipt.closeDate === undefined && (
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