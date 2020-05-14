import InnerConsentForm from '../Consents/ConsentForm';
import React, { FunctionComponent, useState } from 'react';
import { IReceipt } from '../../ApiClient';
import { Modal } from 'antd';

interface IAddReceiptModal {
    isVisible: boolean;
    setVisible: any;
    pullReceipts: () => void;
}

const AddReceiptModal: FunctionComponent<IAddReceiptModal> = (props) => {
    return (<>
        <Modal
            title={"Utwórz rachunek"}
            visible={props.isVisible}
            footer={null}
            onCancel={() => props.setVisible()}
            onOk={() => props.setVisible()}
        >
            <InnerConsentForm setVisible={props.setVisible} pullReceipts={props.pullReceipts} visible={props.isVisible} />

        </Modal >
    </>);
}

export default AddReceiptModal;