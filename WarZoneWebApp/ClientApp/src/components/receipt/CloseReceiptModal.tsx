import React from 'react';
import { FunctionComponent } from 'react';
import { Modal } from 'antd';

export interface ICloseReceiptModalProps {
    modalVisible: boolean,
    setModalVisible: any,
    closeReceipt: () => void;
}

const CloseReceiptModal: FunctionComponent<ICloseReceiptModalProps> = (props) => {

    const handleOk = () => {
        props.setModalVisible(false);
        props.closeReceipt();
    };

    const handleCancel = () => {
        props.setModalVisible(false);
    };

    return (<>
        <Modal
            title="Czy na pewno chcesz zamknąć Rachunek?"
            visible={props.modalVisible}
            onOk={() => handleOk()}
            onCancel={() => handleCancel()}
        >

        </Modal>
    </>)
}
export default CloseReceiptModal;