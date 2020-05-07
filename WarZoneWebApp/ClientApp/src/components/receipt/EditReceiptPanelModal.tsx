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
    receiptRefreshFunc?: () => void | undefined;
    refreshHeaderFunc?: (() => void) | undefined;
}

const EditReceiptPanelModal: FunctionComponent<IEditReceiptPanelModalProps> = (props: IEditReceiptPanelModalProps) => {
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);
    const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);
    const [tableValues, setStateTableValues] = useState<IReceiptTableValues[]>([]);

    const setTableValues = (newValues: IReceiptTableValues[]) => {
        setStateTableValues(newValues);
        setSaveButtonEnabled(true);
        if (props.refreshHeaderFunc) {
            props.refreshHeaderFunc();
        }
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
            if (props.receiptRefreshFunc) {
                setTimeout(() =>
                    props.receiptRefreshFunc!(),
                    300
                );
            }
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
                <ReceiptPanel receipt={selectedReceipt} id={0} editMode setParentTableValues={setTableValues} />)
            }
        </Modal>
    );
}


export default EditReceiptPanelModal;