import React, { useContext, useState } from 'react';
import ReceiptPanel from './ReceiptPanel';
import { AppContext, IAppContext } from '../../App';
import { FunctionComponent } from 'react';
import {
    IReceipt,
    ITransactionListDto,
    ReceiptClient,
    TransactionClient,
    TransactionListDto
    } from '../../ApiClient';
import { IReceiptTableValues } from './ReceiptTableInner';
import { Modal } from 'antd';

export interface IEditReceiptPanelModalProps {
    setReceiptRefreshFunc: any;
    receiptRefreshFunc?: () => void | undefined;
}

const EditReceiptPanelModal: FunctionComponent<IEditReceiptPanelModalProps> = (props: IEditReceiptPanelModalProps) => {
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);
    const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);

    let tableValues: IReceiptTableValues[] = [];

    const setTableValues = (newValues: IReceiptTableValues[]) => {
        tableValues = newValues;
        setSaveButtonEnabled(true);
    }

    const mapTableValuesToTransactionListDtos = (transactions: IReceiptTableValues[]) => {
        let data: ITransactionListDto[] = [];
        transactions.map((transaction, index) => {
            data.push({ ...transaction })
        });
        return data;
    }

    const OnOkay = () => {
        if (selectedReceipt && tableValues.length > 0) {
            new ReceiptClient().updateReceipt(selectedReceipt.id, mapTableValuesToTransactionListDtos(tableValues) as TransactionListDto[]);
            let timerId = setInterval(() => {
                if (props.receiptRefreshFunc) {
                    props.receiptRefreshFunc()
                }
            }, 500);

            setTimeout(() => {
                clearInterval(timerId);
            }, 3000);
        }
        OnCancel();
    }

    const OnCancel = () => {
        toggleSelectedReceipt!(undefined);
        setSaveButtonEnabled(false);
    }

    return (
        <Modal
            title={<big><b>{`Edycja rachunku #${selectedReceipt ? selectedReceipt.id : ""}`}</b></big>}
            visible={selectedReceipt !== undefined}
            onOk={() => OnOkay()}
            onCancel={() => OnCancel()}
            centered
            cancelText="Anuluj"
            okText="Zapisz"
            width="auto"
            bodyStyle={{ height: "60vh" }}
            okButtonProps={{ disabled: !saveButtonEnabled }}
        >
            {selectedReceipt && (
                <ReceiptPanel receipt={selectedReceipt} id={0} editMode setParentTableValues={setTableValues} setReceiptRefreshFunction={props.setReceiptRefreshFunc} />)
            }
        </Modal>
    );
}


export default EditReceiptPanelModal;