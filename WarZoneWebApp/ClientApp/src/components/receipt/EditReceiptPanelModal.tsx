import React, { useContext } from 'react';
import ReceiptPanel from './ReceiptPanel';
import { AppContext, IAppContext } from '../../App';
import { FunctionComponent } from 'react';
import { IReceipt } from '../../ApiClient';
import { Modal } from 'antd';

export interface IEditReceiptPanelModalProps {
    /* visible?: boolean; */
}

const EditReceiptPanelModal: FunctionComponent<IEditReceiptPanelModalProps> = (props: IEditReceiptPanelModalProps) => {
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);

    const OnOkay = () => {
        //TODO
        toggleSelectedReceipt!(undefined);
    }

    return (
        <Modal
            title={<big><b>{`Edycja rachunku #${selectedReceipt ? selectedReceipt.id : ""}`}</b></big>}
            visible={selectedReceipt !== undefined}
            onOk={() => OnOkay()}
            onCancel={() => toggleSelectedReceipt!(undefined)}
            centered
            cancelText="Anuluj"
            okText="Zapisz"
            width="auto"


            bodyStyle={{ height: "60vh" }}
        >
            {selectedReceipt && (
                <ReceiptPanel receipt={selectedReceipt} id={0} />)
            }
        </Modal>
    );
}


export default EditReceiptPanelModal;