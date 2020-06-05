import CloseReceiptModal from './CloseReceiptModal';
import React, { useContext, useState } from 'react';
import ReceiptPanel from './ReceiptPanel';
import Resources from '../../Resources';
import { AppContext, IAppContext } from '../../App';
import { Button, Modal } from 'antd';
import { FunctionComponent } from 'react';
import {
    ITransactionListDto,
    ReceiptClient,
    TransactionListDto,
    ICustomer,
    ReceiptAndCustomerBinderClient,
} from '../../ApiClient';
import { IReceiptTableValues } from './ReceiptTableInner';
import { openErrorNotification, openNotification } from '../../helpers/NotificationHelper';

export interface IEditReceiptPanelModalProps {
    receiptRefreshFunc?: () => void | undefined;
}

const EditReceiptPanelModal: FunctionComponent<IEditReceiptPanelModalProps> = (props: IEditReceiptPanelModalProps) => {
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);
    const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);
    const [tableValues, setStateTableValues] = useState<IReceiptTableValues[] | undefined>([]);
    const [customersCopy, setCustomersCopy] = useState<ICustomer[] | undefined>([]);
    const [closeReceiptModalVisible, setCloseReceiptModalVisible] = useState<boolean>(false);

    const { refreshPage } = useContext<IAppContext>(AppContext);

    const calculateCurrentTotalPrice = (_tableValues?: IReceiptTableValues[]) => {
        if (!_tableValues) {
            _tableValues = tableValues;
        }
        let sum: number = 0;
        if (_tableValues) {
            _tableValues.map(e => e.totalPrice).forEach(partialSum => sum += partialSum);
            return sum;
        }
        return undefined;
    }

    const [currentTotalPrice, setCurrentTotalPrice] = useState<number | undefined>(calculateCurrentTotalPrice());

    const setTableValues = (newValues: IReceiptTableValues[]) => {
        setStateTableValues(newValues);
        setSaveButtonEnabled(true);
        setCurrentTotalPrice(calculateCurrentTotalPrice(newValues));
    }

    const mapTableValuesToTransactionListDtos = (transactions: IReceiptTableValues[]) => {
        let data: ITransactionListDto[] = [];
        transactions.map((transaction, index) => {
            if (transaction.serviceId != 2137)
                data.push({ ...transaction })
        });
        return data;
    }

    const OnOkay = () => {
        if (selectedReceipt) {
            if (tableValues) {
                new ReceiptClient().updateReceipt(selectedReceipt.id, mapTableValuesToTransactionListDtos(tableValues) as TransactionListDto[]).then(e => {
                    openNotification(`Edycja rachunku`, `Pomyślnie edytowano rachunek.`);
                    refreshReceipt();
                }).catch(ex => {
                    openErrorNotification(`Błąd!`, `Błąd podczas edytowania rachunku.\nReceiptClient().updateReceipt()`);
                })
            }

            if (customersCopy) {
                new ReceiptAndCustomerBinderClient().setReceiptCustomers(selectedReceipt.id, customersCopy.map(cus => cus.id)).then(e => {
                    openNotification(`Edycja klientów`, `Pomyślnie edytowano klientów.`);
                    refreshReceipt();
                }).catch(ex => {
                    openErrorNotification(`Błąd!`, `Błąd podczas edytowania klientów.\nReceiptAndCustomerBinderClient().setReceiptCustomers()`);
                })
            }
        }
        OnCancel();
    }

    const refreshReceipt = () => {
        if (props.receiptRefreshFunc) {
            setTimeout(() =>
                props.receiptRefreshFunc!(),
                300
            );
        }
    }


    const OnCancel = () => {
        toggleSelectedReceipt!(undefined);
        setSaveButtonEnabled(false);
        setStateTableValues(undefined);
        setCurrentTotalPrice(undefined);
    }
    const closeReceipt = () => {
        if (selectedReceipt) {
            new ReceiptClient().closeReceipt(selectedReceipt.id).then((r) => {
                openNotification(`Zamknięto rachunek`, `Sukces.`);
            }).catch(ex => {
                openErrorNotification(`Błąd przy zapisie do bazy danych.`, `Błąd przy wstawianiu daty zamknięcia rachunku.\nReceiptClient().closeReceipt`);
            })
        }
        props.receiptRefreshFunc!();
        toggleSelectedReceipt!(undefined);
        refreshPage!();
    }

    return (<>
        <Modal
            title={<big><b>{`Edycja rachunku #${selectedReceipt ? selectedReceipt.id : ""}`}</b></big>}
            visible={selectedReceipt !== undefined}
            maskClosable
            centered
            onCancel={() => OnCancel()}
            width="auto"
            bodyStyle={{ height: "60vh" }}
            okButtonProps={{ disabled: !saveButtonEnabled }}
            footer={<>
                <Button onClick={() => setCloseReceiptModalVisible(true)}>{Resources.buttons.closeReceiptButton}</Button>
                <Button onClick={() => OnCancel()}>{Resources.buttons.cancel}</Button>
                <Button onClick={() => OnOkay()}>{Resources.buttons.save}</Button>
            </>}
        >
            {selectedReceipt && (
                <ReceiptPanel receipt={selectedReceipt} id={0} editMode setParentTableValues={setTableValues} totalPrice={currentTotalPrice} setCustomersCopy={setCustomersCopy} />)
            }
        </Modal>
        <CloseReceiptModal modalVisible={closeReceiptModalVisible} setModalVisible={setCloseReceiptModalVisible} closeReceipt={() => closeReceipt()} />
    </>);
}

export default EditReceiptPanelModal;